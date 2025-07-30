import { jest } from '@jest/globals';
import { listHandler } from '../../src/tools/list';
import { DocumentSummary } from '../../src/types/docTypes';
import fs from 'fs/promises';
import path from 'path';

// Mock fs.promises
jest.mock('fs/promises');

describe('List Operation', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should list documents in .soloflow directory', async () => {
    const projectRoot = '/Users/test/project';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    
    // Mock directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock readdir to return document files
    mockFs.readdir.mockResolvedValue([
      'requirements.md',
      'tasks.md',
      'system_architecture.md'
    ] as any);
    
    // Mock stat for each file
    mockFs.stat.mockResolvedValue({
      isFile: () => true,
      mtime: new Date('2025-07-30T10:00:00.000Z'),
    } as any);

    const result = await listHandler({ projectRoot });

    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({
      type: 'requirements',
      name: 'requirements.md',
      title: expect.any(String),
      lastUpdated: expect.any(String)
    });
  });

  test('should return empty array for empty directory', async () => {
    const projectRoot = '/Users/test/project';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    
    // Mock directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock readdir to return empty array
    mockFs.readdir.mockResolvedValue([]);

    const result = await listHandler({ projectRoot });

    expect(result).toHaveLength(0);
  });

  test('should extract document titles from markdown content', async () => {
    const projectRoot = '/Users/test/project';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    
    // Mock directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock readdir to return one file
    mockFs.readdir.mockResolvedValue(['requirements.md'] as any);
    
    // Mock stat
    mockFs.stat.mockResolvedValue({
      isFile: () => true,
      mtime: new Date('2025-07-30T10:00:00.000Z'),
    } as any);
    
    // Mock readFile to return markdown content with title
    mockFs.readFile.mockResolvedValue('# 📋 Project Requirements\n\nThis is the requirements document.');

    const result = await listHandler({ projectRoot });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('📋 Project Requirements');
  });

  test('should handle files without markdown title', async () => {
    const projectRoot = '/Users/test/project';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    
    // Mock directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock readdir to return one file
    mockFs.readdir.mockResolvedValue(['notes.md'] as any);
    
    // Mock stat
    mockFs.stat.mockResolvedValue({
      isFile: () => true,
      mtime: new Date('2025-07-30T10:00:00.000Z'),
    } as any);
    
    // Mock readFile to return content without title
    mockFs.readFile.mockResolvedValue('Just some notes without a title.');

    const result = await listHandler({ projectRoot });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('notes.md');
  });

  test('should skip non-markdown files', async () => {
    const projectRoot = '/Users/test/project';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    
    // Mock directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock readdir to return mixed files
    mockFs.readdir.mockResolvedValue([
      'requirements.md',
      'config.json',
      'tasks.md',
      '.gitignore'
    ] as any);
    
    // Mock stat for each file
    mockFs.stat.mockResolvedValue({
      isFile: () => true,
      mtime: new Date('2025-07-30T10:00:00.000Z'),
    } as any);
    
    // Mock readFile for markdown files
    mockFs.readFile.mockResolvedValue('# Document Title');

    const result = await listHandler({ projectRoot });

    expect(result).toHaveLength(2);
    expect(result.map(doc => doc.name)).toEqual(['requirements.md', 'tasks.md']);
  });

  test('should handle directory access errors', async () => {
    const projectRoot = '/Users/test/project';
    
    // Mock directory access error
    mockFs.access.mockRejectedValue(new Error('Permission denied'));

    await expect(listHandler({ projectRoot })).rejects.toThrow('Permission denied');
  });

  test('should handle readdir errors', async () => {
    const projectRoot = '/Users/test/project';
    
    // Mock directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock readdir error
    mockFs.readdir.mockRejectedValue(new Error('Directory read error'));

    await expect(listHandler({ projectRoot })).rejects.toThrow('Directory read error');
  });
}); 