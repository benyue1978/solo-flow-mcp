import { jest } from '@jest/globals';
import { initHandler } from '../../src/tools/init';
import fs from 'fs/promises';
import path from 'path';

// Mock fs.promises
jest.mock('fs/promises');

describe('Init Operation', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create soloflow.mdc file', async () => {
    const projectRoot = '/Users/test/project';
    const cursorRulesPath = path.join(projectRoot, '.cursor', 'rules');
    const soloflowMdcPath = path.join(cursorRulesPath, 'soloflow.mdc');
    const resourcePath = path.join(__dirname, '..', '..', 'src', 'resources', 'soloflow.mdc');
    
    // Mock resource file exists and has content
    mockFs.readFile.mockResolvedValue('# SoloFlow MCP Service Guidelines\n\nThis is the content.');
    
    // Mock .cursor/rules directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir success
    mockFs.mkdir.mockResolvedValue(undefined);
    
    // Mock writeFile success
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await initHandler({ projectRoot });

    expect(result.ok).toBe(true);
    expect(result.createdFiles).toContain('.cursor/rules/soloflow.mdc');
    expect(result.skippedFiles).toHaveLength(0);
    expect(result.message).toContain('✅ Created files: .cursor/rules/soloflow.mdc');
    expect(result.message).toContain('🎉 Project initialization completed successfully!');
    
    expect(mockFs.mkdir).toHaveBeenCalledWith(cursorRulesPath, { recursive: true });
    expect(mockFs.writeFile).toHaveBeenCalledWith(soloflowMdcPath, '# SoloFlow MCP Service Guidelines\n\nThis is the content.', 'utf-8');
  });

  test('should skip existing files', async () => {
    const projectRoot = '/Users/test/project';
    const cursorRulesPath = path.join(projectRoot, '.cursor', 'rules');
    const soloflowMdcPath = path.join(cursorRulesPath, 'soloflow.mdc');
    
    // Mock resource file exists
    mockFs.readFile.mockResolvedValue('# SoloFlow MCP Service Guidelines\n\nThis is the content.');
    
    // Mock .cursor/rules directory exists
    mockFs.access.mockResolvedValue(undefined);
    
    // Mock soloflow.mdc file exists
    mockFs.access.mockResolvedValue(undefined);

    const result = await initHandler({ projectRoot });

    expect(result.ok).toBe(true);
    expect(result.createdFiles).toHaveLength(0);
    expect(result.skippedFiles).toContain('.cursor/rules/soloflow.mdc');
    expect(result.message).toContain('⚠️  Skipped existing files: .cursor/rules/soloflow.mdc');
    expect(result.message).toContain('ℹ️  Project is already initialized. All required files exist.');
    
    expect(mockFs.writeFile).not.toHaveBeenCalled();
  });

  test('should provide detailed feedback', async () => {
    const projectRoot = '/Users/test/project';
    
    // Mock resource file exists
    mockFs.readFile.mockResolvedValue('# SoloFlow MCP Service Guidelines\n\nThis is the content.');
    
    // Mock .cursor/rules directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir and writeFile success
    mockFs.mkdir.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await initHandler({ projectRoot });

    expect(result.message).toContain('✅ Created files:');
    expect(result.message).toContain('🎉 Project initialization completed successfully!');
    expect(result.message).not.toContain('⚠️  Skipped existing files:');
  });

  test('should handle resource file read errors', async () => {
    const projectRoot = '/Users/test/project';
    
    // Mock resource file read error
    mockFs.readFile.mockRejectedValue(new Error('Resource file not found'));

    await expect(initHandler({ projectRoot })).rejects.toThrow('Resource file not found');
  });

  test('should handle mkdir errors', async () => {
    const projectRoot = '/Users/test/project';
    
    // Mock resource file exists
    mockFs.readFile.mockResolvedValue('# SoloFlow MCP Service Guidelines\n\nThis is the content.');
    
    // Mock .cursor/rules directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir error
    mockFs.mkdir.mockRejectedValue(new Error('Permission denied'));

    await expect(initHandler({ projectRoot })).rejects.toThrow('Permission denied');
  });

  test('should handle writeFile errors', async () => {
    const projectRoot = '/Users/test/project';
    
    // Mock resource file exists
    mockFs.readFile.mockResolvedValue('# SoloFlow MCP Service Guidelines\n\nThis is the content.');
    
    // Mock .cursor/rules directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir success
    mockFs.mkdir.mockResolvedValue(undefined);
    
    // Mock writeFile error
    mockFs.writeFile.mockRejectedValue(new Error('Write error'));

    await expect(initHandler({ projectRoot })).rejects.toThrow('Write error');
  });

  test('should handle empty resource content', async () => {
    const projectRoot = '/Users/test/project';
    
    // Mock resource file exists but is empty
    mockFs.readFile.mockResolvedValue('');
    
    // Mock .cursor/rules directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir and writeFile success
    mockFs.mkdir.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await initHandler({ projectRoot });

    expect(result.ok).toBe(true);
    expect(result.createdFiles).toContain('.cursor/rules/soloflow.mdc');
  });

  test('should handle large resource content', async () => {
    const projectRoot = '/Users/test/project';
    const largeContent = '# SoloFlow MCP Service Guidelines\n\n'.repeat(1000); // Large content
    
    // Mock resource file exists with large content
    mockFs.readFile.mockResolvedValue(largeContent);
    
    // Mock .cursor/rules directory does not exist
    mockFs.access.mockRejectedValueOnce(new Error('ENOENT'));
    
    // Mock mkdir and writeFile success
    mockFs.mkdir.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);

    const result = await initHandler({ projectRoot });

    expect(result.ok).toBe(true);
    expect(result.createdFiles).toContain('.cursor/rules/soloflow.mdc');
  });
}); 