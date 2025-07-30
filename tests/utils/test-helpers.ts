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
 * Create a temporary test project path with unique identifier
 */
export function getTempTestProjectRoot(): string {
  // Use timestamp + random + process ID for better uniqueness
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const pid = process.pid;
  const uniqueId = `${timestamp}-${random}-${pid}`;
  return join(__dirname, '..', 'fixtures', `temp-test-project-${uniqueId}`);
}

/**
 * Ensure test directory and files exist for testing
 * This function will not exit until the expected state is achieved
 */
export async function ensureTestSetup(projectRoot: string, files?: Array<{ type: string; content: string }>): Promise<void> {
  const fs = await import('fs/promises');
  
  // Ensure project root exists
  await fs.mkdir(projectRoot, { recursive: true });
  
  // Ensure .soloflow directory exists
  const soloflowPath = join(projectRoot, '.soloflow');
  await fs.mkdir(soloflowPath, { recursive: true });
  
  // Create test files if provided
  if (files) {
    for (const file of files) {
      const filePath = join(soloflowPath, `${file.type}.md`);
      await fs.writeFile(filePath, file.content);
    }
  }
}

/**
 * Ensure only project root exists (for init tests)
 * This function will not exit until the expected state is achieved
 */
export async function ensureProjectRootOnly(projectRoot: string): Promise<void> {
  const fs = await import('fs/promises');
  
  // Ensure project root exists
  await fs.mkdir(projectRoot, { recursive: true });
}

/**
 * Clean up test files (for cleanup in tests)
 * @param specificProjectRoot - If provided, only clean up this specific directory
 */
export async function cleanupTestFiles(specificProjectRoot?: string): Promise<void> {
  const fs = await import('fs/promises');
  
  if (specificProjectRoot) {
    // Clean up specific directory only
    try {
      await fs.rm(specificProjectRoot, { recursive: true, force: true });
    } catch (error) {
      // Ignore errors if directory doesn't exist
    }
  } else {
    // Clean up all temp directories (for global cleanup)
    const fixturesDir = join(__dirname, '..', 'fixtures');
    
    try {
      const files = await fs.readdir(fixturesDir);
      for (const file of files) {
        // Clean up both old and new naming patterns
        if (file.startsWith('temp-test-project-')) {
          const tempPath = join(fixturesDir, file);
          try {
            await fs.rm(tempPath, { recursive: true, force: true });
          } catch (rmError) {
            // Ignore individual cleanup errors
          }
        }
      }
    } catch (error) {
      // Ignore errors if directory doesn't exist
    }
  }
} 