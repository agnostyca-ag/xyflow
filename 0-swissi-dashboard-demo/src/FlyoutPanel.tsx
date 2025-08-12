import React from 'react';
import { useTheme } from './App';

interface FlyoutPanelProps {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  currentTheme: string;
  setTheme: (theme: string) => void; // Add direct theme setter
}

const FlyoutPanel: React.FC<FlyoutPanelProps> = ({ 
  isOpen, 
  onClose, 
  toggleTheme, 
  currentTheme,
  setTheme
}) => {
  const theme = useTheme();

  // Function to get the appropriate icon for each theme
  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case 'dark-theme':
        return '/assets/swissi-moon.svg';
      case 'light-theme':
        return '/assets/swissi-sun.svg';
      case 'matterhorn-theme':
        return '/assets/swissi-icon-mountain.svg';
      default:
        return '/assets/swissi-moon.svg';
    }
  };

  const getThemeTitle = (themeName: string) => {
    switch (themeName) {
      case 'dark-theme':
        return 'Dark Theme';
      case 'light-theme':
        return 'Light Theme';
      case 'matterhorn-theme':
        return 'Matterhorn Theme';
      default:
        return 'Dark Theme';
    }
  };

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div 
          className="flyout-overlay"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            zIndex: 998
          }}
        />
      )}
      
      {/* Flyout Panel */}
      <div 
        className={`flyout-panel ${isOpen ? 'flyout-panel-open' : 'flyout-panel-closed'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : '-300px',
          width: '300px',
          height: '100vh',
          backgroundColor: `${theme.colors.widgetBackground}90`, // 90% opacity
          backdropFilter: 'blur(10px)',
          zIndex: 999,
          transition: 'left 0.3s ease-in-out',
          borderRight: `1px solid ${theme.colors.text}20`,
          padding: '20px',
          boxSizing: 'border-box'
        }}
      >
        {/* Panel Header with Close Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '20px'
        }}>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: theme.colors.text,
              cursor: 'pointer',
              fontSize: '20px',
              padding: '5px'
            }}
          >
            ×
          </button>
        </div>

        {/* Panel Content */}
        <div className="flyout-content">
          
          {/* Profile Section */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '15px',
              border: `2px solid ${theme.colors.text}20`,
              backgroundColor: `${theme.colors.text}10`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/assets/Swissi-Michel-Malara-Profile.jpg"
                alt="Michel Malara"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
                onError={(e) => {
                  console.log('Image failed to load:', e);
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div style="
                      width: 60px; 
                      height: 60px; 
                      background: #22c55e; 
                      border-radius: 50%; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      color: white; 
                      font-size: 24px; 
                      font-weight: bold;
                    ">MM</div>
                  `;
                }}
                onLoad={() => console.log('Image loaded successfully')}
              />
            </div>
            <h3 style={{ 
              color: theme.colors.text, 
              margin: '0 0 5px 0', 
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Michel Malara
            </h3>
            <p style={{ 
              color: `${theme.colors.text}70`, 
              margin: 0, 
              fontSize: '14px'
            }}>
              Dr., MBA
            </p>
          </div>

          {/* Action Icons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '30px' }}>
            {/* Settings Gear */}
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
              title="Dashboard Settings"
            >
              <img
                src="/assets/swissi-gear.svg"
                alt="Settings"
                style={{ width: '15px', height: '15px' }}
              />
            </button>

            {/* Light Theme (Sun) */}
            <button
              onClick={() => setTheme('light-theme')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
              title="Light Theme"
            >
              <img
                src="/assets/swissi-sun.svg"
                alt="Light Theme"
                style={{ width: '15px', height: '15px' }}
              />
            </button>

            {/* Dark Theme (Moon) */}
            <button
              onClick={() => setTheme('dark-theme')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
              title="Dark Theme"
            >
              <img
                src="/assets/swissi-moon.svg"
                alt="Dark Theme"
                style={{ width: '15px', height: '15px' }}
              />
            </button>

            {/* Matterhorn Theme (Mountain) */}
            <button
              onClick={() => setTheme('matterhorn-theme')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
              title="Matterhorn Theme"
            >
              <img
                src="/assets/swissi-icon-mountain.svg"
                alt="Matterhorn Theme"
                style={{ width: '15px', height: '15px' }}
              />
            </button>
          </div>

          {/* Connected to Swissi Link */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <a href="#" className="add-workspace-link" style={{ width: '130px', justifyContent: 'center' }}>
              Connected to Swissi
            </a>

            <a href="#" className="nav-link" style={{ width: '130px', justifyContent: 'center' }}>
              Disconnect from Swissi
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default FlyoutPanel;
