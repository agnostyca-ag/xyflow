import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge, useReactFlow } from '@xyflow/react';

interface EdgeData {
  color?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  animated?: boolean;
}

const ConfigurableEdge: React.FC<EdgeProps<EdgeData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data = {},
  markerEnd,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const { getViewport } = useReactFlow();
  const [edgeConfig, setEdgeConfig] = useState({
    color: data.color || 'var(--edge-color)',
    strokeWidth: data.strokeWidth || 2,
    strokeDasharray: data.strokeDasharray || 'none',
    animated: data.animated || false,
  });

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Don't close if clicking on the gear button or inside the menu
      if (menuRef.current && !menuRef.current.contains(target)) {
        // Check if we clicked on the gear icon - if so, don't close
        const gearButton = document.querySelector(`[data-edge-id="${id}"] .gear-button`);
        if (gearButton && gearButton.contains(target)) {
          return;
        }
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      // Use capture phase to ensure we catch clicks before other handlers
      document.addEventListener('mousedown', handleClickOutside, true);
      return () => document.removeEventListener('mousedown', handleClickOutside, true);
    }
  }, [isMenuOpen, id]);

  const handleColorChange = (color: string) => {
    setEdgeConfig(prev => ({ ...prev, color }));
    // Don't close menu - let user experiment with different colors
  };

  const handleStyleChange = (style: string) => {
    const strokeDasharray = style === 'dotted' ? '2,2' : style === 'dashed' ? '6,3' : 'none';
    setEdgeConfig(prev => ({ ...prev, strokeDasharray }));
    // Don't close menu - let user experiment with different styles
  };

  const handleThicknessChange = (thickness: number) => {
    setEdgeConfig(prev => ({ ...prev, strokeWidth: thickness }));
    // Don't close menu - let user experiment with different thickness
  };

  const toggleAnimation = () => {
    setEdgeConfig(prev => ({ ...prev, animated: !prev.animated }));
    // Don't close menu - let user toggle animation multiple times
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: edgeConfig.color,
          strokeWidth: edgeConfig.strokeWidth,
          strokeDasharray: edgeConfig.strokeDasharray === 'none' ? undefined : edgeConfig.strokeDasharray,
          animation: edgeConfig.animated ? 'dashdraw 1s linear infinite' : undefined,
        }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          data-edge-id={id}
        >
          {/* Configuration Icon */}
          <button
            onClick={(e) => {
              const viewport = getViewport();
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              setMenuPosition({
                x: rect.left,
                y: rect.bottom + 5
              });
              setIsMenuOpen(!isMenuOpen);
            }}
            className="gear-button"
            style={{
              width: 'var(--edge-config-icon-size)',
              height: 'var(--edge-config-icon-size)',
              borderRadius: '50%',
              border: '1px solid var(--edge-config-menu-border)',
              backgroundColor: 'var(--edge-config-menu-bg)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: 'var(--text-color)',
              opacity: 0.7,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '1'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
          >
            ⚙
          </button>

          {/* Dropdown Menu - render as portal with proper screen positioning */}
          {isMenuOpen && createPortal(
            <div
              ref={menuRef}
              style={{
                position: 'fixed',
                top: `${menuPosition.y}px`,
                left: `${menuPosition.x - 70}px`,
                backgroundColor: 'var(--edge-config-menu-bg)',
                border: '1px solid var(--edge-config-menu-border)',
                borderRadius: 'var(--radius-medium)',
                padding: '8px',
                minWidth: '140px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                zIndex: 999999,
                pointerEvents: 'all',
              }}
            >
              {/* Color Options */}
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '10px', color: 'var(--muted-text)', marginBottom: '4px', display: 'block' }}>
                  Color:
                </label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {['var(--border-color)', 'var(--accent-color)', 'var(--success-color)', '#ff6b6b', '#ffd93d'].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: edgeConfig.color === color ? '2px solid var(--text-color)' : '1px solid var(--border-color)',
                        backgroundColor: color.startsWith('var') ? color : color,
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Line Style */}
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '10px', color: 'var(--muted-text)', marginBottom: '4px', display: 'block' }}>
                  Style:
                </label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[
                    { label: '━━━', value: 'solid', dashArray: 'none' },
                    { label: '┅┅┅', value: 'dotted', dashArray: '2,2' },
                    { label: '╌ ╌ ╌', value: 'dashed', dashArray: '6,3' },
                  ].map(({ label, value, dashArray }) => (
                    <button
                      key={value}
                      onClick={() => handleStyleChange(value)}
                      style={{
                        width: '40px',
                        height: '20px',
                        padding: '0',
                        fontSize: '10px',
                        border: edgeConfig.strokeDasharray === dashArray ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                        borderRadius: '3px',
                        backgroundColor: 'transparent',
                        color: 'var(--text-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '2px',
                          backgroundColor: 'var(--text-color)',
                          borderTop: dashArray === 'none' ? '2px solid var(--text-color)' : 
                                   dashArray === '2,2' ? '2px dotted var(--text-color)' : 
                                   '2px dashed var(--text-color)',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Thickness Control */}
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '10px', color: 'var(--muted-text)', marginBottom: '4px', display: 'block' }}>
                  Thickness:
                </label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map((thickness) => (
                    <button
                      key={thickness}
                      onClick={() => handleThicknessChange(thickness)}
                      style={{
                        width: '24px',
                        height: '16px',
                        padding: '0',
                        fontSize: '9px',
                        border: edgeConfig.strokeWidth === thickness ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                        borderRadius: '3px',
                        backgroundColor: 'transparent',
                        color: 'var(--text-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: `${thickness}px`,
                          backgroundColor: 'var(--text-color)',
                          borderRadius: thickness > 2 ? '1px' : '0',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Toggle */}
              <div>
                <label style={{ fontSize: '10px', color: 'var(--muted-text)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={edgeConfig.animated}
                    onChange={toggleAnimation}
                    style={{ marginRight: '6px' }}
                  />
                  Animated
                </label>
              </div>
            </div>,
            document.body
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default ConfigurableEdge;