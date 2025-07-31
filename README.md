# SoloFlow MCP Server

A Model Context Protocol (MCP) server for managing project documentation through the `.soloflow/` directory.

## Features

- 🚀 **MCP Protocol Support**: Complete Model Context Protocol implementation
- 📁 **Document Management**: Automatically manage project documents in `.soloflow/` directory
- 🔧 **Four Core Operations**: `list`, `read`, `update`, `init`
- 🎯 **Six Core Prompts**: Built-in prompts for software engineering best practices
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

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-light.svg)](https://cursor.com/install-mcp?name=soloflow-mcp&config=JTdCJTIyY29tbWFuZCUyMiUzQSUyMm5weCUyMCU0MGJlbnl1ZTE5NzglMkZzb2xvZmxvdy1tY3AlMjIlN0Q%3D)

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

### 4. Using Prompts in Cursor

You can directly use prompts in Cursor's chat dialog by typing:

- `/soloflow-mcp/init-project` - Initialize project documentation structure
- `/soloflow-mcp/create-doc-template` - Create standard document templates
- `/soloflow-mcp/add-task` - Add new tasks to project
- `/soloflow-mcp/check-project-status` - Check project status and documentation completeness
- `/soloflow-mcp/code-review-checklist` - Get code review checklist
- `/soloflow-mcp/deployment-checklist` - Get deployment preparation checklist

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

### Built-in Prompts

SoloFlow MCP includes 6 core prompts designed for software engineering best practices:

#### init-project
Initialize project documentation structure and create basic document templates.

**Usage in Cursor**: Type `/soloflow-mcp/init-project` in the chat dialog

**Parameters**:
- `projectName` (optional): Project name for customization

#### create-doc-template
Create standard document templates for different document types.

**Usage in Cursor**: Type `/soloflow-mcp/create-doc-template` in the chat dialog

**Parameters**:
- `docType` (optional): Document type (overview, requirements, etc.)
- `projectName` (optional): Project name for template customization

#### add-task
Add new tasks to the project task list.

**Usage in Cursor**: Type `/soloflow-mcp/add-task` in the chat dialog

**Parameters**:
- `taskTitle` (optional): Task title
- `priority` (optional): Task priority (high, medium, low)
- `category` (optional): Task category (backend, frontend, testing, etc.)
- `estimatedTime` (optional): Estimated time to complete

#### check-project-status
Analyze project documentation completeness and task progress.

**Usage in Cursor**: Type `/soloflow-mcp/check-project-status` in the chat dialog

**Parameters**: None (automatically analyzes current project)

#### code-review-checklist
Get a standard code review checklist.

**Usage in Cursor**: Type `/soloflow-mcp/code-review-checklist` in the chat dialog

**Parameters**:
- `codeLanguage` (optional): Programming language (TypeScript, Python, etc.)

#### deployment-checklist
Get a deployment preparation checklist.

**Usage in Cursor**: Type `/soloflow-mcp/deployment-checklist` in the chat dialog

**Parameters**:
- `environment` (optional): Deployment environment (production, staging, development)

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

### Example 4: Using Prompts in Cursor

1. Configure Cursor settings (as shown above)
2. In Cursor's chat dialog, type any of these prompts:
   - `/soloflow-mcp/init-project` - Initialize project documentation
   - `/soloflow-mcp/create-doc-template` - Create document templates
   - `/soloflow-mcp/add-task` - Add new tasks
   - `/soloflow-mcp/check-project-status` - Check project status
   - `/soloflow-mcp/code-review-checklist` - Get code review checklist
   - `/soloflow-mcp/deployment-checklist` - Get deployment checklist

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

### v1.0.5
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
