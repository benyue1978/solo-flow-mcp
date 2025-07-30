import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { DocType } from './types/docTypes.js';

// Import handlers
import { listHandler } from './tools/list.js';
import { readHandler } from './tools/read.js';
import { updateHandler } from './tools/update.js';
import { initHandler } from './tools/init.js';

// Create MCP server
const server = new McpServer({
  name: "soloflow-mcp-server",
  version: "1.0.0"
});

// Add MCP operations
server.tool(
  "list",
  "List all documents in the .soloflow directory",
  {
    projectRoot: z.string().describe("Absolute path to project root")
  },
  async (args) => {
    try {
      const documents = await listHandler(args);
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

server.tool(
  "read",
  "Read document content by type",
  {
    projectRoot: z.string().describe("Absolute path to project root"),
    type: z.string().describe("Document type (overview, requirements, etc.)")
  },
  async (args) => {
    try {
      const result = await readHandler({ projectRoot: args.projectRoot, type: args.type as DocType });
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

server.tool(
  "update",
  "Create or update document content",
  {
    projectRoot: z.string().describe("Absolute path to project root"),
    type: z.string().describe("Document type (overview, requirements, etc.)"),
    content: z.string().describe("Document content in Markdown format")
  },
  async (args) => {
    try {
      const result = await updateHandler({ projectRoot: args.projectRoot, type: args.type as DocType, content: args.content });
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

server.tool(
  "init",
  "Initialize project configuration",
  {
    projectRoot: z.string().describe("Absolute path to project root")
  },
  async (args) => {
    try {
      const result = await initHandler(args);
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