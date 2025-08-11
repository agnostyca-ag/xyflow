import React from 'react'
import { NodeProps, Handle, Position } from '@xyflow/react'

interface AIAgentData {
  label: string
  isMinimized: boolean
}

const AIAgentNode: React.FC<NodeProps<AIAgentData>> = ({ data }) => {
  return (
    <div className="ai-agent-node">
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      
      <div style={{ textAlign: 'center' }}>
        <img 
          src="/swissi-icon-prof-swissi.svg" 
          alt="Prof Swissi AI" 
          style={{ width: '55px', height: '55px' }}
        />
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  )
}

export default AIAgentNode