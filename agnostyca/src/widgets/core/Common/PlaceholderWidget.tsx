// Placeholder Widget - Core component for empty states and development
import React from 'react'
import { FunctionalBaseWidget } from '../BaseWidget'
import { WidgetProps } from '../../../core/types'

interface PlaceholderWidgetData {
  title?: string
  description?: string
  icon?: string
  actionLabel?: string
  onAction?: () => void
  type?: 'empty' | 'development' | 'coming-soon'
}

export const PlaceholderWidget: React.FC<WidgetProps<PlaceholderWidgetData>> = (props) => {
  const { data } = props
  const { 
    title = 'Placeholder Widget',
    description = 'This widget is in development',
    icon = '📋',
    actionLabel,
    onAction,
    type = 'development'
  } = data || {}

  const getTypeStyle = () => {
    switch (type) {
      case 'empty':
        return {
          backgroundColor: 'var(--color-surface, #f8fafc)',
          borderStyle: 'dashed',
          opacity: 0.7
        }
      case 'coming-soon':
        return {
          backgroundColor: 'var(--color-surface, #f8fafc)',
          border: '2px dashed var(--color-primary, #3b82f6)'
        }
      default:
        return {
          backgroundColor: 'var(--color-surface, #f8fafc)',
          border: '2px dashed var(--color-warning, #f59e0b)'
        }
    }
  }

  return (
    <FunctionalBaseWidget {...props} style={getTypeStyle()}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-lg, 1.5rem)',
        textAlign: 'center',
        minHeight: '200px'
      }}>
        {/* Icon */}
        <div style={{
          fontSize: '48px',
          marginBottom: 'var(--spacing-md, 1rem)'
        }}>
          {icon}
        </div>

        {/* Title */}
        <h3 style={{
          margin: '0 0 var(--spacing-sm, 0.5rem) 0',
          color: 'var(--color-text, #1e293b)',
          fontSize: 'var(--font-size-large, 1.25rem)',
          fontWeight: 'var(--font-weight-medium, 500)'
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          margin: '0 0 var(--spacing-md, 1rem) 0',
          color: 'var(--color-text-muted, #64748b)',
          fontSize: 'var(--font-size-medium, 1rem)',
          lineHeight: '1.5',
          maxWidth: '300px'
        }}>
          {description}
        </p>

        {/* Development info */}
        {type === 'development' && (
          <div style={{
            padding: 'var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem)',
            backgroundColor: 'var(--color-warning, #f59e0b)',
            color: 'white',
            borderRadius: 'var(--border-radius-sm, 0.25rem)',
            fontSize: 'var(--font-size-small, 0.875rem)',
            fontWeight: 'var(--font-weight-medium, 500)',
            marginBottom: actionLabel && onAction ? 'var(--spacing-md, 1rem)' : '0'
          }}>
            🚧 In Development
          </div>
        )}

        {/* Action Button */}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            style={{
              padding: 'var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem)',
              backgroundColor: 'var(--color-primary, #3b82f6)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius-sm, 0.25rem)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-medium, 1rem)',
              fontWeight: 'var(--font-weight-medium, 500)',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-dark, #2563eb)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary, #3b82f6)'
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </FunctionalBaseWidget>
  )
}

export default PlaceholderWidget