// Application constants for better organization and maintainability

// Widget positions clustered by workspace for better organization

export const WIDGET_POSITIONS = {
  // Workspace 1 Widgets - Research & Data Analysis
  empiricalData: { x: 50, y: 40, width: 240, height: 'auto' },
  dissertation: { x: 310, y: 40, width: 240, height: 'auto' },
  surveyResults: { x: 570, y: 40, width: 760, height: 'auto' },
  boxplotResults: { x: 50, y: 320, width: 500, height: 'auto' },
  aiTutor: { x: 100, y: 460, width: 320, height: 'auto' },

  // Workspace 2 Widgets - Academic Management
  academicProgress: { x: 50, y: 40, width: 240, height: 'auto' },
  myClasses: { x: 310, y: 40, width: 240, height: 'auto' },
  inbox: { x: 570, y: 40, width: 280, height: 'auto' },
  calendar: { x: 900, y: 40, width: 320, height: 'auto' },
  todoList: { x: 50, y: 220, width: 240, height: 'auto' },

  // Workspace 3 Widgets - Writing & Tools
  quickAccess: { x: 50, y: 40, width: 240, height: 'auto' },
  usefulLinks: { x: 570, y: 40, width: 300, height: 'auto' },

  // Workspace 4 Widgets - Research Discovery
  researchPapers: { x: 50, y: 40, width: 320, height: 'auto' },
  newResearchPapers: { x: 390, y: 40, width: 240, height: 'auto' },
  calendarDiscovery: { x: 650, y: 40, width: 320, height: 'auto' },

  // Shared/Other Widgets
  chartWidget: { x: 50, y: 330, width: 500, height: 'auto' },
} as const;

// Workspace Configurations
export const WORKSPACES = {
  research: {
    id: 'research',
    name: 'Workspace 1',
    description: 'Data analysis, surveys, and empirical research',
    widgets: {
      surveyResults: { visible: true, ...WIDGET_POSITIONS.surveyResults },
      boxplotResults: { visible: true, ...WIDGET_POSITIONS.boxplotResults },
      aiTutor: { visible: true, ...WIDGET_POSITIONS.aiTutor },
      empiricalData: { visible: true, ...WIDGET_POSITIONS.empiricalData },
      dissertation: { visible: true, ...WIDGET_POSITIONS.dissertation },
    },
    aiSuggestions: [
      'Add statistical correlation analysis widget',
      'Generate preliminary findings report',
      'Connect to Swissi Statistics/R for advanced analysis',
      'Export data to academic paper format'
    ]
  },
  academic: {
    id: 'academic',
    name: 'Workspace 2',
    description: 'Course management, calendar, and academic tracking',
    widgets: {
      academicProgress: { visible: true, ...WIDGET_POSITIONS.academicProgress },
      myClasses: { visible: true, ...WIDGET_POSITIONS.myClasses },
      calendar: { visible: true, ...WIDGET_POSITIONS.calendar },
      todoList: { visible: true, ...WIDGET_POSITIONS.todoList },
      inbox: { visible: true, ...WIDGET_POSITIONS.inbox },
      aiTutor: { visible: true, ...WIDGET_POSITIONS.aiTutor },
    },
    aiSuggestions: [
      'Schedule next semester course registration',
      'Track ECTS progress toward graduation',
      'Review upcoming assignment deadlines',
      'Plan study schedule for finals week'
    ]
  },
  writing: {
    id: 'writing',
    name: 'Workspace 3',
    description: 'Academic writing, research papers, and publications',
    widgets: {
      aiTutor: { visible: true, ...WIDGET_POSITIONS.aiTutor },
      dissertation: { visible: true, ...WIDGET_POSITIONS.dissertation },
      quickAccess: { visible: true, ...WIDGET_POSITIONS.quickAccess },
      calendar: { visible: true, ...WIDGET_POSITIONS.calendar },
      usefulLinks: { visible: true, ...WIDGET_POSITIONS.usefulLinks },
    },
    aiSuggestions: [
      'Continue Chapter 4 methodology draft',
      'Find potential co-authors for next publication',
      'Submit paper to IEEE conference deadline',
      'Generate citation analysis for literature review'
    ]
  },
  discovery: {
    id: 'discovery',
    name: 'Workspace 4',
    description: 'Research discovery and paper recommendations',
    widgets: {
      researchPapers: { visible: true, ...WIDGET_POSITIONS.researchPapers },
      newResearchPapers: { visible: true, ...WIDGET_POSITIONS.newResearchPapers },
      calendarDiscovery: { visible: true, ...WIDGET_POSITIONS.calendarDiscovery },
    },
    aiSuggestions: [
      'Scan for new federated AI papers',
      'Find papers citing your recent work',
      'Discover trending research in your field',
      'Get notifications for target journal publications'
    ]
  }
} as const;

export const SURVEY_DATA = [
  { week: 'Week 1', responses: 45, cumulative: 45, satisfaction: 4.2 },
  { week: 'Week 2', responses: 89, cumulative: 134, satisfaction: 4.1 },
  { week: 'Week 3', responses: 156, cumulative: 290, satisfaction: 4.3 },
  { week: 'Week 4', responses: 203, cumulative: 493, satisfaction: 4.4 },
  { week: 'Week 5', responses: 178, cumulative: 671, satisfaction: 4.2 },
  { week: 'Week 6', responses: 134, cumulative: 805, satisfaction: 4.3 },
  { week: 'Week 7', responses: 42, cumulative: 847, satisfaction: 4.5 },
] as const;

export const NAVIGATION_LINKS = [
  { href: '/portal', label: 'Student Portal' },
  { href: '/courses', label: 'My Courses' },
  { href: '/library', label: 'Digital Library' },
  { href: '/research', label: 'Research Hub' },
  { href: '/career', label: 'Career Services' },
  { href: '/support', label: 'Academic Support' },
  { href: '/community', label: 'Student Community' },
  { href: '/finance', label: 'Financial Aid' },
] as const;

export const VIEWPORT_CONFIG = {
  minWidth: 1500,
  minHeight: 1000,
  paddingRight: 500,
  paddingBottom: 300,
} as const;
