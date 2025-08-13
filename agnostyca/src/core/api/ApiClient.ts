// Generic API Client for Backend Integration
import { ApiResponse, ApiError, ApiConfig, UserContext } from './types'

export class ApiClient {
  private config: ApiConfig
  private userContext?: UserContext

  constructor(config: ApiConfig, userContext?: UserContext) {
    this.config = config
    this.userContext = userContext
  }

  /**
   * Generic HTTP request method with compliance checking
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requiresCompliance: boolean = true
  ): Promise<ApiResponse<T>> {
    const requestId = this.generateRequestId()
    
    try {
      // Add standard headers
      const headers = {
        'Content-Type': 'application/json',
        'X-Request-Id': requestId,
        'X-Institution-Id': this.userContext?.institutionId || '',
        'X-User-Role': this.userContext?.role || 'anonymous',
        ...options.headers
      }

      // Check GDPR consent if required
      if (requiresCompliance && !this.userContext?.gdprConsent) {
        throw new Error('GDPR consent required for this operation')
      }

      const response = await fetch(endpoint, {
        ...options,
        headers,
        timeout: 30000 // 30 second timeout
      })

      const data = await response.json()

      if (!response.ok) {
        throw this.createApiError(data, response.status)
      }

      return {
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
        requestId
      }

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        requestId
      }
    }
  }

  /**
   * GET request
   */
  protected async get<T>(endpoint: string, requiresCompliance = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, requiresCompliance)
  }

  /**
   * POST request
   */
  protected async post<T>(
    endpoint: string, 
    data?: any, 
    requiresCompliance = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    }, requiresCompliance)
  }

  /**
   * PUT request
   */
  protected async put<T>(
    endpoint: string, 
    data?: any, 
    requiresCompliance = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    }, requiresCompliance)
  }

  /**
   * DELETE request
   */
  protected async delete<T>(endpoint: string, requiresCompliance = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, requiresCompliance)
  }

  /**
   * Update user context (for role-based access)
   */
  public updateUserContext(userContext: UserContext): void {
    this.userContext = userContext
  }

  /**
   * Update API configuration
   */
  public updateConfig(config: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Get current configuration
   */
  public getConfig(): ApiConfig {
    return { ...this.config }
  }

  /**
   * Generate unique request ID for audit trails
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Create standardized API error
   */
  private createApiError(responseData: any, statusCode: number): ApiError {
    return {
      code: responseData.code || `HTTP_${statusCode}`,
      message: responseData.message || 'API request failed',
      details: responseData.details,
      compliance: responseData.compliance
    }
  }

  /**
   * Check if user has required permissions
   */
  protected hasPermission(requiredPermission: string): boolean {
    return this.userContext?.permissions?.includes(requiredPermission) || false
  }

  /**
   * Validate regulatory constraints before API calls
   */
  protected validateRegulatoryConstraints(operation: string): boolean {
    // Basic validation - can be extended based on specific regulations
    if (!this.userContext) {
      console.warn(`No user context for operation: ${operation}`)
      return false
    }

    if (!this.userContext.gdprConsent) {
      console.warn(`GDPR consent required for operation: ${operation}`)
      return false
    }

    return true
  }
}