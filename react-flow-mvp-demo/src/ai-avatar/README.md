# AI Avatar System 🤖

A delightful pixel art robot that follows your mouse cursor around the React Flow viewport with biological, dog-like behavior!

## Features

### 🐕 Biological Movement
- **Delayed reaction**: Robot takes time to notice when you move the mouse (like a dog noticing its owner)
- **Acceleration curves**: Speeds up with excitement when following, slows down naturally
- **Non-linear following**: Uses friction and momentum for natural movement
- **Distance awareness**: Stops following when close, gets excited when far away

### 🚧 Smart Obstacle Avoidance
- **Collision detection**: Detects React Flow widget containers as obstacles
- **Pathfinding**: Finds alternative routes around widgets
- **Dynamic avoidance**: Chooses perpendicular paths when direct route is blocked

### 🎯 Interactive Behaviors
- **Container hover detection**: Waits at container edges when you hover over widgets
- **Kick animation**: Kicks containers when reaching the edge of a hovered widget
- **Visual feedback**: Containers shake when kicked, robot has different animation states

### 🎨 Pixel Art Animations
- **Idle**: Gentle bobbing animation when stationary
- **Walking**: Bouncy walk cycle with squash and stretch
- **Turning**: Quick rotation when changing direction
- **Kicking**: Powerful kick animation with recoil
- **Waiting**: Excited wiggling when waiting at container edges

## Usage

```tsx
import { RobotController } from '@agnostyca/core'

// Add to your React Flow component
function MyFlowComponent() {
  return (
    <ReactFlow nodes={nodes} edges={edges}>
      {/* Your flow content */}
      <RobotController />
    </ReactFlow>
  )
}
```

## Component Architecture

### `PixelRobot.tsx`
The main robot component with:
- Position and movement calculation
- Animation state management
- Collision detection logic
- Biological behavior simulation

### `RobotController.tsx`
Integrates robot with React Flow:
- Mouse position tracking in viewport coordinates
- Obstacle detection from React Flow nodes
- Container hover event handling
- Kick effect coordination

### `PixelRobot.css`
Pixel art styling and animations:
- CSS sprite-based robot graphics
- Keyframe animations for all states
- Direction-based transformations
- Visual effects for interactions

## Customization

### Robot Appearance
Modify the SVG sprite in `PixelRobot.css` to change robot appearance:
```css
.pixel-robot {
  background-image: url("data:image/svg+xml,YOUR_SVG_HERE");
}
```

### Movement Parameters
Adjust biological behavior in `PixelRobot.tsx`:
```tsx
const MAX_SPEED = 3          // Top speed
const ACCELERATION = 0.2     // How quickly it speeds up
const FRICTION = 0.85        // Natural slowdown factor
const FOLLOW_DISTANCE = 50   // Distance before it stops following
const REACTION_DELAY = 200   // Time before noticing mouse movement
const KICK_DISTANCE = 30     // Distance for kick trigger
```

### Animation Timing
Modify CSS animation durations:
```css
@keyframes robotWalk {
  /* Adjust timing for walk cycle */
}
```

## Events

The robot system dispatches custom events:

```tsx
// Listen for kick events
window.addEventListener('robotKick', (event) => {
  console.log('Robot kicked container!', event.detail)
})
```

## Integration Notes

- **Viewport Coordinates**: Robot position is calculated in React Flow viewport space
- **Z-Index**: Robot renders above all widgets (z-index: 1000)
- **Performance**: Uses requestAnimationFrame for smooth 60fps animation
- **Responsive**: Adapts to viewport zoom and pan transformations

## Future Enhancements

- [ ] Multiple robot personalities (lazy, energetic, curious)
- [ ] Sound effects for animations
- [ ] Particle effects for kicks
- [ ] Robot speech bubbles with AI-generated comments
- [ ] Seasonal themes (holiday costumes)
- [ ] Robot mood based on user activity
- [ ] Multiplayer robots (one per user in collaborative mode)

## Browser Compatibility

- Modern browsers with CSS animations support
- Hardware acceleration recommended for smooth movement
- Works best with Chrome/Safari for optimal performance