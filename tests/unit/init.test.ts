import { BaseTest } from '../utils/base-test';
import { TestDataBuilder } from '../fixtures/test-data';
import { initHandler } from '../../src/tools/init.js';
import * as fs from 'fs/promises';
import * as path from 'path';

// Concrete test class for init operations
class InitTest extends BaseTest {
  // Inherit all functionality from BaseTest
}

describe('Init Operation', () => {
  let testInstance: InitTest;
  
  beforeEach(async () => {
    testInstance = new InitTest();
    await testInstance.setup();
  });
  
  afterEach(async () => {
    await testInstance.teardown();
  });
  
  test('should create soloflow.mdc file', async () => {
    await testInstance.createEmptyEnvironment();

    const result = await initHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result.ok).toBe(true);
    
    // Verify file was created
    const filePath = path.join(testInstance.getProjectRoot(), '.cursor', 'rules', 'soloflow.mdc');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    expect(fileContent).toContain('# SoloFlow MCP Service Guidelines');
  });

  test('should handle existing file gracefully', async () => {
    await testInstance.createEmptyEnvironment();
    
    // Create the file first
    const cursorRulesPath = path.join(testInstance.getProjectRoot(), '.cursor', 'rules');
    await fs.mkdir(cursorRulesPath, { recursive: true });
    const existingContent = 'Existing content';
    await fs.writeFile(path.join(cursorRulesPath, 'soloflow.mdc'), existingContent);

    const result = await initHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result.ok).toBe(true);
    
    // Verify original content was preserved
    const fileContent = await fs.readFile(path.join(cursorRulesPath, 'soloflow.mdc'), 'utf-8');
    expect(fileContent).toBe(existingContent);
  });

  test('should create .cursor/rules directory if it does not exist', async () => {
    await testInstance.createEmptyEnvironment();

    const result = await initHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result.ok).toBe(true);
    
    // Verify directory was created
    const cursorRulesPath = path.join(testInstance.getProjectRoot(), '.cursor', 'rules');
    const dirExists = await fs.access(cursorRulesPath).then(() => true).catch(() => false);
    expect(dirExists).toBe(true);
  });

  test('should handle large resource content', async () => {
    await testInstance.createEmptyEnvironment();

    const result = await initHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result.ok).toBe(true);
    
    // Verify file was created with substantial content
    const filePath = path.join(testInstance.getProjectRoot(), '.cursor', 'rules', 'soloflow.mdc');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    expect(fileContent.length).toBeGreaterThan(1000); // Should be substantial
  });

  test('should handle write file errors', async () => {
    await testInstance.createEmptyEnvironment();
    
    // Make the directory read-only to simulate write error
    const cursorRulesPath = path.join(testInstance.getProjectRoot(), '.cursor', 'rules');
    await fs.mkdir(cursorRulesPath, { recursive: true });
    await fs.chmod(cursorRulesPath, 0o444); // Read-only

    await expect(initHandler({ projectRoot: testInstance.getProjectRoot() }))
      .rejects.toThrow();
    
    // Restore permissions for cleanup
    await fs.chmod(cursorRulesPath, 0o755);
  });

  test('should handle invalid project root', async () => {
    const nonExistentPath = '/non/existent/path';

    await expect(initHandler({ projectRoot: nonExistentPath }))
      .rejects.toThrow('Project root directory does not exist');
  });

  test('should create file with correct content structure', async () => {
    await testInstance.createEmptyEnvironment();

    const result = await initHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result.ok).toBe(true);
    
    // Verify file contains expected sections
    const filePath = path.join(testInstance.getProjectRoot(), '.cursor', 'rules', 'soloflow.mdc');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    expect(fileContent).toContain('# SoloFlow MCP Service Guidelines');
    expect(fileContent).toContain('## **Core Concepts**');
    expect(fileContent).toContain('## **Supported Document Types**');
    expect(fileContent).toContain('## **Available MCP Operations**');
  });

  test('should handle concurrent init operations', async () => {
    await testInstance.createEmptyEnvironment();

    // Run multiple init operations concurrently
    const promises = [
      initHandler({ projectRoot: testInstance.getProjectRoot() }),
      initHandler({ projectRoot: testInstance.getProjectRoot() }),
      initHandler({ projectRoot: testInstance.getProjectRoot() })
    ];

    const results = await Promise.all(promises);
    
    // All should succeed
    results.forEach(result => {
      expect(result.ok).toBe(true);
    });
    
    // File should exist and be readable
    const filePath = path.join(testInstance.getProjectRoot(), '.cursor', 'rules', 'soloflow.mdc');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    expect(fileContent).toContain('# SoloFlow MCP Service Guidelines');
  });
}); 