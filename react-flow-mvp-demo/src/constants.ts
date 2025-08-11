// Workspace configuration adapted for React Flow
import { Node, Edge } from '@xyflow/react'

export const WORKSPACES = {
  research: {
    id: 'research',
    name: 'Workspace 1',
    description: 'Data analysis, surveys, and empirical research',
    nodes: [
      {
        id: 'academic-progress',
        type: 'widget',
        position: { x: 100, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'academic-progress',
          title: 'Academic Progress',
          content: {
            ects: '228 ECTS',
            progress: '+15 ECTS',
            links: ['Progress', 'Course', 'Milestones', 'Certificates']
          }
        }
      },
      {
        id: 'dissertation',
        type: 'widget',
        position: { x: 400, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'dissertation',
          title: 'My Dissertation',
          content: {
            words: '96,670',
            plagiarism: '2%',
            links: ['Open Dissertation', 'Create PDF', 'Turn In', 'Get Supervisor Feedback']
          }
        }
      },
      {
        id: 'research-data',
        type: 'widget',
        position: { x: 700, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'research-data',
          title: 'Research Data',
          content: {
            datasets: '12 Active',
            analysis: 'In Progress',
            links: ['Data Analysis', 'Statistics', 'Export Results', 'Correlations']
          }
        }
      }
    ] as Node[],
    edges: [] as Edge[],
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
    nodes: [
      {
        id: 'academic-progress',
        type: 'widget',
        position: { x: 100, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'academic-progress',
          title: 'Academic Progress',
          content: {
            ects: '228 ECTS',
            progress: '+15 ECTS',
            links: ['Progress', 'Course', 'Milestones', 'Certificates']
          }
        }
      },
      {
        id: 'my-classes',
        type: 'widget',
        position: { x: 400, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'my-classes',
          title: 'My Classes',
          badge: '2',
          content: {
            nextClass: 'DBA - Adv. Management (09:00)',
            links: ['Schedule', 'Materials', 'Recordings', 'Discussions']
          }
        }
      },
      {
        id: 'inbox',
        type: 'widget',
        position: { x: 100, y: 350 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'inbox',
          title: 'Inbox',
          badge: '3',
          content: {
            messages: [
              { sender: 'Prof. Dr. Schmidt', subject: 'Assignment Feedback Available', time: '2 min ago', unread: true },
              { sender: 'Swissi Registrar', subject: 'Course Registration Deadline', time: '1 hour ago', unread: true }
            ],
            links: ['Messages', 'Notifications', 'Archive']
          }
        }
      },
      {
        id: 'calendar',
        type: 'widget',
        position: { x: 700, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'calendar',
          title: 'Academic Calendar',
          content: {
            upcoming: 'Thesis Defense - Nov 15',
            events: '4 upcoming',
            links: ['View Calendar', 'Add Event', 'Reminders', 'Sync External']
          }
        }
      }
    ] as Node[],
    edges: [] as Edge[],
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
    nodes: [
      {
        id: 'dissertation',
        type: 'widget',
        position: { x: 100, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'dissertation',
          title: 'My Dissertation',
          content: {
            words: '96,670',
            plagiarism: '2%',
            links: ['Open Dissertation', 'Create PDF', 'Turn In', 'Get Supervisor Feedback']
          }
        }
      },
      {
        id: 'writing-tools',
        type: 'widget',
        position: { x: 400, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'writing-tools',
          title: 'Writing Tools',
          content: {
            status: 'Chapter 4 - In Progress',
            wordcount: '2,347 words today',
            links: ['Grammar Check', 'Citations', 'Templates', 'Collaboration']
          }
        }
      },
      {
        id: 'publications',
        type: 'widget',
        position: { x: 700, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'publications',
          title: 'Publications',
          content: {
            published: '3 papers',
            inReview: '1 pending',
            links: ['Submit Paper', 'Track Reviews', 'Co-Authors', 'Conferences']
          }
        }
      }
    ] as Node[],
    edges: [] as Edge[],
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
    nodes: [
      {
        id: 'research-papers',
        type: 'widget',
        position: { x: 100, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'research-papers',
          title: 'Research Papers',
          content: {
            recent: '24 new papers',
            trending: 'Federated AI',
            links: ['Search Papers', 'Saved Papers', 'Recommendations', 'Alerts']
          }
        }
      },
      {
        id: 'new-research',
        type: 'widget',
        position: { x: 400, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'new-research',
          title: 'New Research Alerts',
          badge: '5',
          content: {
            latest: 'AI Ethics in Healthcare',
            field: 'Your research field',
            links: ['View Alerts', 'Configure Topics', 'Citation Tracker', 'Author Follow']
          }
        }
      }
    ] as Node[],
    edges: [] as Edge[],
    aiSuggestions: [
      'Scan for new federated AI papers',
      'Find papers citing your recent work',
      'Discover trending research in your field',
      'Get notifications for target journal publications'
    ]
  }
} as const

// AI Agent node that persists across all workspaces
export const AI_AGENT_NODE: Node = {
  id: 'ai-agent',
  type: 'aiAgent',
  position: { x: 900, y: 50 },
  data: { 
    label: 'Prof Swissi AI',
    isMinimized: true 
  },
  draggable: true
}

export type WorkspaceId = keyof typeof WORKSPACES