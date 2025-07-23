#!/usr/bin/env node

/**
 * Simple Streamable HTTP connection test for MCP server
 */

import http from 'http';

async function testStreamableHTTPConnection() {
  console.log('🧪 Testing Streamable HTTP connection...\n');
  
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/mcp',
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache'
      }
    }, (res) => {
      console.log(`✅ Streamable HTTP connection established`);
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
        console.log(`📨 Received: ${chunk.toString().trim()}`);
      });
      
      res.on('end', () => {
        console.log('\n✅ Streamable HTTP connection test completed');
        resolve();
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Streamable HTTP connection failed:', error.message);
      reject(error);
    });
    
    // Close connection after 5 seconds
    setTimeout(() => {
      req.destroy();
      console.log('\n⏰ Test timeout - connection closed');
      resolve();
    }, 5000);
    
    req.end();
  });
}

async function testHealth() {
  console.log('🏥 Testing health endpoint...\n');
  
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/health',
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const health = JSON.parse(data);
          console.log('✅ Health check passed:', health);
          resolve();
        } catch (error) {
          console.error('❌ Health check failed:', error.message);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Health check failed:', error.message);
      reject(error);
    });
    
    req.end();
  });
}

async function runTests() {
  try {
    await testHealth();
    console.log('\n' + '='.repeat(50) + '\n');
    await testStreamableHTTPConnection();
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('1. Run: npx @modelcontextprotocol/inspector node dist/server.js');
    console.log('2. Test the hello_world tool in the Inspector interface');
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message);
    process.exit(1);
  }
}

runTests(); 