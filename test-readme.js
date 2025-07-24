#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing README.md resource...\n');

// Start the MCP server
const serverProcess = spawn('node', ['dist/server.js'], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe']
});

// Test messages to send to the server
const testMessages = [
  // Initialize request
  {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {
        tools: {},
        resources: {}
      },
      clientInfo: {
        name: "readme-test",
        version: "1.0.0"
      }
    }
  },
  // List resources request
  {
    jsonrpc: "2.0",
    id: 2,
    method: "resources/list"
  },
  // Read README.md resource
  {
    jsonrpc: "2.0",
    id: 3,
    method: "resources/read",
    params: {
      uri: "file:///README.md"
    }
  }
];

let messageIndex = 0;

// Function to send next message
function sendNextMessage() {
  if (messageIndex < testMessages.length) {
    const message = testMessages[messageIndex];
    const messageStr = JSON.stringify(message) + '\n';
    
    console.log(`Sending message ${messageIndex + 1}: ${message.method}`);
    
    serverProcess.stdin.write(messageStr);
    messageIndex++;
    
    // Wait a bit before sending next message
    setTimeout(sendNextMessage, 1000);
  } else {
    // All messages sent, close the connection
    console.log('\nAll test messages sent. Closing connection...');
    serverProcess.stdin.end();
  }
}

// Handle server responses
serverProcess.stdout.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    try {
      const response = JSON.parse(line);
      
      if (response.result) {
        if (response.result.serverInfo) {
          console.log(`✅ Server initialized: ${response.result.serverInfo.name} v${response.result.serverInfo.version}`);
        } else if (response.result.resources) {
          console.log('\n📋 Available resources:');
          response.result.resources.forEach(resource => {
            console.log(`  - ${resource.uri} (${resource.mimeType})`);
          });
        } else if (response.result.contents) {
          console.log('\n📖 README.md content preview:');
          const content = response.result.contents[0].text;
          const preview = content.substring(0, 200) + (content.length > 200 ? '...' : '');
          console.log(preview);
          console.log(`\n✅ README.md resource working correctly! (${content.length} characters)`);
        }
      }
    } catch (error) {
      console.log('❌ JSON parsing error:', error.message);
      console.log('Raw output:', line);
    }
  }
});

// Handle server errors
serverProcess.stderr.on('data', (data) => {
  console.log('❌ Server stderr:', data.toString().trim());
});

// Start sending messages after a short delay
setTimeout(sendNextMessage, 500);

// Handle process exit
serverProcess.on('close', (code) => {
  console.log(`\nServer process exited with code ${code}`);
  process.exit(0);
});

serverProcess.on('error', (error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\nShutting down test...');
  serverProcess.kill();
  process.exit(0);
}); 