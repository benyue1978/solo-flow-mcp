import { BaseTest } from '../utils/base-test';
import { TestDataBuilder } from '../fixtures/test-data';
import { listHandler } from '../../src/tools/list.js';
import * as fs from 'fs/promises';
import * as path from 'path';

// Concrete test class for list operations
class ListTest extends BaseTest {
  // Inherit all functionality from BaseTest
}

describe('List Operation', () => {
  let testInstance: ListTest;
  
  beforeEach(async () => {
    testInstance = new ListTest();
    await testInstance.setup();
  });
  
  afterEach(async () => {
    await testInstance.teardown();
  });
  
  test('should list documents in .soloflow directory', async () => {
    const testData = testInstance.createTestDataBuilder()
      .addRequirements('# 📋 Test Requirements\n\nTest content.')
      .addTasks('# 📋 Test Tasks\n\nTask content.')
      .addSystemArchitecture('# 🏗 Test System Architecture\n\nArchitecture content.')
      .build();
    
    await testInstance.createTestEnvironment(testData);

    const result = await listHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result).toHaveLength(3);
    
    // Check that we have the expected documents
    const documentTypes = result.map(doc => doc.type);
    expect(documentTypes).toContain('requirements');
    expect(documentTypes).toContain('tasks');
    expect(documentTypes).toContain('system_architecture');
    
    // Check that titles are extracted correctly
    const requirementsDoc = result.find(doc => doc.type === 'requirements');
    expect(requirementsDoc?.title).toBe('📋 Test Requirements');
  });

  test('should return empty array for empty directory', async () => {
    await testInstance.createTestEnvironment();

    const result = await listHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result).toHaveLength(0);
  });

  test('should extract document titles from markdown content', async () => {
    const testData = testInstance.createTestDataBuilder()
      .addRequirements('# 📋 Test Requirements\n\nTest content.')
      .addTasks('# 📋 Test Tasks\n\nTask content.')
      .addSystemArchitecture('# 🏗 Test System Architecture\n\nArchitecture content.')
      .build();
    
    await testInstance.createTestEnvironment(testData);

    const result = await listHandler({ projectRoot: testInstance.getProjectRoot() });

    const requirementsDoc = result.find(doc => doc.type === 'requirements');
    expect(requirementsDoc?.title).toBe('📋 Test Requirements');
    
    const tasksDoc = result.find(doc => doc.type === 'tasks');
    expect(tasksDoc?.title).toBe('📋 Test Tasks');
    
    const architectureDoc = result.find(doc => doc.type === 'system_architecture');
    expect(architectureDoc?.title).toBe('🏗 Test System Architecture');
  });

  test('should handle files without markdown title', async () => {
    const testData = testInstance.createTestDataBuilder()
      .addNotes('Just some notes without a title.')
      .build();
    
    await testInstance.createTestEnvironment(testData);

    const result = await listHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBeUndefined();
  });

  test('should skip non-markdown files', async () => {
    const testData = testInstance.createTestDataBuilder()
      .addRequirements('# Document Title')
      .addTasks('# Tasks')
      .build();
    
    await testInstance.createTestEnvironment(testData);

    // Create additional non-markdown files
    const soloflowPath = path.join(testInstance.getProjectRoot(), '.soloflow');
    await fs.writeFile(path.join(soloflowPath, 'config.json'), '{"test": true}');
    await fs.writeFile(path.join(soloflowPath, '.gitignore'), 'node_modules/');

    const result = await listHandler({ projectRoot: testInstance.getProjectRoot() });

    expect(result).toHaveLength(2);
    expect(result.map(doc => doc.type)).toContain('requirements');
    expect(result.map(doc => doc.type)).toContain('tasks');
  });

  test('should handle directory access errors', async () => {
    const nonExistentPath = '/non/existent/path';

    await expect(listHandler({ projectRoot: nonExistentPath })).rejects.toThrow();
  });
}); 