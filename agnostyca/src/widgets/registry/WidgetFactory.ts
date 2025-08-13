// Widget Factory for dynamic widget creation
import React from 'react'
import { WidgetRegistry } from './WidgetRegistry'
import { WidgetProps, WidgetConfig } from '../../core/types'

export class WidgetFactory {
  /**
   * Create a widget instance from configuration
   */
  static create(config: WidgetConfig, props: Partial<WidgetProps> = {}): React.ReactElement | null {
    const widget = WidgetRegistry.get(config.type)
    
    if (!widget) {
      console.error(`Widget type "${config.type}" not found in registry`)
      return null
    }

    const widgetProps: WidgetProps = {
      data: config.config,
      ...props
    }

    return React.createElement(widget.component, widgetProps)
  }

  /**
   * Check if a widget type is available
   */
  static canCreate(type: string): boolean {
    return WidgetRegistry.exists(type)
  }

  /**
   * Get default props for a widget type
   */
  static getDefaultProps(type: string): any {
    const widget = WidgetRegistry.get(type)
    return widget?.config.defaultProps || {}
  }

  /**
   * Validate widget configuration
   */
  static validateConfig(config: WidgetConfig): boolean {
    if (!config.type || !config.id) {
      return false
    }

    if (!this.canCreate(config.type)) {
      return false
    }

    return true
  }

  /**
   * Create multiple widgets from configurations
   */
  static createMultiple(
    configs: WidgetConfig[], 
    props: Partial<WidgetProps> = {}
  ): Array<React.ReactElement | null> {
    return configs.map(config => this.create(config, props))
  }
}