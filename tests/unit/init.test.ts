import { jest } from '@jest/globals';
import { initHandler } from '../../src/tools/init';
import { getTempTestProjectRoot, cleanupTestFiles } from '../utils/test-helpers';
import fs from 'fs/promises';
import path from 'path';

describe('Init Operation', () => {
  beforeEach(async () => {
    await cleanupTestFiles();
  });

  afterAll(async () => {
    await cleanupTestFiles();
  });

  test('should create soloflow.mdc file', async () => {
    const projectRoot = getTempTestProjectRoot();
    const cursorRulesPath = path.join(projectRoot, '.cursor', 'rules');
    const soloflowMdcPath = path.join(cursorRulesPath, 'soloflow.mdc');

    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });

    const result = await initHandler({ projectRoot });

    expect(result.ok).toBe(true);
    expect(result.createdFiles).toContain('.cursor/rules/soloflow.mdc');
    expect(result.skippedFiles).toHaveLength(0);
    expect(result.message).toContain('✅ Created files: .cursor/rules/soloflow.mdc');
    expect(result.message).toContain('🎉 Project initialization completed successfully!');
    
    // Verify file was created
    const fileExists = await fs.access(soloflowMdcPath).then(() => true).catch(() => false);
    expect(fileExists).toBe(true);
    
    // Verify content was written
    const content = await fs.readFile(soloflowMdcPath, 'utf-8');
    expect(content).toContain('SoloFlow MCP Service Guidelines');
  });

  test('should skip existing files', async () => {
    const projectRoot = getTempTestProjectRoot();
    const cursorRulesPath = path.join(projectRoot, '.cursor', 'rules');
    const soloflowMdcPath = path.join(cursorRulesPath, 'soloflow.mdc');
    
    // Create the file first
    await fs.mkdir(cursorRulesPath, { recursive: true });
    await fs.writeFile(soloflowMdcPath, '# Existing Content');

    const result = await initHandler({ projectRoot });

    expect(result.ok).toBe(true);
    expect(result.createdFiles).toHaveLength(0);
    expect(result.skippedFiles).toContain('.cursor/rules/soloflow.mdc');
    expect(result.message).toContain('⚠️  Skipped existing files: .cursor/rules/soloflow.mdc');
    expect(result.message).toContain('ℹ️  Project is already initialized. All required files exist.');
    
    // Verify original content was preserved
    const content = await fs.readFile(soloflowMdcPath, 'utf-8');
    expect(content).toBe('# Existing Content');
  });

  test('should provide detailed feedback', async () => {
    const projectRoot = getTempTestProjectRoot();

    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });

    const result = await initHandler({ projectRoot });

    expect(result.message).toContain('✅ Created files:');
    expect(result.message).toContain('🎉 Project initialization completed successfully!');
    expect(result.message).not.toContain('⚠️  Skipped existing files:');
  });

  test('should handle resource file read errors', async () => {
    const projectRoot = getTempTestProjectRoot();
    
    // Mock the resource file to not exist by temporarily moving it
    const resourcePath = path.join(__dirname, '..', '..', 'src', 'resources', 'soloflow.mdc');
    const tempPath = resourcePath + '.backup';
    
    try {
      await fs.rename(resourcePath, tempPath);
      
      await expect(initHandler({ projectRoot })).rejects.toThrow();
    } finally {
      // Restore the file
      try {
        await fs.rename(tempPath, resourcePath);
      } catch (error) {
        // Ignore restore errors
      }
    }
  });

  test('should handle mkdir errors', async () => {
    const projectRoot = '/non/existent/path';

    await expect(initHandler({ projectRoot })).rejects.toThrow();
  });

  test('should handle writeFile errors', async () => {
    const projectRoot = getTempTestProjectRoot();
    const cursorRulesPath = path.join(projectRoot, '.cursor', 'rules');
    
    // Create a file where the directory should be
    await fs.mkdir(path.dirname(cursorRulesPath), { recursive: true });
    await fs.writeFile(cursorRulesPath, 'This is a file, not a directory');

    await expect(initHandler({ projectRoot })).rejects.toThrow();
  });

  test('should handle empty resource content', async () => {
    const projectRoot = getTempTestProjectRoot();
    const cursorRulesPath = path.join(projectRoot, '.cursor', 'rules');
    const soloflowMdcPath = path.join(cursorRulesPath, 'soloflow.mdc');
    
    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });
    
    // Create an empty resource file temporarily
    const resourcePath = path.join(process.cwd(), 'src', 'resources', 'soloflow.mdc');
    const tempPath = resourcePath + '.backup';
    
    try {
      await fs.rename(resourcePath, tempPath);
      await fs.writeFile(resourcePath, '');
      
      const result = await initHandler({ projectRoot });

      expect(result.ok).toBe(true);
      expect(result.createdFiles).toContain('.cursor/rules/soloflow.mdc');
      
      // Verify empty file was created
      const content = await fs.readFile(soloflowMdcPath, 'utf-8');
      expect(content).toBe('');
    } finally {
      // Restore the original file
      try {
        await fs.unlink(resourcePath);
        await fs.rename(tempPath, resourcePath);
      } catch (error) {
        // Ignore restore errors
      }
    }
  });

  test('should handle large resource content', async () => {
    const projectRoot = getTempTestProjectRoot();
    const cursorRulesPath = path.join(projectRoot, '.cursor', 'rules');
    const soloflowMdcPath = path.join(cursorRulesPath, 'soloflow.mdc');
    
    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });
    
    // Create a large resource file temporarily
    const resourcePath = path.join(process.cwd(), 'src', 'resources', 'soloflow.mdc');
    const tempPath = resourcePath + '.backup';
    const largeContent = '# SoloFlow MCP Service Guidelines\n\n'.repeat(1000);
    
    try {
      await fs.rename(resourcePath, tempPath);
      await fs.writeFile(resourcePath, largeContent);
      
      const result = await initHandler({ projectRoot });

      expect(result.ok).toBe(true);
      expect(result.createdFiles).toContain('.cursor/rules/soloflow.mdc');
      
      // Verify large content was written
      const content = await fs.readFile(soloflowMdcPath, 'utf-8');
      expect(content).toBe(largeContent);
    } finally {
      // Restore the original file
      try {
        await fs.unlink(resourcePath);
        await fs.rename(tempPath, resourcePath);
      } catch (error) {
        // Ignore restore errors
      }
    }
  });
}); 