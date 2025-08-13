// Error Widget - Core component for showing error states
import React from 'react'
import { FunctionalBaseWidget } from '../BaseWidget'
import { WidgetProps } from '../../../core/types'

interface ErrorWidgetData {
  error: string | Error
  showRetry?: boolean
  onRetry?: () => void
  title?: string
}

export const ErrorWidget: React.FC<WidgetProps<ErrorWidgetData>> = (props) => {
  const { data } = props
  const { error, showRetry = false, onRetry, title = 'Error' } = data || {}
  
  const errorMessage = typeof error === 'string' ? error : error?.message || 'An unexpected error occurred'

  return (
    <FunctionalBaseWidget {...props}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-lg, 1.5rem)',
        textAlign: 'center'
      }}>
        {/* Error Icon */}
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: 'var(--color-error, #ef4444)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--spacing-md, 1rem)',
          color: 'white',
          fontSize: '24px'
        }}>
          ⚠️
        </div>

        {/* Error Title */}
        <h3 style={{
          margin: '0 0 var(--spacing-sm, 0.5rem) 0',
          color: 'var(--color-text, #1e293b)',
          fontSize: 'var(--font-size-large, 1.25rem)',
          fontWeight: 'var(--font-weight-medium, 500)'
        }}>
          {title}
        </h3>

        {/* Error Message */}
        <p style={{
          margin: '0 0 var(--spacing-md, 1rem) 0',
          color: 'var(--color-text-muted, #64748b)',
          fontSize: 'var(--font-size-medium, 1rem)',
          lineHeight: '1.5'
        }}>
          {errorMessage}
        </p>

        {/* Retry Button */}
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
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
            Try Again
          </button>
        )}
      </div>
    </FunctionalBaseWidget>
  )
}

export default ErrorWidget