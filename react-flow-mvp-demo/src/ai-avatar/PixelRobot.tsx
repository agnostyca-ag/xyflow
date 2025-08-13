import React, { useState, useEffect, useRef } from 'react'
import './PixelRobot.css'

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

interface PixelRobotProps {
  targetPosition: Position
  obstacles: Obstacle[]
  hoveredContainer?: Obstacle | null
  onKick?: () => void
}

type RobotState = 'idle' | 'walking' | 'turning' | 'kicking' | 'waiting'
type Direction = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'

export const PixelRobot: React.FC<PixelRobotProps> = ({
  targetPosition,
  obstacles,
  hoveredContainer,
  onKick
}) => {
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 })
  const [state, setState] = useState<RobotState>('idle')
  const [direction, setDirection] = useState<Direction>('right')
  const [velocity, setVelocity] = useState<Position>({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const lastTargetRef = useRef<Position>(targetPosition)

  // Biological movement constants
  const MAX_SPEED = 3
  const ACCELERATION = 0.2
  const FRICTION = 0.85
  const FOLLOW_DISTANCE = 50
  const REACTION_DELAY = 200
  const KICK_DISTANCE = 30

  // Robot sprite states for pixel art
  const getRobotSprite = () => {
    const baseClass = 'pixel-robot'
    const stateClass = `robot-${state}`
    const directionClass = `facing-${direction}`
    return `${baseClass} ${stateClass} ${directionClass}`
  }

  // Calculate distance between two points
  const distance = (p1: Position, p2: Position): number => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }

  // Get direction from current position to target
  const getDirectionToTarget = (current: Position, target: Position): Direction => {
    const dx = target.x - current.x
    const dy = target.y - current.y
    const angle = Math.atan2(dy, dx)
    const degrees = (angle * 180) / Math.PI

    if (degrees >= -22.5 && degrees < 22.5) return 'right'
    if (degrees >= 22.5 && degrees < 67.5) return 'down-right'
    if (degrees >= 67.5 && degrees < 112.5) return 'down'
    if (degrees >= 112.5 && degrees < 157.5) return 'down-left'
    if (degrees >= 157.5 || degrees < -157.5) return 'left'
    if (degrees >= -157.5 && degrees < -112.5) return 'up-left'
    if (degrees >= -112.5 && degrees < -67.5) return 'up'
    return 'up-right'
  }

  // Check if position collides with any obstacle
  const isColliding = (pos: Position, obstacleList: Obstacle[]): boolean => {
    return obstacleList.some((obstacle: Obstacle) => 
      pos.x >= obstacle.x - 10 &&
      pos.x <= obstacle.x + obstacle.width + 10 &&
      pos.y >= obstacle.y - 10 &&
      pos.y <= obstacle.y + obstacle.height + 10
    )
  }

  // Simple pathfinding around obstacles
  const getAvoidanceVector = (pos: Position, target: Position, obstacleList: Obstacle[]): Position => {
    const directVector = { x: target.x - pos.x, y: target.y - pos.y }
    const directDistance = Math.sqrt(directVector.x ** 2 + directVector.y ** 2)
    
    if (directDistance === 0) return { x: 0, y: 0 }
    
    // Normalize direct vector
    const normalizedDirect = {
      x: directVector.x / directDistance,
      y: directVector.y / directDistance
    }

    // Check for obstacles in path
    const testPos = { x: pos.x + normalizedDirect.x * 30, y: pos.y + normalizedDirect.y * 30 }
    
    if (!isColliding(testPos, obstacleList)) {
      return normalizedDirect
    }

    // Try perpendicular directions to avoid obstacle
    const perpendicular1 = { x: -normalizedDirect.y, y: normalizedDirect.x }
    const perpendicular2 = { x: normalizedDirect.y, y: -normalizedDirect.x }
    
    const testPos1 = { x: pos.x + perpendicular1.x * 40, y: pos.y + perpendicular1.y * 40 }
    const testPos2 = { x: pos.x + perpendicular2.x * 40, y: pos.y + perpendicular2.y * 40 }
    
    if (!isColliding(testPos1, obstacleList)) {
      return { x: perpendicular1.x * 0.7 + normalizedDirect.x * 0.3, y: perpendicular1.y * 0.7 + normalizedDirect.y * 0.3 }
    }
    if (!isColliding(testPos2, obstacleList)) {
      return { x: perpendicular2.x * 0.7 + normalizedDirect.x * 0.3, y: perpendicular2.y * 0.7 + normalizedDirect.y * 0.3 }
    }
    
    // If all else fails, move perpendicular
    return perpendicular1
  }

  // Check if robot should wait at container edge
  const shouldWaitAtEdge = (): boolean => {
    if (!hoveredContainer) return false
    
    const containerEdge = {
      left: hoveredContainer.x,
      right: hoveredContainer.x + hoveredContainer.width,
      top: hoveredContainer.y,
      bottom: hoveredContainer.y + hoveredContainer.height
    }
    
    const robotRadius = 15
    const edgeDistance = 10
    
    // Check if robot is near any edge of the hovered container
    return (
      (Math.abs(position.x - containerEdge.left) <= robotRadius + edgeDistance && 
       position.y >= containerEdge.top - robotRadius && position.y <= containerEdge.bottom + robotRadius) ||
      (Math.abs(position.x - containerEdge.right) <= robotRadius + edgeDistance && 
       position.y >= containerEdge.top - robotRadius && position.y <= containerEdge.bottom + robotRadius) ||
      (Math.abs(position.y - containerEdge.top) <= robotRadius + edgeDistance && 
       position.x >= containerEdge.left - robotRadius && position.x <= containerEdge.right + robotRadius) ||
      (Math.abs(position.y - containerEdge.bottom) <= robotRadius + edgeDistance && 
       position.x >= containerEdge.left - robotRadius && position.x <= containerEdge.right + robotRadius)
    )
  }

  // Check if robot should kick the container
  const shouldKick = (): boolean => {
    if (!hoveredContainer) return false
    const distToContainer = distance(position, {
      x: hoveredContainer.x + hoveredContainer.width / 2,
      y: hoveredContainer.y + hoveredContainer.height / 2
    })
    return distToContainer <= KICK_DISTANCE
  }

  // Animation loop with biological behavior
  useEffect(() => {
    const animate = () => {
      setPosition((currentPos: Position) => {
        const distToTarget = distance(currentPos, targetPosition)
        
        // Check if target moved significantly (dog notices owner moved)
        const targetMoved = distance(targetPosition, lastTargetRef.current) > 20
        if (targetMoved) {
          lastTargetRef.current = targetPosition
          // Add reaction delay - dog takes time to notice
          setTimeout(() => {
            setState('walking')
          }, REACTION_DELAY)
        }

        // State management
        if (shouldKick()) {
          setState('kicking')
          setTimeout(() => {
            onKick?.()
            setState('idle')
          }, 500)
          return currentPos
        }

        if (shouldWaitAtEdge()) {
          setState('waiting')
          return currentPos
        }

        if (distToTarget < FOLLOW_DISTANCE) {
          setState('idle')
          setVelocity(vel => ({ x: vel.x * FRICTION, y: vel.y * FRICTION }))
          return { x: currentPos.x + velocity.x, y: currentPos.y + velocity.y }
        }

        setState('walking')

        // Get movement vector (with obstacle avoidance)
        const moveVector = getAvoidanceVector(currentPos, targetPosition, obstacles)
        const newDirection = getDirectionToTarget(currentPos, targetPosition)
        
        if (newDirection !== direction) {
          setState('turning')
          setDirection(newDirection)
          setTimeout(() => setState('walking'), 200)
        }

        // Biological acceleration - excited dog speeds up
        const excitement = Math.min(distToTarget / 200, 1)
        const targetSpeed = MAX_SPEED * (0.5 + excitement * 0.5)

        // Apply acceleration with biological curves
        setVelocity((vel: Position) => {
          const newVelX = vel.x + moveVector.x * ACCELERATION * (1 + excitement)
          const newVelY = vel.y + moveVector.y * ACCELERATION * (1 + excitement)
          
          // Limit speed
          const speed = Math.sqrt(newVelX ** 2 + newVelY ** 2)
          if (speed > targetSpeed) {
            const factor = targetSpeed / speed
            return { x: newVelX * factor, y: newVelY * factor }
          }
          
          return { x: newVelX, y: newVelY }
        })

        // Apply friction for natural deceleration
        setVelocity((vel: Position) => ({ x: vel.x * FRICTION, y: vel.y * FRICTION }))

        // Calculate new position
        let newPos = { x: currentPos.x + velocity.x, y: currentPos.y + velocity.y }
        
        // Collision detection with obstacles
        if (isColliding(newPos, obstacles)) {
          newPos = currentPos // Stop if collision detected
          setVelocity({ x: 0, y: 0 })
        }

        return newPos
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetPosition, obstacles, hoveredContainer, velocity, direction, onKick])

  return (
    <div
      className={getRobotSprite()}
      style={{
        position: 'absolute',
        left: position.x - 16,
        top: position.y - 16,
        zIndex: 1000,
        pointerEvents: 'none',
        transition: state === 'turning' ? 'transform 0.2s ease' : 'none'
      }}
    >
      {/* Robot Body */}
      <div 
        className="robot-body"
        style={{
          position: 'absolute',
          width: '32px',
          height: '22px',
          top: '0px',
          left: '0px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 22'%3E%3C!-- Head --%3E%3Crect fill='%23c0c0c0' x='10' y='2' width='12' height='8' rx='1'/%3E%3Crect fill='%23808080' x='11' y='3' width='10' height='1'/%3E%3C!-- Glowing eyes --%3E%3Crect fill='%2300ff41' x='12' y='4' width='2' height='2'/%3E%3Crect fill='%2300ff41' x='18' y='4' width='2' height='2'/%3E%3Crect fill='%23ffffff' x='12' y='4' width='1' height='1'/%3E%3Crect fill='%23ffffff' x='18' y='4' width='1' height='1'/%3E%3C!-- Antenna with blinking light --%3E%3Crect fill='%23ff3333' x='15' y='0' width='2' height='2' rx='1'/%3E%3Crect fill='%23606060' x='15.5' y='1.5' width='1' height='2'/%3E%3C!-- Body chassis --%3E%3Crect fill='%234169e1' x='8' y='10' width='16' height='12' rx='1'/%3E%3Crect fill='%232e4bc6' x='9' y='11' width='14' height='2'/%3E%3Crect fill='%23191970' x='10' y='13' width='12' height='1'/%3E%3C!-- Control panel --%3E%3Crect fill='%232a2a2a' x='12' y='14' width='8' height='5' rx='1'/%3E%3Crect fill='%2300ff41' x='13' y='15' width='1' height='1'/%3E%3Crect fill='%23ff3333' x='15' y='15' width='1' height='1'/%3E%3Crect fill='%23ffff00' x='17' y='15' width='1' height='1'/%3E%3Crect fill='%2300bfff' x='19' y='15' width='1' height='1'/%3E%3Crect fill='%23606060' x='13' y='17' width='6' height='1'/%3E%3C!-- Shoulder joints --%3E%3Crect fill='%23808080' x='5' y='12' width='3' height='3' rx='1'/%3E%3Crect fill='%23808080' x='24' y='12' width='3' height='3' rx='1'/%3E%3C!-- Arms --%3E%3Crect fill='%234169e1' x='3' y='13' width='5' height='7' rx='1'/%3E%3Crect fill='%234169e1' x='24' y='13' width='5' height='7' rx='1'/%3E%3Crect fill='%232e4bc6' x='4' y='14' width='3' height='1'/%3E%3Crect fill='%232e4bc6' x='25' y='14' width='3' height='1'/%3E%3C!-- Hands/Grippers --%3E%3Crect fill='%23808080' x='2' y='18' width='3' height='3' rx='1'/%3E%3Crect fill='%23808080' x='27' y='18' width='3' height='3' rx='1'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          zIndex: 2
        }}
      />
      
      {/* Robot Legs - Animated */}
      <div 
        className={`robot-legs ${state}`}
        style={{
          position: 'absolute',
          width: '32px',
          height: '10px',
          top: '22px',
          left: '0px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 10'%3E%3C!-- Frame 1: Standing --%3E%3Cg%3E%3Crect fill='%23808080' x='12' y='0' width='3' height='8'/%3E%3Crect fill='%23808080' x='17' y='0' width='3' height='8'/%3E%3Crect fill='%232a2a2a' x='11' y='8' width='5' height='2'/%3E%3Crect fill='%232a2a2a' x='16' y='8' width='5' height='2'/%3E%3C/g%3E%3C!-- Frame 2: Left leg forward --%3E%3Cg transform='translate(32,0)'%3E%3Crect fill='%23808080' x='11' y='0' width='3' height='8'/%3E%3Crect fill='%23808080' x='18' y='1' width='3' height='7'/%3E%3Crect fill='%232a2a2a' x='10' y='8' width='5' height='2'/%3E%3Crect fill='%232a2a2a' x='17' y='8' width='5' height='2'/%3E%3C/g%3E%3C!-- Frame 3: Mid stride --%3E%3Cg transform='translate(64,0)'%3E%3Crect fill='%23808080' x='12' y='1' width='3' height='7'/%3E%3Crect fill='%23808080' x='17' y='0' width='3' height='8'/%3E%3Crect fill='%232a2a2a' x='11' y='8' width='5' height='2'/%3E%3Crect fill='%232a2a2a' x='16' y='8' width='5' height='2'/%3E%3C/g%3E%3C!-- Frame 4: Right leg forward --%3E%3Cg transform='translate(96,0)'%3E%3Crect fill='%23808080' x='13' y='1' width='3' height='7'/%3E%3Crect fill='%23808080' x='16' y='0' width='3' height='8'/%3E%3Crect fill='%232a2a2a' x='12' y='8' width='5' height='2'/%3E%3Crect fill='%232a2a2a' x='15' y='8' width='5' height='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '128px 10px',
          backgroundPosition: '0 0',
          imageRendering: 'pixelated',
          zIndex: 1
        }}
      />
    </div>
  )
}