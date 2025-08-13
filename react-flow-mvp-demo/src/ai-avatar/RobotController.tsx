import React, { useState, useEffect, useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'
import { PixelRobot } from './PixelRobot'

interface Position {
  x: number
  y: number
}

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
}

export const RobotController: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [hoveredContainer, setHoveredContainer] = useState<Obstacle | null>(null)
  const reactFlowInstance = useReactFlow()

  // Track mouse movement in viewport coordinates
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const viewport = reactFlowInstance.getViewport()
    const bounds = event.currentTarget?.getBoundingClientRect()
    
    if (!bounds) return

    // Convert screen coordinates to React Flow viewport coordinates
    const x = (event.clientX - bounds.left - viewport.x) / viewport.zoom
    const y = (event.clientY - bounds.top - viewport.y) / viewport.zoom
    
    setMousePosition({ x, y })
  }, [reactFlowInstance])

  // Update obstacles from React Flow nodes
  const updateObstacles = useCallback(() => {
    const nodes = reactFlowInstance.getNodes()
    const newObstacles: Obstacle[] = nodes.map(node => ({
      x: node.position.x,
      y: node.position.y,
      width: node.width || 200,
      height: node.height || 150
    }))
    setObstacles(newObstacles)
  }, [reactFlowInstance])

  // Debug logging for hover detection
  useEffect(() => {
    if (hoveredContainer) {
      console.log('Container hovered:', hoveredContainer)
    } else {
      console.log('No container hovered')
    }
  }, [hoveredContainer])

  // Kick animation effect
  const handleRobotKick = useCallback(() => {
    if (hoveredContainer) {
      // Create kick particles effect
      const kickEvent = new CustomEvent('robotKick', {
        detail: { 
          container: hoveredContainer,
          timestamp: Date.now()
        }
      })
      window.dispatchEvent(kickEvent)
      
      // Shake the container (visual feedback)
      const containers = document.querySelectorAll(`[data-id]`)
      containers.forEach(container => {
        const containerElement = container as HTMLElement
        containerElement.style.animation = 'containerShake 0.3s ease-in-out'
        setTimeout(() => {
          containerElement.style.animation = ''
        }, 300)
      })
    }
  }, [hoveredContainer])

  // Set up event listeners with better node detection
  useEffect(() => {
    const reactFlowWrapper = document.querySelector('.react-flow')
    
    if (reactFlowWrapper) {
      // Mouse movement tracking
      reactFlowWrapper.addEventListener('mousemove', handleMouseMove as EventListener)
      
      // Simplified hover detection using mouseover/mouseout on the entire wrapper
      const handleMouseOver = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        const nodeElement = target.closest('[data-id]') as HTMLElement
        
        if (nodeElement) {
          const nodeId = nodeElement.getAttribute('data-id')
          const node = reactFlowInstance.getNode(nodeId!)
          
          if (node) {
            setHoveredContainer({
              x: node.position.x,
              y: node.position.y,
              width: node.width || 200,
              height: node.height || 150
            })
          }
        }
      }
      
      const handleMouseOut = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        const nodeElement = target.closest('[data-id]')
        
        if (nodeElement && !nodeElement.contains(event.relatedTarget as Node)) {
          setHoveredContainer(null)
        }
      }
      
      reactFlowWrapper.addEventListener('mouseover', handleMouseOver as EventListener)
      reactFlowWrapper.addEventListener('mouseout', handleMouseOut as EventListener)
      
      return () => {
        reactFlowWrapper.removeEventListener('mousemove', handleMouseMove as EventListener)
        reactFlowWrapper.removeEventListener('mouseover', handleMouseOver as EventListener)
        reactFlowWrapper.removeEventListener('mouseout', handleMouseOut as EventListener)
      }
    }
  }, [reactFlowInstance])

  // Update obstacles when nodes change
  useEffect(() => {
    updateObstacles()
    
    // Listen for node changes
    const handleNodesChange = () => {
      setTimeout(updateObstacles, 100) // Small delay to ensure positions are updated
    }
    
    window.addEventListener('reactflow:nodes-change', handleNodesChange)
    return () => window.removeEventListener('reactflow:nodes-change', handleNodesChange)
  }, [updateObstacles])

  return (
    <div 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      <PixelRobot
        targetPosition={mousePosition}
        obstacles={obstacles}
        hoveredContainer={hoveredContainer}
        onKick={handleRobotKick}
      />
      
      <style>{`
        @keyframes containerShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(0.5deg); }
          50% { transform: translateX(2px) rotate(-0.5deg); }
          75% { transform: translateX(-1px) rotate(0.3deg); }
        }
        
        .react-flow__node {
          transition: transform 0.1s ease;
        }
        
        .react-flow__node:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}