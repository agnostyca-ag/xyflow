// Loading Widget - Core component for showing loading states
import React from 'react'
import { FunctionalBaseWidget } from '../BaseWidget'
import { WidgetProps } from '../../../core/types'

interface LoadingWidgetData {
  message?: string
  showSpinner?: boolean
}

export const LoadingWidget: React.FC<WidgetProps<LoadingWidgetData>> = (props) => {
  const { data } = props
  const message = data?.message || 'Loading...'
  const showSpinner = data?.showSpinner !== false

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
        {showSpinner && (
          <div 
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid var(--color-border, #e2e8f0)',
              borderTop: '3px solid var(--color-primary, #3b82f6)',
              borderRadius: '50%',
              animation: 'agnostyca-spin 1s linear infinite',
              marginBottom: 'var(--spacing-md, 1rem)'
            }}
          />
        )}
        <span style={{
          color: 'var(--color-text-muted, #64748b)',
          fontSize: 'var(--font-size-medium, 1rem)'
        }}>
          {message}
        </span>
      </div>
      
      <style>{`
        @keyframes agnostyca-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </FunctionalBaseWidget>
  )
}

export default LoadingWidget