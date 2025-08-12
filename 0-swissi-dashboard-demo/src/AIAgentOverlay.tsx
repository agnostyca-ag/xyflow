import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { WORKSPACES } from './constants';
import TypingEffect from './TypingEffect';

interface AIAgentOverlayProps {
  activeWorkspace: keyof typeof WORKSPACES;
  theme: string;
}

const AIAgentOverlay: React.FC<AIAgentOverlayProps> = ({ activeWorkspace, theme }) => {
  const [isIconMode, setIsIconMode] = useState(true); // Start collapsed as icon
  const [isExpanding, setIsExpanding] = useState(false);
  const [chatInput, setChatInput] = useState('');
  // Position on right side below "Connected to Swissi" link
  const [iconPosition, setIconPosition] = useState(() => ({ 
    x: Math.max(50, window.innerWidth - 100), 
    y: 80 
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [contextMode, setContextMode] = useState<string | null>(null);
  const [dragOverWidget, setDragOverWidget] = useState<string | null>(null);

  const currentWorkspace = WORKSPACES[activeWorkspace];

  // Update icon position if window resizes to keep it on the right side
  useEffect(() => {
    const handleResize = () => {
      setIconPosition(prev => ({
        ...prev,
        x: Math.min(prev.x, window.innerWidth - 100) // Keep it within viewport
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smart positioning: determine if chat should open left or right based on viewport edges
  const calculateOptimalChatPosition = useCallback(() => {
    const chatWidth = 420;
    const chatHeight = 600;
    const margin = 20; // margin from viewport edges
    const iconSize = 75;
    
    // Get current viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate icon center position
    const iconCenterX = iconPosition.x + iconSize / 2;
    const iconCenterY = iconPosition.y + iconSize / 2;
    
    // Calculate available space in each direction
    const spaceRight = viewportWidth - (iconPosition.x + iconSize);
    const spaceLeft = iconPosition.x;
    const spaceBelow = viewportHeight - (iconPosition.y + iconSize);
    const spaceAbove = iconPosition.y;
    
    // Determine horizontal position (prioritize right side, then left)
    let x: number;
    if (spaceRight >= chatWidth + margin) {
      // Open to the right of icon with small gap
      x = iconPosition.x + iconSize + 10;
    } else if (spaceLeft >= chatWidth + margin) {
      // Open to the left of icon with small gap
      x = iconPosition.x - chatWidth - 10;
    } else {
      // Not enough space on either side, center horizontally
      x = Math.max(margin, Math.min(viewportWidth - chatWidth - margin, iconCenterX - chatWidth / 2));
    }
    
    // Determine vertical position (try to align with icon, then adjust)
    let y: number;
    if (spaceBelow >= chatHeight + margin) {
      // Enough space below, align top of chat with icon
      y = iconPosition.y;
    } else if (spaceAbove >= chatHeight + margin) {
      // Not enough space below, open above
      y = iconPosition.y - chatHeight + iconSize;
    } else {
      // Not enough space above or below, center vertically
      y = Math.max(margin, Math.min(viewportHeight - chatHeight - margin, iconCenterY - chatHeight / 2));
    }
    
    // Ensure chat stays within viewport bounds
    x = Math.max(margin, Math.min(x, viewportWidth - chatWidth - margin));
    y = Math.max(margin, Math.min(y, viewportHeight - chatHeight - margin));
    
    return { x, y };
  }, [iconPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle AI chat submission here
    console.log('Professor Swissi:', chatInput);
    setChatInput('');
  };

  const handleMinimize = () => {
    // Directly collapse to icon mode (skip intermediate step)
    setIsIconMode(true);
    setContextMode(null); // Reset context when minimizing
  };

  const handleHeaderDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Header double-clicked - minimizing to icon');
    handleMinimize();
  };

  const handleExpandFromIcon = () => {
    console.log('Expanding from icon');
    setIsExpanding(true);
    // Small delay to start the expand animation
    setTimeout(() => {
      setIsIconMode(false);
      setIsExpanding(false);
    }, 100);
  };

  const handleIconDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Icon double-clicked - opening chat');
    handleExpandFromIcon();
  };

  const handleDragStart = () => {
    console.log('Rnd drag started');
    setIsDragging(true);
    
    // Add mouse move listener during drag for context detection
    const handleMouseMove = (e: MouseEvent) => {
      const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
      const widget = elementBelow?.closest('.widget');
      
      // Clear all glows first
      document.querySelectorAll('.widget').forEach(w => w.classList.remove('drag-over-glow'));
      
      if (widget) {
        const widgetTitle = widget.querySelector('.widget-title')?.textContent;
        if (widgetTitle === 'My classes') {
          console.log('Hovering over My classes widget');
          setDragOverWidget('classes');
          widget.classList.add('drag-over-glow');
        } else if (widgetTitle === 'Academic Calendar') {
          console.log('Hovering over Academic Calendar widget');
          setDragOverWidget('calendar');
          widget.classList.add('drag-over-glow');
        } else {
          setDragOverWidget(null);
        }
      } else {
        setDragOverWidget(null);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Store the cleanup function
    (window as any).dragCleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('.widget').forEach(w => w.classList.remove('drag-over-glow'));
    };
  };

  const handleDragStop = (e: any, d: any) => {
    console.log('Rnd drag stopped');
    setIconPosition({ x: d.x, y: d.y });
    
    // Check if we dropped on My Classes widget
    if (dragOverWidget === 'classes') {
      console.log('Dropped on My Classes - opening context chat!');
      setContextMode('classes');
      setTimeout(() => {
        setIsIconMode(false);
        setIsExpanding(false);
      }, 100);
    } else if (dragOverWidget === 'calendar') {
      console.log('Dropped on Academic Calendar - opening calendar context chat!');
      setContextMode('calendar');
      setTimeout(() => {
        setIsIconMode(false);
        setIsExpanding(false);
      }, 100);
    }
    
    // Clean up
    if ((window as any).dragCleanup) {
      (window as any).dragCleanup();
      delete (window as any).dragCleanup;
    }
    setDragOverWidget(null);
    
    // Reset dragging state after a short delay
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  const quickActions = {
    research: ['Yes, done', 'Not yet', 'Show deadlines', 'Whats new at Swissi?'],
    career: ['Check grades', 'Review schedule', 'Plan semester', 'Track progress'],
    writing: ['Continue draft', 'Find sources', 'Review citations', 'Submit paper'],
    discovery: ['Find new papers', 'Set alerts', 'Review recommendations', 'Analyze trends'],
    classes: ['Check schedule', 'View assignments', 'Join class now', 'Contact professor'],
    calendar: ['Add new event', 'View schedule', 'Set reminder', 'Check deadlines']
  };

  const professorGreetings = {
    research: "Hello, Michel, what are we studying today? Have you turned in your mid-term paper already?",
    career: "Good to see you again, Michel! How are your courses progressing this semester? Any challenges I can help with?",
    writing: "Welcome back to the writing lab, Michel! Ready to continue working on your research paper? Let's make some progress today.",
    discovery: "Ah, Michel! Ready to discover some cutting-edge research? I've found some interesting papers that might align with your current work. What would you like to explore today?",
    classes: "Ah, Michel, you want to talk about your classes? Your next class is on Monday, 11 August 2025 at 7 pm CEST - you are registered - how can I assist you here?",
    calendar: "Hello Michel! I see you're looking at your academic calendar. You have your Thesis Defense coming up on August 5th and a Research Seminar on August 8th. How can I help you manage your schedule today?"
  };

  // If in icon mode, show just the round icon (draggable)
  if (isIconMode) {
    return (
      <Rnd
        default={{
          x: iconPosition.x,
          y: iconPosition.y,
          width: 75,
          height: 75,
        }}
        size={{ width: 75, height: 75 }}
        enableResizing={false}
        dragHandleClassName="position-drag"
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        className={`ai-professor-icon-container ${isExpanding ? 'expanding' : ''} ${theme}`}
        style={{ position: 'fixed' }}
      >
        <div className="ai-professor-icon position-drag">
          <div 
            className="click-area"
            onDoubleClick={handleIconDoubleClick}
            title="Double-click to expand Prof Swissi AI"
          >
            <img 
              src="/assets/swissi-icon-prof-swissi.svg" 
              alt="Prof Swissi AI" 
            />
          </div>
        </div>
      </Rnd>
    );
  }

  // Calculate optimal position for chat window
  const chatPosition = calculateOptimalChatPosition();

  return (
    <Rnd
      default={{
        x: chatPosition.x,
        y: chatPosition.y,
        width: 420,
        height: 550,
      }}
      minWidth={350}
      maxWidth={600}
      minHeight={450}
      maxHeight={800}
      enableResizing={true}
      className={`ai-agent-overlay ${theme}`}
    >
      <div className="container-header">
        <div 
          className="ai-professor-header"
          onDoubleClick={handleHeaderDoubleClick}
          title="Double-click to minimize to icon"
        >
          <img 
            src="/assets/swissi-icon-prof-swissi.svg" 
            alt="Prof Swissi AI" 
            className="ai-professor-header-icon"
          />
          <span className="ai-professor-title">Prof Swissi AI</span>
        </div>
        <button 
          className="minimize-btn" 
          onClick={(e) => {
            e.stopPropagation();
            handleMinimize();
          }}
          title="Minimize to Icon"
        >
          −
        </button>
      </div>
      
      <div className="ai-agent-content">
        <div className="professor-content-scrollable">
          <TypingEffect 
            text={contextMode ? (professorGreetings as any)[contextMode] || professorGreetings.research : (professorGreetings as any)[activeWorkspace] || professorGreetings.research}
            speed={50}
            className="professor-greeting"
          />
          
          <div className="quick-actions">
            {(contextMode ? (quickActions as any)[contextMode] || quickActions.research : (quickActions as any)[activeWorkspace] || quickActions.research).map((action: string, index: number) => (
              <a key={index} href="#" className="quick-action-btn">{action}</a>
            ))}
          </div>
        </div>
        
        <div className="professor-input-area">
          <form onSubmit={handleSubmit}>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask anything"
              className="professor-input"
              rows={2}
            />
            <div className="professor-actions">
              <button type="button" className="input-action-btn" title="Add Files">
                <img src="/assets/swissi-chat-plus.svg" alt="Add Files" width="16" height="16" />
              </button>
              <button type="button" className="input-action-btn" title="Swissi Tools">
                <img src="/assets/swissi-chat-tools.svg" alt="Swissi Tools" width="16" height="16" />
              </button>
              <button type="button" className="input-action-btn" title="Dictate">
                <img src="/assets/swissi-chat-microphone.svg" alt="Dictate" width="16" height="16" />
              </button>
              <button type="button" className="input-action-btn" title="Conversation mode">
                <img src="/assets/swissi-chat-talk.svg" alt="Conversation mode" width="16" height="16" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Rnd>
  );
};

export default AIAgentOverlay;
