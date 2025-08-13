// Core platform types for Agnostyca
import { Node, Edge } from '@xyflow/react'

// Core widget system types
export interface WidgetConfig {
  id: string
  type: string
  position: { x: number; y: number }
  style?: React.CSSProperties
  config: Record<string, any>
}

export interface WorkspaceConfig {
  id: string
  name: string
  description: string
  widgets: WidgetConfig[]
  edges?: Edge[]
  aiSuggestions?: string[]
}

// Widget base types
export interface WidgetProps<T = any> {
  id: string
  data: T
  theme?: string
  onClose?: () => void
  onUpdate?: (data: T) => void
  onDataChange?: (id: string, data: T) => void
}

export interface BaseWidgetComponent<T = any> {
  component: React.ComponentType<WidgetProps<T>>
  config: WidgetDefinition
}

export interface WidgetDefinition {
  type: string
  name: string
  category: string
  description?: string
  defaultProps?: any
  configSchema?: Record<string, any>
  requiredFeatures?: string[]
  version?: string
}

// Plugin system for instances
export interface WidgetPlugin {
  name: string
  version: string
  widgets: Map<string, BaseWidgetComponent>
  dependencies?: string[]
  initialize?: () => void
  cleanup?: () => void
}

// Theme system
export interface BrandingConfig {
  name: string
  logo: string
  primaryColor: string
  secondaryColor?: string
  theme: string
  favicon?: string
}

export type ThemeVariant = 'light' | 'dark' | 'corporate' | 'academic' | 'custom'

// Platform configuration
export interface PlatformConfig {
  name: string
  version: string
  branding: BrandingConfig
  features: FeatureFlags
  plugins: string[]
}

export interface FeatureFlags {
  [key: string]: boolean | string | number | string[]
}

// Core platform context
export interface AgnosticaContext {
  platform: PlatformConfig
  currentWorkspace: string
  theme: ThemeVariant
  widgets: Map<string, BaseWidgetComponent>
  plugins: Map<string, WidgetPlugin>
  api?: {
    eduAI?: any
    eduDVS?: any
    regulatory?: any
  }
}