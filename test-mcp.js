// Simple test script for MCP server

const BASE_URL = 'http://localhost:3000';

async function testHealth() {
  console.log('Testing health endpoint...');
  const response = await fetch(`${BASE_URL}/health`);
  const data = await response.json();
  console.log('Health check result:', data);
}

async function testSSEConnection() {
  console.log('\nTesting SSE connection...');
  
  try {
    const response = await fetch(`${BASE_URL}/sse`);
    console.log('SSE connection status:', response.status);
    console.log('SSE headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      console.log('✅ SSE connection successful');
    } else {
      console.log('❌ SSE connection failed');
    }
  } catch (error) {
    console.error('❌ SSE connection error:', error.message);
  }
}

async function runTests() {
  console.log('🧪 Testing MCP Server...\n');
  
  await testHealth();
  await testSSEConnection();
  
  console.log('\n🎉 Tests completed!');
  console.log('\nTo test with MCP Inspector:');
  console.log('1. Go to https://modelcontextprotocol.io/docs/tools/inspector');
  console.log('2. Configure connection:');
  console.log('   - Transport: SSE');
  console.log('   - SSE URL: http://localhost:3000/sse');
  console.log('   - Messages URL: http://localhost:3000/messages');
  console.log('3. Connect and test the hello_world tool');
}

runTests().catch(console.error); 