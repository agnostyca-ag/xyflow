export { PixelRobot } from './PixelRobot'
export { RobotController } from './RobotController'

// Export types for external use
export interface RobotPosition {
  x: number
  y: number
}

export interface RobotObstacle {
  x: number
  y: number
  width: number
  height: number
}

export type RobotState = 'idle' | 'walking' | 'turning' | 'kicking' | 'waiting'
export type RobotDirection = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'