// Plugin Manager for Instance Widget Inheritance
import { WidgetPlugin, BaseWidgetComponent } from '../../core/types'

export class PluginManager {
  private static plugins = new Map<string, WidgetPlugin>()
  private static loadedPlugins = new Set<string>()

  /**
   * Register a widget plugin (used by instances like EduAI, InsAI)
   */
  static registerPlugin(plugin: WidgetPlugin): void {
    // Check dependencies
    if (plugin.dependencies) {
      const missingDeps = plugin.dependencies.filter(dep => !this.isPluginLoaded(dep))
      if (missingDeps.length > 0) {
        throw new Error(`Plugin ${plugin.name} missing dependencies: ${missingDeps.join(', ')}`)
      }
    }

    this.plugins.set(plugin.name, plugin)
    
    // Initialize plugin if it has an initialization function
    if (plugin.initialize) {
      plugin.initialize()
    }

    this.loadedPlugins.add(plugin.name)
    console.log(`Plugin "${plugin.name}" v${plugin.version} loaded successfully`)
  }

  /**
   * Get a specific plugin
   */
  static getPlugin(name: string): WidgetPlugin | undefined {
    return this.plugins.get(name)
  }

  /**
   * Check if a plugin is loaded
   */
  static isPluginLoaded(name: string): boolean {
    return this.loadedPlugins.has(name)
  }

  /**
   * Get all widgets from all loaded plugins
   */
  static getAllWidgets(): Map<string, BaseWidgetComponent> {
    const allWidgets = new Map<string, BaseWidgetComponent>()

    this.plugins.forEach(plugin => {
      plugin.widgets.forEach((widget, type) => {
        if (allWidgets.has(type)) {
          console.warn(`Widget type "${type}" already exists, overriding with plugin "${plugin.name}"`)
        }
        allWidgets.set(type, widget)
      })
    })

    return allWidgets
  }

  /**
   * Get widgets from a specific plugin
   */
  static getPluginWidgets(pluginName: string): Map<string, BaseWidgetComponent> {
    const plugin = this.getPlugin(pluginName)
    return plugin?.widgets || new Map()
  }

  /**
   * Get all loaded plugin names
   */
  static getLoadedPlugins(): string[] {
    return Array.from(this.loadedPlugins)
  }

  /**
   * Unload a plugin
   */
  static unloadPlugin(name: string): void {
    const plugin = this.plugins.get(name)
    
    if (plugin?.cleanup) {
      plugin.cleanup()
    }

    this.plugins.delete(name)
    this.loadedPlugins.delete(name)
    console.log(`Plugin "${name}" unloaded`)
  }

  /**
   * Get plugin information
   */
  static getPluginInfo(): Array<{name: string, version: string, widgets: number}> {
    return Array.from(this.plugins.values()).map(plugin => ({
      name: plugin.name,
      version: plugin.version,
      widgets: plugin.widgets.size
    }))
  }

  /**
   * Clear all plugins (useful for testing)
   */
  static clear(): void {
    // Call cleanup on all plugins
    this.plugins.forEach(plugin => {
      if (plugin.cleanup) {
        plugin.cleanup()
      }
    })

    this.plugins.clear()
    this.loadedPlugins.clear()
  }
}