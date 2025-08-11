import React from 'react'
import { Node } from '@xyflow/react'

interface ContextChatOverlayProps {
  targetWidget: Node
  onClose: () => void
}

const ContextChatOverlay: React.FC<ContextChatOverlayProps> = ({ targetWidget, onClose }) => {
  const getContextualMessage = () => {
    const widgetType = targetWidget.data.widgetType
    const title = targetWidget.data.title
    
    switch (widgetType) {
      case 'academic-progress':
        return `Hello! I see you're looking at your Academic Progress. You have ${targetWidget.data.content.ects} completed with ${targetWidget.data.content.progress} recent progress. Would you like me to help you plan your next semester or review your milestone achievements?`
      
      case 'my-classes':
        return `Hi! I notice you have ${targetWidget.data.badge} upcoming classes. Your next class is "${targetWidget.data.content.nextClass}". Would you like me to help you prepare materials, review the schedule, or connect with your professor?`
      
      case 'dissertation':
        return `Great work on your dissertation! You've written ${targetWidget.data.content.words} words with a ${targetWidget.data.content.plagiarism} plagiarism rate. Would you like me to help you with citations, provide feedback on your latest chapter, or assist with formatting for submission?`
      
      case 'inbox':
        return `I see you have ${targetWidget.data.badge} unread messages in your inbox. The latest is from ${targetWidget.data.content.messages?.[0]?.sender} about "${targetWidget.data.content.messages?.[0]?.subject}". Would you like me to help you prioritize these messages or draft responses?`
      
      default:
        return `I'm here to help with your ${title}. What would you like to work on?`
    }
  }

  const getQuickActions = () => {
    const widgetType = targetWidget.data.widgetType
    
    switch (widgetType) {
      case 'academic-progress':
        return ['Plan next semester', 'Review milestones', 'Check requirements', 'Export transcript']
      
      case 'my-classes':
        return ['Join class now', 'View materials', 'Contact professor', 'Check assignments']
      
      case 'dissertation':
        return ['Review chapter', 'Check citations', 'Export PDF', 'Schedule supervisor meeting']
      
      case 'inbox':
        return ['Reply to all', 'Mark as read', 'Archive old', 'Set notifications']
      
      default:
        return ['Get help', 'Show details', 'Export data']
    }
  }

  return (
    <div className="context-chat-overlay">
      <div className="context-chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="/swissi-icon-prof-swissi.svg" 
            alt="Prof Swissi AI" 
            style={{ width: '20px', height: '20px' }}
          />
          <span>Prof Swissi AI - {targetWidget.data.title}</span>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="context-chat-content">
        <p style={{ marginBottom: 'var(--space-lg)' }}>
          {getContextualMessage()}
        </p>
        
        <div>
          <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--widget-title-color)' }}>
            Quick Actions:
          </strong>
          <div style={{ marginTop: 'var(--space-sm)' }}>
            {getQuickActions().map((action, idx) => (
              <button
                key={idx}
                className="nav-link"
                style={{ 
                  margin: '2px 4px 2px 0',
                  fontSize: 'var(--font-size-xs)',
                  padding: '4px 8px'
                }}
                onClick={() => {
                  console.log(`AI Action: ${action} for ${targetWidget.data.title}`)
                  // Here you would implement the actual AI action
                }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-lg)' }}>
          <textarea
            placeholder="Ask me anything about your academic work..."
            style={{
              width: '100%',
              height: '60px',
              background: 'var(--background-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-small)',
              color: 'var(--text-color)',
              padding: 'var(--space-sm)',
              fontSize: 'var(--font-size-sm)',
              resize: 'none',
              boxSizing: 'border-box'
            }}
          />
          <button
            style={{
              marginTop: 'var(--space-sm)',
              background: 'var(--success-color)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-small)',
              padding: 'var(--space-sm) var(--space-lg)',
              fontSize: 'var(--font-size-sm)',
              cursor: 'pointer'
            }}
            onClick={() => console.log('Send AI message')}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContextChatOverlay