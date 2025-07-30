import { jest } from '@jest/globals';
import { listHandler } from '../../src/tools/list';
import { DocumentSummary } from '../../src/types/docTypes';
import { getTestProjectRoot, getTempTestProjectRoot, cleanupTestFiles } from '../utils/test-helpers';
import fs from 'fs/promises';
import path from 'path';

describe('List Operation', () => {
  beforeEach(async () => {
    await cleanupTestFiles();
  });

  afterAll(async () => {
    await cleanupTestFiles();
  });

  test('should list documents in .soloflow directory', async () => {
    const projectRoot = getTestProjectRoot();

    const result = await listHandler({ projectRoot });

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
    const projectRoot = getTempTestProjectRoot();
    
    // Create the directory but leave it empty
    await fs.mkdir(path.join(projectRoot, '.soloflow'), { recursive: true });

    const result = await listHandler({ projectRoot });

    expect(result).toHaveLength(0);
  });

  test('should extract document titles from markdown content', async () => {
    const projectRoot = getTestProjectRoot();

    const result = await listHandler({ projectRoot });

    const requirementsDoc = result.find(doc => doc.type === 'requirements');
    expect(requirementsDoc?.title).toBe('📋 Test Requirements');
    
    const tasksDoc = result.find(doc => doc.type === 'tasks');
    expect(tasksDoc?.title).toBe('📋 Test Tasks');
    
    const architectureDoc = result.find(doc => doc.type === 'system_architecture');
    expect(architectureDoc?.title).toBe('🏗 Test System Architecture');
  });

  test('should handle files without markdown title', async () => {
    const projectRoot = getTempTestProjectRoot();
    const soloflowPath = path.join(projectRoot, '.soloflow');
    
    // Create directory
    await fs.mkdir(soloflowPath, { recursive: true });
    
    // Create a file without a title
    await fs.writeFile(path.join(soloflowPath, 'notes.md'), 'Just some notes without a title.');

    const result = await listHandler({ projectRoot });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBeUndefined();
  });

  test('should skip non-markdown files', async () => {
    const projectRoot = getTempTestProjectRoot();
    const soloflowPath = path.join(projectRoot, '.soloflow');
    
    // Create directory
    await fs.mkdir(soloflowPath, { recursive: true });
    
    // Create mixed files
    await fs.writeFile(path.join(soloflowPath, 'requirements.md'), '# Document Title');
    await fs.writeFile(path.join(soloflowPath, 'config.json'), '{"test": true}');
    await fs.writeFile(path.join(soloflowPath, 'tasks.md'), '# Tasks');
    await fs.writeFile(path.join(soloflowPath, '.gitignore'), 'node_modules/');

    const result = await listHandler({ projectRoot });

    expect(result).toHaveLength(2);
    expect(result.map(doc => doc.name)).toEqual(['requirements.md', 'tasks.md']);
  });

  test('should handle directory access errors', async () => {
    const projectRoot = '/non/existent/path';

    await expect(listHandler({ projectRoot })).rejects.toThrow();
  });
}); 