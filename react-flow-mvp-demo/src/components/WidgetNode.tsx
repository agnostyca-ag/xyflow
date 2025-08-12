import React from 'react'
import { NodeProps, Handle, Position, NodeResizer } from '@xyflow/react'
import ChartWidget from './ChartWidget'
import BoxplotWidget from './BoxplotWidget'
import SurveyResultsWidget from './SurveyResultsWidget'

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
    messages?: Array<{
      sender: string
      subject: string
      time: string
      unread: boolean
    }>
    links: string[]
  }
}

const WidgetNode: React.FC<NodeProps<WidgetData>> = ({ data, selected }) => {
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
        return (
          <div className="widget-content">
            <p>{data.content.upcoming}</p>
            <p>{data.content.events}</p>
          </div>
        )
      
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
        return (
          <div className="widget-content">
            <p>{data.content.recent}</p>
            <p>Trending: <span className="bold-green">{data.content.trending}</span></p>
          </div>
        )
      
      case 'new-research':
        return (
          <div className="widget-content">
            <p>Latest: {data.content.latest}</p>
            <p>{data.content.field}</p>
          </div>
        )
      
      case 'chart-widget':
        return <ChartWidget theme={data.theme || 'dark-theme'} />
      
      case 'boxplot-widget':
        return <BoxplotWidget theme={data.theme || 'dark-theme'} />
      
      case 'survey-results-widget':
        return <SurveyResultsWidget theme={data.theme || 'dark-theme'} />
      
      default:
        return null
    }
  }

  return (
    <div className="widget-node">
      <NodeResizer 
        isVisible={selected}
        minWidth={200}
        minHeight={150}
        color="transparent"
        handleStyle={{ backgroundColor: 'transparent', border: 'none' }}
        lineStyle={{ border: 'none', outline: 'none' }}
      />
      
      {/* Close Button */}
      {data.onClose && (
        <button className="container-close-button" onClick={data.onClose}>
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
      
      <div className="widget-links">
        {data.content.links.map((link, idx) => (
          <a key={idx} href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
            {link}
          </a>
        ))}
      </div>

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