# SoloFlow MCP Server

A Model Context Protocol (MCP) server for managing project documentation through the `.soloflow/` directory.

## Features

- 🚀 **MCP Protocol Support**: Complete Model Context Protocol implementation
- 📁 **Document Management**: Automatically manage project documents in `.soloflow/` directory
- 🔧 **Four Core Operations**: `list`, `read`, `update`, `init`
- 🛡️ **Security Isolation**: Path isolation based on `projectRoot`
- 📝 **Markdown Support**: Complete Markdown document format support
- 🎯 **Cursor Integration**: Perfect support for Cursor IDE integration
- ⚡ **Lightweight**: Only stdio transport support, no HTTP dependencies

## Quick Start

### Using npx (Recommended)

```bash
# Use directly without installation
npx @benyue1978/soloflow-mcp
```

### Install to Project

```bash
# Global installation
npm install -g @benyue1978/soloflow-mcp

# Or local installation
npm install @benyue1978/soloflow-mcp
```

## Using in Cursor

### 1. Configure Cursor

Create `.cursor/settings.json` in your project root:

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

### list - List Documents

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

### v1.0.0
- Initial version release
- Support for list, read, update, init operations
- Complete test suite
- Cursor integration support
- NPM package release

## Contact

- Author: SongYue <yuesong@gmail.com>
- Project URL: https://github.com/benyue1978/solo-flow-mcp
- NPM Package: https://www.npmjs.com/package/@benyue1978/soloflow-mcp
