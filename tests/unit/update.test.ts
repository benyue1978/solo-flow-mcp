import { jest } from '@jest/globals';
import { updateHandler } from '../../src/tools/update';
import { DocType } from '../../src/types/docTypes';
import { getTempTestProjectRoot, cleanupTestFiles } from '../utils/test-helpers';
import fs from 'fs/promises';
import path from 'path';

describe('Update Operation', () => {
  beforeEach(async () => {
    await cleanupTestFiles();
  });

  afterAll(async () => {
    await cleanupTestFiles();
  });

  test('should create new document', async () => {
    const projectRoot = getTempTestProjectRoot();
    const docType: DocType = 'requirements';
    const content = '# 📋 Project Requirements\n\nThis is the requirements document.';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'requirements.md');

    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });

    const result = await updateHandler({ projectRoot, type: docType, content });

    expect(result.ok).toBe(true);
    
    // Verify file was created
    const fileExists = await fs.access(documentPath).then(() => true).catch(() => false);
    expect(fileExists).toBe(true);
    
    // Verify content was written correctly
    const writtenContent = await fs.readFile(documentPath, 'utf-8');
    expect(writtenContent).toBe(content);
  });

  test('should update existing document', async () => {
    const projectRoot = getTempTestProjectRoot();
    const docType: DocType = 'requirements';
    const initialContent = '# 📋 Initial Requirements\n\nInitial content.';
    const updatedContent = '# 📋 Updated Requirements\n\nUpdated content.';
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'requirements.md');
    
    // Create initial file
    await fs.mkdir(soloflowPath, { recursive: true });
    await fs.writeFile(documentPath, initialContent);

    const result = await updateHandler({ projectRoot, type: docType, content: updatedContent });

    expect(result.ok).toBe(true);
    
    // Verify content was updated
    const writtenContent = await fs.readFile(documentPath, 'utf-8');
    expect(writtenContent).toBe(updatedContent);
  });

  test('should create .soloflow directory if needed', async () => {
    const projectRoot = getTempTestProjectRoot();
    const docType: DocType = 'tasks';
    const content = '# 📋 Tasks\n\nTask list.';
    const soloflowPath = path.join(projectRoot, '.soloflow');

    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });

    const result = await updateHandler({ projectRoot, type: docType, content });

    expect(result.ok).toBe(true);
    
    // Verify directory was created
    const dirExists = await fs.access(soloflowPath).then(() => true).catch(() => false);
    expect(dirExists).toBe(true);
  });

  test('should handle write file errors', async () => {
    const projectRoot = '/non/existent/path';
    const docType: DocType = 'requirements';
    const content = '# 📋 Requirements\n\nContent.';

    await expect(updateHandler({ projectRoot, type: docType, content })).rejects.toThrow();
  });

  test('should handle all document types', async () => {
    const projectRoot = getTempTestProjectRoot();
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

    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });

    for (const docType of docTypes) {
      const result = await updateHandler({ projectRoot, type: docType, content });
      expect(result.ok).toBe(true);
    }
  });

  test('should handle empty content', async () => {
    const projectRoot = getTempTestProjectRoot();
    const docType: DocType = 'notes';
    const content = '';

    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });

    await expect(updateHandler({ projectRoot, type: docType, content })).rejects.toThrow('Document content cannot be empty');
  });

  test('should handle large content', async () => {
    const projectRoot = getTempTestProjectRoot();
    const docType: DocType = 'requirements';
    const content = '# 📋 Requirements\n\n'.repeat(1000); // Large content
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const documentPath = path.join(soloflowPath, 'requirements.md');

    // Create the project root directory
    await fs.mkdir(projectRoot, { recursive: true });

    const result = await updateHandler({ projectRoot, type: docType, content });

    expect(result.ok).toBe(true);
    
    // Verify large content was written
    const writtenContent = await fs.readFile(documentPath, 'utf-8');
    expect(writtenContent).toBe(content);
  });
}); 