# SoloFlow MCP Server

一个用于管理项目文档的Model Context Protocol (MCP) 服务器，支持通过 `.soloflow/` 目录管理项目文档。

## 功能特性

- 🚀 **MCP 协议支持**: 完整的 Model Context Protocol 实现
- 📁 **文档管理**: 自动管理 `.soloflow/` 目录下的项目文档
- 🔧 **四种核心操作**: `list`, `read`, `update`, `init`
- 🛡️ **安全隔离**: 基于 `projectRoot` 的路径隔离
- 📝 **Markdown 支持**: 完整的 Markdown 文档格式支持
- 🎯 **Cursor 集成**: 完美支持 Cursor IDE 集成
- ⚡ **轻量级**: 仅支持 stdio 传输，无 HTTP 依赖

## 快速开始

### 使用 npx（推荐）

```bash
# 直接使用，无需安装
npx @benyue1978/solo-flow-mcp
```

### 安装到项目

```bash
# 全局安装
npm install -g @benyue1978/solo-flow-mcp

# 或本地安装
npm install @benyue1978/solo-flow-mcp
```

## 在 Cursor 中使用

### 1. 配置 Cursor

在项目根目录创建 `.cursor/settings.json`：

```json
{
  "mcpServers": {
    "soloflow-mcp": {
      "command": "npx",
      "args": ["@benyue1978/solo-flow-mcp"]
    }
  }
}
```

### 2. 初始化项目

```bash
# 在项目根目录运行
npx @benyue1978/solo-flow-mcp init /path/to/your/project
```

### 3. 开始使用

在 Cursor 中，AI 助手现在可以：
- 列出项目文档：`list` 操作
- 读取文档内容：`read` 操作  
- 更新文档内容：`update` 操作
- 初始化项目配置：`init` 操作

## 支持的文档类型

| 文档类型 | 文件名 | 用途 |
|----------|--------|------|
| `overview` | `overview.md` | 项目概览和总结 |
| `requirements` | `requirements.md` | 功能和非功能需求 |
| `system_architecture` | `system_architecture.md` | 技术架构设计 |
| `test_strategy` | `test_strategy.md` | 测试策略和计划 |
| `tasks` | `tasks.md` | 项目任务列表和进度 |
| `ui_design` | `ui_design.md` | UI/UX 设计规范 |
| `deployment` | `deployment.md` | 部署和基础设施文档 |
| `notes` | `notes.md` | 项目笔记和观察 |

## MCP 操作

### list - 列出文档

列出 `.soloflow/` 目录中的所有文档：

```json
{
  "name": "list",
  "description": "List all documents in the .soloflow directory",
  "inputSchema": {
    "projectRoot": "string - Absolute path to project root"
  }
}
```

**返回示例**：
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

### read - 读取文档

读取指定类型的文档内容：

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

**返回示例**：
```json
{
  "raw": "# Project Requirements\n\n## Functional Requirements\n1. User management\n2. Data storage"
}
```

### update - 更新文档

创建或更新文档内容：

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

**返回示例**：
```json
{
  "ok": true,
  "message": "Document updated successfully"
}
```

### init - 初始化项目

初始化项目配置，创建 `.cursor/rules/soloflow.mdc` 文件：

```json
{
  "name": "init",
  "description": "Initialize project configuration",
  "inputSchema": {
    "projectRoot": "string - Absolute path to project root"
  }
}
```

**返回示例**：
```json
{
  "message": "Project initialized successfully. Created .cursor/rules/soloflow.mdc"
}
```

## 安全特性

### 路径隔离

- 所有操作都需要 `projectRoot` 参数
- 严格的绝对路径验证
- 防止路径穿越攻击
- 项目根目录必须存在

### 文档类型验证

- 预定义的文档类型白名单
- 严格的类型校验
- 防止任意文件访问

### 错误处理

- 详细的错误信息
- 优雅的失败处理
- 安全的默认行为

## 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/benyue1978/solo-flow-mcp.git
cd solo-flow-mcp

# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 启动开发服务器
npm start
```

### 项目结构

```
├── src/
│   ├── index.ts              # 服务启动入口
│   ├── context.ts            # 路径校验和工具函数
│   ├── tools/                # MCP 操作处理器
│   │   ├── list.ts          # 列出文档
│   │   ├── read.ts          # 读取文档
│   │   ├── update.ts        # 更新文档
│   │   └── init.ts          # 初始化项目
│   ├── types/
│   │   └── docTypes.ts      # 文档类型定义
│   └── resources/
│       └── soloflow-content.ts # 资源文件内容
├── tests/                    # 测试文件
│   ├── unit/                # 单元测试
│   ├── integration/         # 集成测试
│   └── utils/               # 测试工具
└── .soloflow/               # 项目文档
```

## 测试

### 运行所有测试

```bash
npm test
```

### 运行特定测试

```bash
# 单元测试
npm run test:unit

# 集成测试
npm run test:integration

# 覆盖率测试
npm run test:coverage
```

### 测试覆盖率

- 单元测试：47个测试用例
- 集成测试：mcp-inspector 集成
- 覆盖率目标：> 85%

## 使用示例

### 示例 1：初始化项目

```bash
# 在项目根目录
npx @benyue1978/solo-flow-mcp init /Users/username/my-project
```

### 示例 2：创建需求文档

```bash
# 通过 MCP 操作创建需求文档
npx @benyue1978/solo-flow-mcp update \
  --projectRoot /Users/username/my-project \
  --type requirements \
  --content "# Project Requirements\n\n## Functional Requirements\n1. User authentication\n2. Data persistence"
```

### 示例 3：在 Cursor 中使用

1. 配置 Cursor 设置
2. 初始化项目
3. 在 Cursor 中，AI 助手可以：
   - 列出项目文档
   - 读取文档内容
   - 更新文档内容
   - 管理项目配置

## 故障排除

### 常见问题

**Q: 为什么需要绝对路径？**
A: 为了安全隔离，确保 MCP 服务只能访问指定的项目目录。

**Q: 如何重置项目配置？**
A: 删除 `.cursor/rules/soloflow.mdc` 文件，然后重新运行 `init` 操作。

**Q: 支持哪些文档格式？**
A: 目前支持 Markdown 格式，未来可能支持其他格式。

**Q: 如何处理并发写入？**
A: 当前版本使用简单的文件系统操作，建议避免并发写入同一文档。

### 错误代码

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `Project root directory does not exist` | 项目根目录不存在 | 确保路径正确且目录存在 |
| `Invalid document type` | 文档类型不在白名单中 | 使用预定义的文档类型 |
| `Document content cannot be empty` | 文档内容为空 | 提供有效的文档内容 |

## 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 更新日志

### v1.0.0
- 初始版本发布
- 支持 list, read, update, init 操作
- 完整的测试套件
- Cursor 集成支持
- NPM 包发布

## 联系方式

- 作者：SongYue <benyue1978@gmail.com>
- 项目地址：https://github.com/benyue1978/solo-flow-mcp
- NPM 包：https://www.npmjs.com/package/@benyue1978/solo-flow-mcp
