// Embedded soloflow.mdc content
export const SOLOFLOW_MDC_CONTENT = `---
alwaysApply: true
---

# SoloFlow MCP Service Guidelines

This rule file provides guidelines for using the \`soloflow-mcp\` service to manage project documentation through Model Context Protocol (MCP).

## **Core Concepts**

- **Document Management**: All project documents are stored in \`.soloflow/\` directory
- **MCP Operations**: Use \`list\`, \`read\`, \`update\`, and \`init\` operations for document management
- **Absolute Paths**: All operations require absolute project root paths for security
- **Document Types**: Predefined document types ensure consistency
- **Project Initialization**: Use \`init\` command to set up project configuration automatically

## **Supported Document Types**

The following document types are supported, all stored in \`.soloflow/\` directory:

- \`overview.md\` - Project overview and summary
- \`requirements.md\` - Functional and non-functional requirements
- \`system_architecture.md\` - Technical architecture design
- \`test_strategy.md\` - Testing strategy and plans
- \`ui_design.md\` - UI/UX design specifications
- \`tasks.md\` - Project task lists and progress
- \`deployment.md\` - Deployment and infrastructure docs
- \`notes.md\` - Project notes and observations

## **Available MCP Operations**

### **1. Initialize Project Configuration**

Initialize SoloFlow MCP configuration in the specified project root:

\`\`\`json
{
  "tool": "init",
  "args": {
    "projectRoot": "/Users/username/project"
  }
}
\`\`\`

### **2. List Project Documents**

Get all available documents in the project:

\`\`\`json
{
  "tool": "list",
  "args": {
    "projectRoot": "/Users/username/project"
  }
}
\`\`\`

### **3. Read Document Content**

Read a specific document type:

\`\`\`json
{
  "tool": "read",
  "args": {
    "projectRoot": "/Users/username/project",
    "type": "requirements"
  }
}
\`\`\`

### **4. Update Document Content**

Create or update a document:

\`\`\`json
{
  "tool": "update",
  "args": {
    "projectRoot": "/Users/username/project",
    "type": "requirements",
    "content": "# Project Requirements\\n\\n## Functional Requirements\\n1. User management\\n2. Data storage\\n3. Report generation"
  }
}
\`\`\`

## **Development Workflow & Documentation Maintenance**

### **Fallback Document Access**

- **When MCP Service Unavailable**: If \`soloflow-mcp\` service cannot be called, directly read/write files in \`.soloflow/\` directory
- **Direct File Operations**: Use standard file system operations to access \`.soloflow/*.md\` files
- **Example**: readFile \`.soloflow/requirements.md\`, writeFile \`.soloflow/requirements.md\`

### **Task Execution Standards**

- **Reference Current Documentation**: Always check \`.soloflow/\` directory contents before starting any task
- **Completion Criteria**: Task is only complete when:
  - All tests pass (\`npm test\` or equivalent)
  - Code changes are tested and verified
  - Documentation is updated
- **Task Documentation**: After completing any task, update [tasks.md](mdc:.soloflow/tasks.md) with:
  - Completed task status
  - New tasks discovered during implementation
  - Updated timeline if needed

### **Documentation Update Triggers**

**Always update relevant documentation when:**

- **Requirements Change**: User requests new features or modifies existing requirements
- **Architecture Changes**: System design or technical architecture is modified
- **Implementation Discoveries**: Important findings during development that affect design
- **API Changes**: MCP operations or interfaces are modified
- **Security Updates**: Security-related changes or vulnerabilities discovered

### **Documentation Update Process**

1. **Identify Affected Documents**: Determine which \`.soloflow/\` documents need updates
2. **Update Content**: Modify relevant documents with new information
3. **Cross-Reference**: Ensure consistency across all related documents
4. **Version Control**: Add update history entries to modified documents
5. **Verify Completeness**: Ensure all changes are properly documented

## **Usage Scenarios**

### **Scenario 1: Initialize New Project**

When starting a new project and need to set up SoloFlow MCP:

\`\`\`json
{
  "tool": "init",
  "args": {
    "projectRoot": "/Users/username/project"
  }
}
\`\`\`

### **Scenario 2: Check Project Documentation**

When you need to understand what documents exist in the project:

\`\`\`json
{
  "tool": "list",
  "args": {
    "projectRoot": "/Users/username/project"
  }
}
\`\`\`

### **Scenario 3: Read Requirements Document**

When you need to review project requirements:

\`\`\`json
{
  "tool": "read",
  "args": {
    "projectRoot": "/Users/username/project",
    "type": "requirements"
  }
}
\`\`\`

### **Scenario 4: Update Task List**

When you need to update project tasks:

\`\`\`json
{
  "tool": "update",
  "args": {
    "projectRoot": "/Users/username/project",
    "type": "tasks",
    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] Implement user authentication\\n- [ ] Add data validation\\n\\n## Completed\\n- [x] Project initialization\\n- [x] Basic architecture setup"
  }
}
\`\`\`

### **Scenario 5: Create System Architecture Document**

When you need to document system architecture:

\`\`\`json
{
  "tool": "update",
  "args": {
    "projectRoot": "/Users/username/project",
    "type": "system_architecture",
    "content": "# System Architecture\\n\\n## Overall Architecture\\n\\n\`\`\`mermaid\\ngraph TD\\n    A[Frontend] --> B[API]\\n    B --> C[Database]\\n\`\`\`\\n\\n## Tech Stack\\n- Frontend: React + TypeScript\\n- Backend: Node.js + Express\\n- Database: PostgreSQL"
  }
}
\`\`\`

## **Security Considerations**

- **Absolute Paths Required**: \`projectRoot\` must be an absolute path
- **Access Control**: Only \`\${projectRoot}/.soloflow/*.md\` files are accessible
- **Type Validation**: \`type\` parameter must be a predefined document type
- **No Concurrent Writes**: Concurrent write operations are not supported
- **Initialization Safety**: \`init\` command only creates configuration files, never overwrites existing documents

## **Best Practices**

### **Project Initialization Workflow**

1. **Run Init Command**: Use \`init\` to set up project configuration
2. **Check Existing Documents**: Use \`list\` operation to see current state
3. **Create Core Documents**: Use \`update\` to create essential documents
4. **Maintain Documentation**: Regularly update documents as project evolves

### **Document Naming Convention**

- All documents use Markdown format
- Filenames are fixed as \`<type>.md\`
- Support for Mermaid diagrams, code blocks, and rich text content

### **Document Structure Template**

Each document should include:

\`\`\`markdown
# Document Title

## Overview
Brief description of the document's purpose and content.

## Detailed Content
Specific document content...

## Update History
- 2025-07-24: Initial version
- 2025-07-25: Added new features
\`\`\`

### **Workflow Process**

1. **Initialize Project**: Use \`init\` operation to set up configuration
2. **Check Existing Documents**: Use \`list\` operation
3. **Read Documents**: Use \`read\` operation to get content
4. **Update Documents**: Use \`update\` operation to modify content

## **Quick Start Guide**

### **Step 1: Initialize Project**

\`\`\`json
{
  "tool": "init",
  "args": {
    "projectRoot": "/Users/username/project"
  }
}
\`\`\`

### **Step 2: Check Project Documents**

\`\`\`json
{
  "tool": "list",
  "args": {
    "projectRoot": "/Users/username/project"
  }
}
\`\`\`

### **Step 3: Create Requirements Document**

\`\`\`json
{
  "tool": "update",
  "args": {
    "projectRoot": "/Users/username/project",
    "type": "requirements",
    "content": "# Project Requirements\\n\\n## Functional Requirements\\n1. User management\\n2. Data storage\\n3. Report generation\\n\\n## Non-functional Requirements\\n- Performance: Response time < 2 seconds\\n- Availability: 99.9%\\n- Security: Data encryption"
  }
}
\`\`\`

### **Step 4: Create Task List**

\`\`\`json
{
  "tool": "update",
  "args": {
    "projectRoot": "/Users/username/project",
    "type": "tasks",
    "content": "# Project Tasks\\n\\n## This Week\\n- [ ] Complete user authentication module\\n- [ ] Implement data validation\\n- [ ] Write unit tests\\n\\n## Next Week\\n- [ ] Integrate third-party services\\n- [ ] Performance optimization\\n- [ ] Documentation completion"
  }
}
\`\`\`

## **Troubleshooting**

### **Common Errors**

1. **Path Error**: Ensure \`projectRoot\` is an absolute path
2. **Type Error**: Ensure \`type\` is a predefined document type
3. **File Not Found**: Use \`update\` operation to create new documents
4. **Init Error**: Ensure you have write permissions in the project directory

### **Debugging Tips**

- Use \`init\` operation to set up project configuration
- Use \`list\` operation to check project structure
- Confirm \`.soloflow/\` directory exists after initialization
- Verify document type is correct

## **Related Documentation**

- [requirements.md](mdc:.soloflow/requirements.md) - Detailed functional requirements
- [system_architecture.md](mdc:.soloflow/system_architecture.md) - Technical architecture design
- [test_strategy.md](mdc:.soloflow/test_strategy.md) - Testing plans and strategies
- [tasks.md](mdc:.soloflow/tasks.md) - Project task lists and progress
`; 