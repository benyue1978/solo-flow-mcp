/**
 * Role-based function prompts for SoloFlow MCP
 * Specialized functions for different development roles
 */

// 1. Analyst Mode Prompt
export async function roleAnalystModePrompt(args: {}): Promise<{
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
  
  response += `### 3. Read Project Overview\n`;
  response += `Understand project context:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "overview"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Analyst Actions\n`;
  response += `- Identify missing requirements\n`;
  response += `- Clarify ambiguous requirements\n`;
  response += `- Create user stories\n`;
  response += `- Update requirements document\n`;
  response += `- Link requirements to business objectives\n\n`;
  
  response += `### 5. Update Requirements\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements",\n`;
  response += `    "content": "# Updated Requirements\\n\\n## Functional Requirements\\n- [Requirement 1]\\n- [Requirement 2]\\n\\n## User Stories\\n- As a [user], I want [feature] so that [benefit]\\n\\n## Business Objectives\\n- [Objective 1]\\n- [Objective 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Analyst review completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Analyst Tips**:\n`;
  response += `- Always read existing requirements first\n`;
  response += `- Use user story format for new requirements\n`;
  response += `- Link requirements to business objectives\n`;
  response += `- Keep requirements clear and testable\n`;
  response += `- Consider stakeholder perspectives\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Architect Mode Prompt
export async function roleArchitectModePrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `🏗️ Architect Mode Activated\n\n`;
  response += `📋 Role: System Architect\n`;
  response += `🎯 Focus: System Design & Architecture\n\n`;
  
  response += `## Steps to Design System Architecture:\n\n`;
  
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
  response += `Understand system requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Read Current Architecture\n`;
  response += `Review existing architecture:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Architect Actions\n`;
  response += `- Design system components\n`;
  response += `- Select appropriate technologies\n`;
  response += `- Define data flow and interfaces\n`;
  response += `- Plan scalability and performance\n`;
  response += `- Consider security and reliability\n\n`;
  
  response += `### 5. Update Architecture Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture",\n`;
  response += `    "content": "# System Architecture\\n\\n## Overall Architecture\\n[Architecture description]\\n\\n## Tech Stack\\n- Frontend: [Technology]\\n- Backend: [Technology]\\n- Database: [Technology]\\n- Deployment: [Platform]\\n\\n## Component Design\\n- [Component 1]\\n- [Component 2]\\n\\n## Data Flow\\n[Data flow description]\\n\\n## Security Considerations\\n- [Security measure 1]\\n- [Security measure 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Architecture review completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Architect Tips**:\n`;
  response += `- Consider scalability from the start\n`;
  response += `- Document design decisions and rationale\n`;
  response += `- Plan for future maintenance\n`;
  response += `- Balance performance with simplicity\n`;
  response += `- Consider integration points\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 3. Developer Mode Prompt
export async function roleDeveloperModePrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `💻 Developer Mode Activated\n\n`;
  response += `📋 Role: Software Developer\n`;
  response += `🎯 Focus: Code Implementation & Development\n\n`;
  
  response += `## Steps to Implement Features:\n\n`;
  
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
  response += `Understand what to implement:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Read Tasks Document\n`;
  response += `Check current development tasks:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Developer Actions\n`;
  response += `- Implement features according to requirements\n`;
  response += `- Write clean, maintainable code\n`;
  response += `- Add comprehensive tests\n`;
  response += `- Follow coding standards\n`;
  response += `- Update task progress\n\n`;
  
  response += `### 5. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [Remaining tasks]\\n\\n## In Progress\\n- [ ] [Current task]\\n\\n## Completed\\n- [x] [Completed task]\\n- [x] [Another completed task]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Development progress updated"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 6. Update Notes Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes",\n`;
  response += `    "content": "# Project Notes\\n\\n## Development Notes\\n- [Technical decision 1]\\n- [Implementation detail 1]\\n\\n## Issue Records\\n- [Issue 1]\\n\\n## Solutions\\n- [Solution 1]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Development notes added"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Developer Tips**:\n`;
  response += `- Write self-documenting code\n`;
  response += `- Test your code thoroughly\n`;
  response += `- Follow established patterns\n`;
  response += `- Document complex logic\n`;
  response += `- Keep commits atomic and meaningful\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 4. Tester Mode Prompt
export async function roleTesterModePrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `🧪 Tester Mode Activated\n\n`;
  response += `📋 Role: Quality Assurance Tester\n`;
  response += `🎯 Focus: Testing & Quality Assurance\n\n`;
  
  response += `## Steps to Perform Testing:\n\n`;
  
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
  response += `Understand what to test:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Read Test Strategy Document\n`;
  response += `Review testing approach:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Tester Actions\n`;
  response += `- Create test cases based on requirements\n`;
  response += `- Execute functional testing\n`;
  response += `- Perform regression testing\n`;
  response += `- Test edge cases and error scenarios\n`;
  response += `- Document test results and issues\n\n`;
  
  response += `### 5. Update Test Strategy Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy",\n`;
  response += `    "content": "# Test Strategy\\n\\n## Test Objectives\\n- Functional correctness\\n- Performance metrics\\n- Security\\n\\n## Test Types\\n- Unit tests\\n- Integration tests\\n- End-to-end tests\\n- Performance tests\\n\\n## Test Cases\\n- [Test case 1]\\n- [Test case 2]\\n\\n## Test Results\\n- [Result 1]\\n- [Result 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Testing completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 6. Update Notes Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes",\n`;
  response += `    "content": "# Project Notes\\n\\n## Testing Notes\\n- [Test finding 1]\\n- [Test finding 2]\\n\\n## Issue Records\\n- [Bug 1]\\n- [Bug 2]\\n\\n## Solutions\\n- [Fix 1]\\n- [Fix 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Testing notes added"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Tester Tips**:\n`;
  response += `- Test both positive and negative scenarios\n`;
  response += `- Document all test cases and results\n`;
  response += `- Report bugs with clear reproduction steps\n`;
  response += `- Verify fixes thoroughly\n`;
  response += `- Consider performance and security testing\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 5. Project Manager Mode Prompt
export async function roleProjectManagerModePrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `📊 Project Manager Mode Activated\n\n`;
  response += `📋 Role: Project Manager\n`;
  response += `🎯 Focus: Project Management & Coordination\n\n`;
  
  response += `## Steps to Manage Project:\n\n`;
  
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
  
  response += `### 2. Read Project Overview\n`;
  response += `Understand project scope:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "overview"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Read Tasks Document\n`;
  response += `Check project progress:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Read Requirements Document\n`;
  response += `Review project requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 5. Project Manager Actions\n`;
  response += `- Track project progress and milestones\n`;
  response += `- Manage resource allocation\n`;
  response += `- Identify and mitigate risks\n`;
  response += `- Coordinate team activities\n`;
  response += `- Update project status and timeline\n\n`;
  
  response += `### 6. Update Project Overview\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "overview",\n`;
  response += `    "content": "# Project Overview\\n\\n## Project Description\\n[Updated description]\\n\\n## Project Goals\\n- [ ] [Goal 1]\\n- [ ] [Goal 2]\\n\\n## Current Status\\n- Progress: [X]%\\n- Timeline: [Status]\\n- Risks: [Risk assessment]\\n\\n## Core Features\\n- [Feature 1]\\n- [Feature 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Project status updated"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 7. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [Task 1]\\n- [ ] [Task 2]\\n\\n## In Progress\\n- [ ] [Current task]\\n\\n## Completed\\n- [x] [Completed task]\\n\\n## Milestones\\n- [ ] [Milestone 1]\\n- [ ] [Milestone 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Project management update"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Project Manager Tips**:\n`;
  response += `- Keep stakeholders informed of progress\n`;
  response += `- Monitor risks and dependencies\n`;
  response += `- Ensure team has clear priorities\n`;
  response += `- Track metrics and KPIs\n`;
  response += `- Plan for contingencies\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
