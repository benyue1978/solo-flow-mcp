# SoloFlow MCP Enhancement Design

## Overview

Based on analysis of the existing SoloFlow MCP project, this document proposes an enhancement design focused on **enhancing prompts and cursor rules** rather than modifying existing MCP tools. This approach draws from modern software development best practices to provide more powerful document management and collaboration capabilities.

## Design Principles

1. **Maintain MCP Tools Stability** - Existing list, read, update, init operations are sufficient
2. **Enhance Prompts System** - Provide richer functionality through new prompts
3. **Extend Cursor Rules** - Add more rule files to support different scenarios
4. **Generality First** - Use general software development concepts, avoid specific methodology terms
5. **Progressive Implementation** - Implement in phases, ensuring each phase has clear value

## Prompt Classification and Prefix System

As the number of prompts increases, a clear classification and prefix system is needed. Here's the proposed classification scheme:

### Prefix System Design

**Format**: `/soloflow-mcp/{category}/{action}`

**Category Prefixes**:
- `core/` - Core functions (existing 6 prompts)
- `role/` - Role-based functions (5 new roles)
- `task/` - Task management functions (5 new task management)
- `context/` - Context management functions (4 new context management)
- `domain/` - Technical domain functions (5 new technical domains)
- `quality/` - Quality assurance functions (existing 2 quality-related)

### Detailed Classification Scheme

#### 1. Core Functions (core/)
**Existing prompts reclassified**:
- `/soloflow-mcp/core/init-project` - Project initialization
- `/soloflow-mcp/core/create-doc-template` - Create document template
- `/soloflow-mcp/core/add-task` - Add task
- `/soloflow-mcp/core/check-project-status` - Check project status
- `/soloflow-mcp/core/code-review-checklist` - Code review checklist
- `/soloflow-mcp/core/deployment-checklist` - Deployment checklist

#### 2. Role-based Functions (role/)
**New role prompts**:
- `/soloflow-mcp/role/analyst-mode` - Analyst mode
- `/soloflow-mcp/role/architect-mode` - Architect mode
- `/soloflow-mcp/role/developer-mode` - Developer mode
- `/soloflow-mcp/role/tester-mode` - Tester mode
- `/soloflow-mcp/role/project-manager-mode` - Project manager mode

#### 3. Task Management Functions (task/)
**New task management prompts**:
- `/soloflow-mcp/task/breakdown-requirements` - Break down requirements document into specific tasks
- `/soloflow-mcp/task/breakdown-architecture` - Break down architecture document into implementation tasks
- `/soloflow-mcp/task/create-epic` - Create epic-level tasks
- `/soloflow-mcp/task/create-story` - Create user stories
- `/soloflow-mcp/task/estimate-tasks` - Task estimation

#### 4. Context Management Functions (context/)
**New context management prompts**:
- `/soloflow-mcp/context/link-documents` - Link related documents
- `/soloflow-mcp/context/update-context` - Update document context
- `/soloflow-mcp/context/trace-dependencies` - Trace document dependencies
- `/soloflow-mcp/context/sync-documents` - Sync related documents

#### 5. Technical Domain Functions (domain/)
**New technical domain prompts**:
- `/soloflow-mcp/domain/frontend-focus` - Frontend development focus mode
- `/soloflow-mcp/domain/backend-focus` - Backend development focus mode
- `/soloflow-mcp/domain/fullstack-focus` - Fullstack development focus mode
- `/soloflow-mcp/domain/api-design` - API design mode
- `/soloflow-mcp/domain/database-design` - Database design mode

#### 6. Quality Assurance Functions (quality/)
**Existing quality-related prompts reclassified**:
- `/soloflow-mcp/quality/code-review-checklist` - Code review checklist
- `/soloflow-mcp/quality/deployment-checklist` - Deployment checklist

### Implementation Approach

#### MCP Protocol Limitations and Solutions

**MCP Protocol Limitations**:
- MCP protocol prompt registration is flat structure
- Does not support path separators (like `/`)
- Does not support hierarchical organization

**Solution**:
Simulate directory structure through naming conventions and mapping systems, providing directory-like experience at the user interface level.

#### File Structure
```
src/
├── prompts/
│   ├── index.ts              # Main entry, export all prompts
│   ├── categories.ts         # Category definitions
│   ├── mapping.ts            # Path mapping system
│   ├── core-prompts.ts       # Core function prompts
│   ├── role-prompts.ts       # Role-based prompts
│   ├── task-prompts.ts       # Task management prompts
│   ├── context-prompts.ts    # Context management prompts
│   ├── domain-prompts.ts     # Technical domain prompts
│   └── quality-prompts.ts    # Quality assurance prompts
```

#### Path Mapping System
```typescript
// src/prompts/mapping.ts
export const PROMPT_MAPPING = {
  // User-friendly paths -> Actual prompt names
  "core/init-project": "core-init-project",
  "core/create-doc-template": "core-create-doc-template", 
  "core/add-task": "core-add-task",
  "core/check-project-status": "core-check-project-status",
  "core/code-review-checklist": "core-code-review-checklist",
  "core/deployment-checklist": "core-deployment-checklist",
  
  // Role-based functions
  "role/analyst-mode": "role-analyst-mode",
  "role/architect-mode": "role-architect-mode",
  "role/developer-mode": "role-developer-mode",
  "role/tester-mode": "role-tester-mode",
  "role/project-manager-mode": "role-project-manager-mode",
  
  // Task management functions
  "task/breakdown-requirements": "task-breakdown-requirements",
  "task/breakdown-architecture": "task-breakdown-architecture",
  "task/create-epic": "task-create-epic",
  "task/create-story": "task-create-story",
  "task/estimate-tasks": "task-estimate-tasks",
  
  // Context management functions
  "context/link-documents": "context-link-documents",
  "context/update-context": "context-update-context",
  "context/trace-dependencies": "context-trace-dependencies",
  "context/sync-documents": "context-sync-documents",
  
  // Technical domain functions
  "domain/frontend-focus": "domain-frontend-focus",
  "domain/backend-focus": "domain-backend-focus",
  "domain/fullstack-focus": "domain-fullstack-focus",
  "domain/api-design": "domain-api-design",
  "domain/database-design": "domain-database-design",
  
  // Quality assurance functions
  "quality/code-review-checklist": "quality-code-review-checklist",
  "quality/deployment-checklist": "quality-deployment-checklist"
};

// Reverse mapping: Actual names -> User-friendly paths
export const PROMPT_REVERSE_MAPPING = Object.fromEntries(
  Object.entries(PROMPT_MAPPING).map(([key, value]) => [value, key])
);
```

#### Prompt Registration System
```typescript
// src/prompts/index.ts
export const PROMPT_REGISTRY = {
  // Core functions - Register with actual names
  'core-init-project': initProjectPrompt,
  'core-create-doc-template': createDocTemplatePrompt,
  'core-add-task': addTaskPrompt,
  'core-check-project-status': checkProjectStatusPrompt,
  'core-code-review-checklist': codeReviewChecklistPrompt,
  'core-deployment-checklist': deploymentChecklistPrompt,
  
  // Role-based functions
  'role-analyst-mode': analystModePrompt,
  'role-architect-mode': architectModePrompt,
  'role-developer-mode': developerModePrompt,
  'role-tester-mode': testerModePrompt,
  'role-project-manager-mode': projectManagerModePrompt,
  
  // Task management functions
  'task-breakdown-requirements': breakdownRequirementsPrompt,
  'task-breakdown-architecture': breakdownArchitecturePrompt,
  'task-create-epic': createEpicPrompt,
  'task-create-story': createStoryPrompt,
  'task-estimate-tasks': estimateTasksPrompt,
  
  // Context management functions
  'context-link-documents': linkDocumentsPrompt,
  'context-update-context': updateContextPrompt,
  'context-trace-dependencies': traceDependenciesPrompt,
  'context-sync-documents': syncDocumentsPrompt,
  
  // Technical domain functions
  'domain-frontend-focus': frontendFocusPrompt,
  'domain-backend-focus': backendFocusPrompt,
  'domain-fullstack-focus': fullstackFocusPrompt,
  'domain-api-design': apiDesignPrompt,
  'domain-database-design': databaseDesignPrompt,
  
  // Quality assurance functions
  'quality-code-review-checklist': codeReviewChecklistPrompt,
  'quality-deployment-checklist': deploymentChecklistPrompt
};
```

#### Prompt Category Management
```typescript
// src/prompts/categories.ts
export const PROMPT_CATEGORIES = {
  core: {
    name: 'Core Functions',
    description: 'Essential project management functions',
    prompts: ['init-project', 'create-doc-template', 'add-task', 'check-project-status', 'code-review-checklist', 'deployment-checklist']
  },
  role: {
    name: 'Role-based Functions',
    description: 'Specialized functions for different development roles',
    prompts: ['analyst-mode', 'architect-mode', 'developer-mode', 'tester-mode', 'project-manager-mode']
  },
  task: {
    name: 'Task Management',
    description: 'Advanced task management and breakdown functions',
    prompts: ['breakdown-requirements', 'breakdown-architecture', 'create-epic', 'create-story', 'estimate-tasks']
  },
  context: {
    name: 'Context Management',
    description: 'Document context and dependency management',
    prompts: ['link-documents', 'update-context', 'trace-dependencies', 'sync-documents']
  },
  domain: {
    name: 'Domain-specific Functions',
    description: 'Specialized functions for different technical domains',
    prompts: ['frontend-focus', 'backend-focus', 'fullstack-focus', 'api-design', 'database-design']
  },
  quality: {
    name: 'Quality Assurance',
    description: 'Quality assurance and review functions',
    prompts: ['code-review-checklist', 'deployment-checklist']
  }
};
```

### User Experience

#### Usage in Cursor
Users can use categorized prompts in the following ways:

1. **Full Path**: `/soloflow-mcp/core/init-project`
2. **Category Browse**: `/soloflow-mcp/core/` then select specific function
3. **Smart Suggestions**: Type `/soloflow-mcp/` to show all categories

#### Path Resolution System
```typescript
// src/prompts/resolver.ts
export function resolvePromptPath(userPath: string): string {
  // User input: /soloflow-mcp/core/init-project
  // Returns: core-init-project (actual registered name)
  
  const path = userPath.replace('/soloflow-mcp/', '');
  return PROMPT_MAPPING[path] || path;
}

export function getPromptDisplayName(actualName: string): string {
  // Actual name: core-init-project
  // Returns: core/init-project (user-friendly display)
  
  return PROMPT_REVERSE_MAPPING[actualName] || actualName;
}
```

#### Help System
```typescript
// Help prompts
export const HELP_PROMPTS = {
  'help/categories': 'Show all available prompt categories',
  'help/core': 'Show core function prompts',
  'help/role': 'Show role-based prompts',
  'help/task': 'Show task management prompts',
  'help/context': 'Show context management prompts',
  'help/domain': 'Show technical domain prompts',
  'help/quality': 'Show quality assurance prompts'
};
```

### Migration Strategy

#### Phase 1: Refactor Existing Prompts
1. Move existing 6 prompts to `core/` category
2. Create path mapping system
3. Update all references and documentation
4. Maintain backward compatibility

#### Phase 2: Add New Categories
1. Create new category files
2. Implement new prompts
3. Update registration system and mappings
4. Implement path resolution functionality

#### Phase 3: Improve Help System
1. Implement category help functionality
2. Add smart suggestions
3. Complete documentation
4. Test path resolution system

## Current Status Analysis

### Existing Prompts (6 core prompts)
- `init-project` - Project initialization
- `create-doc-template` - Create document template
- `add-task` - Add task
- `check-project-status` - Check project status
- `code-review-checklist` - Code review checklist
- `deployment-checklist` - Deployment checklist

### Existing Cursor Rules
- `soloflow.mdc` - SoloFlow MCP service guidelines
- `git_commit.mdc` - Git commit standards

## Enhancement Plan

### 1. Role-based Prompts (General Software Development Roles)

**New role-specific prompts**:
- `/soloflow-mcp/role/analyst-mode` - Analyst mode, focused on requirements analysis
- `/soloflow-mcp/role/architect-mode` - Architect mode, focused on system design  
- `/soloflow-mcp/role/developer-mode` - Developer mode, focused on code implementation
- `/soloflow-mcp/role/tester-mode` - Tester mode, focused on testing strategy
- `/soloflow-mcp/role/project-manager-mode` - Project manager mode, focused on project management

**Implementation**:
```typescript
export const ROLE_PROMPTS = {
  'analyst-mode': 'Switch to analyst mode, focused on requirements analysis, user story creation and business logic organization',
  'architect-mode': 'Switch to architect mode, focused on system design, technology selection and architectural decisions',
  'developer-mode': 'Switch to developer mode, focused on code implementation, technical details and best practices',
  'tester-mode': 'Switch to tester mode, focused on testing strategy, quality assurance and defect management',
  'project-manager-mode': 'Switch to project manager mode, focused on project management, progress tracking and team collaboration'
};
```

### 2. Task Management Related Prompts

**New task management prompts**:
- `/soloflow-mcp/task/breakdown-requirements` - Break down requirements document into specific tasks
- `/soloflow-mcp/task/breakdown-architecture` - Break down architecture document into implementation tasks
- `/soloflow-mcp/task/create-epic` - Create epic-level tasks
- `/soloflow-mcp/task/create-story` - Create user stories
- `/soloflow-mcp/task/estimate-tasks` - Task estimation

**Implementation**:
```typescript
export const TASK_PROMPTS = {
  'breakdown-requirements': 'Break down requirements document into specific development tasks and user stories',
  'breakdown-architecture': 'Break down architecture document into implementation tasks and technical debt',
  'create-epic': 'Create epic-level tasks, organize related feature modules',
  'create-story': 'Create user stories, define specific functional requirements',
  'estimate-tasks': 'Perform time estimation and priority sorting for tasks'
};
```

### 3. Context Management Related Prompts

**New context management prompts**:
- `/soloflow-mcp/context/link-documents` - Link related documents
- `/soloflow-mcp/context/update-context` - Update document context
- `/soloflow-mcp/context/trace-dependencies` - Trace document dependencies
- `/soloflow-mcp/context/sync-documents` - Sync related documents

### 4. Enhanced Cursor Rules (General Software Development Rules)

**New rule files**:
- `agile-development.mdc` - Agile development best practices
- `code-quality.mdc` - Code quality and review standards
- `documentation-standards.mdc` - Documentation writing and maintenance standards
- `project-management.mdc` - Project management rules

### 5. Technical Domain Specific Prompts

**New technical domain prompts**:
- `/soloflow-mcp/domain/frontend-focus` - Frontend development focus mode
- `/soloflow-mcp/domain/backend-focus` - Backend development focus mode
- `/soloflow-mcp/domain/fullstack-focus` - Fullstack development focus mode
- `/soloflow-mcp/domain/api-design` - API design mode
- `/soloflow-mcp/domain/database-design` - Database design mode

## Implementation Plan

### Phase 1: Prompt Classification Refactoring (High Priority)

**Goal**: Refactor existing prompts and establish classification system
**Time**: 1 week
**Deliverables**:
- Refactor existing 6 prompts to core/ category
- Establish classification system
- Update documentation and references

**Implementation Steps**:
1. Create new category file structure
2. Move existing prompts to core/ category
3. Update all references and documentation
4. Test classification system

### Phase 2: Role-based Prompts (High Priority)

**Goal**: Add 5 general role prompts
**Time**: 1-2 weeks
**Deliverables**:
- 5 new role prompts
- Role switching functionality
- Role-specific document operation preferences

**Implementation Steps**:
1. Add role prompt definitions in `src/prompts/role-prompts.ts`
2. Add role-specific content in `src/resources/soloflow-content.ts`
3. Update `init.ts` tool to support role rule file creation
4. Test role switching functionality

### Phase 3: Enhanced Cursor Rules (Medium Priority)

**Goal**: Add 4 new rule files
**Time**: 1 week
**Deliverables**:
- `agile-development.mdc` - Agile development rules
- `code-quality.mdc` - Code quality rules
- `documentation-standards.mdc` - Documentation standards rules
- `project-management.mdc` - Project management rules

**Implementation Steps**:
1. Create 4 new rule file contents
2. Add rule file contents in `src/resources/`
3. Update `init.ts` tool to support new rule files
4. Test rule file creation and loading

### Phase 4: Task Management Functions (Medium Priority)

**Goal**: Add 5 task management prompts
**Time**: 2 weeks
**Deliverables**:
- 5 new task management prompts
- Task breakdown functionality
- Task estimation functionality

**Implementation Steps**:
1. Add task management prompts in `src/prompts/task-prompts.ts`
2. Implement task breakdown logic
3. Implement task estimation logic
4. Test task management functionality

### Phase 5: Context Management Functions (Low Priority)

**Goal**: Add 4 context management prompts
**Time**: 2 weeks
**Deliverables**:
- 4 new context management prompts
- Document linking functionality
- Dependency tracking functionality

**Implementation Steps**:
1. Add context management prompts in `src/prompts/context-prompts.ts`
2. Implement document linking logic
3. Implement dependency tracking logic
4. Test context management functionality

### Phase 6: Technical Domain Functions (Low Priority)

**Goal**: Add 5 technical domain prompts
**Time**: 1 week
**Deliverables**:
- 5 new technical domain prompts
- Domain-specific document templates

**Implementation Steps**:
1. Add technical domain prompts in `src/prompts/domain-prompts.ts`
2. Create domain-specific document templates
3. Test technical domain functionality

## Technical Implementation Details

### File Structure (src/prompts/)

```
src/
├── prompts/
│   ├── index.ts              # Main entry, export all prompts
│   ├── categories.ts         # Category definitions
│   ├── mapping.ts            # Path mapping system
│   ├── resolver.ts           # Path resolution system
│   ├── core-prompts.ts       # Core function prompts
│   ├── role-prompts.ts       # Role-based prompts
│   ├── task-prompts.ts       # Task management prompts
│   ├── context-prompts.ts    # Context management prompts
│   ├── domain-prompts.ts     # Technical domain prompts
│   └── quality-prompts.ts    # Quality assurance prompts
├── resources/
│   ├── soloflow-content.ts   # Existing content
│   ├── agile-development.ts  # New: Agile development rule content
│   ├── code-quality.ts       # New: Code quality rule content
│   ├── documentation-standards.ts # New: Documentation standards rule content
│   └── project-management.ts # New: Project management rule content
└── tools/
    └── init.ts               # Update: Support new rule file creation
```

### Prompt Implementation Pattern

```typescript
// src/prompts/role-prompts.ts
export const ROLE_PROMPTS = {
  'analyst-mode': {
    description: 'Switch to analyst mode, focused on requirements analysis',
    instructions: 'You are now a project analyst, focused on requirements analysis, user story creation and business logic organization',
    focus: ['requirements', 'overview'],
    output: 'analyst-mode'
  },
  'architect-mode': {
    description: 'Switch to architect mode, focused on system design',
    instructions: 'You are now a system architect, focused on system design, technology selection and architectural decisions',
    focus: ['system_architecture', 'deployment'],
    output: 'architect-mode'
  }
  // ... other roles
};
```

### Rule File Implementation Pattern

```typescript
// src/resources/agile-development.ts
export const AGILE_DEVELOPMENT_CONTENT = `---
description: Agile development best practices and rules
globs: **/*.{ts,js,py,java,go,rs}
alwaysApply: true
---

# Agile Development Rules

## Core Principles
- Deliver working software continuously
- Welcome changing requirements
- Deliver frequently
- Business people and developers work together
- Face-to-face communication
- Working software is the primary measure of progress
- Maintain sustainable development pace
- Technical excellence and good design
- Simplicity
- Self-organizing teams
- Regular reflection and adjustment

## Development Practices
- Use user stories to define requirements
- Implement continuous integration
- Write automated tests
- Conduct code reviews
- Keep technical debt under control

## Project Management
- Use Kanban or Scrum methods
- Regular sprint planning meetings
- Daily standups
- Sprint retrospectives
- Product backlog management
`;
```

## Testing Strategy

### Unit Tests
- Add tests for each new prompt
- Add tests for new rule file contents
- Add tests for tool updates

### Integration Tests
- Test role switching functionality
- Test task breakdown functionality
- Test rule file creation functionality

### User Tests
- Test prompt usage in Cursor
- Test rule file loading
- Test document operation workflow

## Risk Assessment

### Technical Risks
- **Low Risk**: Prompt implementation is relatively simple
- **Medium Risk**: Rule file content needs careful design
- **Low Risk**: Existing MCP tools don't need modification

### User Acceptance Risks
- **Low Risk**: Based on existing functionality enhancement
- **Medium Risk**: New features require user learning
- **Low Risk**: Progressive implementation

### Maintenance Risks
- **Low Risk**: Modular design
- **Medium Risk**: Need to maintain more files
- **Low Risk**: Backward compatibility

## Success Criteria

### Functional Criteria
- All new prompts work properly
- All new rule files created correctly
- Role switching functionality smooth
- Task breakdown functionality accurate

### Performance Criteria
- Prompt response time < 1 second
- Rule file loading time < 500ms
- Memory usage increase < 10%

### User Criteria
- Users can easily use new features
- Documentation quality improved
- Development efficiency increased

## Future Planning

### Short-term Planning (1-2 months)
- Complete phases 1 and 2
- Collect user feedback
- Optimize existing functionality

### Medium-term Planning (3-6 months)
- Complete phases 3 and 4
- Add more domain-specific functionality
- Consider community contributions

### Long-term Planning (6+ months)
- Complete phase 5
- Consider internationalization support
- Explore more integration possibilities

## Conclusion

This enhancement design maintains the stability of existing MCP tools while providing richer functionality through enhanced prompts and cursor rules. 
The plan adopts progressive implementation with clear value and deliverables for each phase. 
Through role-based, task management, context management and other functional enhancements, SoloFlow MCP will become a more powerful project document management tool.

### Key Innovations

1. **MCP Protocol Compatibility** - Through naming conventions and mapping systems, provide user-friendly directory-like experience while maintaining MCP protocol flat structure
2. **Path Mapping System** - Implement bidirectional mapping between user-friendly paths and actual prompt names
3. **Progressive Migration** - Ensure existing functionality is unaffected, smooth transition to new classification system
4. **Extensible Architecture** - Provide clear classification framework for future prompt extensions

Through the introduction of clear classification and prefix systems, users can more easily find and use the required prompts, while providing a good foundation for future extensions. This solution both addresses MCP protocol limitations and provides the directory-like organization that users expect.

## Prompt Design Principles

### Principle Overview

This section outlines simple and effective design principles for creating prompts in SoloFlow MCP. Prompts are primarily **text generators** that provide guidance to users on how to use the MCP tools effectively.

### Core Design Principles

#### 1. **Text-First Approach**
- Prompts generate clear, actionable text guidance
- Focus on content quality, not complex code structure
- Provide step-by-step instructions with proper JSON examples
- Include helpful tips and best practices

#### 2. **Document Workflow Integration**
- Always follow the LIST → READ → UPDATE workflow
- Provide correct JSON format for each MCP tool
- Explain the purpose of each step
- Include error handling suggestions

#### 3. **Role-Based Content**
- Tailor text content to specific roles (analyst, developer, etc.)
- Use appropriate language and focus for each role
- Provide role-specific tips and examples
- Maintain consistent role behavior across related prompts

#### 4. **User Experience Focus**
- Clear, readable text instructions
- Helpful examples and templates
- Support both beginners and experts
- Progressive guidance with tips

### Simple Implementation Pattern

#### Basic Prompt Structure
```typescript
export async function examplePrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `🎯 Prompt Title\n\n`;
  response += `📋 Description of what this prompt does\n\n`;
  
  response += `## Steps to Execute:\n\n`;
  
  // Step 1: List Documents
  response += `### 1. List All Documents\n`;
  response += `First, check what documents exist:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  // Step 2: Read Documents
  response += `### 2. Read Relevant Documents\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  // Step 3: Update Documents
  response += `### 3. Update Documents\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements",\n`;
  response += `    "content": "Updated content"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Tips**:\n`;
  response += `- Always read existing content first\n`;
  response += `- Use clear, descriptive content\n`;
  response += `- Follow project conventions\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
```

### Role-Based Prompt Example

#### Analyst Mode Prompt
```typescript
export async function analystModePrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `🎯 Analyst Mode Activated\n\n`;
  response += `📋 Role: Business Analyst\n`;
  response += `🎯 Focus: Requirements Analysis\n\n`;
  
  response += `## Steps to Analyze Requirements:\n\n`;
  
  response += `### 1. List All Documents\n`;
  response += `First, check what documents exist:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Requirements Document\n`;
  response += `Analyze current requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Analyst Actions\n`;
  response += `- Identify missing requirements\n`;
  response += `- Clarify ambiguous requirements\n`;
  response += `- Create user stories\n`;
  response += `- Update requirements document\n\n`;
  
  response += `### 4. Update Requirements\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements",\n`;
  response += `    "content": "# Updated Requirements\\n\\n## New Requirements\\n- [New requirement 1]\\n- [New requirement 2]\\n\\n## User Stories\\n- As a [user], I want [feature] so that [benefit]"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Analyst Tips**:\n`;
  response += `- Always read existing requirements first\n`;
  response += `- Use user story format for new requirements\n`;
  response += `- Link requirements to business objectives\n`;
  response += `- Keep requirements clear and testable\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
```

### Best Practices

#### 1. **Clear Structure**
- Always follow LIST → READ → UPDATE workflow
- Include clear step-by-step instructions
- Provide correct JSON format examples
- Add helpful tips and best practices

#### 2. **Role-Specific Content**
- Use appropriate language for each role
- Focus on role-specific tasks and concerns
- Provide role-relevant examples and tips
- Maintain consistent role behavior

#### 3. **Document Integration**
- Reference specific document types appropriately
- Explain why each document is important
- Provide document-specific guidance
- Include document templates when helpful

#### 4. **User Experience**
- Write clear, readable instructions
- Include helpful examples
- Support both beginners and experts
- Provide progressive guidance

#### 5. **Error Prevention**
- Include common troubleshooting tips
- Explain what to do if documents don't exist
- Provide fallback suggestions
- Include validation reminders

### Implementation Checklist

#### Before Implementation
- [ ] Define prompt purpose and target users
- [ ] Identify required document types
- [ ] Plan the user workflow
- [ ] Design the text content structure

#### During Implementation
- [ ] Follow the standard prompt structure
- [ ] Include proper JSON examples
- [ ] Add role-specific content
- [ ] Include helpful tips and best practices

#### After Implementation
- [ ] Test the text content for clarity
- [ ] Verify JSON examples are correct
- [ ] Review for consistency with other prompts
- [ ] Update documentation

### Example: Task Management Prompt

```typescript
export async function taskBreakdownPrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `📋 Task Breakdown Guide\n\n`;
  response += `🎯 Purpose: Break down requirements into manageable tasks\n\n`;
  
  response += `## Steps to Break Down Tasks:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current Tasks\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Create New Tasks\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [New task 1]\\n- [ ] [New task 2]\\n\\n## In Progress\\n\\n## Completed\\n- [x] [Completed task]"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Task Breakdown Tips**:\n`;
  response += `- Break large requirements into smaller tasks\n`;
  response += `- Estimate time for each task\n`;
  response += `- Assign priorities (high, medium, low)\n`;
  response += `- Include acceptance criteria\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
```

This simplified approach focuses on generating clear, useful text guidance that helps users effectively use SoloFlow MCP tools while maintaining consistency and quality across all prompts.
