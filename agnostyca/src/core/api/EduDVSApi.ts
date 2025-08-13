// EduDVS Distributed Verification System API Integration
import { ApiClient } from './ApiClient'
import { 
  ApiResponse, 
  DVSTransaction, 
  DVSSubmission,
  ECTSToken,
  Stablecoin,
  FinancialCompliance,
  ApiConfig,
  UserContext
} from './types'

export class EduDVSApi extends ApiClient {
  constructor(config: ApiConfig, userContext?: UserContext) {
    super(config, userContext)
  }

  /**
   * Submit transaction to appropriate layer (1 or 2)
   * Based on paper's smart contract taxonomy (S1, S2, S3)
   */
  async submitTransaction(submission: DVSSubmission): Promise<ApiResponse<DVSTransaction>> {
    if (!this.validateRegulatoryConstraints('dvs-transaction-submission')) {
      return {
        success: false,
        error: 'Regulatory constraints not met for DVS submission',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    // Determine target layer based on contract class
    const targetLayer = this.determineLayer(submission.contractClass)
    const endpoint = this.getLayerEndpoint(targetLayer)
    
    return this.post<DVSTransaction>(`${endpoint}/submit`, {
      ...submission,
      targetLayer,
      timestamp: new Date().toISOString(),
      institutionId: this.getUserContext()?.institutionId
    })
  }

  /**
   * Issue ECTS Token (Layer 2 - Technical Attestation)
   * Represents academic credits per European Credit Transfer System
   */
  async issueECTSToken(tokenData: Partial<ECTSToken>): Promise<ApiResponse<ECTSToken>> {
    if (!this.hasPermission('tokens.ects.issue')) {
      return {
        success: false,
        error: 'ECTS token issuance permission denied',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    const submission: DVSSubmission = {
      contractClass: 'S2', // Technical attestation - Layer 2
      payload: {
        type: 'ects-token',
        ...tokenData,
        issueDate: new Date().toISOString(),
        institutionId: this.getUserContext()?.institutionId
      },
      targetLayer: 2,
      institutionSignature: await this.generateInstitutionSignature(tokenData),
      auditRequired: true
    }

    return this.submitTransaction(submission)
  }

  /**
   * Transfer Stablecoin (Layer 1 - Regulatory Finality)
   * Handles institutional payments, tuition, disbursements
   */
  async transferStablecoin(transfer: Partial<Stablecoin> & {
    fromAddress: string
    toAddress: string
  }): Promise<ApiResponse<DVSTransaction>> {
    if (!this.hasPermission('tokens.stablecoin.transfer')) {
      return {
        success: false,
        error: 'Stablecoin transfer permission denied',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    // Validate financial compliance
    const complianceCheck = await this.validateFinancialCompliance(transfer)
    if (!complianceCheck.success) {
      return complianceCheck
    }

    const submission: DVSSubmission = {
      contractClass: 'S1', // Regulatory finality - Layer 1
      payload: {
        type: 'stablecoin-transfer',
        ...transfer,
        timestamp: new Date().toISOString(),
        compliance: complianceCheck.data
      },
      targetLayer: 1,
      institutionSignature: await this.generateInstitutionSignature(transfer),
      auditRequired: true
    }

    return this.submitTransaction(submission)
  }

  /**
   * Issue Credential (Layer 2 with Layer 1 anchoring)
   * Handles diploma, certificate, qualification issuance
   */
  async issueCredential(credentialData: any): Promise<ApiResponse<DVSTransaction>> {
    if (!this.hasPermission('credentials.issue')) {
      return {
        success: false,
        error: 'Credential issuance permission denied',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    const submission: DVSSubmission = {
      contractClass: 'S3', // Hybrid - Layer 2 with Layer 1 anchoring
      payload: {
        type: 'credential',
        ...credentialData,
        issueDate: new Date().toISOString(),
        institutionId: this.getUserContext()?.institutionId,
        qualificationFramework: 'EQF', // European Qualifications Framework
        bolognaCompliant: true
      },
      targetLayer: 2,
      institutionSignature: await this.generateInstitutionSignature(credentialData),
      auditRequired: true
    }

    return this.submitTransaction(submission)
  }

  /**
   * Get transaction status and verification proof
   */
  async getTransactionStatus(transactionId: string): Promise<ApiResponse<DVSTransaction>> {
    // Try Layer 2 first (most common)
    let response = await this.get<DVSTransaction>(
      `${this.getConfig().eduDVS.layer2Url}/transactions/${transactionId}`
    )
    
    // If not found in Layer 2, try Layer 1
    if (!response.success && this.getConfig().eduDVS.layer1Url) {
      response = await this.get<DVSTransaction>(
        `${this.getConfig().eduDVS.layer1Url}/transactions/${transactionId}`
      )
    }

    return response
  }

  /**
   * Get institution's transaction history
   */
  async getInstitutionTransactions(
    limit: number = 100,
    offset: number = 0
  ): Promise<ApiResponse<DVSTransaction[]>> {
    const institutionId = this.getUserContext()?.institutionId
    if (!institutionId) {
      return {
        success: false,
        error: 'Institution ID required',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    const endpoint = `${this.getConfig().eduDVS.layer2Url}/institutions/${institutionId}/transactions`
    return this.get<DVSTransaction[]>(`${endpoint}?limit=${limit}&offset=${offset}`)
  }

  /**
   * Verify transaction authenticity and compliance
   */
  async verifyTransaction(transactionId: string): Promise<ApiResponse<{
    valid: boolean
    compliance: FinancialCompliance
    auditTrail: any[]
  }>> {
    const endpoint = `${this.getConfig().eduDVS.nodeUrl}/verify/${transactionId}`
    return this.get(endpoint)
  }

  /**
   * Get network status and validator information
   */
  async getNetworkStatus(): Promise<ApiResponse<{
    layer1Status: any
    layer2Status: any
    validators: number
    lastBlock: number
  }>> {
    const endpoint = `${this.getConfig().eduDVS.nodeUrl}/status`
    return this.get(endpoint, false) // Network status doesn't require compliance
  }

  // Private helper methods

  private determineLayer(contractClass: 'S1' | 'S2' | 'S3'): 1 | 2 {
    switch (contractClass) {
      case 'S1': return 1 // Regulatory finality -> Layer 1
      case 'S2': return 2 // Technical attestation -> Layer 2  
      case 'S3': return 2 // Hybrid -> Layer 2 with Layer 1 anchoring
      default: return 2
    }
  }

  private getLayerEndpoint(layer: 1 | 2): string {
    const config = this.getConfig().eduDVS
    return layer === 1 ? 
      (config.layer1Url || config.nodeUrl) : 
      (config.layer2Url || config.nodeUrl)
  }

  private async generateInstitutionSignature(data: any): Promise<string> {
    // In production, this would use institutional private key
    // For now, return a placeholder signature
    const dataString = JSON.stringify(data)
    const timestamp = Date.now()
    return `inst_sig_${timestamp}_${btoa(dataString).slice(0, 16)}`
  }

  private async validateFinancialCompliance(
    transfer: any
  ): Promise<ApiResponse<FinancialCompliance>> {
    // Validate against FMIA, FinSA, MiFID II, MiCA, AMLD etc.
    const compliance: FinancialCompliance = {
      fmiaCompliant: true, // Swiss Financial Market Infrastructure Act
      miFIDCompliant: true, // Markets in Financial Instruments Directive II
      micaCompliant: true, // Markets in Crypto-Assets
      amldCompliant: true, // Anti-Money Laundering Directive
      supervisoryApproval: true // FINMA, ESMA, BaFin approval
    }

    // In production, this would make actual compliance checks
    return {
      success: true,
      data: compliance,
      timestamp: new Date().toISOString(),
      requestId: this.generateRequestId()
    }
  }

  private getUserContext(): UserContext | undefined {
    // Access parent class method through type assertion
    return (this as any).userContext
  }

  private generateRequestId(): string {
    return `edudvs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}