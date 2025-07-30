# 🏗 系统架构文档（System Architecture）

**项目名称：** soloflow-mcp  
**版本：** v0.5  
**文档更新时间：** 2025-07-24

---

## 🎯 架构目标

- 提供符合 Model Context Protocol（MCP）的本地项目上下文服务；
- 暴露本地 `.soloflow/*.md` 文档为结构化接口，供 LLM 使用；
- 所有操作以调用时传入的 `projectRoot` 为上下文根目录；
- 使用 `StdioServerTransport` 与开发环境（如 Cursor）通信；
- 保持轻量、无状态、可复用。

---

## 📁 项目路径上下文（Project Path）

### ✨ 设计原则

- `soloflow-mcp` 不绑定固定路径；
- 每次调用时，LLM 需在请求中明确提供 `projectRoot`（绝对路径）；
- 所有操作仅在此路径下的 `.soloflow/` 子目录内执行；
- 禁止路径穿越、禁止访问非约定文件。

### 🔐 安全约束

- `projectRoot` 必须是绝对路径；
- 只能访问 `${projectRoot}/.soloflow/*.md`；
- `DocType` 必须为枚举值，禁止任意文件名注入；
- 不支持并发写入。

---

## 🧱 架构模块图

```mermaid
flowchart TD
  subgraph MCP Server
    A[McpServer]
    B[StdioServerTransport]
    A --> B
    A --> C[Handlers]
  end

  subgraph Handlers
    C1[list({ projectRoot })]
    C2[read({ projectRoot, type })]
    C3[update({ projectRoot, type, content })]
    C4[init({ projectRoot })]
  end

  subgraph Filesystem
    D1[projectRoot]
    D2[.soloflow/]
    D3[requirements.md]
    D4[overview.md]
  end

  C1 --> D2
  C2 --> D3
  C3 --> D4
  D2 --> D3 & D4
```

---

## 📦 目录结构

```text
├── index.ts                   # 服务启动入口
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

## 🔌 接口定义（MCP 标准）

### ✅ `list({ projectRoot })`

返回该项目已有的文档类型、名称和最后更新时间。

```typescript
list({ projectRoot: string }): Promise<DocumentSummary[]>
```

### ✅ `read({ projectRoot, type })`

读取某个类型的 Markdown 文档内容。

```typescript
read({ projectRoot: string, type: DocType }): Promise<{ raw: string | null }>
```

### ✅ `update({ projectRoot, type, content })`

覆盖指定文档内容。

```typescript
update({
  projectRoot: string,
  type: DocType,
  content: string
}): Promise<{ ok: true }>
```

### ✅ `init({ projectRoot })`

在指定项目根目录初始化 SoloFlow MCP 配置。

```typescript
init({
  projectRoot: string
}): Promise<{ 
  ok: true, 
  createdFiles: string[], 
  skippedFiles: string[] 
}>
```

---

## 📄 文档类型（DocType）

定义支持的结构化文档类型，路径统一为 `.soloflow/<type>.md`：

```typescript
type DocType =
  | 'overview'
  | 'requirements'
  | 'system_architecture'
  | 'test_strategy'
  | 'ui_design'
  | 'tasks'
  | 'deployment'
  | 'notes';
```

---

## 🧠 示例调用（由 LLM 发起）

### 读取文档

```json
{
  "op": "read",
  "args": {
    "projectRoot": "/Users/ben/projects/vibecoding",
    "type": "requirements"
  }
}
```

### 初始化项目配置

```json
{
  "op": "init",
  "args": {
    "projectRoot": "/Users/ben/projects/vibecoding"
  }
}
```

---

## 🧩 核心依赖

| 模块 | 用途 |
|------|------|
| `@modelcontextprotocol/sdk/server/mcp.js` | 创建 MCP 服务 |
| `@modelcontextprotocol/sdk/server/stdio.js` | 启动 stdio 通信，适配 Cursor |
| `fs/promises` | 文件访问 |
| TypeScript | 开发语言与类型系统 |

---

## 🔜 扩展方向（预留）

- `suggest()` 方法：判断缺失文档，提示 LLM 补充；
- `search({ projectRoot, query })`：支持全文检索（全文索引或 Embedding）；
- 字段抽取：将 Markdown 中特定段落提取为结构化字段；
- 多实例文档支持，如 `feature_x.md`、`experiment_a.md`；
- 与 VibeCoding 网页工具联动，触发 MCP 更新；
- `init` 命令增强：支持自定义配置模板、批量初始化多个项目。

---

## ✅ 架构优势

| 方面 | 说明 |
|------|------|
| 路径隔离 | 每个请求独立处理指定项目，支持并行多个工作区 |
| 轻量运行 | 无数据库、无用户状态、无登录 |
| 高兼容性 | 可对接 Cursor、Claude Code、LangGraph 等 |
| 清晰结构 | 每个模块职责单一，易于扩展 |

---

本架构文档为 `soloflow-mcp` 项目的系统设计基准，强调"每次调用显式传入 `projectRoot`"这一核心机制。
