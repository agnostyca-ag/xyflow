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
  EdgeTypes,
  ReactFlowProvider,
  ReactFlowInstance,
  OnInit,
  addEdge,
  Connection,
  OnConnect
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import WidgetNode from './components/WidgetNode'
import AIAgentNode from './components/AIAgentNode'
import ConfigurableEdge from './components/ConfigurableEdge'
import ContextChatOverlay from './components/ContextChatOverlay'
import FlyoutPanel from './components/FlyoutPanel'
import WorkspaceSwitcher from './components/WorkspaceSwitcher'
import ProfSwissiAI from './components/ProfSwissiAI'
import { WORKSPACES, WorkspaceId } from './constants'

// Define custom node and edge types
const nodeTypes: NodeTypes = {
  widget: WidgetNode,
  aiAgent: AIAgentNode,
}

const edgeTypes: EdgeTypes = {
  configurable: ConfigurableEdge,
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
        nodes: [...WORKSPACES[workspaceId].nodes],
        edges: []
      }
    })
    
    return initialStates
  })
  
  // Current workspace nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(workspaceStates[currentWorkspace].nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(workspaceStates[currentWorkspace].edges)
  
  const [contextChat, setContextChat] = useState<ContextChat>({ isOpen: false })
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

  // Update widget nodes with current theme and close function
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          theme: theme,
          onClose: () => setNodes((nodes) => nodes.filter((n) => n.id !== node.id))
        }
      }))
    )
  }, [theme, setNodes])

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

  const closeContextChat = useCallback(() => {
    setContextChat({ isOpen: false })
  }, [])

  // Handle new connections between widgets
  const onConnect: OnConnect = useCallback((params: Connection) => {
    const newEdge = { ...params, type: 'configurable' }
    setEdges((eds) => addEdge(newEdge, eds))
  }, [setEdges])

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
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
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
        
        {/* Prof Swissi AI - Complete component from MVP */}
        <ProfSwissiAI 
          activeWorkspace={currentWorkspace}
          theme={theme}
        />
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