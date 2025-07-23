import express from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create MCP server
const server = new McpServer({
  name: "solo-flow-mcp-server",
  version: "1.0.0"
});

// Add hello world tool
server.tool(
  "hello_world",
  "A simple hello world tool that returns a greeting message",
  {
    name: z.string().optional().default("World").describe("Name to greet (optional)"),
    language: z.enum(["en", "zh", "es", "fr"]).optional().default("en").describe("Language for the greeting")
  },
  async (args) => {
    const { name = "World", language = "en" } = args;
    
    const greetings = {
      en: `Hello, ${name}!`,
      zh: `你好，${name}！`,
      es: `¡Hola, ${name}!`,
      fr: `Bonjour, ${name}!`
    };
    
    const message = greetings[language] || greetings.en;
    
    return {
      content: [{
        type: "text",
        text: message
      }]
    };
  }
);

// Add a simple resource
server.resource(
  "hello.txt",
  "file:///hello.txt",
  {
    description: "A simple text file with hello world content",
    mimeType: "text/plain"
  },
  async () => {
    return {
      contents: [{
        uri: "file:///hello.txt",
        mimeType: "text/plain",
        text: "Hello, World! This is a simple text file from the MCP server."
      }]
    };
  }
);

// Check if running in HTTP mode (stdio is now default)
const isHttpMode = process.argv.includes('--http') || process.env.MCP_HTTP === 'true';

if (!isHttpMode) {
  // Stdio mode - default mode for CLI tools and direct integration
  // No console output to avoid interfering with JSON-RPC protocol
  
  const stdioTransport = new StdioServerTransport();
  await server.connect(stdioTransport);
  
  // Keep the process alive
  process.on('SIGINT', () => {
    process.exit(0);
  });
  
} else {
  // HTTP mode - for web-based tools and MCP Inspector
  console.log('Starting MCP server in HTTP mode...');
  
  // Create Express app
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '4mb' }));

  // Create Streamable HTTP transport with session management
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
    onsessioninitialized: (sessionId) => {
      console.log(`Session initialized: ${sessionId}`);
    },
    onsessionclosed: (sessionId) => {
      console.log(`Session closed: ${sessionId}`);
    }
  });

  // Connect transport to MCP server first
  await server.connect(transport);
  console.log('MCP server connected to Streamable HTTP transport');

  // Streamable HTTP endpoint for MCP communication
  app.all('/mcp', async (req, res) => {
    console.log('New Streamable HTTP connection request');
    
    try {
      // Pass the parsed body to the transport
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error('Error in /mcp route:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      server: 'solo-flow-mcp-server',
      version: '1.0.0',
      transport: 'Streamable HTTP'
    });
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`MCP Server running on port ${PORT}`);
    console.log(`Streamable HTTP endpoint: http://localhost:${PORT}/mcp`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log('Available tools: hello_world');
    console.log('Available resources: file:///hello.txt');
  });
} 