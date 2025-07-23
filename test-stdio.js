#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing MCP Server in stdio mode...\n');

// Start the MCP server in stdio mode
const serverProcess = spawn('node', ['dist/server.js', '--stdio'], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe']
});

// Handle server output
serverProcess.stderr.on('data', (data) => {
  console.log('Server:', data.toString().trim());
});

serverProcess.stdout.on('data', (data) => {
  console.log('Server stdout:', data.toString().trim());
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
        name: "test-client",
        version: "1.0.0"
      }
    }
  },
  // List tools request
  {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list"
  },
  // List resources request
  {
    jsonrpc: "2.0",
    id: 3,
    method: "resources/list"
  },
  // Call hello_world tool
  {
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: {
      name: "hello_world",
      arguments: {
        name: "TestUser",
        language: "zh"
      }
    }
  },
  // Read hello.txt resource
  {
    jsonrpc: "2.0",
    id: 5,
    method: "resources/read",
    params: {
      uri: "file:///hello.txt"
    }
  }
];

let messageIndex = 0;

// Function to send next message
function sendNextMessage() {
  if (messageIndex < testMessages.length) {
    const message = testMessages[messageIndex];
    const messageStr = JSON.stringify(message) + '\n';
    
    console.log(`\nSending message ${messageIndex + 1}:`);
    console.log(JSON.stringify(message, null, 2));
    
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
      console.log('\nReceived response:');
      console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.log('Raw output:', line);
    }
  }
});

// Start sending messages after a short delay
setTimeout(sendNextMessage, 1000);

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