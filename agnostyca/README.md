# Agnostyca Platform

The **core platform** for domain-agnostic, widget-based applications. Instances like **EduAI**, **InsAI**, and **InvestAI** inherit from this platform.

## 🏗️ Architecture Overview

```
agnostyca/ (Core Platform - This Repo)
├── src/
│   ├── core/                # Platform core functionality
│   │   ├── types/          # TypeScript definitions
│   │   ├── components/     # Base React components
│   │   ├── hooks/          # Shared hooks
│   │   └── utils/          # Utilities
│   ├── widgets/
│   │   ├── core/           # Universal widgets (3-5 widgets)
│   │   │   ├── BaseWidget.tsx
│   │   │   ├── Common/     # Loading, Error, Placeholder
│   │   │   ├── Calendar/   # Basic calendar
│   │   │   └── Chart/      # Basic charts
│   │   └── registry/       # Plugin system
│   ├── themes/             # White-labeling system
│   └── config/             # Platform configuration

eduai/ (Education Instance - Separate Repo)
├── widgets/
│   ├── AcademicProgress/   # 35+ education-specific widgets
│   ├── Dissertation/
│   ├── ResearchPapers/
│   └── ... (30+ more)
├── workspaces/             # Education workspace configs
├── themes/eduai/           # EduAI branding
└── package.json            # Inherits from @agnostyca/core

insai/ (Insurance Instance - Separate Repo)
├── widgets/
│   ├── PolicyTracker/      # 12+ insurance-specific widgets
│   ├── ClaimsProcessor/
│   └── ... (10+ more)
├── workspaces/             # Insurance workspace configs
└── package.json            # Inherits from @agnostyca/core
```

## 🎯 Core Platform Responsibilities

**Agnostyca provides:**
- ✅ Widget plugin architecture
- ✅ Theme system for white-labeling
- ✅ Base widget components (`BaseWidget`, `LoadingWidget`, `ErrorWidget`)
- ✅ Registry system for widget discovery
- ✅ Core React Flow integration
- ✅ TypeScript definitions
- ✅ A few universal widgets (Calendar, Chart, Layout)

**Instances provide:**
- 📦 Domain-specific widgets (35+ for EduAI, 12+ for InsAI)
- 🎨 Custom branding and themes
- ⚙️ Workspace configurations
- 🔧 Business logic and integrations

## 🔌 Plugin System

Instances inherit from Agnostyca using a plugin architecture:

```typescript
// In EduAI repo
import { PluginManager, WidgetRegistry } from '@agnostyca/core'
import { eduAIWidgets } from './widgets'

// Register the EduAI widget plugin
PluginManager.registerPlugin({
  name: 'eduai-widgets',
  version: '1.0.0',
  widgets: eduAIWidgets,
  initialize: () => {
    console.log('EduAI widgets loaded: 35 widgets')
  }
})
```

## 🏗️ Widget Development

All widgets extend the base components:

```typescript
// In EduAI repo - widgets/Dissertation/DissertationWidget.tsx
import { BaseWidget, WidgetProps } from '@agnostyca/core'

interface DissertationData {
  wordCount: number
  plagiarismScore: number
  lastSaved: Date
}

export class DissertationWidget extends BaseWidget<DissertationData> {
  renderContent() {
    const { wordCount, plagiarismScore } = this.props.data
    return (
      <div>
        <h3>My Dissertation</h3>
        <p>Words: {wordCount}</p>
        <p>Plagiarism: {plagiarismScore}%</p>
      </div>
    )
  }
}
```

## 📦 Instance Setup

To create a new instance (e.g., HealthAI):

1. **Create new repo**: `healthai/`
2. **Install core**: `npm install @agnostyca/core`
3. **Create widgets**: Build 20+ healthcare-specific widgets
4. **Configure branding**: Set up HealthAI theme
5. **Register plugin**: Load widgets into Agnostyca platform
6. **Deploy**: Independent deployment from core platform

## 🎨 Inheritance Benefits

- ✅ **Core improvements** automatically benefit all instances
- ✅ **Security updates** propagate to all instances
- ✅ **New core widgets** available everywhere
- ✅ **Performance optimizations** inherited
- ✅ **Bug fixes** apply platform-wide

## 🚀 Getting Started

For **Core Platform Development**:
```bash
cd agnostyca/
npm install
npm run dev
```

For **Instance Development**:
```bash
# Clone instance repo
git clone https://github.com/yourorg/eduai
cd eduai/
npm install  # Automatically gets @agnostyca/core
npm run dev
```

## 📋 Roadmap

- [ ] Core platform stable release
- [ ] EduAI instance with 35+ education widgets
- [ ] InsAI instance with 12+ insurance widgets
- [ ] InvestAI instance with portfolio widgets
- [ ] HealthAI instance with medical widgets
- [ ] Marketplace for widget sharing between instances