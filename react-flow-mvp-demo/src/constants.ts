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
        position: { x: 50, y: 50 },
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
        position: { x: 420, y: 300 },
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
        position: { x: 420, y: 50 },
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
      },
      {
        id: 'survey-results-widget',
        type: 'widget',
        position: { x: 50, y: 550 },
        style: { width: 500, height: 600 },
        data: {
          widgetType: 'survey-results-widget',
          title: 'Comprehensive Survey Results',
          theme: 'dark-theme',
          content: {
            links: []
          }
        }
      },
      {
        id: 'chart-widget',
        type: 'widget',
        position: { x: 580, y: 550 },
        style: { width: 450, height: 350 },
        data: {
          widgetType: 'chart-widget',
          title: 'Performance Chart',
          theme: 'dark-theme',
          content: {
            links: []
          }
        }
      },
      {
        id: 'boxplot-widget',
        type: 'widget',
        position: { x: 1060, y: 550 },
        style: { width: 550, height: 500 },
        data: {
          widgetType: 'boxplot-widget',
          title: 'Statistical Analysis',
          theme: 'dark-theme',
          content: {
            links: []
          }
        }
      }
    ] as Node[],
    edges: [
      {
        id: 'research-data-to-dissertation',
        source: 'research-data',
        target: 'dissertation',
        type: 'configurable',
        sourceHandle: 'bottom-source',
        targetHandle: 'top-target'
      }
    ] as Edge[],
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
        position: { x: 50, y: 50 },
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
        position: { x: 350, y: 50 },
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
        position: { x: 50, y: 300 },
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
        position: { x: 650, y: 50 },
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
      },
      {
        id: 'dissertation',
        type: 'widget',
        position: { x: 350, y: 300 },
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
        position: { x: 950, y: 300 },
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
        position: { x: 950, y: 50 },
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
      },
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
    description: 'DBA in AI - Course Planning and Journey Visualization',
    nodes: [
      // Journey Start
      {
        id: 'journey-start',
        type: 'widget',
        position: { x: 50, y: 50 },
        style: { width: 160, height: 120 },
        data: {
          widgetType: 'journey-start',
          title: '',
          content: { links: [] }
        }
      },
      
      // Foundation Courses (Year 1)
      {
        id: 'ai-fundamentals',
        type: 'widget',
        position: { x: 80, y: 300 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'AI Fundamentals',
          content: {
            courseCode: 'AI Fundamentals',
            credits: '3 ECTS',
            description: 'Core AI concepts, algorithms',
            links: []
          }
        }
      },
      {
        id: 'research-methods',
        type: 'widget',
        position: { x: 300, y: 300 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Research Methods',
          content: {
            courseCode: 'Research Methods',
            credits: '4 ECTS',
            description: 'Quantitative, qualitative methods',
            links: []
          }
        }
      },
      {
        id: 'machine-learning',
        type: 'widget',
        position: { x: 520, y: 300 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Machine Learning',
          content: {
            courseCode: 'Machine Learning',
            credits: '4 ECTS',
            description: 'Algorithms, supervised learning',
            links: []
          }
        }
      },
      {
        id: 'data-science',
        type: 'widget',
        position: { x: 740, y: 300 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Data Science',
          content: {
            courseCode: 'Data Science',
            credits: '3 ECTS',
            description: 'Big data, analytics, visualization',
            links: []
          }
        }
      },
      {
        id: 'ethics-ai',
        type: 'widget',
        position: { x: 960, y: 300 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'AI Ethics',
          content: {
            courseCode: 'AI Ethics',
            credits: '2 ECTS',
            description: 'Ethical AI, societal impact',
            links: []
          }
        }
      },
      
      // Specialization Courses (Year 2)
      {
        id: 'deep-learning',
        type: 'widget',
        position: { x: 80, y: 480 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Deep Learning',
          content: {
            courseCode: 'Deep Learning',
            credits: '4 ECTS',
            description: 'Neural networks, CNNs, RNNs',
            links: []
          }
        }
      },
      {
        id: 'nlp-advanced',
        type: 'widget',
        position: { x: 300, y: 480 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Natural Language Processing',
          content: {
            courseCode: 'NLP',
            credits: '3 ECTS',
            description: 'Language models, text processing',
            links: []
          }
        }
      },
      {
        id: 'computer-vision',
        type: 'widget',
        position: { x: 520, y: 480 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Computer Vision',
          content: {
            courseCode: 'Computer Vision',
            credits: '3 ECTS',
            description: 'Image recognition, object detection',
            links: []
          }
        }
      },
      {
        id: 'reinforcement-learning',
        type: 'widget',
        position: { x: 740, y: 480 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Reinforcement Learning',
          content: {
            courseCode: 'Reinforcement Learning',
            credits: '4 ECTS',
            description: 'Agent learning, Q-learning',
            links: []
          }
        }
      },
      {
        id: 'ai-business',
        type: 'widget',
        position: { x: 960, y: 480 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'AI in Business',
          content: {
            courseCode: 'AI in Business',
            credits: '3 ECTS',
            description: 'Strategic AI implementation',
            links: []
          }
        }
      },
      
      // Advanced Courses (Year 3)
      {
        id: 'explainable-ai',
        type: 'widget',
        position: { x: 80, y: 660 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Explainable AI',
          content: {
            courseCode: 'Explainable AI',
            credits: '3 ECTS',
            description: 'AI transparency, interpretability',
            links: []
          }
        }
      },
      {
        id: 'federated-learning',
        type: 'widget',
        position: { x: 300, y: 660 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Federated Learning',
          content: {
            courseCode: 'Federated Learning',
            credits: '4 ECTS',
            description: 'Distributed ML, privacy',
            links: []
          }
        }
      },
      {
        id: 'ai-governance',
        type: 'widget',
        position: { x: 520, y: 660 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'AI Governance',
          content: {
            courseCode: 'AI Governance',
            credits: '2 ECTS',
            description: 'Policy frameworks, regulation',
            links: []
          }
        }
      },
      {
        id: 'quantum-ai',
        type: 'widget',
        position: { x: 740, y: 660 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Quantum AI',
          content: {
            courseCode: 'Quantum AI',
            credits: '3 ECTS',
            description: 'Quantum computing in AI',
            links: []
          }
        }
      },
      {
        id: 'ai-security',
        type: 'widget',
        position: { x: 960, y: 660 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'AI Security',
          content: {
            courseCode: 'AI Security',
            credits: '3 ECTS',
            description: 'Adversarial attacks, robustness',
            links: []
          }
        }
      },
      
      // Research & Dissertation Phase
      {
        id: 'dissertation-proposal',
        type: 'widget',
        position: { x: 1200, y: 300 },
        style: { width: 160, height: 120 },
        data: {
          widgetType: 'dissertation-milestone',
          title: '',
          content: {
            milestoneTitle: 'Research Proposal',
            milestoneDate: 'Year 2',
            links: []
          }
        }
      },
      {
        id: 'advanced-seminar',
        type: 'widget',
        position: { x: 200, y: 700 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Advanced Seminar',
          content: {
            courseCode: 'Advanced Seminar',
            credits: '2 ECTS',
            description: 'Current AI research trends',
            links: []
          }
        }
      },
      {
        id: 'dissertation-research',
        type: 'widget',
        position: { x: 1380, y: 300 },
        style: { width: 160, height: 120 },
        data: {
          widgetType: 'dissertation-milestone',
          title: '',
          content: {
            milestoneTitle: 'Start Dissertation',
            milestoneDate: 'Year 3',
            links: []
          }
        }
      },
      {
        id: 'teaching-practicum',
        type: 'widget',
        position: { x: 400, y: 700 },
        style: { width: 180 },
        data: {
          widgetType: 'course-widget',
          title: 'Teaching Practicum',
          content: {
            courseCode: 'Teaching Practicum',
            credits: '3 ECTS',
            description: 'University teaching experience',
            links: []
          }
        }
      },
      
      // Doctoral Colloquia
      {
        id: 'doctoral-colloquium-1',
        type: 'widget',
        position: { x: 1200, y: 450 },
        style: { width: 160, height: 120 },
        data: {
          widgetType: 'milestone-widget',
          title: '',
          content: {
            milestoneTitle: 'Doctoral Colloquium I',
            milestoneDate: 'Year 2',
            links: []
          }
        }
      },
      {
        id: 'doctoral-colloquium-2',
        type: 'widget',
        position: { x: 1380, y: 450 },
        style: { width: 160, height: 120 },
        data: {
          widgetType: 'milestone-widget',
          title: '',
          content: {
            milestoneTitle: 'Doctoral Colloquium II',
            milestoneDate: 'Year 3',
            links: []
          }
        }
      },
      
      // Milestone Widgets
      {
        id: 'submit-dissertation',
        type: 'widget',
        position: { x: 1200, y: 600 },
        style: { width: 160, height: 120 },
        data: {
          widgetType: 'milestone-widget',
          title: '',
          content: {
            milestoneTitle: 'Submit Dissertation',
            milestoneDate: 'March 2027',
            links: []
          }
        }
      },
      {
        id: 'oral-defense',
        type: 'widget',
        position: { x: 1380, y: 600 },
        style: { width: 160, height: 120 },
        data: {
          widgetType: 'milestone-widget',
          title: '',
          content: {
            milestoneTitle: 'Oral Defense',
            milestoneDate: 'May 2027',
            links: []
          }
        }
      },
      
      // Journey End
      {
        id: 'journey-end',
        type: 'widget',
        position: { x: 1400, y: 50 },
        style: { width: 160, height: 120 },
        data: {
          widgetType: 'journey-end',
          title: '',
          content: { links: [] }
        }
      },
      
      // Dissertation Topic
      {
        id: 'dissertation-topic',
        type: 'widget',
        position: { x: 1200, y: 780 },
        style: { width: 200, height: 160 },
        data: {
          widgetType: 'dissertation-topic',
          title: '',
          content: {
            topic: 'Explainable AI in Healthcare Decision Making',
            description: 'Focus on transparency and trust',
            links: []
          }
        }
      },
      
      // Interested Professors
      {
        id: 'interested-professors',
        type: 'widget',
        position: { x: 1420, y: 780 },
        style: { width: 160, height: 140 },
        data: {
          widgetType: 'potential-supervisors',
          title: 'Interested Professors',
          badge: '4',
          content: {
            professors: [
              {
                name: 'Prof. Dr. S. Chen',
                expertise: '',
                interest: '',
                availability: ''
              },
              {
                name: 'Prof. Dr. M. Weber',
                expertise: '',
                interest: '',
                availability: ''
              },
              {
                name: 'Prof. Dr. L. Rodriguez',
                expertise: '',
                interest: '',
                availability: ''
              },
              {
                name: 'Prof. Dr. J. Liu',
                expertise: '',
                interest: '',
                availability: ''
              }
            ],
            links: ['Contact', 'Schedule']
          }
        }
      }
    ] as Node[],
    edges: [
      // Journey progression
      { id: 'start-to-ai', source: 'journey-start', target: 'ai-fundamentals', type: 'configurable', sourceHandle: 'bottom-source', targetHandle: 'top-target' },
      
      // Foundation to Specialization logical flow
      { id: 'ai-to-ml', source: 'ai-fundamentals', target: 'machine-learning', type: 'configurable', sourceHandle: 'bottom-source', targetHandle: 'top-target' },
      { id: 'ml-to-dl', source: 'machine-learning', target: 'deep-learning', type: 'configurable', sourceHandle: 'bottom-source', targetHandle: 'top-target' },
      { id: 'dl-to-cv', source: 'deep-learning', target: 'computer-vision', type: 'configurable', sourceHandle: 'right-source', targetHandle: 'left-target' },
      { id: 'ml-to-rl', source: 'machine-learning', target: 'reinforcement-learning', type: 'configurable', sourceHandle: 'bottom-source', targetHandle: 'top-target' },
      
      // Research path
      { id: 'research-to-proposal', source: 'research-methods', target: 'dissertation-proposal', type: 'configurable', sourceHandle: 'bottom-source', targetHandle: 'top-target' },
      { id: 'proposal-to-research', source: 'dissertation-proposal', target: 'dissertation-research', type: 'configurable', sourceHandle: 'right-source', targetHandle: 'left-target' },
      
      // Final milestones
      { id: 'research-to-submit', source: 'dissertation-research', target: 'submit-dissertation', type: 'configurable', sourceHandle: 'bottom-source', targetHandle: 'top-target' },
      { id: 'submit-to-defense', source: 'submit-dissertation', target: 'oral-defense', type: 'configurable', sourceHandle: 'right-source', targetHandle: 'left-target' },
      { id: 'defense-to-end', source: 'oral-defense', target: 'journey-end', type: 'configurable', sourceHandle: 'right-source', targetHandle: 'left-target' },
      
      // Dissertation process flow
      { id: 'proposal-to-topic', source: 'dissertation-proposal', target: 'dissertation-topic', type: 'configurable', sourceHandle: 'bottom-source', targetHandle: 'top-target' },
      { id: 'topic-to-professors', source: 'dissertation-topic', target: 'interested-professors', type: 'configurable', sourceHandle: 'right-source', targetHandle: 'left-target' }
    ] as Edge[],
    aiSuggestions: [
      'Plan optimal course sequence based on prerequisites',
      'Connect courses with logical learning progression', 
      'Identify specialization tracks in AI domains',
      'Schedule courses to balance workload across semesters'
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
        position: { x: 40, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'research-papers',
          title: 'My Research Papers',
          content: {
            papers: [
              'Federated AI in Healthcare Systems',
              'ESG-Compliant Cloud Infrastructure',
              'Decentralized Identity Management',
              'Sustainable Computing Architectures',
              'Privacy-Preserving Data Analytics'
            ]
          }
        }
      },
      {
        id: 'new-research',
        type: 'widget',
        position: { x: 380, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'new-research',
          title: 'New Research Alerts',
          badge: '5',
          content: {
            articles: [
              {
                title: 'Federated Learning Privacy Mechanisms in Clinical Settings',
                abstract: 'Novel approaches to maintaining patient privacy while enabling collaborative machine learning across hospital networks...',
                journal: 'Nature Digital Medicine'
              },
              {
                title: 'Carbon-Neutral Data Centers: Implementation Strategies',
                abstract: 'Comprehensive analysis of renewable energy integration and efficiency optimization in modern cloud infrastructure...',
                journal: 'IEEE Transactions on Sustainable Computing'
              },
              {
                title: 'Blockchain-Based Identity Verification for Healthcare',
                abstract: 'Zero-knowledge proof implementations for secure patient identity management across distributed healthcare systems...',
                journal: 'Journal of Medical Internet Research'
              },
              {
                title: 'Energy-Efficient Computing Architectures for AI Workloads',
                abstract: 'Hardware and software optimizations for reducing power consumption in machine learning inference and training...',
                journal: 'ACM Computing Surveys'
              },
              {
                title: 'Differential Privacy in Large-Scale Analytics',
                abstract: 'Mathematical frameworks for preserving individual privacy while maintaining statistical utility in big data...',
                journal: 'Proceedings of the ACM'
              },
              {
                title: 'Sustainable AI: Environmental Impact Assessment',
                abstract: 'Lifecycle analysis of artificial intelligence systems and methodologies for carbon footprint reduction...',
                journal: 'Nature Climate Change'
              },
              {
                title: 'Homomorphic Encryption for Secure Cloud Computing',
                abstract: 'Practical implementations of fully homomorphic encryption schemes for privacy-preserving computation in distributed...',
                journal: 'Communications of the ACM'
              }
            ]
          }
        }
      },
      {
        id: 'calendar-discovery',
        type: 'widget',
        position: { x: 700, y: 100 },
        style: { width: 'var(--widget-initial-width)' },
        data: {
          widgetType: 'calendar',
          title: 'Academic Calendar',
          content: {
            upcoming: 'Thesis Defense - Aug 5',
            events: '5 upcoming',
            links: ['View Calendar', 'Add Event', 'Reminders', 'Sync External']
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

// AI Agent is now a fixed overlay, no longer needed as a React Flow node

export type WorkspaceId = keyof typeof WORKSPACES