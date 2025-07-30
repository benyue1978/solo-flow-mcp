/**
 * TestDataBuilder provides a fluent API for building test data
 * Makes it easy to create consistent test documents with different content
 */
export class TestDataBuilder {
  private files: Array<{ type: string; content: string }> = [];
  
  /**
   * Add a document with custom type and content
   */
  addDocument(type: string, content: string): this {
    this.files.push({ type, content });
    return this;
  }
  
  /**
   * Add a requirements document
   */
  addRequirements(content: string): this {
    return this.addDocument('requirements', content);
  }
  
  /**
   * Add a tasks document
   */
  addTasks(content: string): this {
    return this.addDocument('tasks', content);
  }
  
  /**
   * Add a system architecture document
   */
  addSystemArchitecture(content: string): this {
    return this.addDocument('system_architecture', content);
  }
  
  /**
   * Add a test strategy document
   */
  addTestStrategy(content: string): this {
    return this.addDocument('test_strategy', content);
  }
  
  /**
   * Add a UI design document
   */
  addUIDesign(content: string): this {
    return this.addDocument('ui_design', content);
  }
  
  /**
   * Add a deployment document
   */
  addDeployment(content: string): this {
    return this.addDocument('deployment', content);
  }
  
  /**
   * Add a notes document
   */
  addNotes(content: string): this {
    return this.addDocument('notes', content);
  }
  
  /**
   * Add an overview document
   */
  addOverview(content: string): this {
    return this.addDocument('overview', content);
  }
  
  /**
   * Add a simple document with just a title
   */
  addSimpleDocument(type: string, title: string): this {
    return this.addDocument(type, `# ${title}\n\nTest content for ${type}.`);
  }
  
  /**
   * Add multiple simple documents
   */
  addMultipleDocuments(types: string[]): this {
    types.forEach(type => {
      this.addSimpleDocument(type, `${type.charAt(0).toUpperCase() + type.slice(1)}`);
    });
    return this;
  }
  
  /**
   * Build the test data array
   */
  build(): Array<{ type: string; content: string }> {
    return [...this.files];
  }
  
  /**
   * Clear all files
   */
  clear(): this {
    this.files = [];
    return this;
  }
  
  /**
   * Get the number of files
   */
  getFileCount(): number {
    return this.files.length;
  }
} 