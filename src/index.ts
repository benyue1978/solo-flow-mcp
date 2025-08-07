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

// Import prompt utilities
import { ALL_PROMPTS } from './prompts/index.js';

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

// Register all prompts
// Core prompts
server.registerPrompt(
  "core-init-project",
  {
    title: "Project Initialization",
    description: "Initialize project documentation structure and create basic document templates"
  },
  ALL_PROMPTS['core-init-project']
);

server.registerPrompt(
  "core-check-project-status",
  {
    title: "Check Project Status",
    description: "Analyze project documentation completeness and task completion progress"
  },
  ALL_PROMPTS['core-check-project-status']
);

server.registerPrompt(
  "core-generate-docs",
  {
    title: "Generate Documentation",
    description: "Guide for generating comprehensive documentation for current implementation",
    argsSchema: {
      docType: completable(z.string(), (value) => {
        const docTypes = ["api", "implementation", "user-manual", "developer-guide", "deployment"];
        return docTypes.filter(d => d.startsWith(value));
      }).optional().describe("Type of documentation"),
      component: z.string().optional().describe("Component to document")
    }
  },
  ALL_PROMPTS['core-generate-docs']
);

server.registerPrompt(
  "core-setup-workspace",
  {
    title: "Setup Workspace",
    description: "Guide for setting up project workspace with technology stack",
    argsSchema: {
      frontend: completable(z.string(), (value) => {
        const frontends = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt"];
        return frontends.filter(f => f.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Frontend framework"),
      backend: completable(z.string(), (value) => {
        const backends = ["Node.js", "Python", "Java", "C#", "Go", "Rust", "PHP"];
        return backends.filter(b => b.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Backend technology"),
      testing: completable(z.string(), (value) => {
        const testings = ["Jest", "Cypress", "Playwright", "Selenium", "PyTest", "JUnit"];
        return testings.filter(t => t.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Testing framework"),
      deployment: completable(z.string(), (value) => {
        const deployments = ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Vercel"];
        return deployments.filter(d => d.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Deployment platform"),
      database: completable(z.string(), (value) => {
        const databases = ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite"];
        return databases.filter(db => db.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Database technology")
    }
  },
  ALL_PROMPTS['core-setup-workspace']
);

// Role prompts
server.registerPrompt(
  "role-analyst-mode",
  {
    title: "Analyst Mode",
    description: "Switch to analyst mode for requirements analysis and business logic organization"
  },
  ALL_PROMPTS['role-analyst-mode']
);

server.registerPrompt(
  "role-architect-mode",
  {
    title: "Architect Mode",
    description: "Switch to architect mode for system design and technology selection"
  },
  ALL_PROMPTS['role-architect-mode']
);

server.registerPrompt(
  "role-developer-mode",
  {
    title: "Developer Mode",
    description: "Switch to developer mode for code implementation and development"
  },
  ALL_PROMPTS['role-developer-mode']
);

server.registerPrompt(
  "role-tester-mode",
  {
    title: "Tester Mode",
    description: "Switch to tester mode for quality assurance and testing"
  },
  ALL_PROMPTS['role-tester-mode']
);

server.registerPrompt(
  "role-project-manager-mode",
  {
    title: "Project Manager Mode",
    description: "Switch to project manager mode for project coordination and management"
  },
  ALL_PROMPTS['role-project-manager-mode']
);

// Task prompts
server.registerPrompt(
  "task-add-task",
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
  ALL_PROMPTS['task-add-task']
);

server.registerPrompt(
  "task-breakdown-requirements",
  {
    title: "Breakdown Requirements",
    description: "Break down requirements document into specific development tasks"
  },
  ALL_PROMPTS['task-breakdown-requirements']
);

server.registerPrompt(
  "task-breakdown-architecture",
  {
    title: "Breakdown Architecture",
    description: "Break down architecture document into implementation tasks"
  },
  ALL_PROMPTS['task-breakdown-architecture']
);

server.registerPrompt(
  "task-create-epic",
  {
    title: "Create Epic",
    description: "Create a large-scale feature epic with multiple stories"
  },
  ALL_PROMPTS['task-create-epic']
);

server.registerPrompt(
  "task-create-story",
  {
    title: "Create User Story",
    description: "Create detailed user stories with acceptance criteria"
  },
  ALL_PROMPTS['task-create-story']
);

server.registerPrompt(
  "task-estimate-tasks",
  {
    title: "Estimate Tasks",
    description: "Estimate time and effort for project tasks"
  },
  ALL_PROMPTS['task-estimate-tasks']
);

// Development prompts
server.registerPrompt(
  "development-write-code",
  {
    title: "Write Code",
    description: "Guide for implementing code features",
    argsSchema: {
      feature: z.string().optional().describe("Feature to implement"),
      language: completable(z.string(), (value) => {
        const languages = ["TypeScript", "JavaScript", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin"];
        return languages.filter(l => l.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Programming language"),
      framework: z.string().optional().describe("Framework or library")
    }
  },
  ALL_PROMPTS['development-write-code']
);

server.registerPrompt(
  "development-fix-bug",
  {
    title: "Fix Bug",
    description: "Guide for debugging and fixing code issues",
    argsSchema: {
      bugDescription: z.string().optional().describe("Description of the bug"),
      severity: completable(z.string(), (value) => {
        const severities = ["critical", "high", "medium", "low"];
        return severities.filter(s => s.startsWith(value));
      }).optional().describe("Bug severity"),
      component: z.string().optional().describe("Affected component")
    }
  },
  ALL_PROMPTS['development-fix-bug']
);

server.registerPrompt(
  "development-refactor-code",
  {
    title: "Refactor Code",
    description: "Guide for refactoring and improving code structure",
    argsSchema: {
      component: z.string().optional().describe("Component to refactor"),
      reason: z.string().optional().describe("Reason for refactoring")
    }
  },
  ALL_PROMPTS['development-refactor-code']
);

server.registerPrompt(
  "development-code-review-checklist",
  {
    title: "Code Review Checklist",
    description: "Provide a comprehensive checklist for code review",
    argsSchema: {
      codeLanguage: completable(z.string(), (value) => {
        const languages = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin"];
        return languages.filter(l => l.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Programming language")
    }
  },
  ALL_PROMPTS['development-code-review-checklist']
);

// Testing prompts
server.registerPrompt(
  "testing-create-test-plan",
  {
    title: "Create Test Plan",
    description: "Guide for creating comprehensive test plans",
    argsSchema: {
      feature: z.string().optional().describe("Feature to test"),
      testType: completable(z.string(), (value) => {
        const testTypes = ["unit", "integration", "e2e", "performance", "security", "comprehensive"];
        return testTypes.filter(t => t.startsWith(value));
      }).optional().describe("Type of testing")
    }
  },
  ALL_PROMPTS['testing-create-test-plan']
);

server.registerPrompt(
  "testing-write-unit-tests",
  {
    title: "Write Unit Tests",
    description: "Guide for writing unit tests",
    argsSchema: {
      component: z.string().optional().describe("Component to test"),
      language: completable(z.string(), (value) => {
        const languages = ["TypeScript", "JavaScript", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin"];
        return languages.filter(l => l.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Programming language"),
      framework: completable(z.string(), (value) => {
        const frameworks = ["Jest", "Mocha", "JUnit", "PyTest", "NUnit", "xUnit"];
        return frameworks.filter(f => f.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Testing framework")
    }
  },
  ALL_PROMPTS['testing-write-unit-tests']
);

server.registerPrompt(
  "testing-run-tests",
  {
    title: "Run Tests",
    description: "Guide for executing tests and analyzing results",
    argsSchema: {
      testType: completable(z.string(), (value) => {
        const testTypes = ["unit", "integration", "e2e", "all"];
        return testTypes.filter(t => t.startsWith(value));
      }).optional().describe("Type of tests to run"),
      environment: completable(z.string(), (value) => {
        const environments = ["development", "staging", "production", "local"];
        return environments.filter(e => e.startsWith(value));
      }).optional().describe("Test environment")
    }
  },
  ALL_PROMPTS['testing-run-tests']
);

server.registerPrompt(
  "testing-test-report",
  {
    title: "Generate Test Report",
    description: "Guide for generating comprehensive test reports",
    argsSchema: {
      testRun: z.string().optional().describe("Test run identifier"),
      environment: completable(z.string(), (value) => {
        const environments = ["development", "staging", "production", "local"];
        return environments.filter(e => e.startsWith(value));
      }).optional().describe("Test environment")
    }
  },
  ALL_PROMPTS['testing-test-report']
);

server.registerPrompt(
  "testing-performance-test",
  {
    title: "Performance Testing",
    description: "Guide for conducting performance tests",
    argsSchema: {
      component: z.string().optional().describe("Component to test"),
      loadType: completable(z.string(), (value) => {
        const loadTypes = ["load", "stress", "spike", "endurance", "scalability"];
        return loadTypes.filter(l => l.startsWith(value));
      }).optional().describe("Type of performance test")
    }
  },
  ALL_PROMPTS['testing-performance-test']
);

// Release prompts
server.registerPrompt(
  "release-commit-changes",
  {
    title: "Commit Changes",
    description: "Guide for committing code changes with proper conventions",
    argsSchema: {
      commitType: completable(z.string(), (value) => {
        const commitTypes = ["feat", "fix", "docs", "style", "refactor", "test", "chore"];
        return commitTypes.filter(c => c.startsWith(value));
      }).optional().describe("Type of commit"),
      scope: z.string().optional().describe("Scope of changes")
    }
  },
  ALL_PROMPTS['release-commit-changes']
);

server.registerPrompt(
  "release-create-release",
  {
    title: "Create Release",
    description: "Guide for creating software releases",
    argsSchema: {
      version: z.string().optional().describe("Release version"),
      releaseType: completable(z.string(), (value) => {
        const releaseTypes = ["major", "minor", "patch"];
        return releaseTypes.filter(r => r.startsWith(value));
      }).optional().describe("Type of release")
    }
  },
  ALL_PROMPTS['release-create-release']
);

server.registerPrompt(
  "release-deployment-checklist",
  {
    title: "Deployment Checklist",
    description: "Comprehensive checklist for deployment preparation",
    argsSchema: {
      environment: completable(z.string(), (value) => {
        const environments = ["development", "staging", "production", "testing"];
        return environments.filter(e => e.startsWith(value));
      }).optional().describe("Target environment")
    }
  },
  ALL_PROMPTS['release-deployment-checklist']
);

server.registerPrompt(
  "release-rollback-plan",
  {
    title: "Rollback Plan",
    description: "Guide for creating rollback plans",
    argsSchema: {
      version: z.string().optional().describe("Version to rollback"),
      reason: z.string().optional().describe("Reason for rollback")
    }
  },
  ALL_PROMPTS['release-rollback-plan']
);

server.registerPrompt(
  "release-monitor-deployment",
  {
    title: "Monitor Deployment",
    description: "Guide for monitoring deployment status",
    argsSchema: {
      environment: completable(z.string(), (value) => {
        const environments = ["development", "staging", "production"];
        return environments.filter(e => e.startsWith(value));
      }).optional().describe("Deployment environment"),
      duration: z.string().optional().describe("Monitoring duration")
    }
  },
  ALL_PROMPTS['release-monitor-deployment']
);

// Requirements prompts
server.registerPrompt(
  "requirements-analyze-requirements",
  {
    title: "Analyze Requirements",
    description: "Guide for comprehensive requirements analysis",
    argsSchema: {
      domain: completable(z.string(), (value) => {
        const domains = ["e-commerce", "finance", "healthcare", "education", "entertainment", "general"];
        return domains.filter(d => d.startsWith(value));
      }).optional().describe("Business domain"),
      scope: completable(z.string(), (value) => {
        const scopes = ["full-system", "module", "feature", "component"];
        return scopes.filter(s => s.startsWith(value));
      }).optional().describe("Analysis scope")
    }
  },
  ALL_PROMPTS['requirements-analyze-requirements']
);

server.registerPrompt(
  "requirements-validate-requirements",
  {
    title: "Validate Requirements",
    description: "Guide for validating requirements completeness and clarity",
    argsSchema: {
      validationType: completable(z.string(), (value) => {
        const validationTypes = ["comprehensive", "completeness", "clarity", "consistency", "feasibility"];
        return validationTypes.filter(v => v.startsWith(value));
      }).optional().describe("Type of validation")
    }
  },
  ALL_PROMPTS['requirements-validate-requirements']
);

server.registerPrompt(
  "requirements-prioritize-requirements",
  {
    title: "Prioritize Requirements",
    description: "Guide for prioritizing requirements using various methods",
    argsSchema: {
      priorityMethod: completable(z.string(), (value) => {
        const methods = ["MoSCoW", "value-complexity", "kano", "ranking"];
        return methods.filter(m => m.startsWith(value));
      }).optional().describe("Prioritization method")
    }
  },
  ALL_PROMPTS['requirements-prioritize-requirements']
);

// Docs prompts
server.registerPrompt(
  "docs-generate-docs",
  {
    title: "Generate Documentation",
    description: "Guide for generating comprehensive documentation for current implementation",
    argsSchema: {
      docType: completable(z.string(), (value) => {
        const docTypes = ["api", "implementation", "user-manual", "developer-guide", "deployment"];
        return docTypes.filter(d => d.startsWith(value));
      }).optional().describe("Type of documentation"),
      component: z.string().optional().describe("Component to document")
    }
  },
  ALL_PROMPTS['core-generate-docs']
);

// Workspace prompts
server.registerPrompt(
  "workspace-setup-workspace",
  {
    title: "Setup Workspace",
    description: "Guide for setting up project workspace with technology stack",
    argsSchema: {
      frontend: completable(z.string(), (value) => {
        const frontends = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt"];
        return frontends.filter(f => f.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Frontend framework"),
      backend: completable(z.string(), (value) => {
        const backends = ["Node.js", "Python", "Java", "C#", "Go", "Rust", "PHP"];
        return backends.filter(b => b.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Backend technology"),
      testing: completable(z.string(), (value) => {
        const testings = ["Jest", "Cypress", "Playwright", "Selenium", "PyTest", "JUnit"];
        return testings.filter(t => t.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Testing framework"),
      deployment: completable(z.string(), (value) => {
        const deployments = ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Vercel"];
        return deployments.filter(d => d.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Deployment platform"),
      database: completable(z.string(), (value) => {
        const databases = ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite"];
        return databases.filter(db => db.toLowerCase().startsWith(value.toLowerCase()));
      }).optional().describe("Database technology")
    }
  },
  ALL_PROMPTS['core-setup-workspace']
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