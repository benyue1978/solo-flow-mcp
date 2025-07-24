#!/usr/bin/env node

// Test script for absolute path functionality
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverProcess = spawn('node', ['dist/server.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

const currentDir = process.cwd();
const readmePath = path.join(currentDir, 'README.md');
const requirementsPath = path.join(currentDir, 'docs/requirements.md');

const tests = [
  {
    name: 'Test 1: Initialize',
    input: {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-06-18",
        capabilities: { tools: {} },
        clientInfo: { name: "test", version: "1.0.0" }
      }
    }
  },
  {
    name: 'Test 2: Absolute path in read_readme should work',
    input: {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "read_readme",
        arguments: { path: readmePath }
      }
    }
  },
  {
    name: 'Test 3: Absolute path in get_requirements_md should work',
    input: {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "get_requirements_md",
        arguments: { path: requirementsPath }
      }
    }
  },
  {
    name: 'Test 4: Get project info',
    input: {
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "get_project_info",
        arguments: {}
      }
    }
  }
];

let currentTest = 0;

function sendTest() {
  if (currentTest >= tests.length) {
    console.log('\n✅ All tests completed!');
    serverProcess.kill();
    return;
  }

  const test = tests[currentTest];
  console.log(`\n🧪 ${test.name}`);
  
  const input = JSON.stringify(test.input) + '\n';
  serverProcess.stdin.write(input);
}

serverProcess.stdout.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    try {
      const response = JSON.parse(line);
      if (response.result) {
        console.log(`📤 Response: ${response.result.content?.[0]?.text?.substring(0, 100)}...`);
      }
    } catch (e) {
      // Ignore non-JSON lines
    }
  }
  
  currentTest++;
  setTimeout(sendTest, 100);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`❌ Server error: ${data}`);
});

serverProcess.on('close', (code) => {
  console.log(`\n🏁 Server process exited with code ${code}`);
});

console.log('🚀 Starting absolute path tests...');
console.log(`📁 Current directory: ${currentDir}`);
console.log(`📄 README path: ${readmePath}`);
console.log(`📋 Requirements path: ${requirementsPath}`);

sendTest(); 