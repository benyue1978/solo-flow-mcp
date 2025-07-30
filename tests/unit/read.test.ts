import { BaseTest } from '../utils/base-test';
import { TestDataBuilder } from '../fixtures/test-data';
import { readHandler } from '../../src/tools/read.js';
import { DocType } from '../../src/types/docTypes.js';

// Concrete test class for read operations
class ReadTest extends BaseTest {
  // Inherit all functionality from BaseTest
}

describe('Read Operation', () => {
  let testInstance: ReadTest;
  
  beforeEach(async () => {
    testInstance = new ReadTest();
    await testInstance.setup();
  });
  
  afterEach(async () => {
    await testInstance.teardown();
  });
  
  test('should read document content', async () => {
    const testData = testInstance.createTestDataBuilder()
      .addRequirements('# Test Requirements\n\nThis is test content.')
      .build();
    
    await testInstance.createTestEnvironment(testData);

    const result = await readHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements' 
    });

    expect(result.raw).toBe('# Test Requirements\n\nThis is test content.');
  });

  test('should read all document types', async () => {
    const testData = testInstance.createTestDataBuilder()
      .addRequirements('# Test Requirements')
      .addTasks('# Test Tasks')
      .addSystemArchitecture('# System Architecture')
      .addTestStrategy('# Test Strategy')
      .addUIDesign('# UI Design')
      .addDeployment('# Deployment')
      .addNotes('# Notes')
      .addOverview('# Overview')
      .build();
    
    await testInstance.createTestEnvironment(testData);

    const docTypes: DocType[] = ['requirements', 'tasks', 'system_architecture', 'test_strategy', 'ui_design', 'deployment', 'notes', 'overview'];
    
    for (const docType of docTypes) {
      const result = await readHandler({ 
        projectRoot: testInstance.getProjectRoot(), 
        type: docType 
      });
      
      if (docType === 'system_architecture') {
        expect(result.raw).toBe('# System Architecture');
      } else if (docType === 'test_strategy') {
        expect(result.raw).toBe('# Test Strategy');
      } else if (docType === 'ui_design') {
        expect(result.raw).toBe('# UI Design');
      } else if (docType === 'requirements') {
        expect(result.raw).toBe('# Test Requirements');
      } else if (docType === 'tasks') {
        expect(result.raw).toBe('# Test Tasks');
      } else if (docType === 'deployment') {
        expect(result.raw).toBe('# Deployment');
      } else if (docType === 'notes') {
        expect(result.raw).toBe('# Notes');
      } else if (docType === 'overview') {
        expect(result.raw).toBe('# Overview');
      }
    }
  });

  test('should return null for non-existent document', async () => {
    await testInstance.createTestEnvironment();

    const result = await readHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements' 
    });

    expect(result.raw).toBeNull();
  });

  test('should handle invalid document type', async () => {
    await testInstance.createTestEnvironment();

    await expect(readHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'invalid_type' as any 
    })).rejects.toThrow('Invalid document type');
  });

  test('should handle directory access errors', async () => {
    await testInstance.createEmptyEnvironment();

    const result = await readHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements' 
    });

    expect(result.raw).toBeNull();
  });

  test('should read document with special characters', async () => {
    const testData = testInstance.createTestDataBuilder()
      .addRequirements('# Test Requirements\n\nContent with special chars: éñçüß')
      .build();
    
    await testInstance.createTestEnvironment(testData);

    const result = await readHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements' 
    });

    expect(result.raw).toBe('# Test Requirements\n\nContent with special chars: éñçüß');
  });

  test('should read large document content', async () => {
    const largeContent = '# Large Document\n\n' + 'A'.repeat(10000);
    const testData = testInstance.createTestDataBuilder()
      .addRequirements(largeContent)
      .build();
    
    await testInstance.createTestEnvironment(testData);

    const result = await readHandler({ 
      projectRoot: testInstance.getProjectRoot(), 
      type: 'requirements' 
    });

    expect(result.raw).toBe(largeContent);
    expect(result.raw?.length).toBe(10018); // 18 chars for title + 10000 for content
  });
}); 