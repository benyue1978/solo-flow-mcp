import { DocType } from '../types/docTypes.js';

// 1. Project Initialization Prompt
export async function initProjectPrompt(args: {}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const projectName = "My Project";
  
  let response = `🚀 Project Initialization Guide\n\n`;
  response += `📋 Project Name: ${projectName}\n\n`;
  
  response += `## Steps to Initialize Your Project:\n\n`;
  
  response += `### 1. Initialize Project Configuration\n`;
  response += `First, run the init command to set up your project:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "init",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;

  response += `### 2. List All Documents\n`;
  response += `Second, list all existing documents to see what's already there:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Read/Update Basic Documents\n`;
  response += `After that , create these essential documents, update if aleady existing:\n\n`;
  
  const templates = getDocumentTemplates();
  for (const [type, content] of Object.entries(templates)) {
    response += `\`\`\`json\n`;
    response += `{\n`;
    response += `  "tool": "read",\n`;
    response += `  "args": {\n`;
    response += `    "projectRoot": "/path/to/your/project",\n`;
    response += `    "type": "${type}",\n`;
    response += `  }\n`;
    response += `}\n`;
    response += `\`\`\`\n\n`;

    response += `#### ${type.charAt(0).toUpperCase() + type.slice(1)} Document\n`;
    response += `\`\`\`json\n`;
    response += `{\n`;
    response += `  "tool": "update",\n`;
    response += `  "args": {\n`;
    response += `    "projectRoot": "/path/to/your/project",\n`;
    response += `    "type": "${type}",\n`;
    response += `    "content": ${JSON.stringify(content)}\n`;
    response += `  }\n`;
    response += `}\n`;
    response += `\`\`\`\n\n`;
  }
  
  response += `### 3. Verify Setup\n`;
  response += `Check that your documents were created:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Note**: Replace "/path/to/your/project" with your actual project path.\n`;
  response += `📝 **Tip**: If a document already exists, the update command will preserve existing content.\n`;
  response += `🔄 **Critical Workflow**: Always LIST first, then READ, then UPDATE to ensure you don't lose existing content.\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Create Document Template Prompt
export async function createDocTemplatePrompt(args: {
  docType: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const docType = args.docType as DocType;
  const projectName = "Project";
  
  let response = `📄 Document Template Creation Guide\n\n`;
  response += `📋 Document Type: ${docType}\n`;
  response += `📋 Project Name: ${projectName}\n\n`;
  
  response += `## Steps to Create/Update Document:\n\n`;
  
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
  
  response += `### 2. Read Existing Document\n`;
  response += `Then, check if the specific document already exists:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "${docType}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Create/Update Document\n`;
  response += `Finally, use this template to create or update the document:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "${docType}",\n`;
  response += `    "content": ${JSON.stringify(getDocumentTemplate(docType))}\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Template Content Preview\n`;
  response += `Here's what the ${docType} document will contain:\n`;
  response += `\`\`\`markdown\n`;
  response += getDocumentTemplate(docType);
  response += `\n\`\`\`\n\n`;
  
  response += `💡 **Note**: Replace "/path/to/your/project" with your actual project path.\n`;
  response += `📝 **Tip**: If the document already exists, the update command will preserve existing content.\n`;
  response += `🔄 **Critical Workflow**: Always LIST first, then READ, then UPDATE to ensure you don't lose existing content.\n`;
  response += `📋 **Available Document Types**: overview, requirements, system_architecture, test_strategy, ui_design, tasks, deployment, notes\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 3. Add Task Prompt
export async function addTaskPrompt(args: {
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

// 4. Check Project Status Prompt
export async function checkProjectStatusPrompt(): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  let response = `🔍 Project Status Analysis Guide\n\n`;
  
  response += `## Steps to Analyze Project Status:\n\n`;
  
  response += `### 1. List All Documents\n`;
  response += `First, check what documents exist in your project:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Check Required Documents\n`;
  response += `Read each required document to analyze completeness:\n\n`;
  
  const requiredDocs: DocType[] = ['overview', 'requirements', 'tasks'];
  for (const docType of requiredDocs) {
    response += `#### ${docType.charAt(0).toUpperCase() + docType.slice(1)} Document\n`;
    response += `\`\`\`json\n`;
    response += `{\n`;
    response += `  "tool": "read",\n`;
    response += `  "args": {\n`;
    response += `    "projectRoot": "/path/to/your/project",\n`;
    response += `    "type": "${docType}"\n`;
    response += `  }\n`;
    response += `}\n`;
    response += `\`\`\`\n\n`;
  }
  
  response += `### 3. Analysis Framework\n`;
  response += `Use this framework to analyze your project:\n\n`;
  
  response += `#### Document Completeness\n`;
  response += `- Count existing documents vs required documents\n`;
  response += `- Calculate completeness percentage\n`;
  response += `- Identify missing documents\n\n`;
  
  response += `#### Task Progress Analysis\n`;
  response += `- Count completed tasks (marked with [x])\n`;
  response += `- Count total tasks (marked with [ ] or [x])\n`;
  response += `- Calculate progress percentage\n`;
  response += `- Identify remaining work\n\n`;
  
  response += `#### Suggestions\n`;
  response += `- Create missing documents\n`;
  response += `- Update task progress\n`;
  response += `- Add more detailed requirements\n`;
  response += `- Review and update project overview\n\n`;
  
  response += `💡 **Note**: Replace "/path/to/your/project" with your actual project path.\n`;
  response += `📊 **Metrics**: Focus on document completeness and task completion rates.\n`;
  response += `🔄 **Workflow**: Read each document, analyze content, then provide recommendations.\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 5. Code Review Checklist Prompt
export async function codeReviewChecklistPrompt(args: {
  codeLanguage?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const codeLanguage = args.codeLanguage || 'General';
  
  let response = `🔍 Code Review Checklist\n\n`;
  response += `**Programming Language**: ${codeLanguage}\n`;
  response += `**Review Date**: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## 📋 Review Items\n\n`;
  response += `### 1. Code Quality\n`;
  response += `- [ ] Variable and function names are clear\n`;
  response += `- [ ] Code structure is clear and understandable\n`;
  response += `- [ ] Comments are sufficient and accurate\n`;
  response += `- [ ] Code formatting follows standards\n`;
  response += `- [ ] No duplicate code\n\n`;
  
  response += `### 2. Functional Correctness\n`;
  response += `- [ ] Expected functionality is implemented\n`;
  response += `- [ ] Edge cases are handled correctly\n`;
  response += `- [ ] Error handling is comprehensive\n`;
  response += `- [ ] Input validation is sufficient\n`;
  response += `- [ ] Output format is correct\n\n`;
  
  response += `### 3. Performance Considerations\n`;
  response += `- [ ] Algorithm complexity is reasonable\n`;
  response += `- [ ] Memory usage is efficient\n`;
  response += `- [ ] Database queries are optimized\n`;
  response += `- [ ] Avoid unnecessary computations\n\n`;
  
  response += `### 4. Security\n`;
  response += `- [ ] Input data is validated\n`;
  response += `- [ ] Sensitive information is protected\n`;
  response += `- [ ] Access control is comprehensive\n`;
  response += `- [ ] Logs don't contain sensitive information\n\n`;
  
  response += `### 5. Maintainability\n`;
  response += `- [ ] Code is modular\n`;
  response += `- [ ] Dependencies are clear\n`;
  response += `- [ ] Test coverage is sufficient\n`;
  response += `- [ ] Documentation is complete\n\n`;
  
  response += `## ✅ Review Result\n`;
  response += `- [ ] Approved\n`;
  response += `- [ ] Changes Requested\n`;
  response += `- [ ] Rejected\n\n`;
  
  response += `## 💡 Improvement Suggestions\n`;
  response += `1. \n`;
  response += `2. \n`;
  response += `3. \n\n`;
  
  response += `**Note**: After completing the code review, remember to update relevant documentation.\n\n`;
  response += `### 6. Documentation Update\n`;
  response += `Don't forget to update your project documentation:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n`;
  response += `Then read and update relevant documents like tasks.md or notes.md.`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 6. Deployment Checklist Prompt
export async function deploymentChecklistPrompt(args: {
  environment?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const environment = args.environment || 'Production';
  
  let response = `🚀 Deployment Checklist\n\n`;
  response += `**Target Environment**: ${environment}\n`;
  response += `**Check Date**: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## 📋 Pre-deployment Checks\n\n`;
  response += `### 1. Code Quality\n`;
  response += `- [ ] Code review completed\n`;
  response += `- [ ] All tests passed\n`;
  response += `- [ ] Code coverage meets standards\n`;
  response += `- [ ] Static code analysis passed\n\n`;
  
  response += `### 2. Functional Validation\n`;
  response += `- [ ] Core functionality works\n`;
  response += `- [ ] User flows are complete\n`;
  response += `- [ ] Error handling is correct\n`;
  response += `- [ ] Data consistency verified\n\n`;
  
  response += `### 3. Performance Checks\n`;
  response += `- [ ] Response time is normal\n`;
  response += `- [ ] Memory usage is reasonable\n`;
  response += `- [ ] Database performance is normal\n`;
  response += `- [ ] Concurrent processing capability\n\n`;
  
  response += `### 4. Security Checks\n`;
  response += `- [ ] Security vulnerability scan passed\n`;
  response += `- [ ] Dependency security check\n`;
  response += `- [ ] Permission configuration is correct\n`;
  response += `- [ ] Data encryption verified\n\n`;
  
  response += `### 5. Environment Configuration\n`;
  response += `- [ ] Environment variables configured correctly\n`;
  response += `- [ ] Database connection is normal\n`;
  response += `- [ ] Third-party service integration\n`;
  response += `- [ ] Monitoring and alerting configured\n\n`;
  
  response += `### 6. Documentation Updates\n`;
  response += `- [ ] API documentation updated\n`;
  response += `- [ ] User manual updated\n`;
  response += `- [ ] Deployment documentation updated\n`;
  response += `- [ ] Change log recorded\n\n`;
  
  response += `## ✅ Deployment Decision\n`;
  response += `- [ ] All checks passed\n`;
  response += `- [ ] Risk assessment acceptable\n`;
  response += `- [ ] Rollback plan prepared\n`;
  response += `- [ ] Final approval\n\n`;
  
  response += `## 🔄 Post-deployment Verification\n`;
  response += `- [ ] Service started normally\n`;
  response += `- [ ] Functional verification passed\n`;
  response += `- [ ] Performance metrics normal\n`;
  response += `- [ ] Monitoring alerts normal\n`;
  response += `- [ ] User feedback collected\n\n`;
  
  response += `**Note**: After deployment, continuously monitor application status and handle exceptions promptly.\n\n`;
  response += `### 7. Documentation Update\n`;
  response += `Don't forget to update your project documentation:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n`;
  response += `Then read and update relevant documents like deployment.md or tasks.md.`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

function getDocumentTemplate(docType: DocType): string {
  const templates: Record<DocType, string> = getDocumentTemplates();

  return templates[docType] || templates.notes;
} 

function getDocumentTemplates(): Record<DocType, string> {
  return {
    overview: `# Project Overview

## Project Description
Briefly describe your project.

## Project Goals
- [ ] Goal 1
- [ ] Goal 2

## Core Features
- Feature 1
- Feature 2

## Update History
- ${new Date().toISOString().split('T')[0]}: Initial version`,

    requirements: `# Project Requirements

## Functional Requirements
1. Requirement 1
2. Requirement 2

## Non-functional Requirements
- Performance: Response time < 2 seconds
- Availability: 99.9%
- Security: Data encryption

## Update History
- ${new Date().toISOString().split('T')[0]}: Initial version`,

    system_architecture: `# System Architecture

## Overall Architecture
Briefly describe the overall system architecture.

## Tech Stack
- Frontend: 
- Backend: 
- Database: 
- Deployment: 

## Component Design
- Component 1
- Component 2

## Update History
- ${new Date().toISOString().split('T')[0]}: Initial version`,

    test_strategy: `# Test Strategy

## Test Objectives
- Functional correctness
- Performance metrics
- Security

## Test Types
- Unit tests
- Integration tests
- End-to-end tests

## Test Environment
- Development environment
- Test environment
- Production environment

## Update History
- ${new Date().toISOString().split('T')[0]}: Initial version`,

    ui_design: `# UI Design

## Design Principles
- Simplicity
- Consistency
- Usability

## Page Design
- Home page
- Feature pages
- Settings page

## Component Design
- Navigation components
- Form components
- List components

## Update History
- ${new Date().toISOString().split('T')[0]}: Initial version`,

    tasks: `# Project Tasks

## To Do
- [ ] Example task

## In Progress

## Completed
- [x] Project initialization

## Update History
- ${new Date().toISOString().split('T')[0]}: Initial version`,

    deployment: `# Deployment Configuration

## Deployment Environment
- Development environment
- Test environment
- Production environment

## Deployment Process
1. Code build
2. Test verification
3. Deployment release
4. Monitoring check

## Configuration Management
- Environment variables
- Configuration files
- Database configuration

## Update History
- ${new Date().toISOString().split('T')[0]}: Initial version`,

    notes: `# Project Notes

## Development Notes
- Note 1
- Note 2

## Issue Records
- Issue 1
- Issue 2

## Solutions
- Solution 1
- Solution 2

## Update History
- ${new Date().toISOString().split('T')[0]}: Initial version`
  };
}
