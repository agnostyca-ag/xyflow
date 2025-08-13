// Vertical Configuration for different industry domains
import { VerticalConfig } from '../core/types'

export const verticals: Record<string, VerticalConfig> = {
  education: {
    id: 'education',
    name: 'Education',
    features: {
      aiAssistant: true,
      calendar: true,
      research: true,
      multiWorkspace: true,
      customWidgets: ['dissertation', 'thesis-defense', 'academic-progress']
    },
    defaultTheme: 'academic',
    availableWidgets: [
      'core.*',           // All core widgets
      'education.*'       // All education vertical widgets
    ],
    workspaceTemplates: [
      'research',
      'academic', 
      'writing',
      'discovery'
    ]
  },

  insurance: {
    id: 'insurance',
    name: 'Insurance',
    features: {
      aiAssistant: true,
      calendar: false,
      claims: true,
      portfolio: false,
      multiWorkspace: true,
      customWidgets: ['claims-processor', 'risk-calculator', 'policy-tracker']
    },
    defaultTheme: 'corporate',
    availableWidgets: [
      'core.*',           // All core widgets except calendar
      'insurance.*'       // All insurance vertical widgets
    ],
    workspaceTemplates: [
      'claims',
      'policies',
      'analytics',
      'underwriting'
    ]
  },

  investor: {
    id: 'investor',
    name: 'Investment Management',
    features: {
      aiAssistant: true,
      calendar: true,
      portfolio: true,
      research: true,
      multiWorkspace: true,
      customWidgets: ['portfolio-tracker', 'market-analysis', 'risk-metrics']
    },
    defaultTheme: 'corporate',
    availableWidgets: [
      'core.*',           // All core widgets
      'investor.*'        // All investor vertical widgets
    ],
    workspaceTemplates: [
      'portfolio',
      'research',
      'analytics',
      'reporting'
    ]
  },

  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    features: {
      aiAssistant: true,
      calendar: true,
      research: true,
      patientTracking: true,
      multiWorkspace: true,
      customWidgets: ['patient-dashboard', 'treatment-tracker', 'compliance-monitor']
    },
    defaultTheme: 'healthcare',
    availableWidgets: [
      'core.*',           // All core widgets
      'healthcare.*'      // All healthcare vertical widgets
    ],
    workspaceTemplates: [
      'patient-care',
      'research',
      'administration',
      'compliance'
    ]
  }
}

/**
 * Get vertical configuration by ID
 */
export function getVertical(id: string): VerticalConfig | undefined {
  return verticals[id]
}

/**
 * Get all available verticals
 */
export function getAllVerticals(): VerticalConfig[] {
  return Object.values(verticals)
}

/**
 * Check if a vertical supports a specific feature
 */
export function hasFeature(verticalId: string, feature: string): boolean {
  const vertical = getVertical(verticalId)
  return vertical?.features[feature] === true
}

/**
 * Get available widgets for a vertical (expanded patterns)
 */
export function getAvailableWidgetPatterns(verticalId: string): string[] {
  const vertical = getVertical(verticalId)
  return vertical?.availableWidgets || []
}