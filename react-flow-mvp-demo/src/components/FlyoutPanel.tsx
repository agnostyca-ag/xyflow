import React from 'react';

interface FlyoutPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  setTheme: (theme: string) => void;
}

const FlyoutPanel: React.FC<FlyoutPanelProps> = ({ 
  isOpen, 
  onClose, 
  currentTheme, 
  setTheme 
}) => {

  return (
    <>
      {/* Background overlay */}
      {isOpen && (
        <div 
          className="flyout-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
            zIndex: 998,
            backdropFilter: 'blur(2px)'
          }}
          onClick={onClose}
        />
      )}
      
      {/* Flyout Panel */}
      <div
        className={`flyout-panel ${isOpen ? 'flyout-panel-open' : 'flyout-panel-closed'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : -300,
          width: '300px',
          height: '100vh',
          background: 'var(--background-color)',
          zIndex: 999,
          transition: 'left 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: 'var(--text-color)',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '0',
            zIndex: 1001
          }}
        >
          ×
        </button>

        {/* Profile Section - Exact Layout from Original */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
          marginTop: '60px'
        }}>
          {/* Profile Image */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: '15px',
            border: '2px solid rgba(201, 209, 217, 0.2)'
          }}>
            <img 
              src="/Swissi-Michel-Malara-Profile.jpg" 
              alt="Michel Profile" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
          </div>
          
          {/* Name */}
          <h3 style={{ 
            color: 'var(--text-color)', 
            margin: '0 0 5px 0', 
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Michel Malara
          </h3>
          
          {/* Title/Function */}
          <p style={{ 
            color: 'var(--muted-text)', 
            margin: '0 0 20px 0', 
            fontSize: '14px'
          }}>
            Dr., MBA
          </p>

          {/* Theme Icons - After name/title */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Dark Theme (Moon) */}
            <button
              onClick={() => setTheme('dark-theme')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                opacity: currentTheme === 'dark-theme' ? 1 : 0.5,
                transition: 'opacity 0.2s ease, transform 0.2s ease'
              }}
              title="Dark Theme"
            >
              <img
                src="/swissi-moon.svg"
                alt="Dark Theme"
                style={{ width: '18px', height: '18px' }}
              />
            </button>

            {/* Light Theme (Sun) */}
            <button
              onClick={() => setTheme('light-theme')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                opacity: currentTheme === 'light-theme' ? 1 : 0.5,
                transition: 'opacity 0.2s ease, transform 0.2s ease'
              }}
              title="Light Theme"
            >
              <img
                src="/swissi-sun.svg"
                alt="Light Theme"
                style={{ width: '18px', height: '18px' }}
              />
            </button>

            {/* Matterhorn Theme (Mountain) */}
            <button
              onClick={() => setTheme('matterhorn-theme')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                opacity: currentTheme === 'matterhorn-theme' ? 1 : 0.5,
                transition: 'opacity 0.2s ease, transform 0.2s ease'
              }}
              title="Matterhorn Theme"
            >
              <img
                src="/swissi-icon-mountain.svg"
                alt="Matterhorn Theme"
                style={{ width: '18px', height: '18px' }}
              />
            </button>
          </div>

          {/* Connected to Swissi Button */}
          <button className="connected-swissi-button">
            Connected to Swissi
          </button>
        </div>
      </div>
    </>
  );
};

export default FlyoutPanel;