import { join } from 'path';

/**
 * Get the test project root path
 */
export function getTestProjectRoot(): string {
  return join(__dirname, '..', 'fixtures', 'test-project');
}

/**
 * Get the test soloflow path
 */
export function getTestSoloflowPath(): string {
  return join(getTestProjectRoot(), '.soloflow');
}

/**
 * Get the test document path for a specific type
 */
export function getTestDocumentPath(type: string): string {
  return join(getTestSoloflowPath(), `${type}.md`);
}

/**
 * Create a temporary test project path
 */
export function getTempTestProjectRoot(): string {
  return join(__dirname, '..', 'fixtures', 'temp-test-project');
}

/**
 * Clean up test files (for cleanup in tests)
 */
export async function cleanupTestFiles(): Promise<void> {
  const fs = await import('fs/promises');
  const tempPath = getTempTestProjectRoot();
  
  try {
    await fs.rm(tempPath, { recursive: true, force: true });
  } catch (error) {
    // Ignore errors if directory doesn't exist
  }
} 