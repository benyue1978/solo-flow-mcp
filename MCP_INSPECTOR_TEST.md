# MCP Inspector 测试指南

## 服务器状态

✅ MCP Server 已成功启动并运行在 `http://localhost:3000`

## 测试步骤

### 1. 启动服务器

```bash
npm run dev
```

### 2. 打开 MCP Inspector

访问 [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)

### 3. 配置连接

在 MCP Inspector 中配置以下连接参数：

- **Transport Type**: SSE
- **SSE URL**: `http://localhost:3000/sse`
- **Messages URL**: `http://localhost:3000/messages`

### 4. 连接测试

点击 "Connect" 按钮，应该看到：

- ✅ 连接成功
- ✅ 服务器信息显示：`solo-flow-mcp-server v1.0.0`
- ✅ 可用工具列表包含 `hello_world`
- ✅ 可用资源列表包含 `file:///hello.txt`

### 5. 测试 hello_world 工具

#### 测试用例 1: 默认参数
```json
{}
```
**预期结果**: `Hello, World!`

#### 测试用例 2: 自定义名字
```json
{
  "name": "Alice"
}
```
**预期结果**: `Hello, Alice!`

#### 测试用例 3: 中文问候
```json
{
  "name": "张三",
  "language": "zh"
}
```
**预期结果**: `你好，张三！`

#### 测试用例 4: 西班牙语
```json
{
  "name": "Maria",
  "language": "es"
}
```
**预期结果**: `¡Hola, Maria!`

#### 测试用例 5: 法语
```json
{
  "name": "Pierre",
  "language": "fr"
}
```
**预期结果**: `Bonjour, Pierre!`

### 6. 测试资源读取

尝试读取资源 `file:///hello.txt`，应该返回：

```
Hello, World! This is a simple text file from the MCP server.
```

## 故障排除

### 连接失败

1. 确保服务器正在运行：
   ```bash
   curl http://localhost:3000/health
   ```

2. 检查端口是否被占用：
   ```bash
   lsof -i :3000
   ```

3. 检查防火墙设置

### 工具调用失败

1. 检查参数格式是否正确（JSON格式）
2. 确保参数名称拼写正确
3. 检查语言代码是否在支持范围内：`["en", "zh", "es", "fr"]`

### 资源读取失败

1. 确保资源URI正确：`file:///hello.txt`
2. 检查服务器日志是否有错误信息

## 服务器日志

服务器运行时会显示以下日志：

```
MCP Server running on port 3000
SSE endpoint: http://localhost:3000/sse
Messages endpoint: http://localhost:3000/messages
Health check: http://localhost:3000/health
Available tools: hello_world
Available resources: file:///hello.txt
```

当有客户端连接时，会显示：

```
New SSE connection established
SSE transport created with session ID: [session-id]
MCP server connected to transport: [session-id]
```

## 技术细节

- **传输协议**: SSE (Server-Sent Events)
- **消息格式**: JSON-RPC 2.0
- **参数验证**: Zod schema validation
- **CORS**: 已启用，支持跨域访问
- **会话管理**: 自动管理SSE连接和会话ID

## 扩展功能

这个MCP server可以作为基础，添加更多功能：

1. 文件系统操作工具
2. 数据库查询工具
3. API调用工具
4. 代码生成工具
5. 文档处理工具

参考 [MCP TypeScript SDK 文档](https://github.com/modelcontextprotocol/typescript-sdk) 了解更多功能。 