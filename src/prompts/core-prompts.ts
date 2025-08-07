/**
 * Core function prompts for SoloFlow MCP
 * Essential project management functions
 */

import { DocType } from '../types/docTypes.js';

// 1. Project Initialization Prompt
export async function coreInitProjectPrompt(args: {}): Promise<{
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
  
  response += `### 3. Read/Update Basic Documents\n`;
  response += `After that, create these essential documents, update if already existing:\n\n`;
  
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
  
  response += `### 4. Verify Setup\n`;
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
export async function coreCreateDocTemplatePrompt(args: {
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



// 3. Check Project Status Prompt
export async function coreCheckProjectStatusPrompt(): Promise<{
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



// Helper functions
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
