# SoloFlow MCP Server

A Model Context Protocol (MCP) server for managing project documentation through the `.soloflow/` directory with comprehensive software development lifecycle support.

English | [中文](README.zh-CN.md)

## Features

- 🚀 **MCP Protocol Support**: Complete Model Context Protocol implementation
- 📁 **Document Management**: Automatically manage project documents in `.soloflow/` directory
- 🔧 **Four Core Operations**: `list`, `read`, `update`, `init`
- 🎯 **32 Comprehensive Prompts**: Built-in prompts covering the entire software development lifecycle
- 🛡️ **Security Isolation**: Path isolation based on `projectRoot`
- 📝 **Markdown Support**: Complete Markdown document format support
- 🎯 **Cursor Integration**: Perfect support for Cursor IDE integration
- ⚡ **Lightweight**: Only stdio transport support, no HTTP dependencies

## Quick Start

### 1. Configure Cursor

Create `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "soloflow-mcp": {
      "command": "npx",
      "args": ["@benyue1978/soloflow-mcp"]
    }
  }
}
```

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=soloflow-mcp&config=ewogICAgImNvbW1hbmQiOiAibnB4IiwKICAgICJhcmdzIjogWwogICAgICAiLXkiLAogICAgICAiQGJlbnl1ZTE5Nzgvc29sb2Zsb3ctbWNwQGxhdGVzdCIKICAgIF0KfQ)

### 2. Initialize Project

```bash
# Run in project root directory
npx @benyue1978/soloflow-mcp init /path/to/your/project
```

### 3. Start Using

In Cursor, AI assistants can now:
- List project documents: `list` operation
- Read document content: `read` operation  
- Update document content: `update` operation
- Initialize project configuration: `init` operation
- Use 32 comprehensive prompts for software development lifecycle

## Comprehensive Prompt System

SoloFlow MCP provides 32 prompts organized into 8 categories, covering the complete software development lifecycle:

### 📊 Prompt Categories Overview

| Category | Count | Description |
|----------|-------|-------------|
| **Core** | 4 | Essential project management functions |
| **Role** | 5 | Specialized functions for different development roles |
| **Task** | 6 | Advanced task management and breakdown functions |
| **Requirements** | 3 | Requirements analysis and management functions |
| **Design** | 5 | Comprehensive design functions |
| **Development** | 4 | Code implementation and development functions |
| **Testing** | 5 | Testing and quality assurance functions |
| **Release** | 5 | Complete release and deployment lifecycle management |

## 🎯 Scenario-Based Usage Guide

### Scenario 1: New Project Setup

**Goal**: Initialize a new project with proper documentation and workspace setup

**Prompt Sequence**:
1. `/soloflow-mcp/core/init-project` - Initialize project documentation structure
2. `/soloflow-mcp/core/setup-workspace` - Set up development environment with technology stack
3. `/soloflow-mcp/requirements/analyze-requirements` - Analyze and document requirements
4. `/soloflow-mcp/requirements/prioritize-requirements` - Prioritize requirements using MoSCoW method
5. `/soloflow-mcp/task/breakdown-requirements` - Break down requirements into manageable tasks

**Example Usage**:
```bash
# In Cursor chat, type:
/soloflow-mcp/core/init-project
/soloflow-mcp/core/setup-workspace --frontend React --backend Node.js --testing Jest --deployment Docker --database PostgreSQL
/soloflow-mcp/requirements/analyze-requirements --domain e-commerce --scope full-system
```

### Scenario 2: Requirements Analysis Phase

**Goal**: Comprehensive requirements gathering and analysis

**Prompt Sequence**:
1. `/soloflow-mcp/role/analyst-mode` - Switch to analyst mode for requirements focus
2. `/soloflow-mcp/requirements/analyze-requirements` - Comprehensive requirements analysis
3. `/soloflow-mcp/requirements/validate-requirements` - Validate requirements completeness
4. `/soloflow-mcp/requirements/prioritize-requirements` - Prioritize using value-complexity matrix
5. `/soloflow-mcp/task/create-epic` - Create high-level epics from requirements

**Example Usage**:
```bash
# In Cursor chat, type:
/soloflow-mcp/role/analyst-mode
/soloflow-mcp/requirements/analyze-requirements --domain finance --scope full-system
/soloflow-mcp/requirements/validate-requirements --validationType comprehensive
```

### Scenario 3: System Design Phase

**Goal**: Design system architecture, UI, and data models

**Prompt Sequence**:
1. `/soloflow-mcp/role/architect-mode` - Switch to architect mode for design focus
2. `/soloflow-mcp/design/system-architecture` - Design overall system architecture
3. `/soloflow-mcp/design/api-interface` - Design API interfaces and contracts
4. `/soloflow-mcp/design/database-schema` - Design database schema and data models
5. `/soloflow-mcp/design/create-ui` - Design user interface and user experience
6. `/soloflow-mcp/design/review-design` - Review and validate design decisions

**Example Usage**:
```bash
# In Cursor chat, type:
/soloflow-mcp/role/architect-mode
/soloflow-mcp/design/system-architecture --architectureType microservices
/soloflow-mcp/design/api-interface --apiType REST
/soloflow-mcp/design/database-schema --dbType PostgreSQL
```

### Scenario 4: Development Phase

**Goal**: Implement features with proper code quality and testing

**Prompt Sequence**:
1. `/soloflow-mcp/role/developer-mode` - Switch to developer mode for implementation focus
2. `/soloflow-mcp/task/breakdown-architecture` - Break down architecture into implementation tasks
3. `/soloflow-mcp/development/write-code` - Implement features with best practices
4. `/soloflow-mcp/development/code-review-checklist` - Use code review checklist
5. `/soloflow-mcp/testing/write-unit-tests` - Write comprehensive unit tests
6. `/soloflow-mcp/development/fix-bug` - Debug and fix issues as they arise

**Example Usage**:
```bash
# In Cursor chat, type:
/soloflow-mcp/role/developer-mode
/soloflow-mcp/development/write-code --feature user-authentication --language TypeScript --framework Express
/soloflow-mcp/testing/write-unit-tests --component auth-service --language TypeScript --framework Jest
/soloflow-mcp/development/code-review-checklist --codeLanguage TypeScript
```

### Scenario 5: Testing Phase

**Goal**: Comprehensive testing strategy and execution

**Prompt Sequence**:
1. `/soloflow-mcp/role/tester-mode` - Switch to tester mode for quality focus
2. `/soloflow-mcp/testing/create-test-plan` - Create comprehensive test plan
3. `/soloflow-mcp/testing/write-unit-tests` - Write unit tests for all components
4. `/soloflow-mcp/testing/run-tests` - Execute tests and analyze results
5. `/soloflow-mcp/testing/test-report` - Generate detailed test reports
6. `/soloflow-mcp/testing/performance-test` - Conduct performance testing

**Example Usage**:
```bash
# In Cursor chat, type:
/soloflow-mcp/role/tester-mode
/soloflow-mcp/testing/create-test-plan --feature payment-system --testType comprehensive
/soloflow-mcp/testing/run-tests --testType all --environment staging
/soloflow-mcp/testing/performance-test --component api-gateway --loadType stress
```

### Scenario 6: Release Management

**Goal**: Safe and reliable deployment with monitoring

**Prompt Sequence**:
1. `/soloflow-mcp/role/project-manager-mode` - Switch to project manager mode for coordination
2. `/soloflow-mcp/release/commit-changes` - Commit changes with proper conventions
3. `/soloflow-mcp/release/create-release` - Create software release with versioning
4. `/soloflow-mcp/release/deployment-checklist` - Use deployment checklist
5. `/soloflow-mcp/release/monitor-deployment` - Monitor deployment status
6. `/soloflow-mcp/release/rollback-plan` - Prepare rollback plan if needed

**Example Usage**:
```bash
# In Cursor chat, type:
/soloflow-mcp/role/project-manager-mode
/soloflow-mcp/release/commit-changes --commitType feat --scope user-authentication
/soloflow-mcp/release/create-release --version 1.2.0 --releaseType minor
/soloflow-mcp/release/deployment-checklist --environment production
```

### Scenario 7: Bug Fixing and Maintenance

**Goal**: Efficient bug fixing and code maintenance

**Prompt Sequence**:
1. `/soloflow-mcp/development/fix-bug` - Analyze and fix bugs
2. `/soloflow-mcp/development/refactor-code` - Refactor code for better maintainability
3. `/soloflow-mcp/testing/run-tests` - Run tests to ensure fixes work
4. `/soloflow-mcp/release/commit-changes` - Commit fixes with proper messages
5. `/soloflow-mcp/core/generate-docs` - Update documentation for changes

**Example Usage**:
```bash
# In Cursor chat, type:
/soloflow-mcp/development/fix-bug --bugDescription "User login fails with 500 error" --severity high
/soloflow-mcp/development/refactor-code --component auth-service --reason "Improve error handling"
/soloflow-mcp/core/generate-docs --docType api --component authentication
```

### Scenario 8: Project Management and Coordination

**Goal**: Effective project management and team coordination

**Prompt Sequence**:
1. `/soloflow-mcp/role/project-manager-mode` - Switch to project manager mode
2. `/soloflow-mcp/task/add-task` - Add new tasks to project
3. `/soloflow-mcp/task/estimate-tasks` - Estimate time and effort for tasks
4. `/soloflow-mcp/task/create-story` - Create detailed user stories
5. `/soloflow-mcp/core/check-project-status` - Check overall project status
6. `/soloflow-mcp/task/create-epic` - Organize tasks into epics

**Example Usage**:
```bash
# In Cursor chat, type:
/soloflow-mcp/role/project-manager-mode
/soloflow-mcp/task/add-task --taskTitle "Implement OAuth integration" --priority high --category backend --estimatedTime 3d
/soloflow-mcp/task/estimate-tasks
/soloflow-mcp/core/check-project-status
```

## 📋 Complete Prompt Reference

### Core Functions (4 prompts)
- `/soloflow-mcp/core/init-project` - Initialize project documentation structure
- `/soloflow-mcp/core/check-project-status` - Check project status and documentation completeness
- `/soloflow-mcp/core/generate-docs` - Generate comprehensive documentation for current implementation
- `/soloflow-mcp/core/setup-workspace` - Set up project workspace with technology stack

### Role-based Functions (5 prompts)
- `/soloflow-mcp/role/analyst-mode` - Switch to analyst mode for requirements analysis
- `/soloflow-mcp/role/architect-mode` - Switch to architect mode for system design
- `/soloflow-mcp/role/developer-mode` - Switch to developer mode for implementation
- `/soloflow-mcp/role/tester-mode` - Switch to tester mode for quality assurance
- `/soloflow-mcp/role/project-manager-mode` - Switch to project manager mode for coordination

### Task Management (6 prompts)
- `/soloflow-mcp/task/add-task` - Add new tasks to project
- `/soloflow-mcp/task/breakdown-requirements` - Break down requirements into tasks
- `/soloflow-mcp/task/breakdown-architecture` - Break down architecture into implementation tasks
- `/soloflow-mcp/task/create-epic` - Create large-scale feature epics
- `/soloflow-mcp/task/create-story` - Create detailed user stories
- `/soloflow-mcp/task/estimate-tasks` - Estimate time and effort for tasks

### Requirements Analysis (3 prompts)
- `/soloflow-mcp/requirements/analyze-requirements` - Comprehensive requirements analysis
- `/soloflow-mcp/requirements/validate-requirements` - Validate requirements completeness
- `/soloflow-mcp/requirements/prioritize-requirements` - Prioritize requirements using various methods

### Design Functions (5 prompts)
- `/soloflow-mcp/design/create-ui` - Design user interface and user experience
- `/soloflow-mcp/design/system-architecture` - Design overall system architecture
- `/soloflow-mcp/design/api-interface` - Design API interfaces and contracts
- `/soloflow-mcp/design/database-schema` - Design database schema and data models
- `/soloflow-mcp/design/review-design` - Review and validate design decisions

### Development Functions (4 prompts)
- `/soloflow-mcp/development/write-code` - Implement features with best practices
- `/soloflow-mcp/development/fix-bug` - Debug and fix code issues
- `/soloflow-mcp/development/refactor-code` - Refactor code for better maintainability
- `/soloflow-mcp/development/code-review-checklist` - Use comprehensive code review checklist

### Testing Functions (5 prompts)
- `/soloflow-mcp/testing/create-test-plan` - Create comprehensive test plans
- `/soloflow-mcp/testing/write-unit-tests` - Write unit tests for components
- `/soloflow-mcp/testing/run-tests` - Execute tests and analyze results
- `/soloflow-mcp/testing/test-report` - Generate detailed test reports
- `/soloflow-mcp/testing/performance-test` - Conduct performance testing

### Release Management (5 prompts)
- `/soloflow-mcp/release/commit-changes` - Commit changes with proper conventions
- `/soloflow-mcp/release/create-release` - Create software releases with versioning
- `/soloflow-mcp/release/deployment-checklist` - Use deployment preparation checklist
- `/soloflow-mcp/release/rollback-plan` - Prepare rollback plans
- `/soloflow-mcp/release/monitor-deployment` - Monitor deployment status

## Supported Document Types

| Document Type | Filename | Purpose |
|---------------|----------|---------|
| `overview` | `overview.md` | Project overview and summary |
| `requirements` | `requirements.md` | Functional and non-functional requirements |
| `system_architecture` | `system_architecture.md` | Technical architecture design |
| `test_strategy` | `test_strategy.md` | Testing strategy and plans |
| `tasks` | `tasks.md` | Project task lists and progress |
| `ui_design` | `ui_design.md` | UI/UX design specifications |
| `deployment` | `deployment.md` | Deployment and infrastructure docs |
| `notes` | `notes.md` | Project notes and observations |

## MCP Operations

### Core Operations

#### list - List Documents

List all documents in the `.soloflow/` directory:

```json
{
  "name": "list",
  "description": "List all documents in the .soloflow directory",
  "inputSchema": {
    "projectRoot": "string - Absolute path to project root"
  }
}
```

**Response Example**:
```json
[
  {
    "type": "requirements",
    "title": "Project Requirements",
    "filename": "requirements.md"
  },
  {
    "type": "tasks", 
    "title": "Project Tasks",
    "filename": "tasks.md"
  }
]
```

### read - Read Document

Read content of a specific document type:

```json
{
  "name": "read",
  "description": "Read document content by type",
  "inputSchema": {
    "projectRoot": "string - Absolute path to project root",
    "type": "string - Document type (overview, requirements, etc.)"
  }
}
```

**Response Example**:
```json
{
  "raw": "# Project Requirements\n\n## Functional Requirements\n1. User management\n2. Data storage"
}
```

### update - Update Document

Create or update document content:

```json
{
  "name": "update",
  "description": "Create or update document content",
  "inputSchema": {
    "projectRoot": "string - Absolute path to project root",
    "type": "string - Document type (overview, requirements, etc.)",
    "content": "string - Document content in Markdown format"
  }
}
```

**Response Example**:
```json
{
  "ok": true,
  "message": "Document updated successfully"
}
```

### init - Initialize Project

Initialize project configuration, create `.cursor/rules/soloflow.mdc` file:

```json
{
  "name": "init",
  "description": "Initialize project configuration",
  "inputSchema": {
    "projectRoot": "string - Absolute path to project root"
  }
}
```

**Response Example**:
```json
{
  "message": "Project initialized successfully. Created .cursor/rules/soloflow.mdc"
}
```

## Security Features

### Path Isolation

- All operations require `projectRoot` parameter
- Strict absolute path validation
- Protection against path traversal attacks
- Project root directory must exist

### Document Type Validation

- Predefined document type whitelist
- Strict type validation
- Prevention of arbitrary file access

### Error Handling

- Detailed error messages
- Graceful failure handling
- Secure default behavior

## Development

### Local Development

```bash
# Clone repository
git clone https://github.com/benyue1978/solo-flow-mcp.git
cd solo-flow-mcp

# Install dependencies
npm install

# Build project
npm run build

# Run tests
npm test

# Start development server
npm start
```

### Project Structure

```
├── src/
│   ├── index.ts              # Service startup entry
│   ├── context.ts            # Path validation and utility functions
│   ├── tools/                # MCP operation handlers
│   │   ├── list.ts          # List documents
│   │   ├── read.ts          # Read documents
│   │   ├── update.ts        # Update documents
│   │   └── init.ts          # Initialize project
│   ├── prompts/              # Comprehensive prompt system
│   │   ├── core-prompts.ts  # Core project management prompts
│   │   ├── role-prompts.ts  # Role-based prompts
│   │   ├── task-prompts.ts  # Task management prompts
│   │   ├── requirements-prompts.ts # Requirements analysis prompts
│   │   ├── design-prompts.ts # Design and architecture prompts
│   │   ├── development-prompts.ts # Development and coding prompts
│   │   ├── testing-prompts.ts # Testing and QA prompts
│   │   ├── release-prompts.ts # Release and deployment prompts
│   │   ├── docs-prompts.ts  # Documentation prompts
│   │   ├── workspace-prompts.ts # Workspace setup prompts
│   │   ├── categories.ts    # Prompt categories
│   │   ├── mapping.ts       # Path mapping system
│   │   └── index.ts         # Prompt registry
│   ├── types/
│   │   └── docTypes.ts      # Document type definitions
│   └── resources/
│       └── soloflow-content.ts # Resource file content
├── tests/                    # Test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── utils/               # Test utilities
└── .soloflow/               # Project documentation
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Specific Tests

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# Coverage tests
npm run test:coverage
```

### Test Coverage

- Unit tests: 50 test cases
- Integration tests: mcp-inspector integration
- Coverage target: > 85%

## Usage Examples

### Example 1: Initialize Project

```bash
# In project root directory
npx @benyue1978/soloflow-mcp init /Users/username/my-project
```

### Example 2: Create Requirements Document

```bash
# Create requirements document via MCP operation
npx @benyue1978/soloflow-mcp update \
  --projectRoot /Users/username/my-project \
  --type requirements \
  --content "# Project Requirements\n\n## Functional Requirements\n1. User authentication\n2. Data persistence"
```

### Example 3: Using in Cursor

1. Configure Cursor settings
2. Initialize project
3. In Cursor, AI assistants can:
   - List project documents
   - Read document content
   - Update document content
   - Manage project configuration
   - Use 32 comprehensive prompts for software development lifecycle

### Example 4: Using Prompts in Cursor

1. Configure Cursor settings (as shown above)
2. In Cursor's chat dialog, type any of the 32 prompts:
   - `/soloflow-mcp/core/init-project` - Initialize project documentation
   - `/soloflow-mcp/requirements/analyze-requirements` - Analyze requirements
   - `/soloflow-mcp/design/system-architecture` - Design system architecture
   - `/soloflow-mcp/development/write-code` - Write code with best practices
   - `/soloflow-mcp/testing/create-test-plan` - Create test plans
   - `/soloflow-mcp/release/commit-changes` - Commit changes properly

3. The AI will automatically execute the prompt and update your project documentation

## Troubleshooting

### Common Issues

**Q: Why do we need absolute paths?**
A: For security isolation, ensuring the MCP service can only access the specified project directory.

**Q: How to reset project configuration?**
A: Delete the `.cursor/rules/soloflow.mdc` file, then run the `init` operation again.

**Q: What document formats are supported?**
A: Currently supports Markdown format, other formats may be supported in the future.

**Q: How to handle concurrent writes?**
A: Current version uses simple file system operations, it's recommended to avoid concurrent writes to the same document.

**Q: How to use prompts effectively?**
A: Use prompts in sequence following the software development lifecycle. Start with core functions, then move to specific phases like requirements, design, development, testing, and release.

### Error Codes

| Error | Cause | Solution |
|-------|-------|----------|
| `Project root directory does not exist` | Project root directory doesn't exist | Ensure path is correct and directory exists |
| `Invalid document type` | Document type not in whitelist | Use predefined document types |
| `Document content cannot be empty` | Document content is empty | Provide valid document content |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Changelog

### v1.0.6
- Add comprehensive bilingual documentation support with Chinese README
- Add language selection links between English and Chinese README files
- Add 32 comprehensive prompts covering entire software development lifecycle
- Add scenario-based usage guide with 8 common development scenarios
- Add role-based prompts for different development roles
- Add requirements analysis, design, development, testing, and release management prompts
- Add git_commit.mdc rule file for standardized Git commit messages
- Create git-commit-content.ts with embedded git commit guidelines
- Update init tool to automatically create git_commit.mdc during project initialization
- Enhance project setup with Git commit message conventions
- Follow consistent pattern for rule file creation and management

### v1.0.5
- Add comprehensive prompt system with 32 prompts covering entire software development lifecycle
- Add scenario-based usage guide with 8 common development scenarios
- Add role-based prompts for different development roles
- Add requirements analysis, design, development, testing, and release management prompts
- Add git_commit.mdc rule file for standardized Git commit messages
- Create git-commit-content.ts with embedded git commit guidelines
- Update init tool to automatically create git_commit.mdc during project initialization
- Enhance project setup with Git commit message conventions
- Follow consistent pattern for rule file creation and management

### v1.0.4
- Update soloflow.mdc content with latest MCP Prompts and Read Before Update rules
- Sync soloflow-content.ts with latest documentation guidelines
- Improve ordered list formatting for MD029 compliance
- Enhance documentation structure and best practices

### v1.0.2
- Add comprehensive project documentation (overview, ui_design, deployment, notes)
- Update README.md with detailed prompts usage guide
- Add Cursor integration examples for direct prompt usage
- Improve documentation structure and user experience

### v1.0.1
- Add six core prompts for software engineering best practices
- Add test coverage
- Add Cursor integration support
- Add NPM package release

### v1.0.0
- Initial version release
- Support for list, read, update, init operations
- Complete test suite
- Cursor integration support
- NPM package release

## Contact

- Author: SongYue <yuesong@gmail.com>
- Project URL: <https://github.com/benyue1978/solo-flow-mcp>
- NPM Package: <https://www.npmjs.com/package/@benyue1978/soloflow-mcp>
