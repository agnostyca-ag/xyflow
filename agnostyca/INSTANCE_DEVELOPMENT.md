# Instance Development Guide

This guide explains how to create instances like **EduAI**, **InsAI**, etc. that inherit from the Agnostyca core platform.

## 🏗️ Instance Architecture

Each instance is a **separate repository** that:
- Inherits core functionality from `@agnostyca/core`
- Provides 20-35+ domain-specific widgets
- Implements custom branding and themes
- Configures workspace layouts
- Deploys independently

## 📦 Setting Up a New Instance

### 1. Create Instance Repository

```bash
# Create new repo for your instance
mkdir eduai/  # or insai/, investai/, etc.
cd eduai/
git init
```

### 2. Install Agnostyca Core

```bash
npm init -y
npm install @agnostyca/core @xyflow/react react react-dom
npm install -D typescript @types/react @types/react-dom vite
```

### 3. Create Instance Structure

```
eduai/
├── src/
│   ├── widgets/           # 35+ education widgets
│   │   ├── AcademicProgress/
│   │   │   ├── AcademicProgressWidget.tsx
│   │   │   ├── AcademicProgressWidget.module.css
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── Dissertation/
│   │   ├── ResearchPapers/
│   │   ├── SurveyResults/
│   │   ├── ... (30+ more widgets)
│   │   └── index.ts       # Export all widgets
│   ├── workspaces/        # Workspace configurations
│   │   ├── research.workspace.ts
│   │   ├── academic.workspace.ts
│   │   └── index.ts
│   ├── themes/            # EduAI branding
│   │   ├── eduai.theme.ts
│   │   └── index.ts
│   ├── config/            # Instance configuration
│   │   └── eduai.config.ts
│   ├── App.tsx            # Main application
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎨 Creating Widgets

### Widget Structure

Each widget should follow this structure:

```typescript
// widgets/AcademicProgress/AcademicProgressWidget.tsx
import { BaseWidget, WidgetProps } from '@agnostyca/core'
import styles from './AcademicProgressWidget.module.css'

interface AcademicProgressData {
  ects: number
  totalEcts: number
  progress: string
  courses: Array<{
    name: string
    credits: number
    grade?: string
  }>
}

export class AcademicProgressWidget extends BaseWidget<AcademicProgressData> {
  renderContent() {
    const { ects, totalEcts, progress, courses } = this.props.data

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Academic Progress</h3>
          <span className={styles.badge}>{progress}</span>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.value}>{ects}</span>
            <span className={styles.label}>ECTS Earned</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.value}>{totalEcts}</span>
            <span className={styles.label}>Total Required</span>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${(ects / totalEcts) * 100}%` }}
          />
        </div>

        <div className={styles.courses}>
          {courses.map((course, index) => (
            <div key={index} className={styles.course}>
              <span className={styles.courseName}>{course.name}</span>
              <span className={styles.courseCredits}>{course.credits} ECTS</span>
              {course.grade && (
                <span className={styles.courseGrade}>{course.grade}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  protected getWidgetStyle() {
    return {
      minWidth: '320px',
      minHeight: '280px'
    }
  }
}

export default AcademicProgressWidget
```

### Widget Registration

```typescript
// widgets/index.ts
import { BaseWidgetComponent } from '@agnostyca/core'
import AcademicProgressWidget from './AcademicProgress'
import DissertationWidget from './Dissertation'
// ... import all 35+ widgets

export const eduAIWidgets = new Map<string, BaseWidgetComponent>([
  ['eduai.academic-progress', {
    component: AcademicProgressWidget,
    config: {
      type: 'eduai.academic-progress',
      name: 'Academic Progress',
      category: 'education',
      description: 'Track ECTS progress and course completion',
      defaultProps: {
        ects: 0,
        totalEcts: 240,
        progress: '0%',
        courses: []
      },
      requiredFeatures: ['education'],
      version: '1.0.0'
    }
  }],
  ['eduai.dissertation', {
    component: DissertationWidget,
    config: {
      type: 'eduai.dissertation',
      name: 'Dissertation Tracker',
      category: 'education',
      description: 'Track dissertation writing progress',
      defaultProps: {
        wordCount: 0,
        targetWords: 100000,
        chapters: []
      },
      version: '1.0.0'
    }
  }],
  // ... register all 35+ widgets
])
```

## ⚙️ Main Application Setup

```typescript
// App.tsx
import React, { useEffect } from 'react'
import { 
  AgnosticaPlatform, 
  PluginManager, 
  ThemeManager 
} from '@agnostyca/core'
import { eduAIWidgets } from './widgets'
import { eduAIWorkspaces } from './workspaces'
import { eduAITheme } from './themes'
import { eduAIConfig } from './config'

function App() {
  useEffect(() => {
    // Register EduAI widget plugin
    PluginManager.registerPlugin({
      name: 'eduai-widgets',
      version: '1.0.0',
      widgets: eduAIWidgets,
      initialize: () => {
        console.log(`EduAI loaded: ${eduAIWidgets.size} widgets`)
      }
    })

    // Apply EduAI theme
    ThemeManager.registerTheme(eduAITheme)
    ThemeManager.applyTheme('eduai')
  }, [])

  return (
    <AgnosticaPlatform
      config={eduAIConfig}
      workspaces={eduAIWorkspaces}
      defaultWorkspace="research"
    />
  )
}

export default App
```

## 🎨 Branding and Themes

```typescript
// themes/eduai.theme.ts
import { ThemeConfig } from '@agnostyca/core'

export const eduAITheme: ThemeConfig = {
  id: 'eduai',
  name: 'EduAI Academic',
  variant: 'academic',
  colors: {
    primary: '#22c55e',
    secondary: '#16a34a', 
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textMuted: '#64748b',
    accent: '#8b5cf6',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    border: '#e2e8f0'
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem', 
      large: '1.25rem',
      xlarge: '1.5rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 600
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem', 
    lg: '0.75rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }
}
```

## 🚀 Deployment

Each instance deploys independently:

```json
{
  "name": "eduai",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "npm run build && deploy-to-eduai-servers"
  },
  "dependencies": {
    "@agnostyca/core": "^1.0.0"
  }
}
```

## 📈 Benefits of This Architecture

- ✅ **Independent Development**: Each instance team works autonomously
- ✅ **Rapid Scaling**: Create new instances by copying the pattern
- ✅ **Core Inheritance**: Automatically get platform improvements
- ✅ **Domain Focus**: 35+ widgets tailored for specific industries
- ✅ **Custom Branding**: Complete white-labeling per instance
- ✅ **Separate Deployment**: Deploy instances independently
- ✅ **Version Control**: Each instance has its own git history

This architecture allows you to scale from **1 instance** (Swissi) to **multiple domain-specific platforms** (EduAI, InsAI, InvestAI, HealthAI) while maintaining a clean separation between core platform and instance-specific functionality.