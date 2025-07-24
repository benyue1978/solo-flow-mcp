# Solo Flow MCP Server

一个支持Streamable HTTP和stdio双传输协议的Model Context Protocol (MCP) 服务器，包含一个简单的hello world工具。

## 功能特性

- 支持Streamable HTTP传输协议（现代MCP标准）
- 支持stdio传输协议（CLI工具集成）
- 包含hello world工具，支持多语言问候
- 提供简单的文本资源
- 动态README.md资源（读取项目根目录）
- 健康检查端点
- CORS支持
- 会话管理

## 安装

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

## 运行

### Stdio模式（默认）

```bash
# 默认模式 - stdio
npm start

# 或者直接运行
node dist/server.js
```

### HTTP模式

```bash
# 开发模式（HTTP）
npm run dev

# 或者直接运行HTTP模式
npm run http

# 或者直接运行
node dist/server.js --http
```

服务器将在 `http://localhost:3000` 启动。

## 传输协议

### Stdio（默认）

- **用途**: CLI工具、直接集成、自动化脚本
- **特点**: 标准输入输出、单会话、轻量级
- **启动**: 默认模式，无需参数

### Streamable HTTP

- **用途**: Web工具、MCP Inspector、浏览器集成
- **端点**: `ALL /mcp`
- **特点**: 支持多会话、CORS、健康检查
- **启动**: 需要 `--http` 参数

## 端点

- **Streamable HTTP端点**: `ALL /mcp` - MCP通信的主要端点
- **健康检查**: `GET /health` - 服务器状态检查

## 可用工具

### hello_world

一个简单的问候工具，支持多语言：

```json
{
  "name": "hello_world",
  "description": "A simple hello world tool that returns a greeting message",
  "inputSchema": {
    "name": "string (optional, default: 'World')",
    "language": "en|zh|es|fr (optional, default: 'en')"
  }
}
```



### get_requirements_md

读取项目需求文档：

```json
{
  "name": "get_requirements_md",
  "description": "Read the requirements document using absolute path",
  "inputSchema": {
    "path": "string - Absolute path to requirements document (e.g., '/Users/username/project/docs/requirements.md')"
  }
}
```

### get_tasks_md

读取项目任务文档：

```json
{
  "name": "get_tasks_md",
  "description": "Read the tasks document using absolute path",
  "inputSchema": {
    "path": "string - Absolute path to tasks document (e.g., '/Users/username/project/docs/tasks.md')"
  }
}
```

### get_project_info

获取当前工作目录信息：

```json
{
  "name": "get_project_info", 
  "description": "Get information about the current working directory",
  "inputSchema": {}
}
```

### read_readme

读取README.md文件（要求绝对路径）：

```json
{
  "name": "read_readme",
  "description": "Read the README.md file using absolute path",
  "inputSchema": {
    "path": "string - Absolute path to README.md file (e.g., '/Users/username/project/README.md')"
  }
}
```

### scan_project

扫描项目目录并列出重要文件和目录结构：

```json
{
  "name": "scan_project",
  "description": "Scan the project directory and list important files and directories",
  "inputSchema": {
    "path": "string (optional) - Path to scan (defaults to current project root)",
    "maxDepth": "number (optional, default: 3) - Maximum directory depth to scan",
    "includeHidden": "boolean (optional, default: false) - Include hidden files and directories"
  }
}
```

## 可用资源

- `file:///hello.txt` - 简单的文本文件
- `file:///README.md` - 动态README.md文件（读取项目根目录）

### README.md资源

这是一个动态资源，会实时读取当前项目根目录的README.md文件。根据[MCP Roots规范](https://modelcontextprotocol.io/specification/2025-06-18/client/roots)，这个资源展示了如何实现文件系统访问。

**特点**:

- 实时读取项目根目录的README.md
- 自动处理文件不存在的情况
- 错误处理和友好的错误消息
- 支持markdown格式

## 使用MCP Inspector测试

### 方法一：使用CLI Inspector（推荐）

```bash
npm run inspector
```

或者直接运行：

```bash
npx @modelcontextprotocol/inspector node dist/server.js
```

这会自动启动服务器并打开Inspector界面。

### 方法二：手动启动 + Web Inspector

1. 启动HTTP模式服务器：

   ```bash
   npm run http
   ```

2. 打开 [MCP Inspector Web界面](https://modelcontextprotocol.io/docs/tools/inspector)

3. 在Inspector中配置连接：
   - **Transport**: Streamable HTTP
   - **URL**: `http://localhost:3000/mcp`

4. 连接后，你可以：
   - 查看可用的工具和资源
   - 测试 `hello_world` 工具
   - 读取 `file:///hello.txt` 资源
   - 读取 `file:///README.md` 资源

## 测试

### 测试Stdio连接（默认）

```bash
npm run test-stdio
```

### 测试Streamable HTTP连接

```bash
npm run test-sse
```

### 测试README.md资源

```bash
npm run test-readme
```

### 测试Inspector兼容性

```bash
npm run test-inspector
```

## 开发

项目使用TypeScript开发，源代码在 `src/` 目录中。

```bash
# 开发模式（HTTP模式，自动重新构建）
npm run dev
```

## 许可证

MIT
