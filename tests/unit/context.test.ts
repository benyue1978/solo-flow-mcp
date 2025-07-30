import { BaseTest } from '../utils/base-test';
import { validateProjectRoot, validateDocType, getSoloflowPath, getDocumentPath } from '../../src/context.js';
import { DocType } from '../../src/types/docTypes.js';

// Concrete test class for context operations
class ContextTest extends BaseTest {
  // Inherit all functionality from BaseTest
}

describe('Context Utilities', () => {
  let testInstance: ContextTest;
  
  beforeEach(async () => {
    testInstance = new ContextTest();
    await testInstance.setup();
  });
  
  afterEach(async () => {
    await testInstance.teardown();
  });
  
  describe('validateProjectRoot', () => {
    test('should validate existing project root', async () => {
      await testInstance.createEmptyEnvironment();
      
      const result = validateProjectRoot(testInstance.getProjectRoot());
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('should reject non-existent project root', () => {
      const nonExistentPath = '/non/existent/path';
      
      const result = validateProjectRoot(nonExistentPath);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Project root directory does not exist');
    });

    test('should reject relative paths', () => {
      const relativePath = './relative/path';
      
      const result = validateProjectRoot(relativePath);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Project root must be an absolute path');
    });

    test('should reject empty path', () => {
      const emptyPath = '';
      
      const result = validateProjectRoot(emptyPath);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Project root must be an absolute path');
    });
  });

  describe('validateDocType', () => {
    test('should validate all valid document types', () => {
      const validTypes: DocType[] = [
        'overview',
        'requirements',
        'system_architecture',
        'test_strategy',
        'ui_design',
        'tasks',
        'deployment',
        'notes'
      ];
      
      validTypes.forEach(type => {
        const result = validateDocType(type);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    test('should reject invalid document type', () => {
      const invalidType = 'invalid_type' as any;
      
      const result = validateDocType(invalidType);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid document type');
    });

    test('should reject empty document type', () => {
      const emptyType = '' as any;
      
      const result = validateDocType(emptyType);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid document type');
    });
  });

  describe('getSoloflowPath', () => {
    test('should return correct soloflow path', async () => {
      await testInstance.createEmptyEnvironment();
      
      const soloflowPath = getSoloflowPath(testInstance.getProjectRoot());
      const expectedPath = testInstance.getProjectRoot() + '/.soloflow';
      
      expect(soloflowPath).toBe(expectedPath);
    });
  });

  describe('getDocumentPath', () => {
    test('should return correct document path', async () => {
      await testInstance.createEmptyEnvironment();
      
      const docType: DocType = 'requirements';
      const documentPath = getDocumentPath(testInstance.getProjectRoot(), docType);
      const expectedPath = testInstance.getProjectRoot() + '/.soloflow/requirements.md';
      
      expect(documentPath).toBe(expectedPath);
    });

    test('should handle different document types', async () => {
      await testInstance.createEmptyEnvironment();
      
      const docTypes: DocType[] = ['tasks', 'system_architecture', 'test_strategy'];
      
      docTypes.forEach(type => {
        const documentPath = getDocumentPath(testInstance.getProjectRoot(), type);
        const expectedPath = testInstance.getProjectRoot() + `/.soloflow/${type}.md`;
        
        expect(documentPath).toBe(expectedPath);
      });
    });
  });
}); 