import { spawn } from 'child_process';
import { join } from 'path';
import { BaseTest } from '../utils/base-test';
import { TestDataBuilder } from '../fixtures/test-data';

class MCPInspectorTest extends BaseTest {
  async testMCPOperation(operation: string, args: Record<string, string>): Promise<any> {
    return new Promise((resolve, reject) => {
      const configPath = join(__dirname, 'mcp-inspector.config.json');
      const argString = Object.entries(args)
        .map(([key, value]) => `--tool-arg "${key}=${value}"`)
        .join(' ');
      
      const command = `mcp-inspector --config ${configPath} --server soloflow-mcp --cli --method tools/call --tool-name ${operation} ${argString}`;
      
      const child = spawn('sh', ['-c', command], {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      let output = '';
      let errorOutput = '';
      
      child.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          try {
            const result = JSON.parse(output.trim());
            // Parse the text content from mcp-inspector output
            if (result.content && result.content[0] && result.content[0].text) {
              const textContent = result.content[0].text;
              
              // Try to parse as JSON first (for list operation)
              try {
                const parsedContent = JSON.parse(textContent);
                resolve({ content: parsedContent });
              } catch {
                // If not JSON, handle as text content
                if (operation === 'read') {
                  resolve({ content: { raw: textContent } });
                } else if (operation === 'update') {
                  resolve({ content: { ok: textContent.includes('successfully') } });
                } else if (operation === 'init') {
                  resolve({ content: { ok: textContent.includes('successfully') } });
                } else {
                  resolve({ content: textContent });
                }
              }
            } else {
              resolve(result);
            }
          } catch (parseError) {
            reject(new Error(`Failed to parse output: ${output}`));
          }
        } else {
          reject(new Error(`Command failed with code ${code}: ${errorOutput}`));
        }
      });
      
      child.on('error', (error) => {
        reject(error);
      });
    });
  }
}

describe('MCP Inspector Integration Tests', () => {
  let testInstance: MCPInspectorTest;

  beforeEach(async () => {
    testInstance = new MCPInspectorTest();
    await testInstance.setup();
  });

  afterEach(async () => {
    await testInstance.teardown();
  });

  test('should list documents via mcp-inspector', async () => {
    const builder = testInstance.createTestDataBuilder();
    builder.addRequirements('# Test Requirements');
    
    await testInstance.createTestEnvironmentWithBuilder(builder);
    
    const result = await testInstance.testMCPOperation('list', { 
      projectRoot: testInstance.getProjectRoot() 
    });
    
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
    expect(result.content.length).toBeGreaterThan(0);
  });

  test('should read document via mcp-inspector', async () => {
    const builder = testInstance.createTestDataBuilder();
    builder.addRequirements('# Test Requirements');
    
    await testInstance.createTestEnvironmentWithBuilder(builder);
    
    const result = await testInstance.testMCPOperation('read', { 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements' 
    });
    
    expect(result.content).toBeDefined();
    expect(result.content.raw).toBe('# Test Requirements');
  });

  test('should update document via mcp-inspector', async () => {
    await testInstance.createEmptyEnvironment();
    
    const result = await testInstance.testMCPOperation('update', { 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements', 
      content: '# Updated Requirements' 
    });
    
    expect(result.content).toBeDefined();
    expect(result.content.ok).toBe(true);
  });

  test('should init project via mcp-inspector', async () => {
    await testInstance.createEmptyEnvironment();
    
    const result = await testInstance.testMCPOperation('init', { 
      projectRoot: testInstance.getProjectRoot() 
    });
    
    expect(result.content).toBeDefined();
    expect(result.content.ok).toBe(true);
  });

  test('should handle multiple documents via mcp-inspector', async () => {
    const builder = testInstance.createTestDataBuilder();
    builder.addMultipleDocuments(['requirements', 'tasks', 'system_architecture']);
    
    await testInstance.createTestEnvironmentWithBuilder(builder);
    
    const result = await testInstance.testMCPOperation('list', { 
      projectRoot: testInstance.getProjectRoot() 
    });
    
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
    expect(result.content.length).toBe(3);
  });

  test('should handle large content via mcp-inspector', async () => {
    const largeContent = '# Large Document\n\n' + 'Content line '.repeat(100);
    const builder = testInstance.createTestDataBuilder();
    builder.addDocument('requirements', largeContent);
    
    await testInstance.createTestEnvironmentWithBuilder(builder);
    
    const result = await testInstance.testMCPOperation('read', { 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements' 
    });
    
    expect(result.content).toBeDefined();
    expect(result.content.raw).toBe(largeContent);
  });

  test('should handle special characters in content via mcp-inspector', async () => {
    const specialContent = '# Special Content\n\n```\nconst test = "hello world";\n```\n\n**Bold text** and *italic text*';
    const builder = testInstance.createTestDataBuilder();
    builder.addDocument('notes', specialContent);
    
    await testInstance.createTestEnvironmentWithBuilder(builder);
    
    const result = await testInstance.testMCPOperation('read', { 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'notes' 
    });
    
    expect(result.content).toBeDefined();
    expect(result.content.raw).toBe(specialContent);
  });
}); 