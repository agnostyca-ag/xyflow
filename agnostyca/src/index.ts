// Agnostyca Platform Main Export
// This is the main entry point for the platform

// Core platform exports
export * from './core/types'
export * from './core/components'
export * from './core/hooks'
export * from './core/utils'
export * from './core/api'

// Widget system exports
export * from './widgets/registry'
export { WidgetRegistry, WidgetFactory } from './widgets/registry'

// Configuration exports
export * from './config/vertical.config'

// Theme system exports
export { ThemeManager } from './themes/ThemeManager'

// AI Avatar system exports
export * from './ai-avatar'

// Core widgets (available to all verticals)
export * from './widgets/core'

// Vertical-specific widgets (import as needed)
export * as EducationWidgets from './widgets/education'
export * as InsuranceWidgets from './widgets/insurance'
export * as InvestorWidgets from './widgets/investor'

// Workspace configurations (import as needed)
export * as EducationWorkspaces from './workspaces/education'
export * as InsuranceWorkspaces from './workspaces/insurance'
export * as InvestorWorkspaces from './workspaces/investor'

// Instance configurations
export { swissiConfig } from './instances/swissi/config'