# Solo Flow MCP Server

一个支持SSE（Server-Sent Events）的Model Context Protocol (MCP) 服务器，包含一个简单的hello world工具。

## 功能特性

- 支持SSE传输协议
- 包含hello world工具，支持多语言问候
- 提供简单的文本资源
- 健康检查端点
- CORS支持

## 安装

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

## 运行

```bash
# 开发模式（构建并运行）
npm run dev

# 或者先构建再运行
npm run build
npm start
```

服务器将在 `http://localhost:3000` 启动。

## 端点

- **SSE端点**: `GET /sse` - MCP通信的主要端点
- **消息端点**: `POST /messages` - 处理MCP消息
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
```
你好，Alice！
```

## 可用资源

- `file:///hello.txt` - 简单的文本文件

## 使用MCP Inspector测试

1. 启动服务器：
   ```bash
   npm run dev
   ```

2. 打开 [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)

3. 在Inspector中配置连接：
   - **Transport**: SSE
   - **SSE URL**: `http://localhost:3000/sse`
   - **Messages URL**: `http://localhost:3000/messages`

4. 连接后，你可以：
   - 查看可用的工具和资源
   - 测试 `hello_world` 工具
   - 读取 `file:///hello.txt` 资源

## 开发

项目使用TypeScript开发，源代码在 `src/` 目录中。

```bash
# 开发模式（自动重新构建）
npm run dev
```

## 许可证

MIT 