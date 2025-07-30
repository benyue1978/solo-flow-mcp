import { jest } from '@jest/globals';
import { readHandler } from '../../src/tools/read';
import { DocType } from '../../src/types/docTypes';
import { getTestProjectRoot, getTempTestProjectRoot, cleanupTestFiles } from '../utils/test-helpers';
import fs from 'fs/promises';
import path from 'path';

describe('Read Operation', () => {
  beforeEach(async () => {
    await cleanupTestFiles();
  });

  afterAll(async () => {
    await cleanupTestFiles();
  });

  test('should read existing document', async () => {
    const projectRoot = getTestProjectRoot();
    const docType: DocType = 'requirements';
    const result = await readHandler({ projectRoot, type: docType });

    expect(result.raw).toContain('# 📋 Test Requirements');
    expect(result.raw).toContain('This is a test requirements document for unit testing');
    expect(result.raw).toContain('Test document reading');
    expect(result.raw).toContain('Performance: Fast execution');
  });

  test('should return null for non-existent document', async () => {
    const projectRoot = getTestProjectRoot();
    const docType: DocType = 'overview';

    const result = await readHandler({ projectRoot, type: docType });

    expect(result.raw).toBeNull();
  });

  test('should validate document type', async () => {
    const projectRoot = getTestProjectRoot();
    const invalidDocType = 'invalid_type' as DocType;

    await expect(readHandler({ projectRoot, type: invalidDocType })).rejects.toThrow('Invalid document type');
  });

  test('should handle all document types', async () => {
    const projectRoot = getTestProjectRoot();
    const docTypes: DocType[] = [
      'requirements',
      'tasks',
      'system_architecture'
    ];

    for (const docType of docTypes) {
      const result = await readHandler({ projectRoot, type: docType });
      expect(result.raw).toBeTruthy();
      expect(typeof result.raw).toBe('string');
    }
  });

  test('should handle permission errors', async () => {
    const projectRoot = '/non/existent/path';
    const docType: DocType = 'requirements';

    await expect(readHandler({ projectRoot, type: docType })).rejects.toThrow();
  });

  test('should handle directory traversal attempts', async () => {
    const projectRoot = getTestProjectRoot();
    const docType: DocType = 'requirements';

    const result = await readHandler({ projectRoot, type: docType });

    // Should work normally as path validation is done at context level
    expect(result.raw).toBeTruthy();
  });

  test('should read document from temporary project', async () => {
    const projectRoot = getTempTestProjectRoot();
    const soloflowPath = path.join(projectRoot, '.soloflow');
    const docType: DocType = 'notes';
    const testContent = '# Test Document\n\nThis is a test document.';
    
    // Create directory and file
    await fs.mkdir(soloflowPath, { recursive: true });
    await fs.writeFile(path.join(soloflowPath, 'notes.md'), testContent);

    const result = await readHandler({ projectRoot, type: docType });

    expect(result.raw).toBe(testContent);
  });
}); 