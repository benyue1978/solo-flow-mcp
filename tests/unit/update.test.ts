import { jest } from '@jest/globals';
import { updateHandler } from '../../src/tools/update';
import { DocType } from '../../src/types/docTypes';
import fs from 'fs/promises';
import path from 'path';

// Mock fs.promises
jest.mock('fs/promises');

describe('Update Operation', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create new document', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    const content = '# 📋 Project Requirements\n\nThis is the requirements document.';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'requirements.md');
    
    // Mock .soloflow directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir success
    mockFs.mkdir.mockResolvedValue(undefined);
    
    // Mock writeFile success
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await updateHandler({ projectRoot, type: docType, content });

    expect(result.ok).toBe(true);
    expect(mockFs.mkdir).toHaveBeenCalledWith(soloflowPath, { recursive: true });
    expect(mockFs.writeFile).toHaveBeenCalledWith(documentPath, content, 'utf-8');
  });

  test('should update existing document', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    const content = '# 📋 Updated Requirements\n\nUpdated content.';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'requirements.md');
    
    // Mock .soloflow directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock writeFile success
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await updateHandler({ projectRoot, type: docType, content });

    expect(result.ok).toBe(true);
    expect(mockFs.writeFile).toHaveBeenCalledWith(documentPath, content, 'utf-8');
    expect(mockFs.mkdir).not.toHaveBeenCalled();
  });

  test('should create .soloflow directory if needed', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'tasks';
    const content = '# 📋 Tasks\n\nTask list.';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'tasks.md');
    
    // Mock .soloflow directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir success
    mockFs.mkdir.mockResolvedValue(undefined);
    
    // Mock writeFile success
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await updateHandler({ projectRoot, type: docType, content });

    expect(result.ok).toBe(true);
    expect(mockFs.mkdir).toHaveBeenCalledWith(soloflowPath, { recursive: true });
  });

  test('should handle write file errors', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    const content = '# 📋 Requirements\n\nContent.';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'requirements.md');
    
    // Mock .soloflow directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock writeFile error
    mockFs.writeFile.mockRejectedValue(new Error('Write error'));

    await expect(updateHandler({ projectRoot, type: docType, content })).rejects.toThrow('Write error');
  });

  test('should handle mkdir errors', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    const content = '# 📋 Requirements\n\nContent.';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    
    // Mock .soloflow directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir error
    mockFs.mkdir.mockRejectedValue(new Error('Permission denied'));

    await expect(updateHandler({ projectRoot, type: docType, content })).rejects.toThrow('Permission denied');
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
    const content = '# Document Title\n\nContent.';
    
    // Mock .soloflow directory exists
    mockFs.access.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);

    for (const docType of docTypes) {
      const result = await updateHandler({ projectRoot, type: docType, content });
      expect(result.ok).toBe(true);
    }
  });

  test('should handle empty content', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'notes';
    const content = '';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'notes.md');
    
    // Mock .soloflow directory exists
    mockFs.access.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await updateHandler({ projectRoot, type: docType, content });

    expect(result.ok).toBe(true);
    expect(mockFs.writeFile).toHaveBeenCalledWith(documentPath, '', 'utf-8');
  });

  test('should handle large content', async () => {
    const projectRoot = '/Users/test/project';
    const docType: DocType = 'requirements';
    const content = '# 📋 Requirements\n\n'.repeat(1000); // Large content
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'requirements.md');
    
    // Mock .soloflow directory exists
    mockFs.access.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await updateHandler({ projectRoot, type: docType, content });

    expect(result.ok).toBe(true);
    expect(mockFs.writeFile).toHaveBeenCalledWith(documentPath, content, 'utf-8');
  });
}); 