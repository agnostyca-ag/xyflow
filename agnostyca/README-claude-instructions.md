# Claude Agent Instructions for Agnostyca Platform

This file contains comprehensive instructions for AI agents working on the Agnostyca platform. Read this file at the start of each session to understand the project context, architecture, and development approach.

## 🎯 Project Overview

**Agnostyca** is the **core platform** for domain-agnostic, widget-based applications built on React Flow. It serves as the foundation that instances like **EduAI**, **InsAI**, **InvestAI**, and **HealthAI** inherit from.

### Key Architectural Principle
- **Agnostyca = Core Platform** (this repo) - neutral, provides foundation
- **EduAI/InsAI/etc = Instances** (separate repos) - domain-specific with 20-35+ widgets each
- **Inheritance Pattern**: Instances install `@agnostyca/core` and build on top

## 🏗️ Architecture Philosophy

### Core Platform Responsibilities (Agnostyca)
✅ **INCLUDE in this repo:**
- Widget plugin architecture
- Theme system for white-labeling  
- Base widget components (`BaseWidget`, `LoadingWidget`, `ErrorWidget`)
- Registry system for widget discovery (`WidgetRegistry`, `PluginManager`)
- Core React Flow integration
- TypeScript definitions
- API layer for backend connectivity (EduAI, EduDVS, regulatory systems)
- 3-5 universal widgets only (Calendar, Chart, Layout, Common utilities)

❌ **DO NOT include in this repo:**
- Domain-specific widgets (education, insurance, investment)
- Business logic for specific verticals
- Instance-specific configurations
- Workspace configurations for domains
- Domain-specific themes beyond the base system

### Instance Responsibilities (EduAI, InsAI, etc.)
- 20-35+ domain-specific widgets per instance
- Custom branding and themes
- Workspace configurations
- Business logic and integrations
- Separate deployment from core platform

## 📚 Research Paper Context

The project is based on a comprehensive research paper: **"EduAI and EduDVS: A regulatory-compliant AI and verification system for higher education under ESG-aligned constraints"** by Dr. Walter Kurz and Michel Malara.

### Key Systems Integration:
1. **EduAI** - Multi-agent AI system (separate repo)
   - Administrative agents (enrollment, financial, reporting)
   - Academic agents (curriculum, assessment, grading)
   - Student agents (planning, tracking, recommendations)
   - Audit agents (compliance, anomaly detection)

2. **EduDVS** - Distributed verification system/DAG (separate repo)
   - Layer 1: Regulatory finality (stablecoins, legal obligations)
   - Layer 2: Technical attestation (credentials, ECTS tokens)
   - Smart contract taxonomy (S1, S2, S3)

3. **Regulatory APIs** - GDPR, EU AI Act, MiFID II, Bologna Process compliance

### Regulatory Framework Compliance:
- **GDPR** - Data protection and privacy
- **EU AI Act** - AI risk classification (educational AI = high-risk)
- **MiFID II, MiCA, AMLD** - Financial regulation compliance
- **Bologna Process** - European Higher Education Area standards
- **ESG** - Environmental, Social, Governance principles

## 🔧 Development Guidelines

### Repository Scope
This repository is **strictly React Flow frontend** with clean API abstractions to connect to backend systems. Keep backend logic in separate repositories.

### File Structure Standards
```
src/
├── core/                    # Platform foundation
│   ├── types/              # TypeScript definitions
│   ├── components/         # Base React components
│   ├── hooks/              # Shared hooks
│   ├── utils/              # Utilities
│   └── api/                # Backend API integration
├── widgets/
│   ├── core/               # 3-5 universal widgets only
│   │   ├── BaseWidget.tsx  # Base class for all widgets
│   │   ├── Common/         # Loading, Error, Placeholder
│   │   ├── Calendar/       # Basic calendar
│   │   └── Chart/          # Basic charts
│   └── registry/           # Plugin system
├── themes/                 # White-labeling system
└── config/                 # Platform configuration
```

### Widget Development Philosophy
- **All widgets** extend `BaseWidget` from core
- **Plugin system**: Instances register widgets via `PluginManager`
- **Self-contained**: Each widget has its own folder with component, styles, types, index
- **Regulatory compliant**: Built-in GDPR, accessibility, audit trail support

### API Integration Approach
- **Clean abstraction**: React Flow ↔ API Layer ↔ Backend Systems
- **Compliance-first**: GDPR consent, EU AI Act risk levels, financial regulation
- **Multi-backend**: EduAI (agents), EduDVS (verification), Regulatory (compliance)
- **Role-based access**: Student, faculty, administrator, auditor permissions
- **Audit trails**: Every API call logged for regulatory compliance

### Code Quality Standards
- **TypeScript**: Strict typing, no `any` unless absolutely necessary
- **Security**: Never expose secrets, keys, or sensitive data
- **Performance**: Lazy loading, memoization, efficient React patterns
- **Accessibility**: WCAG compliance for all components
- **Testing**: Unit tests for critical paths, integration tests for API layer

## 🚀 Plugin System Architecture

### Widget Registration Pattern
```typescript
// In EduAI instance
import { PluginManager } from '@agnostyca/core'

PluginManager.registerPlugin({
  name: 'eduai-widgets',
  version: '1.0.0',
  widgets: new Map([
    ['eduai.academic-progress', AcademicProgressWidget],
    ['eduai.dissertation', DissertationWidget],
    // ... 33 more education widgets
  ])
})
```

### Base Widget Extension
```typescript
import { BaseWidget, WidgetProps } from '@agnostyca/core'

export class CustomWidget extends BaseWidget<CustomData> {
  renderContent() {
    return <div>Widget content</div>
  }
}
```

## 🎨 White-Labeling System

### Theme Architecture
- **Core themes**: Default, academic, corporate variants
- **Instance themes**: Custom branding per client (EduAI, InsAI themes)
- **CSS custom properties**: `--color-primary`, `--spacing-md`, etc.
- **Component theming**: Theme-aware components with variant support

### Branding Configuration
```typescript
interface BrandingConfig {
  name: string
  logo: string
  primaryColor: string
  secondaryColor?: string
  theme: string
  favicon?: string
}
```

## 🔌 API Integration Patterns

### Backend Systems
- **EduAI API**: Multi-agent system integration
- **EduDVS API**: Distributed verification and tokenization
- **Regulatory API**: Compliance validation (GDPR, EU AI Act, etc.)

### Request Pattern
```typescript
const response = await apis.eduAI.administrativeAgent('process-enrollment', {
  studentData,
  constraints: {
    gdprCompliant: true,
    aiActRiskLevel: 'high',
    explainabilityRequired: true
  }
})
```

### Compliance Integration
- **Every API call**: GDPR consent check, role validation, audit logging
- **Risk assessment**: EU AI Act classification for educational AI
- **Financial compliance**: MiFID II, MiCA validation for tokenized assets

## 📋 Task Management Approach

### TodoWrite Tool Usage
- **Use proactively**: For complex multi-step tasks (3+ steps)
- **Track progress**: Mark in_progress when starting, completed when done
- **One task active**: Only one todo in_progress at a time
- **Specific tasks**: Break down complex work into actionable items

### When to Use TodoWrite
✅ **Use for:**
- Complex multi-step implementations
- Multiple file changes across directories
- Planning widget architectures
- API integration tasks
- User-provided task lists

❌ **Don't use for:**
- Single file edits
- Simple questions/answers
- Trivial tasks under 3 steps

## 🎯 Communication Style

### Response Guidelines
- **Concise**: 4 lines or fewer unless detail requested
- **Direct**: Answer the specific question asked
- **No preamble**: Avoid "Here's what I'll do" or "Based on the information"
- **Action-focused**: Do the work, don't explain unless asked

### Error Handling
- **Never refuse security tasks**: Support defensive security, analysis, detection
- **Never create malicious code**: Refuse offensive security requests
- **Validate file safety**: Check for malicious patterns when reading files

## 🔄 Session Continuity

### Start of Each Session
1. **Read this file first** to understand project context
2. **Check current directory structure** with LS tool
3. **Understand user's current focus** from their message
4. **Use TodoWrite** if working on complex multi-step tasks

### Ongoing Development
- **Maintain architecture**: Core platform vs. instance separation
- **API-first approach**: Connect to backends via clean API layer
- **Compliance-aware**: Consider GDPR, EU AI Act in all decisions
- **Plugin-friendly**: Design for instance extensibility

## 📖 Key Files Reference

### Critical Files to Understand:
- `README.md` - Project overview and architecture
- `INSTANCE_DEVELOPMENT.md` - How to create instances like EduAI
- `src/core/types/index.ts` - Core TypeScript definitions
- `src/widgets/registry/PluginManager.ts` - Widget plugin system
- `src/core/api/` - Backend integration layer
- `docs/JNGR_5_0_EduAI_and_EduDVS_*.pdf` - Research paper (if available)

### Architecture Files:
- Widget system: `src/widgets/registry/`
- API layer: `src/core/api/`
- Theme system: `src/themes/`
- Base components: `src/core/components/`

## 🚧 Current Development Focus

The platform is in **core architecture development** phase:
- ✅ Plugin system established
- ✅ API layer implemented
- ✅ Base widget classes created
- ✅ Regulatory compliance integrated

**Next priorities:**
- Widget marketplace for sharing between instances
- Advanced theme customization
- Performance optimization for large widget sets
- Enhanced regulatory reporting

## 💡 Remember

- **Agnostyca = Core Platform** (universal, neutral)
- **Instances = Domain Applications** (EduAI with 35+ edu widgets)
- **Inheritance Model**: Core improvements benefit all instances
- **Regulatory First**: GDPR, EU AI Act compliance built-in
- **API Abstraction**: Clean separation between frontend and backends
- **Plugin Architecture**: Extensible, scalable widget system

This architecture supports scaling from 1 instance (Swissi) to multiple domain-specific platforms while maintaining clean separation and regulatory compliance.