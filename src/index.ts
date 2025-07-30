#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { completable } from "@modelcontextprotocol/sdk/server/completable.js";


import { DocType, DOC_TYPES } from './types/docTypes.js';

// Helper function to get all document types
const getAllDocTypes = (): string[] => {
  return [...DOC_TYPES];
};

// Import handlers
import { listHandler } from './tools/list.js';
import { readHandler } from './tools/read.js';
import { updateHandler } from './tools/update.js';
import { initHandler } from './tools/init.js';

// Import prompt handlers
import { 
  initProjectPrompt,
  createDocTemplatePrompt,
  addTaskPrompt,
  checkProjectStatusPrompt,
  codeReviewChecklistPrompt,
  deploymentChecklistPrompt
} from './prompts/index.js';

// Create MCP server with prompts capability
const server = new McpServer({
  name: "soloflow-mcp-server",
  version: "1.0.0"
}, {
  capabilities: {
    prompts: {},
    tools: {},
    resources: {}
  }
});

// Add MCP operations
server.registerTool(
  "list",
  {
    title: "List Documents",
    description: "List all documents in the .soloflow directory",
    inputSchema: {
      projectRoot: z.string().describe("Absolute path to project root")
    }
  },
  async ({ projectRoot }) => {
    try {
      const documents = await listHandler({ projectRoot });
      return {
        content: [{
          type: "text",
          text: JSON.stringify(documents, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error listing documents: ${error}`
        }]
      };
    }
  }
);

server.registerTool(
  "read",
  {
    title: "Read Document",
    description: "Read document content by type",
    inputSchema: {
      projectRoot: z.string().describe("Absolute path to project root"),
      type: z.string().describe("Document type (overview, requirements, etc.)")
    }
  },
  async ({ projectRoot, type }) => {
    try {
      const result = await readHandler({ projectRoot, type: type as DocType });
      return {
        content: [{
          type: "text",
          text: result.raw || "Document not found"
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error reading document: ${error}`
        }]
      };
    }
  }
);

server.registerTool(
  "update",
  {
    title: "Update Document",
    description: "Create or update document content",
    inputSchema: {
      projectRoot: z.string().describe("Absolute path to project root"),
      type: z.string().describe("Document type (overview, requirements, etc.)"),
      content: z.string().describe("Document content in Markdown format")
    }
  },
  async ({ projectRoot, type, content }) => {
    try {
      const result = await updateHandler({ projectRoot, type: type as DocType, content });
      return {
        content: [{
          type: "text",
          text: `Document updated successfully: ${result.ok}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error updating document: ${error}`
        }]
      };
    }
  }
);

server.registerTool(
  "init",
  {
    title: "Initialize Project",
    description: "Initialize project configuration",
    inputSchema: {
      projectRoot: z.string().describe("Absolute path to project root")
    }
  },
  async ({ projectRoot }) => {
    try {
      const result = await initHandler({ projectRoot });
      return {
        content: [{
          type: "text",
          text: result.message
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error initializing project: ${error}`
        }]
      };
    }
  }
);

// Register prompts
server.registerPrompt(
  "init-project",
  {
    title: "Project Initialization",
    description: "Initialize project documentation structure and create basic document templates"
  },
  initProjectPrompt
);

server.registerPrompt(
  "create-doc-template",
  {
    title: "Create Document Template",
    description: "Create a standard template for a specific document type",
    argsSchema: {
      docType: completable(z.string(), (value) => {
        // Document type suggestions
        const docTypes = getAllDocTypes();
        return docTypes.filter(d => d.startsWith(value));
      }).describe("Document type")
    }
  },
  createDocTemplatePrompt
);

server.registerPrompt(
  "add-task",
  {
    title: "Add Task",
    description: "Add a new task to the project task list",
    argsSchema: {
      taskTitle: z.string().optional().describe("Task title"),
      priority: completable(z.string(), (value) => {
        // Priority suggestions
        const priorities = ["high", "medium", "low"];
        return priorities.filter(p => p.startsWith(value));
      }).optional().describe("Task priority"),
      category: completable(z.string(), (value) => {
        // Category suggestions
        const categories = ["frontend", "backend", "testing", "documentation", "deployment", "general"];
        return categories.filter(c => c.startsWith(value));
      }).optional().describe("Task category"),
      estimatedTime: z.string().optional().describe("Estimated completion time, e.g., '1h', '2d', '1w'")
    }
  },
  addTaskPrompt
);

server.registerPrompt(
  "check-project-status",
  {
    title: "Check Project Status",
    description: "Analyze project documentation completeness and task completion progress"
  },
  checkProjectStatusPrompt
);

server.registerPrompt(
  "code-review-checklist",
  {
    title: "Code Review Checklist",
    description: "Provide a standard checklist for code review",
    argsSchema: {
      codeLanguage: completable(z.string(), (value) => {
        // Programming language suggestions
        const languages = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin"];
        return languages.filter(l => l.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Programming language (optional)")
    }
  },
  codeReviewChecklistPrompt
);

server.registerPrompt(
  "deployment-checklist",
  {
    title: "Deployment Checklist",
    description: "Provide a standard checklist for deployment preparation",
    argsSchema: {
      environment: completable(z.string(), (value) => {
        // Environment suggestions
        const environments = ["development", "staging", "production", "testing", "local"];
        return environments.filter(e => e.startsWith(value));
      }).optional().describe("Target environment (optional)")
    }
  },
  deploymentChecklistPrompt
);

// Start server with stdio transport
async function main() {
  const stdioTransport = new StdioServerTransport();
  await server.connect(stdioTransport);
  
  // Keep the process alive
  process.on('SIGINT', () => {
    process.exit(0);
  });
}

main().catch(console.error); 