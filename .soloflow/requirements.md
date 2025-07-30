# 📋 `soloflow-mcp` 需求文档

**版本：** v0.3  
**创建日期：** 2025-07-24  
**作者：** Song Yue

---

## 🧭 项目背景

随着 AI Agent（如 Claude Code、Cursor）在软件开发中的应用逐渐普及，开发者希望让 AI 在理解项目结构、追踪开发文档、判断下一步工作中扮演更主动的角色。

Model Context Protocol（MCP）定义了一种通用接口，允许 LLM 通过标准指令（如 `read`, `update`, `list` 等）与项目上下文进行交互。

`soloflow-mcp` 是一个基于 MCP 协议的本地服务，用于向大模型提供项目文档访问与更新能力。
其核心目标是将 `.soloflow/` 目录中的文档暴露为结构化接口，供 AI 使用。

---

## 🎯 项目目标

构建一个支持 MCP 的服务端，实现以下目标：

1. 将 `.soloflow/` 下的文档暴露为 MCP 对象；
2. 响应 LLM 发起的 `read`, `update`, `list`, `init` 等操作；
3. 使用 `StdioServerTransport` 接收请求，适配如 Cursor 的本地集成；
4. 提供 `.cursor/rules/soloflow.mdc` 文件，指导工具如何与本服务交互；
5. 保持文档格式为 Markdown，并兼容 Mermaid 等富文本语法；
6. 所有文档结构基于固定 `DocType` 列表映射；
7. 不引入任何后端数据库，仅依赖本地文件系统；
8. 支持项目初始化，自动创建必要的配置文件和目录结构。

---

## 🧩 支持的 MCP 操作

### ✅ `list()`

- 返回 `.soloflow/` 中的文档清单；
- 每个文档包含：
  - `type`: 如 `overview`, `requirements`
  - `name`: 文件名，如 `overview.md`
  - `title`: 若能从文档中提取标题则提供
  - `lastUpdated`: 文件最后更新时间

### ✅ `read({ type })`

- 读取指定类型文档的内容；
- 返回字段：
  - `raw`: 原始 Markdown 文本；
  - 可扩展支持提取字段（如 `goals`, `features`）；
- 若文件不存在，返回 `null`。

### ✅ `update({ type, content })`

- 将新的 Markdown 内容写入 `.soloflow/<type>.md`；
- 若文件不存在，将创建；
- 可支持 `append` 或 `replace` 策略（默认全量替换）；
- 后续可引入 `diff/merge` 功能增强内容演进安全性。

### ✅ `init({ projectRoot })`

- 在指定项目根目录初始化 SoloFlow MCP 配置；
- 自动创建 `.cursor/rules/soloflow.mdc` 文件；
- 确保目录结构存在（如 `.cursor/rules/` 目录）；
- 返回初始化状态和创建的文件路径；
- 支持覆盖现有文件或跳过已存在的文件。

### ✅ `search({ query })`（预留）

- 在所有文档中搜索关键词；
- 返回包含匹配内容的文档段落；
- 可用于 Agent 自主查找上下文。

---

## 📁 文档类型（DocType）定义

```typescript
type DocType =
  | 'overview'
  | 'requirements'
  | 'system_architecture'
  | 'test_strategy'
  | 'ui_design'
  | 'tasks'
  | 'architecture'
  | 'deployment'
  | 'notes';
```

- 所有文档均保存在 `.soloflow/` 目录下，扩展名为 `.md`；
- 文件名固定为 `<DocType>.md`；
- 每份文档可为多段结构化内容或自由 Markdown 组合；
- 支持嵌入 Mermaid 图、代码块等富文本内容。

---

## ⚙️ 技术选型

| 模块 | 技术 |
|------|------|
| MCP 核心服务 | `@modelcontextprotocol/sdk/server/mcp.js` |
| 通信协议 | `@modelcontextprotocol/sdk/server/stdio.js` |
| 项目语言 | TypeScript |
| 文件读写 | Node.js `fs/promises` |
| 项目结构 | 放于 `apps/soloflow-mcp/` 目录内 |

---

## 📦 项目结构草图

```text
├── index.ts                   # MCP 服务启动入口
├── context.ts                # projectRoot 校验 + 路径工具
├── tools/                 # MCP 指令处理器
│   ├── list.ts
│   ├── read.ts
│   ├── update.ts
│   └── init.ts
├── types/
│   └── docTypes.ts           # DocType 枚举定义
├── .cursor/
│   └── rules/
│       └── soloflow.mdc      # 指导 Cursor 如何调用 MCP
└── package.json
```

---

## 🧪 示例运行方式（被 Cursor 自动调用）

无需命令行调用，Cursor 启动后自动通过 stdio 连接并发送请求：

```typescript
// 在 main.ts 中
const server = new McpServer({
  transport: new StdioServerTransport(),
  handlers: {
    init: initHandler,
    list: listHandler,
    read: readHandler,
    update: updateHandler
  }
});
server.listen();
```

---

## 🔐 非功能性要求

| 项目 | 说明 |
|------|------|
| 本地运行 | 不依赖网络或数据库 |
| 可配置性 | 支持通过环境变量或参数设置 `.soloflow` 路径 |
| 安全性 | 避免覆盖非注册类型文档；严格限制路径 |
| 性能 | 每次操作需在 100ms 内响应（本地磁盘访问） |
| 扩展性 | 后续可支持字段提取、内容摘要、字段级 diff 等增强功能 |

---

## 🔜 未来扩展方向

- 添加 `suggest()` 方法：用于判断文档是否齐全、是否可开始任务阶段；
- 支持文档字段 Schema（如 `title`, `goals`, `features`）提取；
- 支持 `.soloflow/project.json` 存储文档状态元信息；
- 集成到 VibeCoding 前端，作为统一上下文服务；
- 作为 LangGraph 节点运行于更大 Agent 框架中。

---

本需求文档用于指导 `soloflow-mcp` 原型阶段的开发实现，明确其作为 MCP 服务在项目上下文管理中的定位与职责。
