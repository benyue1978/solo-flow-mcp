import { BaseTest } from '../utils/base-test';
import { TestDataBuilder } from '../fixtures/test-data';
import { updateHandler } from '../../src/tools/update.js';
import { DocType } from '../../src/types/docTypes.js';
import * as fs from 'fs/promises';
import * as path from 'path';

// Concrete test class for update operations
class UpdateTest extends BaseTest {
  // Inherit all functionality from BaseTest
}

describe('Update Operation', () => {
  let testInstance: UpdateTest;
  
  beforeEach(async () => {
    testInstance = new UpdateTest();
    await testInstance.setup();
  });
  
  afterEach(async () => {
    await testInstance.teardown();
  });
  
  test('should create new document', async () => {
    const content = '# New Requirements\n\nThis is new content.';
    
    // Create empty environment first
    await testInstance.createEmptyEnvironment();
    
    const result = await updateHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements', 
      content 
    });

    expect(result.ok).toBe(true);
    
    // Verify file was created
    const filePath = path.join(testInstance.getProjectRoot(), '.soloflow', 'requirements.md');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    expect(fileContent).toBe(content);
  });

  test('should update existing document', async () => {
    const initialContent = '# Initial Requirements\n\nInitial content.';
    const updatedContent = '# Updated Requirements\n\nUpdated content.';
    
    const testData = testInstance.createTestDataBuilder()
      .addRequirements(initialContent)
      .build();
    
    await testInstance.createTestEnvironment(testData);

    const result = await updateHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements', 
      content: updatedContent 
    });

    expect(result.ok).toBe(true);
    
    // Verify file was updated
    const filePath = path.join(testInstance.getProjectRoot(), '.soloflow', 'requirements.md');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    expect(fileContent).toBe(updatedContent);
  });

  test('should handle all document types', async () => {
    const docTypes: DocType[] = ['requirements', 'tasks', 'system_architecture', 'test_strategy', 'ui_design', 'deployment', 'notes', 'overview'];
    
    for (const docType of docTypes) {
      const content = `# Test ${docType}\n\nContent for ${docType}.`;
      
      // Create empty environment for each test
      await testInstance.createEmptyEnvironment();
      
      const result = await updateHandler({ 
        projectRoot: testInstance.getProjectRoot(), 
        type: docType, 
        content 
      });

      expect(result.ok).toBe(true);
      
      // Verify file was created
      const filePath = path.join(testInstance.getProjectRoot(), '.soloflow', `${docType}.md`);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      expect(fileContent).toBe(content);
    }
  });

  test('should handle empty content', async () => {
    await testInstance.createEmptyEnvironment();

    await expect(updateHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements', 
      content: '' 
    })).rejects.toThrow('Document content cannot be empty');
  });

  test('should handle invalid document type', async () => {
    await testInstance.createEmptyEnvironment();

    await expect(updateHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'invalid_type' as any, 
      content: '# Test' 
    })).rejects.toThrow('Invalid document type');
  });

  test('should handle directory access errors', async () => {
    await testInstance.createEmptyEnvironment();

    const result = await updateHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements', 
      content: '# Test' 
    });

    expect(result.ok).toBe(true);
  });

  test('should handle large content', async () => {
    const largeContent = '# Large Document\n\n' + 'A'.repeat(10000);
    
    await testInstance.createEmptyEnvironment();
    
    const result = await updateHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements', 
      content: largeContent 
    });

    expect(result.ok).toBe(true);
    
    // Verify file was created with large content
    const filePath = path.join(testInstance.getProjectRoot(), '.soloflow', 'requirements.md');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    expect(fileContent).toBe(largeContent);
    expect(fileContent.length).toBe(10018);
  });

  test('should handle special characters in content', async () => {
    const content = '# Special Characters\n\nContent with éñçüß and 🚀 emoji.';
    
    await testInstance.createEmptyEnvironment();
    
    const result = await updateHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements', 
      content 
    });

    expect(result.ok).toBe(true);
    
    // Verify file was created with special characters
    const filePath = path.join(testInstance.getProjectRoot(), '.soloflow', 'requirements.md');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    expect(fileContent).toBe(content);
  });

  test('should create .soloflow directory if it does not exist', async () => {
    await testInstance.createEmptyEnvironment();

    const result = await updateHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements', 
      content: '# Test' 
    });

    expect(result.ok).toBe(true);
    
    // Verify .soloflow directory was created
    const soloflowPath = path.join(testInstance.getProjectRoot(), '.soloflow');
    const soloflowExists = await fs.access(soloflowPath).then(() => true).catch(() => false);
    expect(soloflowExists).toBe(true);
  });
}); 