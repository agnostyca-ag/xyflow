// Base Widget Component for all Agnostyca widgets
import React from 'react'
import { WidgetProps } from '../../core/types'

export interface BaseWidgetProps extends WidgetProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

/**
 * Base Widget Component
 * All widgets (core and instance-specific) should extend this
 */
export abstract class BaseWidget<T = any> extends React.Component<WidgetProps<T>> {
  /**
   * Abstract method - each widget must implement its own render logic
   */
  abstract renderContent(): React.ReactNode

  /**
   * Default widget wrapper with common functionality
   */
  render(): React.ReactNode {
    const { id, theme, onClose } = this.props

    return (
      <div 
        className={`agnostyca-widget ${theme ? `theme-${theme}` : ''}`}
        data-widget-id={id}
        style={{
          position: 'relative',
          padding: 'var(--spacing-md, 1rem)',
          backgroundColor: 'var(--color-surface, #ffffff)',
          border: '1px solid var(--color-border, #e2e8f0)',
          borderRadius: 'var(--border-radius-md, 0.5rem)',
          boxShadow: 'var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
          ...this.getWidgetStyle()
        }}
      >
        {/* Close button if onClose is provided */}
        {onClose && (
          <button
            className="agnostyca-widget-close"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 'var(--spacing-sm, 0.5rem)',
              right: 'var(--spacing-sm, 0.5rem)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted, #64748b)',
              fontSize: '1.2rem',
              zIndex: 10
            }}
          >
            ×
          </button>
        )}

        {/* Widget content */}
        <div className="agnostyca-widget-content">
          {this.renderContent()}
        </div>
      </div>
    )
  }

  /**
   * Override this method to provide custom widget styling
   */
  protected getWidgetStyle(): React.CSSProperties {
    return {}
  }

  /**
   * Helper method to update widget data
   */
  protected updateData(newData: Partial<T>): void {
    const { onUpdate, data } = this.props
    if (onUpdate) {
      onUpdate({ ...data, ...newData })
    }
  }

  /**
   * Helper method to trigger data change at parent level
   */
  protected triggerDataChange(newData: T): void {
    const { onDataChange, id } = this.props
    if (onDataChange) {
      onDataChange(id, newData)
    }
  }
}

/**
 * Functional Component Base Widget (alternative to class-based)
 */
export const FunctionalBaseWidget: React.FC<BaseWidgetProps> = ({
  id,
  data,
  theme,
  onClose,
  className = '',
  style = {},
  children
}) => {
  return (
    <div 
      className={`agnostyca-widget ${theme ? `theme-${theme}` : ''} ${className}`}
      data-widget-id={id}
      style={{
        position: 'relative',
        padding: 'var(--spacing-md, 1rem)',
        backgroundColor: 'var(--color-surface, #ffffff)',
        border: '1px solid var(--color-border, #e2e8f0)',
        borderRadius: 'var(--border-radius-md, 0.5rem)',
        boxShadow: 'var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
        ...style
      }}
    >
      {/* Close button if onClose is provided */}
      {onClose && (
        <button
          className="agnostyca-widget-close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--spacing-sm, 0.5rem)',
            right: 'var(--spacing-sm, 0.5rem)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-muted, #64748b)',
            fontSize: '1.2rem',
            zIndex: 10
          }}
        >
          ×
        </button>
      )}

      {/* Widget content */}
      <div className="agnostyca-widget-content">
        {children}
      </div>
    </div>
  )
}