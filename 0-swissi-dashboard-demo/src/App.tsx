import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Rnd } from 'react-rnd';
import './styles.css';
import ChartWidget from './ChartWidget';
import CalendarWidget from './CalendarWidget';
import BoxplotWidget from './BoxplotWidget';
import { NewResearchPapersWidget } from './NewResearchPapersWidget';
import WorkspaceSwitcher from './WorkspaceSwitcher';
import AIAgentOverlay from './AIAgentOverlay';
import FlyoutPanel from './FlyoutPanel';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { WIDGET_POSITIONS, WORKSPACES } from './constants';

const lightTheme = {
  colors: {
    background: '#f5f5f5',
    text: '#000000',
    widgetBackground: '#ffffff',
  },
};

const darkTheme = {
  colors: {
    background: '#0e1116',
    text: '#c9d1d9',
    widgetBackground: '#0e1116',
  },
};

const matterhornTheme = {
  colors: {
    background: '#0e1116',
    text: '#ffffff',
    widgetBackground: 'rgba(20, 20, 20, 0.9)',
  },
};

export const ThemeContext = createContext(darkTheme);

export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ThemeContext.Provider;

// Function to get theme object based on theme name
const getThemeObject = (themeName: string) => {
  switch (themeName) {
    case 'light-theme':
      return lightTheme;
    case 'matterhorn-theme':
      return matterhornTheme;
    case 'dark-theme':
    default:
      return darkTheme;
  }
};

// Chart data constant
const SURVEY_CHART_DATA = [
  { week: 'Week 1', responses: 45, cumulative: 45, satisfaction: 4.2 },
  { week: 'Week 2', responses: 89, cumulative: 134, satisfaction: 4.1 },
  { week: 'Week 3', responses: 156, cumulative: 290, satisfaction: 4.3 },
  { week: 'Week 4', responses: 203, cumulative: 493, satisfaction: 4.4 },
  { week: 'Week 5', responses: 178, cumulative: 671, satisfaction: 4.2 },
  { week: 'Week 6', responses: 134, cumulative: 805, satisfaction: 4.3 },
  { week: 'Week 7', responses: 42, cumulative: 847, satisfaction: 4.5 },
];

export default function App() {
  const [theme, setTheme] = useState('dark-theme');
  const [activeWorkspace, setActiveWorkspace] = useState<keyof typeof WORKSPACES>('research');
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  
  // Get current workspace configuration
  const currentWorkspaceConfig = WORKSPACES[activeWorkspace];
  
  // State to track which widgets are visible - based on workspace
  const [visibleWidgets, setVisibleWidgets] = useState(() => {
    const initialState: Record<string, boolean> = {};
    Object.keys(WIDGET_POSITIONS).forEach(widgetId => {
      const widget = (currentWorkspaceConfig.widgets as any)[widgetId];
      initialState[widgetId] = widget?.visible ?? false;
    });
    return initialState;
  });

  // Update visible widgets when workspace changes
  useEffect(() => {
    const newVisibleState: Record<string, boolean> = {};
    Object.keys(WIDGET_POSITIONS).forEach(widgetId => {
      const widget = (currentWorkspaceConfig.widgets as any)[widgetId];
      newVisibleState[widgetId] = widget?.visible ?? false;
    });
    setVisibleWidgets(newVisibleState);
  }, [activeWorkspace, currentWorkspaceConfig]);

  // Calculate dynamic viewport size based on visible widgets - memoized for performance
  const viewportSize = useMemo(() => {
    let maxX = 1500; // Minimum canvas width
    let maxY = 1000; // Minimum canvas height
    
    Object.entries(visibleWidgets).forEach(([widgetId, isVisible]) => {
      if (isVisible && WIDGET_POSITIONS[widgetId as keyof typeof WIDGET_POSITIONS]) {
        const widget = WIDGET_POSITIONS[widgetId as keyof typeof WIDGET_POSITIONS];
        const rightEdge = widget.x + widget.width;
        const bottomEdge = widget.y + (typeof widget.height === 'number' ? widget.height : 400); // Default height for 'auto'
        
        maxX = Math.max(maxX, rightEdge);
        maxY = Math.max(maxY, bottomEdge);
      }
    });
    
    // Add generous extra padding for free workspace arrangement
    return {
      width: maxX + 800,  // 800px extra padding to the right for widget placement freedom
      height: maxY + 600  // 600px extra padding to the bottom for vertical arrangement freedom
    };
  }, [visibleWidgets]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'dark-theme') return 'light-theme';
      if (prevTheme === 'light-theme') return 'matterhorn-theme';
      return 'dark-theme'; // from matterhorn-theme back to dark-theme
    });
  };

  // Function to close/hide a widget
  const closeWidget = (widgetId: keyof typeof visibleWidgets) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widgetId]: false
    }));
  };

  useEffect(() => {
    document.body.className = theme; // Apply the theme class to the body element
  }, [theme]);

  const currentTheme = getThemeObject(theme);

  return (
    <ThemeProvider value={currentTheme}>
      <div className={theme}>
      {/* Flyout Panel */}
      <FlyoutPanel 
        isOpen={isFlyoutOpen}
        onClose={() => setIsFlyoutOpen(false)}
        toggleTheme={toggleTheme}
        currentTheme={theme}
        setTheme={setTheme}
      />
      
      {/* Hamburger Menu - Fixed to left edge, hidden when panel is open */}
      <button 
        className={`hamburger-menu-fixed ${isFlyoutOpen ? 'hidden' : ''}`}
        onClick={() => setIsFlyoutOpen(true)}
      >
        ☰
      </button>
      
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/assets/Swiss-AI-Institute.svg" alt="Swissi Logo" className="header-logo" />
          <h1 className="dashboard-title">Swissi University Dashboard</h1>
        </div>
      </header>

      {/* Workspace Switcher - moved up */}
      <WorkspaceSwitcher 
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />

      {/* Workspace Content Area */}
      <div className="workspace-content"
           style={{
             width: viewportSize.width,
             height: viewportSize.height,
             position: 'relative'
           }}>
        {/* Dynamic Viewport Extender */}
        <div 
          className="viewport-extender"
          style={{
            width: `${viewportSize.width}px`,
            height: `${viewportSize.height}px`
          }}
        />

      {visibleWidgets.academicProgress && (
        <Rnd
          default={WIDGET_POSITIONS.academicProgress}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('academicProgress')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">Academic Progress</h5>
          <p>228 ECTS  (+15 ECTS)</p>
          <div className="widget-links">
            <a href="/progress-report" className="nav-link">Progress</a>
            <a href="/course-details" className="nav-link">Course</a>
            <a href="/milestones" className="nav-link">Milestones</a>
            <a href="/certificates" className="nav-link">Certificates</a>
          </div>
        </Rnd>
      )}

      {visibleWidgets.myClasses && (
        <Rnd
          default={WIDGET_POSITIONS.myClasses}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('myClasses')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">My Classes <span style={{ backgroundColor: 'green', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', marginLeft: '8px' }}>2</span></h5>
          <p>DBA - Adv. Management (09:00)</p>
          <div className="widget-links">
            <a href="/class-schedule" className="nav-link">Schedule</a>
            <a href="/class-materials" className="nav-link">Materials</a>
            <a href="/class-recordings" className="nav-link">Recordings</a>
            <a href="/class-discussions" className="nav-link">Discussions</a>
          </div>
        </Rnd>
      )}

      {visibleWidgets.inbox && (
        <Rnd
          default={WIDGET_POSITIONS.inbox}
          enableResizing={true}
          dragAxis="both"
          className="widget inbox-widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('inbox')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">Inbox <span style={{ backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', marginLeft: '8px' }}>3</span></h5>
          
          <div className="inbox-links">
            <a href="/inbox-messages" className="nav-link">Messages</a>
            <a href="/inbox-notifications" className="nav-link">Notifications</a>
            <a href="/inbox-archive" className="nav-link">Archive</a>
          </div>
          
          <div className="inbox-messages">
            <div className="inbox-message unread">
              <div className="message-indicator unread"></div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">Prof. Dr. Schmidt</span>
                  <span className="message-time">2 min ago</span>
                </div>
                <div className="message-subject">Assignment Feedback Available</div>
                <div className="message-preview">Your research paper submission has been reviewed...</div>
              </div>
            </div>
            
            <div className="inbox-message unread">
              <div className="message-indicator unread"></div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">Swissi Registrar</span>
                  <span className="message-time">1 hour ago</span>
                </div>
                <div className="message-subject">Course Registration Deadline</div>
                <div className="message-preview">Reminder: Registration ends tomorrow at 11:59 PM...</div>
              </div>
            </div>
            
            <div className="inbox-message read">
              <div className="message-indicator read"></div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">Study Group</span>
                  <span className="message-time">3 hours ago</span>
                </div>
                <div className="message-subject">Tomorrow's Meeting Confirmed</div>
                <div className="message-preview">See you at 3 PM in Library Room 204...</div>
              </div>
            </div>
            
            <div className="inbox-message unread">
              <div className="message-indicator unread"></div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">IT Support</span>
                  <span className="message-time">5 hours ago</span>
                </div>
                <div className="message-subject">System Maintenance Notice</div>
                <div className="message-preview">Scheduled maintenance this weekend from 2-4 AM...</div>
              </div>
            </div>
            
            <div className="inbox-message read">
              <div className="message-indicator read"></div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">Library Services</span>
                  <span className="message-time">1 day ago</span>
                </div>
                <div className="message-subject">Book Return Reminder</div>
                <div className="message-preview">The following books are due next week...</div>
              </div>
            </div>
          </div>
        </Rnd>
      )}

      {visibleWidgets.dissertation && (
        <Rnd
          default={WIDGET_POSITIONS.dissertation}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('dissertation')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">My Dissertation</h5>
          <p>Words: <span className="bold-green">96,670</span></p>
          <p>Live Plagiarism Test: <span className="bold-green">2%</span></p>
          <div className="widget-links">
            <a href="/open-dissertation" className="nav-link">Open Dissertation</a>
            <a href="/create-pdf" className="nav-link">Create PDF</a>
            <a href="/turn-in" className="nav-link">Turn In</a>
            <a href="/get-feedback" className="nav-link">Get Supervisor Feedback</a>
          </div>
        </Rnd>
      )}

      {visibleWidgets.todoList && (
        <Rnd
          default={WIDGET_POSITIONS.todoList}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('todoList')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">To-do List <span style={{ backgroundColor: 'green', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', marginLeft: '8px' }}>3</span></h5>
          <p>[ ] Submit Thesis Abstract</p>
          <p>[x] Confirm Seminar Attendance</p>
          <p>[x] Confirm Seminar Attendance</p>
        </Rnd>
      )}

      {visibleWidgets.quickAccess && (
        <Rnd
          default={WIDGET_POSITIONS.quickAccess}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('quickAccess')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">Quick Access</h5>
          <div className="widget-links">
            <a href="/library" className="nav-link">Library</a>
            <a href="/grades" className="nav-link">Grades</a>
            <a href="/schedule" className="nav-link">Schedule</a>
            <a href="/assignments" className="nav-link">Assignments</a>
            <a href="/events" className="nav-link">Events</a>
            <a href="/events" className="nav-link">Shows</a>
          </div>
        </Rnd>
      )}

      {visibleWidgets.usefulLinks && (
        <Rnd
          default={WIDGET_POSITIONS.usefulLinks}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('usefulLinks')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">Useful Links</h5>
          <div className="widget-links">
            <a href="/portal" className="nav-link">Student Portal</a>
            <a href="/courses" className="nav-link">My Courses</a>
            <a href="/library" className="nav-link">Digital Library</a>
            <a href="/research" className="nav-link">Research Hub</a>
            <a href="/career" className="nav-link">Career Services</a>
            <a href="/support" className="nav-link">Academic Support</a>
            <a href="/community" className="nav-link">Student Community</a>
            <a href="/finance" className="nav-link">Financial Aid</a>
          </div>
        </Rnd>
      )}

      {visibleWidgets.empiricalData && (
        <Rnd
          default={WIDGET_POSITIONS.empiricalData}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('empiricalData')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">My Empirical Data</h5>
          <p>Survey: <span className="bold-green">Live</span></p>
          <p>Response Rate: <span className="bold-green">34%</span></p>
          <div className="widget-links">
            <a href="/discuss-data" className="nav-link">Discuss Data</a>
          </div>
        </Rnd>
      )}

      {visibleWidgets.chartWidget && (
        <Rnd
          default={WIDGET_POSITIONS.chartWidget}
          dragAxis="both"
          className="widget"
        >
          <ChartWidget onClose={() => closeWidget('chartWidget')} />
        </Rnd>
      )}

      {visibleWidgets.calendar && (
        <Rnd
          default={WIDGET_POSITIONS.calendar}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('calendar')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <CalendarWidget />
        </Rnd>
      )}

      {visibleWidgets.researchPapers && (
        <Rnd
          default={WIDGET_POSITIONS.researchPapers}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('researchPapers')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">Your Research Papers</h5>
          
          {/* Paper 1 - In Review */}
          <div className="research-paper-item">
            <h6 className="paper-title">AI-Enhanced Learning Analytics in Higher Education</h6>
            <p className="paper-status in-review">In Review</p>
            <div className="widget-links">
              <a href="#" className="nav-link">View Draft</a>
              <a href="#" className="nav-link">Track Status</a>
            </div>
          </div>

          {/* Paper 2 - In Review */}
          <div className="research-paper-item">
            <h6 className="paper-title">Blockchain-Based Academic Credentialing Systems</h6>
            <p className="paper-status in-review">In Review</p>
            <div className="widget-links">
              <a href="#" className="nav-link">View Draft</a>
              <a href="#" className="nav-link">Revision Notes</a>
            </div>
          </div>

          {/* Paper 3 - In Progress */}
          <div className="research-paper-item">
            <h6 className="paper-title">Digital Transformation in Educational Institutions</h6>
            <p className="paper-status in-progress">In Progress</p>
            <div className="widget-links">
              <a href="#" className="nav-link">Write</a>
              <a href="#" className="nav-link">Research</a>
              <a href="#" className="nav-link">Invite Co-authors</a>
              <a href="#" className="nav-link">Ask for Preliminary Review</a>
              <a href="#" className="nav-link">Submit</a>
              <a href="#" className="nav-link">Produce PDF</a>
            </div>
          </div>

        </Rnd>
      )}

      {visibleWidgets.surveyResults && (
        <Rnd
          default={WIDGET_POSITIONS.surveyResults}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('surveyResults')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <h5 className="widget-title">Your Live PhD Empirical Survey Results - Dissertation Research</h5>
          <div className="survey-stats">
            <div className="stat-item">
              <span className="stat-label">Sample Size:</span>
              <span className="stat-value bold-green">847</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Response Rate:</span>
              <span className="stat-value bold-green">68.2%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Confidence Level:</span>
              <span className="stat-value">95%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Margin of Error:</span>
              <span className="stat-value">±3.4%</span>
            </div>
          </div>
          <div className="chart-container" style={{ height: '280px', marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={SURVEY_CHART_DATA}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark-theme' ? '#30363d' : '#e1e5e9'} />
                <XAxis 
                  dataKey="week" 
                  stroke={theme === 'dark-theme' ? '#c9d1d9' : '#24292f'}
                  fontSize={12}
                />
                <YAxis 
                  stroke={theme === 'dark-theme' ? '#c9d1d9' : '#24292f'}
                  fontSize={12}
                />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark-theme' ? '#161b22' : '#ffffff',
                    border: `1px solid ${theme === 'dark-theme' ? '#30363d' : '#d0d7de'}`,
                    borderRadius: '6px',
                    color: theme === 'dark-theme' ? '#c9d1d9' : '#24292f'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="responses"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorResponses)"
                  strokeWidth={2}
                  name="Weekly Responses"
                />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#3b82f6"
                  fillOpacity={0.3}
                  fill="url(#colorCumulative)"
                  strokeWidth={2}
                  name="Cumulative Total"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="survey-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#22c55e' }}></div>
              <span>Weekly Responses</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
              <span>Cumulative Total</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
              <span>Avg. Satisfaction: 4.3/5.0</span>
            </div>
          </div>
          
          {/* Executive Summary Section */}
          <div className="executive-summary">
            <h6 className="summary-title">Executive Summary - Data Collection Progress</h6>
            <div className="summary-content">
              <p>
                <strong>Study Overview:</strong> This longitudinal study investigates organizational behavior patterns 
                in digital transformation initiatives across <span className="highlight-green">847</span> participants 
                from multinational corporations. Data collection commenced Week 1 with an initial response of 
                <span className="highlight-green">45</span> participants, reaching peak engagement in Week 4 with 
                <span className="highlight-green">203</span> responses.
              </p>
              <p>
                <strong>Statistical Validity:</strong> The current sample size of <span className="highlight-green">847</span> 
                respondents exceeds the minimum required sample for statistical significance (n=384 at 95% confidence level). 
                The achieved response rate of <span className="highlight-green">68.2%</span> surpasses industry standards 
                for academic research (typically 30-40%), ensuring robust data reliability with a margin of error of 
                <span className="highlight-green">±3.4%</span>.
              </p>
              <p>
                <strong>Response Pattern Analysis:</strong> Weekly participation followed an expected distribution curve, 
                with initial engagement (<span className="highlight-green">45</span> responses), exponential growth 
                through Weeks 2-4 (peak: <span className="highlight-green">203</span>), followed by natural decline 
                due to survey fatigue. The sustained satisfaction rating of <span className="highlight-green">4.3/5.0</span> 
                indicates high participant engagement and survey quality.
              </p>
              
              <div className="recommendations-section">
                <h6 className="recommendations-title">Recommended Next Steps:</h6>
                <ul className="recommendations-list">
                  <li><a href="#swissi-statistics-ai" className="inline-link">Proceed with advanced statistical analysis using Swissi AI Statistics/R for correlation matrices</a></li>
                  <li>Conduct qualitative thematic analysis on open-ended responses (n=<span className="highlight-green">312</span>)</li>
                  <li>Implement follow-up interviews with <span className="highlight-green">15-20</span> high-engagement participants</li>
                  <li>Begin drafting Chapter 4 (Results) with current dataset</li>
                  <li>Schedule supervisor review meeting for preliminary findings discussion</li>
                </ul>
                
                <div className="widget-links">
                  <a href="#" className="nav-link ai-execute-link">🤖 AI Swissi Execute Recommendations</a>
                  <a href="/preliminary-report.pdf" className="nav-link pdf-link">📄 Download Preliminary Report PDF</a>
                </div>
              </div>
            </div>
          </div>
        </Rnd>
      )}

      {visibleWidgets.boxplotResults && (
        <Rnd
          default={WIDGET_POSITIONS.boxplotResults}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <BoxplotWidget onClose={() => closeWidget('boxplotResults')} />
        </Rnd>
      )}

      {visibleWidgets.newResearchPapers && (
        <Rnd
          default={WIDGET_POSITIONS.newResearchPapers}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <NewResearchPapersWidget onClose={() => closeWidget('newResearchPapers')} />
        </Rnd>
      )}

      {visibleWidgets.calendarDiscovery && (
        <Rnd
          default={WIDGET_POSITIONS.calendarDiscovery}
          enableResizing={true}
          dragAxis="both"
          className="widget"
        >
          <button className="container-close-button" onClick={() => closeWidget('calendarDiscovery')}>
            <img src="/assets/swissi-close-x.svg" alt="Close" />
          </button>
          <CalendarWidget />
        </Rnd>
      )}
      
      </div> {/* Close workspace-content */}
      
      {/* AI Agent Overlay - Persistent across all workspaces */}
      <AIAgentOverlay activeWorkspace={activeWorkspace} theme={theme} />
      
    </div>
    </ThemeProvider>
  );
}

export { darkTheme };
