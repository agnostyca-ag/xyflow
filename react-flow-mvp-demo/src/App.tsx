import { useState, useCallback, useRef, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  NodeTypes,
  OnNodeDrag,
  ReactFlowProvider,
  ReactFlowInstance,
  OnInit,
  NodeResizer
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import WidgetNode from './components/WidgetNode'
import AIAgentNode from './components/AIAgentNode'
import ContextChatOverlay from './components/ContextChatOverlay'
import FlyoutPanel from './components/FlyoutPanel'
import WorkspaceSwitcher from './components/WorkspaceSwitcher'
import { WORKSPACES, AI_AGENT_NODE, WorkspaceId } from './constants'

// Define custom node types
const nodeTypes: NodeTypes = {
  widget: WidgetNode,
  aiAgent: AIAgentNode,
}

const initialEdges: Edge[] = []

interface ContextChat {
  isOpen: boolean;
  targetWidget?: Node;
  position?: { x: number; y: number };
}

function App() {
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceId>('research')
  const [workspaceStates, setWorkspaceStates] = useState(() => {
    // Initialize each workspace with its default nodes + AI agent
    const initialStates: Record<WorkspaceId, { nodes: Node[], edges: Edge[] }> = {} as any
    
    Object.keys(WORKSPACES).forEach((wsId) => {
      const workspaceId = wsId as WorkspaceId
      initialStates[workspaceId] = {
        nodes: [...WORKSPACES[workspaceId].nodes, AI_AGENT_NODE],
        edges: []
      }
    })
    
    return initialStates
  })
  
  // Current workspace nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(workspaceStates[currentWorkspace].nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(workspaceStates[currentWorkspace].edges)
  
  const [contextChat, setContextChat] = useState<ContextChat>({ isOpen: false })
  const [isDragging, setIsDragging] = useState(false)
  const [theme, setTheme] = useState('dark-theme')
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null)

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  // Save current workspace state when nodes/edges change
  useEffect(() => {
    setWorkspaceStates(prev => ({
      ...prev,
      [currentWorkspace]: {
        nodes,
        edges
      }
    }))
  }, [nodes, edges, currentWorkspace])

  // Handle workspace switching
  const handleWorkspaceChange = useCallback((newWorkspaceId: WorkspaceId) => {
    if (newWorkspaceId === currentWorkspace) return
    
    // Close any open context chats
    setContextChat({ isOpen: false })
    
    // Switch to new workspace
    setCurrentWorkspace(newWorkspaceId)
    const newWorkspaceState = workspaceStates[newWorkspaceId]
    setNodes(newWorkspaceState.nodes)
    setEdges(newWorkspaceState.edges)
  }, [currentWorkspace, workspaceStates, setNodes, setEdges])

  const getBackgroundColor = () => {
    switch (theme) {
      case 'light-theme':
        return '#ffffff'
      case 'matterhorn-theme':
        return 'transparent'
      case 'dark-theme':
      default:
        return '#0e1116'
    }
  }

  const getGridColor = () => {
    switch (theme) {
      case 'light-theme':
        return '#d1d5da'
      case 'matterhorn-theme':
        return '#30363d'
      case 'dark-theme':
      default:
        return '#30363d'
    }
  }

  const onInit: OnInit = useCallback((rfi) => {
    reactFlowInstance.current = rfi
  }, [])

  // Detect when AI agent is being dragged
  const onNodeDragStart = useCallback((event: any, node: Node) => {
    if (node.type === 'aiAgent') {
      setIsDragging(true)
      // Add visual feedback to all widget nodes
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          className: n.type === 'widget' ? 'context-target' : undefined
        }))
      )
    }
  }, [setNodes])

  // Handle AI agent drag - check for overlaps
  const onNodeDrag: OnNodeDrag = useCallback((event, node) => {
    if (node.type === 'aiAgent' && isDragging) {
      // Find overlapping widget nodes
      const overlappingWidget = nodes.find((n) => {
        if (n.type !== 'widget') return false
        
        const distance = Math.sqrt(
          Math.pow(node.position.x - n.position.x, 2) + 
          Math.pow(node.position.y - n.position.y, 2)
        )
        
        return distance < 150 // Overlap threshold
      })

      // Update visual feedback
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          className: 
            n.type === 'widget' && overlappingWidget?.id === n.id 
              ? 'context-glow' 
              : n.type === 'widget' 
                ? 'context-target' 
                : undefined
        }))
      )
    }
  }, [nodes, setNodes, isDragging])

  // Handle AI agent drop - open contextual chat
  const onNodeDragStop = useCallback((event: any, node: Node) => {
    if (node.type === 'aiAgent') {
      setIsDragging(false)
      
      // Find the widget we dropped on
      const overlappingWidget = nodes.find((n) => {
        if (n.type !== 'widget') return false
        
        const distance = Math.sqrt(
          Math.pow(node.position.x - n.position.x, 2) + 
          Math.pow(node.position.y - n.position.y, 2)
        )
        
        return distance < 150
      })

      // Clear all visual feedback
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          className: undefined
        }))
      )

      // Open contextual chat if we found a target
      if (overlappingWidget) {
        console.log(`AI dropped on widget: ${overlappingWidget.data.title}`)
        setContextChat({
          isOpen: true,
          targetWidget: overlappingWidget,
          position: { x: event.clientX, y: event.clientY }
        })
      }
    }
  }, [nodes, setNodes])

  const closeContextChat = useCallback(() => {
    setContextChat({ isOpen: false })
  }, [])

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {/* Hamburger Menu - Fixed to left edge */}
      <button 
        className={`hamburger-menu-fixed ${isFlyoutOpen ? 'hidden' : ''}`}
        onClick={() => setIsFlyoutOpen(true)}
        style={{
          position: 'fixed',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 1001,
          background: 'transparent',
          border: '1px solid var(--accent-color)',
          borderLeft: 'none',
          borderRadius: '0 12px 12px 0',
          padding: '12px 8px',
          cursor: 'pointer',
          color: 'var(--text-color)',
          fontSize: '16px',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        ☰
      </button>

      {/* Flyout Panel */}
      <FlyoutPanel 
        isOpen={isFlyoutOpen}
        onClose={() => setIsFlyoutOpen(false)}
        currentTheme={theme}
        setTheme={setTheme}
      />

      <header className="dashboard-header">
        <div className="header-left">
          <img src="/Swiss-AI-Institute.svg" alt="Swissi Logo" className="header-logo" />
          <h1 className="header-title">Swissi University</h1>
          <WorkspaceSwitcher 
            activeWorkspace={currentWorkspace}
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>
      </header>
      
      <ReactFlowProvider>
        <div className="flow-container">
          <ReactFlow
            nodes={nodes.filter(node => node.type !== 'aiAgent')}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={onInit}
            onNodeDragStart={onNodeDragStart}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.1 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background 
              color={getGridColor()}
              variant="dots"
              gap={20}
              size={1}
              style={{ backgroundColor: getBackgroundColor() }}
            />
            <Controls />
          </ReactFlow>
        </div>
        
        {/* Fixed Prof Swissi AI Agent */}
        <div
          className="fixed-ai-agent"
          style={{
            position: 'absolute',
            top: '80px',
            right: '50px',
            zIndex: 100,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          draggable={true}
          onDragStart={(e) => {
            setIsDragging(true)
            // Add visual feedback to all widget nodes
            setNodes((nds) =>
              nds.map((n) => ({
                ...n,
                className: n.type === 'widget' ? 'context-target' : undefined
              }))
            )
          }}
          onDragEnd={(e) => {
            setIsDragging(false)
            
            // Check if dropped on any widget
            const elements = document.elementsFromPoint(e.clientX, e.clientY)
            const widgetElement = elements.find(el => el.closest('.widget-node'))
            
            if (widgetElement) {
              const widgetNode = widgetElement.closest('[data-id]')
              const widgetId = widgetNode?.getAttribute('data-id')
              const targetWidget = nodes.find(n => n.id === widgetId)
              
              if (targetWidget) {
                console.log(`AI dropped on widget: ${targetWidget.data.title}`)
                setContextChat({
                  isOpen: true,
                  targetWidget: targetWidget,
                  position: { x: e.clientX, y: e.clientY }
                })
              }
            }

            // Clear all visual feedback
            setNodes((nds) =>
              nds.map((n) => ({
                ...n,
                className: undefined
              }))
            )
          }}
        >
          <div className={`ai-agent-node ${isDragging ? 'dragging' : ''}`}>
            <img 
              src="/swissi-icon-prof-swissi.svg" 
              alt="Prof Swissi AI" 
              style={{ width: '40px', height: '40px' }}
            />
          </div>
        </div>
      </ReactFlowProvider>

      {contextChat.isOpen && contextChat.targetWidget && (
        <ContextChatOverlay
          targetWidget={contextChat.targetWidget}
          onClose={closeContextChat}
        />
      )}
    </div>
  )
}

export default App