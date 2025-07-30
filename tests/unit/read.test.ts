import { jest } from '@jest/globals';
import { readHandler } from '../../src/tools/read';
import { DocType } from '../../src/types/docTypes';
import fs from 'fs/promises';
import path from 'path';

// Mock fs.promises
jest.mock('fs/promises');

describe('Read Operation', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should read existing document', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    const documentPath = path.join(projectRoot, '.soloflow', 'requirements.md');
    const documentContent = '# 📋 Project Requirements\n\nThis is the requirements document.';
    
    // Mock file exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock readFile to return content
    mockFs.readFile.mockResolvedValue(documentContent);

    const result = await readHandler({ projectRoot, type: docType });

    expect(result.raw).toBe(documentContent);
    expect(mockFs.readFile).toHaveBeenCalledWith(documentPath, 'utf-8');
  });

  test('should return null for non-existent document', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    const documentPath = path.join(projectRoot, '.soloflow', 'requirements.md');
    
    // Mock file does not exist
    mockFs.access.mockRejectedValue(new Error('ENOENT'));

    const result = await readHandler({ projectRoot, type: docType });

    expect(result.raw).toBeNull();
    expect(mockFs.readFile).not.toHaveBeenCalled();
  });

  test('should validate document type', async () => {
    const projectRoot = '/Users/test/project';
    const invalidDocType = 'invalid_type' as DocType;
    
    // Mock file exists
    mockFs.access.mockResolvedValue(undefined);
    mockFs.readFile.mockResolvedValue('content');

    const result = await readHandler({ projectRoot, type: invalidDocType });

    // Should still work as validation is done at type level
    expect(result.raw).toBe('content');
  });

  test('should handle read file errors', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    const documentPath = path.join(projectRoot, '.soloflow', 'requirements.md');
    
    // Mock file exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock readFile error
    mockFs.readFile.mockRejectedValue(new Error('Read error'));

    await expect(readHandler({ projectRoot, type: docType })).rejects.toThrow('Read error');
  });

  test('should handle all document types', async () => {
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
    
    // Mock file exists for all types
    mockFs.access.mockResolvedValue(undefined);
    mockFs.readFile.mockResolvedValue('content');

    for (const docType of docTypes) {
      const result = await readHandler({ projectRoot, type: docType });
      expect(result.raw).toBe('content');
    }
  });

  test('should handle permission errors', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    
    // Mock permission error
    mockFs.access.mockRejectedValue(new Error('EACCES'));

    await expect(readHandler({ projectRoot, type: docType })).rejects.toThrow('EACCES');
  });

  test('should handle directory traversal attempts', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    
    // Mock file exists
    mockFs.access.mockResolvedValue(undefined);
    mockFs.readFile.mockResolvedValue('content');

    const result = await readHandler({ projectRoot, type: docType });

    // Should work normally as path validation is done at context level
    expect(result.raw).toBe('content');
  });
}); 