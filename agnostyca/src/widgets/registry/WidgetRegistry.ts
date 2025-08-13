// Core Widget Registry System for Agnostyca Platform
import { BaseWidgetComponent } from '../../core/types'
import { PluginManager } from './PluginManager'

export class WidgetRegistry {
  private static coreWidgets = new Map<string, BaseWidgetComponent>()

  /**
   * Register a core widget (part of Agnostyca platform)
   */
  static registerCore(type: string, widget: BaseWidgetComponent): void {
    this.coreWidgets.set(type, widget)
    console.log(`Core widget "${type}" registered`)
  }

  /**
   * Get a specific widget by type (checks core + plugins)
   */
  static get(type: string): BaseWidgetComponent | undefined {
    // First check core widgets
    const coreWidget = this.coreWidgets.get(type)
    if (coreWidget) {
      return coreWidget
    }

    // Then check plugin widgets
    const pluginWidgets = PluginManager.getAllWidgets()
    return pluginWidgets.get(type)
  }

  /**
   * Get all core widgets (part of platform)
   */
  static getCoreWidgets(): Map<string, BaseWidgetComponent> {
    return new Map(this.coreWidgets)
  }

  /**
   * Get all available widgets (core + plugins)
   */
  static getAllWidgets(): Map<string, BaseWidgetComponent> {
    const allWidgets = new Map<string, BaseWidgetComponent>()
    
    // Add core widgets first
    this.coreWidgets.forEach((widget, type) => {
      allWidgets.set(type, widget)
    })
    
    // Add plugin widgets (may override core)
    const pluginWidgets = PluginManager.getAllWidgets()
    pluginWidgets.forEach((widget, type) => {
      allWidgets.set(type, widget)
    })
    
    return allWidgets
  }

  /**
   * Get widgets by category
   */
  static getByCategory(category: string): Map<string, BaseWidgetComponent> {
    const categoryWidgets = new Map<string, BaseWidgetComponent>()
    
    this.getAllWidgets().forEach((widget, type) => {
      if (widget.config.category === category) {
        categoryWidgets.set(type, widget)
      }
    })
    
    return categoryWidgets
  }

  /**
   * Check if a widget type exists
   */
  static exists(type: string): boolean {
    return this.coreWidgets.has(type) || PluginManager.getAllWidgets().has(type)
  }

  /**
   * Get all registered widget types
   */
  static getAllTypes(): string[] {
    const allWidgets = this.getAllWidgets()
    return Array.from(allWidgets.keys())
  }

  /**
   * Filter widgets by feature requirements
   */
  static getWidgetsByFeatures(availableFeatures: string[]): Map<string, BaseWidgetComponent> {
    const filteredWidgets = new Map<string, BaseWidgetComponent>()
    
    this.getAllWidgets().forEach((widget, type) => {
      const requiredFeatures = widget.config.requiredFeatures || []
      const hasAllFeatures = requiredFeatures.every(feature => 
        availableFeatures.includes(feature)
      )
      
      if (hasAllFeatures) {
        filteredWidgets.set(type, widget)
      }
    })
    
    return filteredWidgets
  }

  /**
   * Get widget statistics
   */
  static getStats(): {
    core: number
    plugins: number
    total: number
    categories: Record<string, number>
  } {
    const allWidgets = this.getAllWidgets()
    const categories: Record<string, number> = {}
    
    allWidgets.forEach(widget => {
      const category = widget.config.category
      categories[category] = (categories[category] || 0) + 1
    })

    return {
      core: this.coreWidgets.size,
      plugins: PluginManager.getAllWidgets().size,
      total: allWidgets.size,
      categories
    }
  }

  /**
   * Clear core widgets (useful for testing)
   */
  static clear(): void {
    this.coreWidgets.clear()
  }
}