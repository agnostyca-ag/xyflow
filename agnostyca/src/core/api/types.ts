// API Types for Backend Integration
// Based on EduAI and EduDVS research paper specifications

// Generic API Response Structure
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
  requestId: string
}

// Configuration for different backend environments
export interface ApiConfig {
  eduAI: {
    baseUrl: string
    apiKey?: string
    timeout?: number
  }
  eduDVS: {
    nodeUrl: string
    layer1Url?: string
    layer2Url?: string
    walletAddress?: string
  }
  regulatory: {
    gdprEndpoint?: string
    aiActEndpoint?: string
    financeEndpoint?: string
  }
}

// EduAI Multi-Agent System Types
export interface AgentRequest {
  agentType: 'administrative' | 'academic' | 'student' | 'audit'
  task: string
  parameters: Record<string, any>
  constraints?: RegulatoryConstraints
}

export interface AgentResponse {
  agentId: string
  result: any
  confidence: number
  compliance: ComplianceStatus
  auditTrail: AuditEntry[]
}

export interface RegulatoryConstraints {
  gdprCompliant: boolean
  aiActRiskLevel: 'minimal' | 'limited' | 'high' | 'unacceptable'
  dataMinimization: boolean
  explainabilityRequired: boolean
}

export interface ComplianceStatus {
  gdpr: boolean
  euAiAct: boolean
  institutional: boolean
  violations?: string[]
}

export interface AuditEntry {
  timestamp: string
  action: string
  agent: string
  parameters: Record<string, any>
  result: any
  hash: string
}

// EduDVS Distributed Verification Types
export interface DVSTransaction {
  id: string
  type: 'credential' | 'ects-token' | 'stablecoin' | 'institutional'
  data: any
  layer: 1 | 2
  institutionId: string
  signature: string
  timestamp: string
}

export interface DVSSubmission {
  contractClass: 'S1' | 'S2' | 'S3'
  payload: any
  targetLayer: 1 | 2
  institutionSignature: string
  auditRequired: boolean
}

export interface ECTSToken {
  tokenId: string
  credits: number
  courseId: string
  studentId: string
  institutionId: string
  issueDate: string
  expiryDate?: string
  metadata: Record<string, any>
}

export interface Stablecoin {
  amount: number
  currency: 'EUR' | 'CHF' | 'USD'
  purpose: 'tuition' | 'disbursement' | 'institutional'
  compliance: FinancialCompliance
}

export interface FinancialCompliance {
  fmiaCompliant: boolean
  miFIDCompliant: boolean
  micaCompliant: boolean
  amldCompliant: boolean
  supervisoryApproval: boolean
}

// Workspace and Widget Integration Types
export interface WorkspaceState {
  id: string
  agentOutputs: Map<string, any>
  dvsTransactions: DVSTransaction[]
  complianceStatus: ComplianceStatus
  lastSync: string
}

export interface WidgetApiData {
  source: 'eduai' | 'edudvs' | 'regulatory' | 'local'
  data: any
  lastUpdated: string
  compliance: ComplianceStatus
  cacheTTL?: number
}

// Error Types
export interface ApiError {
  code: string
  message: string
  details?: any
  compliance?: {
    violation: string
    regulation: string
    severity: 'warning' | 'error' | 'critical'
  }
}

// Authentication and Authorization
export interface ApiCredentials {
  institutionId: string
  apiKey?: string
  walletPrivateKey?: string
  certificatePath?: string
}

export interface UserContext {
  role: 'student' | 'faculty' | 'administrator' | 'auditor'
  institutionId: string
  permissions: string[]
  gdprConsent: boolean
}