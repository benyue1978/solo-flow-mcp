/**
 * Task management function prompts for SoloFlow MCP
 * Advanced task management and breakdown functions
 */

// 1. Add Task Prompt (moved from core)
export async function taskAddTaskPrompt(args: {
  taskTitle?: string;
  priority?: string;
  category?: string;
  estimatedTime?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const taskTitle = args.taskTitle || 'New Task';
  const priority = args.priority || 'medium';
  const category = args.category || 'general';
  const estimatedTime = args.estimatedTime || '';
  
  const priorityEmoji = {
    high: '🔴',
    medium: '🟡', 
    low: '🟢'
  }[priority] || '🟡';
  
  const categoryEmoji = {
    frontend: '🎨',
    backend: '⚙️',
    testing: '🧪',
    documentation: '📚',
    deployment: '🚀',
    general: '📋'
  }[category] || '📋';
  
  const newTask = `- [ ] ${priorityEmoji} ${categoryEmoji} ${taskTitle}${estimatedTime ? ` (estimated: ${estimatedTime})` : ''}`;
  
  let response = `📋 Task Addition Guide\n\n`;
  response += `📝 Task Details:\n`;
  response += `   - Title: ${taskTitle}\n`;
  response += `   - Priority: ${priority} ${priorityEmoji}\n`;
  response += `   - Category: ${category} ${categoryEmoji}\n`;
  if (estimatedTime) {
    response += `   - Estimated time: ${estimatedTime}\n`;
  }
  response += `\n`;
  
  response += `## Steps to Add Task:\n\n`;
  
  response += `### 1. List All Documents\n`;
  response += `First, list all existing documents to see what's already there:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current Tasks Document\n`;
  response += `Then, read the existing tasks document:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Update Tasks Document\n`;
  response += `Finally, add the new task to the "To Do" section:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n${newTask}\\n\\n## In Progress\\n\\n## Completed\\n- [x] Project initialization\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Added new task"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Task Format\n`;
  response += `The new task will be formatted as:\n`;
  response += `\`\`\`markdown\n`;
  response += newTask;
  response += `\n\`\`\`\n\n`;
  
  response += `💡 **Note**: Replace "/path/to/your/project" with your actual project path.\n`;
  response += `📝 **Tip**: If the tasks document doesn't exist, the update command will create it.\n`;
  response += `🔄 **Critical Workflow**: Always LIST first, then READ, then UPDATE to ensure you don't lose existing content.\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Task Breakdown - Requirements
export async function taskBreakdownRequirementsPrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `📋 Requirements Breakdown Guide\n\n`;
  response += `🎯 Purpose: Break down requirements into specific development tasks\n\n`;
  
  response += `## Steps to Break Down Requirements:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `First, read the current requirements:\n`;
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
  response += `Check existing tasks:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Breakdown Actions\n`;
  response += `- Analyze each requirement\n`;
  response += `- Break large requirements into smaller tasks\n`;
  response += `- Estimate time for each task\n`;
  response += `- Assign priorities and categories\n`;
  response += `- Create user stories\n\n`;
  
  response += `### 4. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] 🔴 ⚙️ [Task 1] (estimated: 2d)\\n- [ ] 🟡 🎨 [Task 2] (estimated: 1d)\\n\\n## In Progress\\n\\n## Completed\\n- [x] Project initialization\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Requirements breakdown completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Breakdown Tips**:\n`;
  response += `- Break large requirements into smaller, manageable tasks\n`;
  response += `- Estimate time realistically\n`;
  response += `- Assign appropriate priorities\n`;
  response += `- Include acceptance criteria\n`;
  response += `- Consider dependencies between tasks\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 3. Task Breakdown - Architecture
export async function taskBreakdownArchitecturePrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `🏗️ Architecture Breakdown Guide\n\n`;
  response += `🎯 Purpose: Break down architecture into implementation tasks\n\n`;
  
  response += `## Steps to Break Down Architecture:\n\n`;
  
  response += `### 1. Read Architecture Document\n`;
  response += `First, read the current architecture:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current Tasks\n`;
  response += `Check existing tasks:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Breakdown Actions\n`;
  response += `- Analyze each component\n`;
  response += `- Create implementation tasks for each component\n`;
  response += `- Plan integration tasks\n`;
  response += `- Consider technical debt tasks\n`;
  response += `- Estimate development time\n\n`;
  
  response += `### 4. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] 🔴 ⚙️ [Component 1 implementation] (estimated: 3d)\\n- [ ] 🟡 🎨 [Component 2 implementation] (estimated: 2d)\\n- [ ] 🟢 ⚙️ [Integration task] (estimated: 1d)\\n\\n## In Progress\\n\\n## Completed\\n- [x] Project initialization\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Architecture breakdown completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Architecture Breakdown Tips**:\n`;
  response += `- Focus on one component at a time\n`;
  response += `- Consider dependencies between components\n`;
  response += `- Include integration and testing tasks\n`;
  response += `- Plan for technical debt\n`;
  response += `- Estimate realistically based on complexity\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 4. Create Epic
export async function taskCreateEpicPrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `📚 Epic Creation Guide\n\n`;
  response += `🎯 Purpose: Create a large-scale feature epic with multiple stories\n\n`;
  
  response += `## Steps to Create Epic:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Understand the feature requirements:\n`;
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
  response += `Check existing tasks:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Epic Creation Actions\n`;
  response += `- Define epic scope and objectives\n`;
  response += `- Break epic into user stories\n`;
  response += `- Estimate epic timeline\n`;
  response += `- Identify epic dependencies\n`;
  response += `- Plan epic milestones\n\n`;
  
  response += `### 4. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## Epics\\n### [Epic Name]\\n**Objective**: [Epic objective]\\n**Timeline**: [Estimated timeline]\\n\\n#### Stories\\n- [ ] [Story 1] (estimated: 2d)\\n- [ ] [Story 2] (estimated: 3d)\\n- [ ] [Story 3] (estimated: 1d)\\n\\n## To Do\\n- [ ] [Other tasks]\\n\\n## In Progress\\n\\n## Completed\\n- [x] Project initialization\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Epic created"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Epic Creation Tips**:\n`;
  response += `- Keep epics focused on a single business objective\n`;
  response += `- Break epics into manageable stories\n`;
  response += `- Estimate realistically\n`;
  response += `- Consider dependencies and risks\n`;
  response += `- Plan for regular review and adjustment\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 5. Create Story
export async function taskCreateStoryPrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `📖 User Story Creation Guide\n\n`;
  response += `🎯 Purpose: Create detailed user stories with acceptance criteria\n\n`;
  
  response += `## Steps to Create User Story:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Understand the feature requirements:\n`;
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
  response += `Check existing tasks:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Story Creation Actions\n`;
  response += `- Write user story in "As a... I want... So that..." format\n`;
  response += `- Define acceptance criteria\n`;
  response += `- Estimate story points\n`;
  response += `- Identify story dependencies\n`;
  response += `- Plan story implementation\n\n`;
  
  response += `### 4. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] 🔴 ⚙️ [User Story Title] (estimated: 3 story points)\\n  - **As a** [user type] **I want** [feature] **so that** [benefit]\\n  - **Acceptance Criteria**:\\n    - [ ] [Criterion 1]\\n    - [ ] [Criterion 2]\\n    - [ ] [Criterion 3]\\n\\n## In Progress\\n\\n## Completed\\n- [x] Project initialization\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: User story created"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Story Creation Tips**:\n`;
  response += `- Use clear, specific language\n`;
  response += `- Focus on user value\n`;
  response += `- Write testable acceptance criteria\n`;
  response += `- Estimate realistically\n`;
  response += `- Keep stories small and focused\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 6. Estimate Tasks
export async function taskEstimateTasksPrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `⏱️ Task Estimation Guide\n\n`;
  response += `🎯 Purpose: Estimate time and effort for project tasks\n\n`;
  
  response += `## Steps to Estimate Tasks:\n\n`;
  
  response += `### 1. Read Current Tasks\n`;
  response += `Review existing tasks:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Requirements Document\n`;
  response += `Understand task context:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Estimation Actions\n`;
  response += `- Review each task complexity\n`;
  response += `- Consider dependencies and risks\n`;
  response += `- Estimate time realistically\n`;
  response += `- Add buffer for unknowns\n`;
  response += `- Update task estimates\n\n`;
  
  response += `### 4. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] 🔴 ⚙️ [Task 1] (estimated: 2d)\\n- [ ] 🟡 🎨 [Task 2] (estimated: 1d)\\n- [ ] 🟢 ⚙️ [Task 3] (estimated: 3d)\\n\\n## In Progress\\n\\n## Completed\\n- [x] Project initialization\\n\\n## Estimation Summary\\n- Total estimated time: 6 days\\n- High priority tasks: 2\\n- Medium priority tasks: 1\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Task estimates updated"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Estimation Tips**:\n`;
  response += `- Use historical data when available\n`;
  response += `- Consider task complexity and unknowns\n`;
  response += `- Add buffer for unexpected issues\n`;
  response += `- Review estimates with team\n`;
  response += `- Update estimates as you learn more\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
