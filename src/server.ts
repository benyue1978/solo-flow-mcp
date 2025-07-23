import express from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
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

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Store active SSE transports
const transports: Record<string, SSEServerTransport> = {};

// SSE endpoint for MCP communication
app.get('/sse', async (req, res) => {
  console.log('New SSE connection established');
  
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // Create SSE transport
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  
  console.log(`SSE transport created with session ID: ${transport.sessionId}`);
  
  // Handle client disconnect
  res.on('close', () => {
    console.log(`SSE connection closed for session: ${transport.sessionId}`);
    delete transports[transport.sessionId];
  });
  
  // Connect transport to MCP server
  try {
    await server.connect(transport);
    console.log(`MCP server connected to transport: ${transport.sessionId}`);
  } catch (error) {
    console.error('Error connecting transport to MCP server:', error);
    res.end();
  }
});

// Message endpoint for SSE transport
app.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  
  if (!transport) {
    console.error(`No transport found for sessionId: ${sessionId}`);
    return res.status(400).json({ error: 'No transport found for sessionId' });
  }
  
  try {
    await transport.handlePostMessage(req, res, req.body);
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    server: 'solo-flow-mcp-server',
    version: '1.0.0',
    activeConnections: Object.keys(transports).length
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
  console.log(`Messages endpoint: http://localhost:${PORT}/messages`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('Available tools: hello_world');
  console.log('Available resources: file:///hello.txt');
}); 