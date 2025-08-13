// EduAI Multi-Agent System API Integration
import { ApiClient } from './ApiClient'
import { 
  ApiResponse, 
  AgentRequest, 
  AgentResponse, 
  WorkspaceState,
  RegulatoryConstraints,
  ApiConfig,
  UserContext
} from './types'

export class EduAIApi extends ApiClient {
  constructor(config: ApiConfig, userContext?: UserContext) {
    super(config, userContext)
  }

  /**
   * Submit task to specific agent type
   * Based on paper's agent classification: administrative, academic, student, audit
   */
  async submitAgentTask(request: AgentRequest): Promise<ApiResponse<AgentResponse>> {
    if (!this.validateRegulatoryConstraints('agent-task-submission')) {
      return {
        success: false,
        error: 'Regulatory constraints not met',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    // Check role permissions
    const requiredPermission = `agent.${request.agentType}.execute`
    if (!this.hasPermission(requiredPermission)) {
      return {
        success: false,
        error: `Permission denied for agent type: ${request.agentType}`,
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    const endpoint = `${this.getConfig().eduAI.baseUrl}/agents/${request.agentType}/execute`
    return this.post<AgentResponse>(endpoint, request)
  }

  /**
   * Get agent task status and results
   */
  async getAgentTaskResult(agentId: string, taskId: string): Promise<ApiResponse<AgentResponse>> {
    const endpoint = `${this.getConfig().eduAI.baseUrl}/agents/${agentId}/tasks/${taskId}`
    return this.get<AgentResponse>(endpoint)
  }

  /**
   * Administrative Agent Operations
   * Handles enrollment, scheduling, financial disbursement, regulatory reporting
   */
  async administrativeAgent(operation: string, data: any): Promise<ApiResponse<any>> {
    if (!this.hasPermission('agent.administrative.execute')) {
      return {
        success: false,
        error: 'Administrative agent access denied',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    const request: AgentRequest = {
      agentType: 'administrative',
      task: operation,
      parameters: data,
      constraints: {
        gdprCompliant: true,
        aiActRiskLevel: 'high', // Administrative decisions are high-risk per EU AI Act
        dataMinimization: true,
        explainabilityRequired: true
      }
    }

    return this.submitAgentTask(request)
  }

  /**
   * Academic Agent Operations  
   * Handles curriculum management, assessment, grading, content validation
   */
  async academicAgent(operation: string, data: any): Promise<ApiResponse<any>> {
    if (!this.hasPermission('agent.academic.execute')) {
      return {
        success: false,
        error: 'Academic agent access denied',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    const request: AgentRequest = {
      agentType: 'academic',
      task: operation,
      parameters: data,
      constraints: {
        gdprCompliant: true,
        aiActRiskLevel: 'high', // Educational/vocational training is high-risk per EU AI Act
        dataMinimization: true,
        explainabilityRequired: true
      }
    }

    return this.submitAgentTask(request)
  }

  /**
   * Student Agent Operations
   * Handles course planning, progress tracking, recommendation systems
   */
  async studentAgent(operation: string, data: any): Promise<ApiResponse<any>> {
    const request: AgentRequest = {
      agentType: 'student',
      task: operation,
      parameters: data,
      constraints: {
        gdprCompliant: true,
        aiActRiskLevel: 'limited', // Student-facing interfaces typically limited risk
        dataMinimization: true,
        explainabilityRequired: true
      }
    }

    return this.submitAgentTask(request)
  }

  /**
   * Audit Agent Operations
   * Handles compliance monitoring, anomaly detection, regulatory reporting
   */
  async auditAgent(operation: string, data: any): Promise<ApiResponse<any>> {
    if (!this.hasPermission('agent.audit.execute')) {
      return {
        success: false,
        error: 'Audit agent access denied',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }

    const request: AgentRequest = {
      agentType: 'audit',
      task: operation,
      parameters: data,
      constraints: {
        gdprCompliant: true,
        aiActRiskLevel: 'minimal', // Audit agents are read-only, minimal risk
        dataMinimization: false, // Auditors may need access to full data sets
        explainabilityRequired: true
      }
    }

    return this.submitAgentTask(request)
  }

  /**
   * Get workspace state from EduAI system
   * Includes agent outputs, compliance status, last synchronization
   */
  async getWorkspaceState(workspaceId: string): Promise<ApiResponse<WorkspaceState>> {
    const endpoint = `${this.getConfig().eduAI.baseUrl}/workspaces/${workspaceId}/state`
    return this.get<WorkspaceState>(endpoint)
  }

  /**
   * Update workspace state (for coordination with React Flow)
   */
  async updateWorkspaceState(
    workspaceId: string, 
    state: Partial<WorkspaceState>
  ): Promise<ApiResponse<WorkspaceState>> {
    const endpoint = `${this.getConfig().eduAI.baseUrl}/workspaces/${workspaceId}/state`
    return this.put<WorkspaceState>(endpoint, state)
  }

  /**
   * Get available AI suggestions for workspace
   * Based on current state and regulatory constraints
   */
  async getAISuggestions(workspaceId: string): Promise<ApiResponse<string[]>> {
    const endpoint = `${this.getConfig().eduAI.baseUrl}/workspaces/${workspaceId}/suggestions`
    return this.get<string[]>(endpoint)
  }

  /**
   * Validate operation against regulatory constraints
   * Checks GDPR, EU AI Act, institutional policies
   */
  async validateOperation(
    operation: string,
    data: any,
    constraints: RegulatoryConstraints
  ): Promise<ApiResponse<{ valid: boolean; violations: string[] }>> {
    const endpoint = `${this.getConfig().eduAI.baseUrl}/compliance/validate`
    return this.post(endpoint, { operation, data, constraints })
  }

  private generateRequestId(): string {
    return `eduai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}