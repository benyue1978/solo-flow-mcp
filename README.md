# Solo Flow MCP Server

一个支持Streamable HTTP和stdio双传输协议的Model Context Protocol (MCP) 服务器，包含一个简单的hello world工具。

## 功能特性

- 支持Streamable HTTP传输协议（现代MCP标准）
- 支持stdio传输协议（CLI工具集成）
- 包含hello world工具，支持多语言问候
- 提供简单的文本资源
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

一个简单的问候工具，支持多语言。

**参数**:

- `name` (可选): 要问候的名字，默认为 "World"
- `language` (可选): 问候语言，支持 "en", "zh", "es", "fr"，默认为 "en"

**示例**:

```json
{
  "name": "Alice",
  "language": "zh"
}
```

**响应**:

```text
你好，Alice！
```

## 可用资源

- `file:///hello.txt` - 简单的文本文件

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

## 测试

### 测试Stdio连接（默认）

```bash
npm run test-stdio
```

### 测试Streamable HTTP连接

```bash
npm run test-http
```

### 查看演示

```bash
npm run demo
```

## 开发

项目使用TypeScript开发，源代码在 `src/` 目录中。

```bash
# 开发模式（HTTP模式，自动重新构建）
npm run dev
```

## 许可证

MIT
