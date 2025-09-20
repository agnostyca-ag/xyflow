import React from 'react'
import { NodeProps, Handle, Position, NodeResizer } from '@xyflow/react'
import ChartWidget from './ChartWidget'
import BoxplotWidget from './BoxplotWidget'
import SurveyResultsWidget from './SurveyResultsWidget'
import CalendarWidget from './CalendarWidget'

interface WidgetData {
  widgetType: string
  title: string
  badge?: string
  theme?: string
  onClose?: () => void
  content: {
    ects?: string
    progress?: string
    nextClass?: string
    words?: string
    plagiarism?: string
    datasets?: string
    analysis?: string
    upcoming?: string
    events?: string
    status?: string
    wordcount?: string
    published?: string
    inReview?: string
    recent?: string
    trending?: string
    latest?: string
    field?: string
    courseCode?: string
    credits?: string
    duration?: string
    description?: string
    topic?: string
    milestoneTitle?: string
    milestoneDate?: string
    messages?: Array<{
      sender: string
      subject: string
      time: string
      unread: boolean
    }>
    professors?: Array<{
      name: string
      expertise: string
      interest: string
      availability: string
    }>
    links: string[]
  }
}

const WidgetNode: React.FC<NodeProps<WidgetData>> = ({ data, selected }) => {
  const getWidgetClass = () => {
    switch (data.widgetType) {
      case 'journey-start':
        return 'milestone-start'
      case 'journey-end':
        return 'milestone-end'
      case 'milestone-widget':
        return 'milestone-submission'
      case 'dissertation-milestone':
        return 'milestone-dissertation'
      case 'dissertation-topic':
        return 'dissertation-special'
      case 'course-widget':
        return 'course-centered'
      default:
        return ''
    }
  }

  const showCloseButton = data.widgetType === 'course-widget' || !!data.onClose;

  const renderContent = () => {
    switch (data.widgetType) {
      case 'academic-progress':
        return (
          <div className="widget-content">
            <p>{data.content.ects} {data.content.progress && `(${data.content.progress})`}</p>
          </div>
        )
      
      case 'my-classes':
        return (
          <div className="widget-content">
            <p>{data.content.nextClass}</p>
          </div>
        )
      
      case 'dissertation':
        return (
          <div className="widget-content">
            <p>Words: <span className="bold-green">{data.content.words}</span></p>
            <p>Live Plagiarism Test: <span className="bold-green">{data.content.plagiarism}</span></p>
          </div>
        )
      
      case 'inbox':
        return (
          <div className="widget-content">
            {data.content.messages && data.content.messages.slice(0, 2).map((msg, idx) => (
              <div key={idx} style={{ marginBottom: '8px', fontSize: '9px' }}>
                <div style={{ fontWeight: 600 }}>{msg.sender}</div>
                <div style={{ color: 'var(--muted-text)' }}>{msg.subject}</div>
                <div style={{ color: 'var(--muted-text)', fontSize: '8px' }}>{msg.time}</div>
              </div>
            ))}
          </div>
        )
      
      case 'research-data':
        return (
          <div className="widget-content">
            <p>Datasets: <span className="bold-green">{data.content.datasets}</span></p>
            <p>Analysis: {data.content.analysis}</p>
          </div>
        )
      
      case 'calendar':
        return <CalendarWidget />
      
      case 'writing-tools':
        return (
          <div className="widget-content">
            <p>{data.content.status}</p>
            <p className="bold-green">{data.content.wordcount}</p>
          </div>
        )
      
      case 'publications':
        return (
          <div className="widget-content">
            <p>Published: <span className="bold-green">{data.content.published}</span></p>
            <p>In Review: {data.content.inReview}</p>
          </div>
        )
      
      case 'research-papers':
        const paperStatuses = ['Published', 'In Review', 'In Review', 'Submitted', 'Draft (5,600 words)'];
        const statusClasses = ['published', 'in-review', 'in-review', 'submitted', 'in-progress'];
        const paperAbstracts = [
          'This paper explores federated learning frameworks in healthcare environments, addressing privacy concerns and regulatory...',
          'We present a comprehensive framework for building environmentally sustainable cloud infrastructure that meets ESG...',
          'A novel approach to decentralized identity management using blockchain technology and zero-knowledge proofs, enabling...',
          'This research investigates sustainable computing architectures that optimize energy consumption through intelligent workload...',
          'We develop privacy-preserving analytics techniques using homomorphic encryption and differential privacy to enable...'
        ];

        return (
          <div className="widget-content">
            <div className="paper-list">
              {data.content.papers.map((paper: string, index: number) => (
                <div key={index} className="paper-item">
                  <div className="paper-title">{paper}</div>
                  <div className="paper-abstract">{paperAbstracts[index]}</div>
                  <span className={`nav-link ${statusClasses[index]}`}>{paperStatuses[index]}</span>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'new-research':
        return (
          <div className="widget-content">
            <div className="paper-list">
              {data.content.articles.map((article: any, index: number) => (
                <div key={index} className="paper-item">
                  <div className="paper-title">{article.title}</div>
                  <div className="paper-abstract">{article.abstract}</div>
                  <a href="#" className="journal-link">{article.journal}</a>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'chart-widget':
        return <ChartWidget theme={data.theme || 'dark-theme'} />
      
      case 'boxplot-widget':
        return <BoxplotWidget theme={data.theme || 'dark-theme'} />
      
      case 'survey-results-widget':
        return <SurveyResultsWidget theme={data.theme || 'dark-theme'} />
      
      case 'journey-start':
        return (
          <>
            <div className="milestone-label">START</div>
            <div className="milestone-title">DBA in AI</div>
            <div className="milestone-date">September 2024</div>
          </>
        )
      
      case 'journey-end':
        return (
          <>
            <div className="milestone-label">HURRAY!</div>
            <div className="milestone-title">DBA Completed</div>
            <div className="milestone-date">June 2027</div>
          </>
        )
      
      case 'milestone-widget':
        return (
          <>
            <div className="milestone-title">{data.content.milestoneTitle}</div>
            <div className="milestone-date">{data.content.milestoneDate}</div>
          </>
        )
      
      case 'dissertation-milestone':
        return (
          <>
            <div className="milestone-title">{data.content.milestoneTitle}</div>
            <div className="milestone-date">{data.content.milestoneDate}</div>
          </>
        )
      
      case 'course-widget':
        return (
          <div className="widget-content">
            <p className="bold-green">{data.content.credits}</p>
            <p>{data.content.description}</p>
            <div style={{ marginTop: '8px' }}>
              <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Details</a>
              <a href="#" className="nav-link" onClick={(e) => e.preventDefault()} style={{ marginLeft: '8px' }}>Sign up</a>
            </div>
          </div>
        )
      
      case 'potential-supervisors':
        return (
          <div className="widget-content">
            {data.content.professors && data.content.professors.map((prof, idx) => (
              <div key={idx} style={{ 
                marginBottom: '8px', 
                padding: '6px 8px', 
                border: '1px solid var(--success-color)', 
                borderRadius: '4px',
                backgroundColor: 'rgba(34, 197, 94, 0.08)'
              }}>
                <div style={{ fontWeight: 600, fontSize: '11px', color: 'var(--success-color)' }}>
                  {prof.name}
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'dissertation-topic':
        return (
          <>
            <div className="milestone-title" style={{ fontSize: '14px', marginBottom: '8px', textAlign: 'center', color: 'var(--text-color)', fontWeight: '600' }}>
              {data.content.topic}
            </div>
            <div className="milestone-date" style={{ textAlign: 'center', fontSize: '11px' }}>
              My Dissertation
            </div>
          </>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`widget-node ${getWidgetClass()}`}>
      <NodeResizer 
        isVisible={selected}
        minWidth={200}
        minHeight={150}
        color="transparent"
        handleStyle={{ backgroundColor: 'transparent', border: 'none' }}
        lineStyle={{ border: 'none', outline: 'none' }}
      />
      
      {/* Close Button */}
      {showCloseButton && (
        <button className="container-close-button" onClick={() => data.onClose && data.onClose()}>
          <img src="/swissi-close-x.svg" alt="Close" />
        </button>
      )}
      
      {/* Connection handles - standard React Flow styling */}
      <Handle 
        type="target" 
        position={Position.Top}
        id="top-target"
        style={{ 
          width: 'var(--handle-size)',
          height: 'var(--handle-size)',
          backgroundColor: 'var(--handle-color)',
          border: '2px solid var(--background-color)',
          opacity: 0.6
        }} 
      />
      <Handle 
        type="target" 
        position={Position.Left}
        id="left-target"
        style={{ 
          width: 'var(--handle-size)',
          height: 'var(--handle-size)',
          backgroundColor: 'var(--handle-color)',
          border: '2px solid var(--background-color)',
          opacity: 0.6
        }} 
      />
      <Handle 
        type="target" 
        position={Position.Right}
        id="right-target"
        style={{ 
          width: 'var(--handle-size)',
          height: 'var(--handle-size)',
          backgroundColor: 'var(--handle-color)',
          border: '2px solid var(--background-color)',
          opacity: 0.6
        }} 
      />
      
      <h3 className="widget-title">
        {data.title}
        {data.badge && (
          <span style={{ 
            backgroundColor: data.badge === '3' ? 'red' : 'green', 
            color: 'white', 
            borderRadius: '50%', 
            padding: '2px 8px', 
            fontSize: '12px', 
            marginLeft: '8px' 
          }}>
            {data.badge}
          </span>
        )}
      </h3>
      
      {renderContent()}
      
      {data.content.links && (
        <div className="widget-links">
          {data.content.links.map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                if (link === 'Open Dissertation') {
                  window.open('http://localhost:3001', '_blank');
                }
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      <Handle 
        type="source" 
        position={Position.Bottom}
        id="bottom-source"
        style={{ 
          width: 'var(--handle-size)',
          height: 'var(--handle-size)',
          backgroundColor: 'var(--handle-color)',
          border: '2px solid var(--background-color)',
          opacity: 0.6
        }} 
      />
      <Handle 
        type="source" 
        position={Position.Left}
        id="left-source"
        style={{ 
          width: 'var(--handle-size)',
          height: 'var(--handle-size)',
          backgroundColor: 'var(--handle-color)',
          border: '2px solid var(--background-color)',
          opacity: 0.6
        }} 
      />
      <Handle 
        type="source" 
        position={Position.Right}
        id="right-source"
        style={{ 
          width: 'var(--handle-size)',
          height: 'var(--handle-size)',
          backgroundColor: 'var(--handle-color)',
          border: '2px solid var(--background-color)',
          opacity: 0.6
        }} 
      />
    </div>
  )
}

export default WidgetNode