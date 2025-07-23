# MCP Inspector 测试指南

## 服务器状态

✅ MCP Server 已成功启动并运行在 `http://localhost:3000`
✅ 使用现代 Streamable HTTP 传输协议

## 测试步骤

### 方法一：使用 MCP Inspector CLI（推荐）

#### 1. 直接启动 Inspector 测试服务器

```bash
npx @modelcontextprotocol/inspector node dist/server.js
```

这个命令会：

- 自动启动我们的MCP服务器
- 打开Inspector界面
- 建立连接并显示所有可用功能

#### 2. 在Inspector中测试功能

Inspector界面包含以下标签页：

- **Resources**: 查看和测试 `file:///hello.txt` 资源
- **Tools**: 测试 `hello_world` 工具
- **Prompts**: 查看可用的提示模板
- **Notifications**: 查看服务器日志

### 方法二：手动启动服务器 + Web Inspector

#### 1. 启动服务器

```bash
npm run dev
```

#### 2. 打开 MCP Inspector

访问 [MCP Inspector Web界面](https://modelcontextprotocol.io/docs/tools/inspector)

### 3. 配置连接

在 MCP Inspector 中配置以下连接参数：

- **Transport Type**: Streamable HTTP
- **URL**: `http://localhost:3000/mcp`

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

```text
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

```text
MCP Server running on port 3000
Streamable HTTP endpoint: http://localhost:3000/mcp
Health check: http://localhost:3000/health
Available tools: hello_world
Available resources: file:///hello.txt
```

当有客户端连接时，会显示：

```text
New Streamable HTTP connection request
Session initialized: [session-id]
```

## 技术细节

- **传输协议**: Streamable HTTP (现代MCP标准)
- **消息格式**: JSON-RPC 2.0
- **参数验证**: Zod schema validation
- **CORS**: 已启用，支持跨域访问
- **会话管理**: 自动管理会话ID和连接状态

## 扩展功能

这个MCP server可以作为基础，添加更多功能：

1. 文件系统操作工具
2. 数据库查询工具
3. API调用工具
4. 代码生成工具
5. 文档处理工具

参考 [MCP TypeScript SDK 文档](https://github.com/modelcontextprotocol/typescript-sdk)
了解更多功能。
