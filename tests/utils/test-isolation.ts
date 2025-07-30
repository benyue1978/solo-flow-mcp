import { getTempTestProjectRoot, cleanupTestFiles } from './test-helpers';

/**
 * TestIsolation class provides automatic test isolation and cleanup
 * Each test instance gets its own temporary directory that is automatically cleaned up
 */
export class TestIsolation {
  private testRoots: string[] = [];
  
  /**
   * Create a new test root directory
   * @returns Promise<string> - The path to the created test root
   */
  async createTestRoot(): Promise<string> {
    const root = getTempTestProjectRoot();
    this.testRoots.push(root);
    return root;
  }
  
  /**
   * Clean up all test directories created by this instance
   */
  async cleanup(): Promise<void> {
    await Promise.all(
      this.testRoots.map(root => cleanupTestFiles(root))
    );
    this.testRoots = [];
  }
  
  /**
   * Get the number of test roots created
   */
  getTestRootCount(): number {
    return this.testRoots.length;
  }
} 