import { TestIsolation } from './test-isolation';
import { ensureTestSetup, ensureProjectRootOnly } from './test-helpers';
import { TestDataBuilder } from '../fixtures/test-data';

/**
 * BaseTest provides a foundation for all tests with automatic isolation and cleanup
 * Extend this class to get consistent test lifecycle management
 */
export abstract class BaseTest {
  protected isolation: TestIsolation;
  protected projectRoot: string = '';
  
  constructor() {
    this.isolation = new TestIsolation();
  }
  
  /**
   * Setup test environment - called automatically by test framework
   */
  async setup(): Promise<void> {
    this.projectRoot = await this.isolation.createTestRoot();
  }
  
  /**
   * Teardown test environment - called automatically by test framework
   */
  async teardown(): Promise<void> {
    await this.isolation.cleanup();
  }
  
  /**
   * Create test environment with files
   */
  public async createTestEnvironment(files?: Array<{ type: string; content: string }>): Promise<void> {
    await ensureTestSetup(this.projectRoot, files);
  }
  
  /**
   * Create empty environment (only project root)
   */
  public async createEmptyEnvironment(): Promise<void> {
    await ensureProjectRootOnly(this.projectRoot);
  }
  
  /**
   * Create test environment using TestDataBuilder
   */
  public async createTestEnvironmentWithBuilder(builder: TestDataBuilder): Promise<void> {
    await this.createTestEnvironment(builder.build());
  }
  
  /**
   * Get the current project root
   */
  public getProjectRoot(): string {
    return this.projectRoot;
  }
  
  /**
   * Get the number of test roots created
   */
  public getTestRootCount(): number {
    return this.isolation.getTestRootCount();
  }
  
  /**
   * Create a new TestDataBuilder instance
   */
  public createTestDataBuilder(): TestDataBuilder {
    return new TestDataBuilder();
  }
} 