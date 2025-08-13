// Theme Management System for White-Labeling
import { ThemeVariant, BrandingConfig } from '../core/types'

export interface ThemeConfig {
  id: string
  name: string
  variant: ThemeVariant
  colors: {
    primary: string
    secondary?: string
    background: string
    surface: string
    text: string
    textMuted: string
    accent: string
    success: string
    warning: string
    error: string
    border: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      small: string
      medium: string
      large: string
      xlarge: string
    }
    fontWeight: {
      normal: number
      medium: number
      bold: number
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
  }
}

export class ThemeManager {
  private static themes = new Map<string, ThemeConfig>()
  private static currentTheme: string = 'default'

  /**
   * Register a theme configuration
   */
  static registerTheme(theme: ThemeConfig): void {
    this.themes.set(theme.id, theme)
  }

  /**
   * Get theme configuration by ID
   */
  static getTheme(id: string): ThemeConfig | undefined {
    return this.themes.get(id)
  }

  /**
   * Apply theme to document (CSS custom properties)
   */
  static applyTheme(themeId: string): void {
    const theme = this.getTheme(themeId)
    if (!theme) {
      console.error(`Theme "${themeId}" not found`)
      return
    }

    const root = document.documentElement

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Apply typography variables
    root.style.setProperty('--font-family', theme.typography.fontFamily)
    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value)
    })
    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      root.style.setProperty(`--font-weight-${key}`, value.toString())
    })

    // Apply spacing variables
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value)
    })

    // Apply border radius variables
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value)
    })

    // Apply shadow variables
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value)
    })

    // Update body class for theme-specific styles
    document.body.className = `theme-${themeId}`
    this.currentTheme = themeId
  }

  /**
   * Create theme from branding configuration
   */
  static createBrandedTheme(branding: BrandingConfig, baseTheme: string = 'default'): ThemeConfig {
    const base = this.getTheme(baseTheme) || this.getDefaultTheme()
    
    return {
      ...base,
      id: `branded-${branding.theme}`,
      name: `${branding.name} Theme`,
      colors: {
        ...base.colors,
        primary: branding.primaryColor,
        secondary: branding.secondaryColor || base.colors.secondary || branding.primaryColor,
      }
    }
  }

  /**
   * Get current theme ID
   */
  static getCurrentTheme(): string {
    return this.currentTheme
  }

  /**
   * Get all registered themes
   */
  static getAllThemes(): ThemeConfig[] {
    return Array.from(this.themes.values())
  }

  /**
   * Get default theme configuration
   */
  private static getDefaultTheme(): ThemeConfig {
    return {
      id: 'default',
      name: 'Default',
      variant: 'light',
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b',
        textMuted: '#64748b',
        accent: '#8b5cf6',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        border: '#e2e8f0'
      },
      typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: {
          small: '0.875rem',
          medium: '1rem',
          large: '1.25rem',
          xlarge: '1.5rem'
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          bold: 600
        }
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }
    }
  }

  /**
   * Initialize with default theme
   */
  static initialize(): void {
    this.registerTheme(this.getDefaultTheme())
    this.applyTheme('default')
  }
}