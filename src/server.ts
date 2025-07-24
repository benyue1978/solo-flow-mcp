import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { fileURLToPath } from 'url';
import { dirname, join, isAbsolute, resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { cwd } from 'process';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Security: Validate absolute file path
function validateAbsolutePath(filePath: string): boolean {
  try {
    // Must be absolute path
    if (!isAbsolute(filePath)) {
      return false;
    }
    
    // Resolve to canonical path
    const resolvedPath = resolve(filePath);
    
    // Basic security check - ensure it's not trying to access system directories
    const forbiddenPrefixes = [
      '/etc/', '/var/', '/usr/', '/bin/', '/sbin/', '/dev/', '/proc/', '/sys/',
      'C:\\Windows\\', 'C:\\System32\\', 'C:\\Program Files\\', 'C:\\Program Files (x86)\\'
    ];
    
    for (const prefix of forbiddenPrefixes) {
      if (resolvedPath.startsWith(prefix)) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
}

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



// Add requirements document tool (requires absolute path)
server.tool(
  "get_requirements_md",
  "Read the requirements document using absolute path",
  {
    path: z.string().describe("Absolute path to requirements document (e.g., '/Users/username/project/docs/requirements.md')")
  },
  async (args) => {
    const { path } = args;
    
    try {
      if (!validateAbsolutePath(path)) {
        return {
          content: [{
            type: "text",
            text: `❌ Security Error: Invalid path '${path}'\n\n` +
                  `**Requirements**:\n` +
                  `- Path must be absolute\n` +
                  `- Example: '/Users/username/project/docs/requirements.md'`
          }]
        };
      }
      
      if (!existsSync(path)) {
        return {
          content: [{
            type: "text",
            text: `# Requirements Document Not Found\n\n**Path**: \`${path}\`\n\n## Suggested Actions\n\n1. Create the requirements document:\n   \`\`\`bash\n   mkdir -p $(dirname "${path}")\n   touch "${path}"\n   \`\`\`\n\n2. Or specify the correct absolute path:\n   \`\`\`json\n   {\n     "tool": "get_requirements_md",\n     "args": {\n       "path": "${join(cwd(), 'docs/requirements.md')}"\n     }\n   }\n   \`\`\`\n\n**Current working directory**: ${cwd()}`
          }]
        };
      }
      
      const content = readFileSync(path, "utf-8");
      
      return {
        content: [{
          type: "text",
          text: `# Requirements Document\n\n**Path**: \`${path}\`\n\n${content}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `❌ Error reading requirements document: ${error}`
        }]
      };
    }
  }
);

// Add tasks document tool (requires absolute path)
server.tool(
  "get_tasks_md",
  "Read the tasks document using absolute path",
  {
    path: z.string().describe("Absolute path to tasks document (e.g., '/Users/username/project/docs/tasks.md')")
  },
  async (args) => {
    const { path } = args;
    
    try {
      if (!validateAbsolutePath(path)) {
        return {
          content: [{
            type: "text",
            text: `❌ Security Error: Invalid path '${path}'\n\n` +
                  `**Requirements**:\n` +
                  `- Path must be absolute\n` +
                  `- Example: '/Users/username/project/docs/tasks.md'`
          }]
        };
      }
      
      if (!existsSync(path)) {
        return {
          content: [{
            type: "text",
            text: `# Tasks Document Not Found\n\n**Path**: \`${path}\`\n\n## Suggested Actions\n\n1. Create the tasks document:\n   \`\`\`bash\n   mkdir -p $(dirname "${path}")\n   touch "${path}"\n   \`\`\`\n\n2. Or specify the correct absolute path:\n   \`\`\`json\n   {\n     "tool": "get_tasks_md",\n     "args": {\n       "path": "${join(cwd(), 'docs/tasks.md')}"\n     }\n   }\n   \`\`\`\n\n**Current working directory**: ${cwd()}`
          }]
        };
      }
      
      const content = readFileSync(path, "utf-8");
      
      return {
        content: [{
          type: "text",
          text: `# Tasks Document\n\n**Path**: \`${path}\`\n\n${content}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `❌ Error reading tasks document: ${error}`
        }]
      };
    }
  }
);

// Add project info tool
server.tool(
  "get_project_info",
  "Get information about the current working directory",
  {},
  async () => {
    try {
      const currentDir = cwd();
      const readmePath = join(currentDir, 'README.md');
      const hasReadme = existsSync(readmePath);
      
      const projectInfo = {
        currentWorkingDir: currentDir,
        hasReadme: hasReadme,
        readmePath: hasReadme ? readmePath : null,
        serverDir: __dirname
      };
      
      return {
        content: [{
          type: "text",
          text: `Project Information:\n\n` +
                `- Current Working Directory: ${projectInfo.currentWorkingDir}\n` +
                `- Has README.md: ${projectInfo.hasReadme ? 'Yes' : 'No'}\n` +
                `- README Path: ${projectInfo.readmePath || 'Not found'}\n` +
                `- Server Directory: ${projectInfo.serverDir}\n\n` +
                `**Note**: All file reading tools require absolute paths for security.`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error getting project info: ${error}`
        }]
      };
    }
  }
);

// Add README reader tool (requires absolute path)
server.tool(
  "read_readme",
  "Read the README.md file using absolute path",
  {
    path: z.string().describe("Absolute path to README.md file (e.g., '/Users/username/project/README.md')")
  },
  async (args) => {
    const { path } = args;
    
    try {
      if (!validateAbsolutePath(path)) {
        return {
          content: [{
            type: "text",
            text: `❌ Security Error: Invalid path '${path}'\n\n` +
                  `**Requirements**:\n` +
                  `- Path must be absolute\n` +
                  `- Example: '/Users/username/project/README.md'`
          }]
        };
      }
      
      if (!existsSync(path)) {
        return {
          content: [{
            type: "text",
            text: `# README.md not found\n\nThe README.md file was not found at:\n\n\`${path}\`\n\n**Current working directory**: ${cwd()}\n**Example absolute path**: ${join(cwd(), 'README.md')}`
          }]
        };
      }
      
      const content = readFileSync(path, 'utf-8');
      
      return {
        content: [{
          type: "text",
          text: `# README.md\n\n**Path**: \`${path}\`\n\n${content}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `# Error reading README.md\n\nAn error occurred while reading the README.md file:\n\n\`\`\`\n${error}\n\`\`\`\n\n**Path**: ${path}`
        }]
      };
    }
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

// Add dynamic README.md resource that reads from the configured project root
server.resource(
  "README.md",
  "file:///README.md",
  {
    description: "Dynamic README.md file from the configured project root directory",
    mimeType: "text/markdown"
  },
  async () => {
    try {
      const readmePath = join(cwd(), 'README.md');
      
      if (existsSync(readmePath)) {
        const content = readFileSync(readmePath, 'utf-8');
        return {
          contents: [{
            uri: "file:///README.md",
            mimeType: "text/markdown",
            text: content
          }]
        };
      } else {
        return {
          contents: [{
            uri: "file:///README.md",
            mimeType: "text/markdown",
            text: `# README.md not found\n\nThe README.md file was not found in the project root directory:\n\n\`${cwd()}\`\n\nTo set a different project root, use the \`get_project_info\` tool with the 'path' parameter, or set the PROJECT_ROOT environment variable.\n\nCurrent project root: ${cwd()}`
          }]
        };
      }
    } catch (error) {
      return {
        contents: [{
          uri: "file:///README.md",
          mimeType: "text/markdown",
          text: `# Error reading README.md\n\nAn error occurred while reading the README.md file:\n\n\`\`\`\n${error}\n\`\`\`\n\nCurrent project root: ${cwd()}`
        }]
      };
    }
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
      transport: 'Streamable HTTP',
      projectRoot: cwd()
    });
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`MCP Server running on port ${PORT}`);
    console.log(`Streamable HTTP endpoint: http://localhost:${PORT}/mcp`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log('Available tools: hello_world, get_requirements_md, get_tasks_md, get_project_info, read_readme, scan_project');
    console.log('Available resources: file:///hello.txt, file:///README.md');
    console.log(`Current project root: ${cwd()}`);
  });
}