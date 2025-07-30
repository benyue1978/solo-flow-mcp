import { jest } from '@jest/globals';
import { validateProjectRoot, getSoloflowPath, getDocumentPath } from '../../src/context';
import { DocType } from '../../src/types/docTypes';
import { getTestProjectRoot, getTestSoloflowPath, getTestDocumentPath } from '../utils/test-helpers';
import path from 'path';

describe('Project Path Validation', () => {
  describe('validateProjectRoot', () => {
    test('should accept valid absolute path', async () => {
      const testProjectRoot = getTestProjectRoot();
      const result = validateProjectRoot(testProjectRoot);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('should reject relative path', async () => {
      const relativePath = './project';

      const result = validateProjectRoot(relativePath);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be an absolute path');
    });

    test('should reject system directories', async () => {
      const systemPaths = [
        '/etc/test',
        '/var/test',
        '/usr/test',
        '/bin/test',
        '/sbin/test',
        '/dev/test',
        '/proc/test',
        '/sys/test'
      ];

      for (const systemPath of systemPaths) {
        const result = validateProjectRoot(systemPath);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('system directories');
      }
    });

    test('should validate project root exists', async () => {
      const nonExistentPath = '/non/existent/path';

      const result = validateProjectRoot(nonExistentPath);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('does not exist');
    });

    test('should reject if path is not a directory', async () => {
      // Create a temporary file for testing
      const fs = await import('fs/promises');
      const tempFile = path.join(__dirname, 'temp-test-file.txt');
      
      try {
        await fs.writeFile(tempFile, 'test content');
        
        const result = validateProjectRoot(tempFile);

        expect(result.isValid).toBe(false);
        expect(result.error).toContain('must be a directory');
      } finally {
        // Clean up
        try {
          await fs.unlink(tempFile);
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    });
  });

  describe('getSoloflowPath', () => {
    test('should return correct soloflow path', () => {
      const projectRoot = '/Users/test/project';
      const expectedPath = path.join(projectRoot, '.soloflow');

      const result = getSoloflowPath(projectRoot);

      expect(result).toBe(expectedPath);
    });

    test('should work with test project root', () => {
      const testProjectRoot = getTestProjectRoot();
      const expectedPath = getTestSoloflowPath();

      const result = getSoloflowPath(testProjectRoot);

      expect(result).toBe(expectedPath);
    });
  });

  describe('getDocumentPath', () => {
    test('should return correct document path for valid type', () => {
      const projectRoot = '/Users/test/project';
      const docType: DocType = 'requirements';
      const expectedPath = path.join(projectRoot, '.soloflow', 'requirements.md');

      const result = getDocumentPath(projectRoot, docType);

      expect(result).toBe(expectedPath);
    });

    test('should handle all document types', () => {
      const projectRoot = '/Users/test/project';
      const docTypes: DocType[] = [
        'overview',
        'requirements',
        'system_architecture',
        'test_strategy',
        'ui_design',
        'tasks',
        'deployment',
        'notes'
      ];

      docTypes.forEach(type => {
        const result = getDocumentPath(projectRoot, type);
        expect(result).toBe(path.join(projectRoot, '.soloflow', `${type}.md`));
      });
    });

    test('should work with test project root', () => {
      const testProjectRoot = getTestProjectRoot();
      const docType: DocType = 'requirements';
      const expectedPath = getTestDocumentPath('requirements');

      const result = getDocumentPath(testProjectRoot, docType);

      expect(result).toBe(expectedPath);
    });
  });
}); 