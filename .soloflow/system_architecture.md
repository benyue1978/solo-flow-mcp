# 🏗️ 系统架构文档（System Architecture）

**项目名称：** soloflow-mcp  
**版本：** v1.0.6  
**文档更新时间：** 2025-08-07

---

## 🎯 架构概述

### 设计目标
`soloflow-mcp` 采用模块化、可扩展的架构设计，旨在为 AI 开发助手提供高效、安全的项目文档管理服务。架构设计遵循以下原则：

- **模块化**: 清晰的职责分离和模块边界
- **可扩展**: 支持新工具和提示的轻松添加
- **安全性**: 严格的数据验证和访问控制
- **性能**: 轻量级实现，快速响应
- **标准化**: 遵循 MCP 协议标准

### 核心组件
```
┌─────────────────────────────────────────────────────────────┐
│                    MCP 服务层                              │
├─────────────────────────────────────────────────────────────┤
│  Transport Layer (StdioServerTransport)                   │
├─────────────────────────────────────────────────────────────┤
│  Server Layer (@modelcontextprotocol/sdk)                 │
├─────────────────────────────────────────────────────────────┤
│  Handler Layer (Tools + Prompts)                          │
├─────────────────────────────────────────────────────────────┤
│  Business Logic Layer (Context + Validation)              │
├─────────────────────────────────────────────────────────────┤
│  Data Access Layer (File System)                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 架构组件详解

### 1. 传输层 (Transport Layer)
**组件**: `StdioServerTransport`
**职责**: 
- 处理与客户端的通信
- 支持标准输入输出流通信
- 适配 Cursor 等 IDE 的本地集成

**特点**:
- 无网络依赖，本地通信
- 低延迟，高可靠性
- 跨平台兼容

### 2. 服务层 (Server Layer)
**组件**: `McpServer` from `@modelcontextprotocol/sdk`
**职责**:
- MCP 协议实现
- 工具和提示注册
- 请求路由和分发

**注册内容**:
- 4个核心工具: `list`, `read`, `update`, `init`
- 32个综合提示: 覆盖完整软件开发生命周期

### 3. 处理器层 (Handler Layer)

#### 3.1 工具处理器 (Tools)
**位置**: `src/tools/`
**组件**:
- `list.ts` - 文档列表查询
- `read.ts` - 文档内容读取
- `update.ts` - 文档内容更新
- `init.ts` - 项目初始化

**职责**:
- 处理 MCP 工具调用
- 参数验证和错误处理
- 业务逻辑执行

#### 3.2 提示处理器 (Prompts)
**位置**: `src/prompts/`
**组件**:
- `core-prompts.ts` - 核心项目管理提示
- `role-prompts.ts` - 基于角色的提示
- `task-prompts.ts` - 任务管理提示
- `requirements-prompts.ts` - 需求分析提示
- `design-prompts.ts` - 设计和架构提示
- `development-prompts.ts` - 开发和编码提示
- `testing-prompts.ts` - 测试和QA提示
- `release-prompts.ts` - 发布和部署提示
- `categories.ts` - 提示类别管理
- `mapping.ts` - 路径映射系统
- `index.ts` - 提示注册表

**职责**:
- 提供结构化的 AI 交互指南
- 支持不同开发场景和角色
- 引导 AI 完成特定任务

### 4. 业务逻辑层 (Business Logic Layer)
**组件**: `src/context.ts`
**职责**:
- 项目路径验证
- 文档类型验证
- 安全检查和访问控制
- 路径工具函数

**核心功能**:
```typescript
// 路径验证
validateProjectRoot(projectRoot: string): boolean

// 文档路径生成
getDocPath(projectRoot: string, docType: DocType): string

// 文档类型验证
isValidDocType(docType: string): docType is DocType
```

### 5. 数据访问层 (Data Access Layer)
**组件**: Node.js File System API
**职责**:
- 文件读写操作
- 目录结构管理
- 文件元数据获取

**支持操作**:
- 异步文件读写
- 目录遍历
- 文件状态检查

---

## 🔧 技术架构

### 技术栈
| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 运行时 | Node.js | 18+ | JavaScript 运行时 |
| 语言 | TypeScript | 5.x | 类型安全的 JavaScript |
| MCP SDK | @modelcontextprotocol/sdk | 最新 | MCP 协议实现 |
| 测试 | Jest | 29.x | 单元测试框架 |
| 构建 | TypeScript Compiler | 5.x | 代码编译 |

### 依赖关系
```
soloflow-mcp
├── @modelcontextprotocol/sdk (MCP 协议)
├── @types/node (TypeScript 类型定义)
├── jest (测试框架)
└── typescript (编译工具)
```

---

## 📁 项目结构

### 目录组织
```
soloflow-mcp/
├── src/                          # 源代码
│   ├── index.ts                  # 服务入口
│   ├── context.ts                # 业务逻辑
│   ├── tools/                    # 工具处理器
│   │   ├── list.ts
│   │   ├── read.ts
│   │   ├── update.ts
│   │   └── init.ts
│   ├── prompts/                  # 提示系统
│   │   ├── core-prompts.ts
│   │   ├── role-prompts.ts
│   │   ├── task-prompts.ts
│   │   ├── requirements-prompts.ts
│   │   ├── design-prompts.ts
│   │   ├── development-prompts.ts
│   │   ├── testing-prompts.ts
│   │   ├── release-prompts.ts
│   │   ├── categories.ts
│   │   ├── mapping.ts
│   │   └── index.ts
│   ├── types/                    # 类型定义
│   │   └── docTypes.ts
│   └── resources/                # 资源文件
│       └── soloflow.mdc
├── tests/                        # 测试代码
│   ├── unit/                     # 单元测试
│   ├── integration/              # 集成测试
│   └── security/                 # 安全测试
├── .soloflow/                    # 项目文档
│   ├── overview.md
│   ├── requirements.md
│   ├── system_architecture.md
│   ├── test_strategy.md
│   ├── ui_design.md
│   ├── tasks.md
│   ├── deployment.md
│   └── notes.md
├── .cursor/                      # Cursor 配置
│   └── rules/
│       └── soloflow.mdc
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript 配置
├── jest.config.cjs              # Jest 配置
├── README.md                     # 英文文档
└── README.zh-CN.md              # 中文文档
```

---

## 🔄 数据流

### 请求处理流程
```
1. 客户端请求 → StdioServerTransport
2. 协议解析 → McpServer
3. 路由分发 → Handler (Tools/Prompts)
4. 参数验证 → Context Layer
5. 业务处理 → Business Logic
6. 数据访问 → File System
7. 响应返回 → 客户端
```

### 文档管理流程
```
1. 项目初始化 → 创建 .soloflow/ 目录
2. 文档创建 → 生成 8 个核心文档
3. 文档读取 → 验证路径和类型
4. 文档更新 → 安全写入文件
5. 文档列表 → 扫描目录内容
```

---

## 🔐 安全架构

### 安全策略
1. **路径验证**: 严格验证项目根路径，防止路径遍历
2. **类型约束**: 只允许访问预定义的文档类型
3. **权限控制**: 基于文件系统权限的安全控制
4. **输入验证**: 所有输入参数进行类型和格式验证

### 安全检查点
```typescript
// 1. 项目路径验证
if (!validateProjectRoot(projectRoot)) {
  throw new Error('Invalid project root path');
}

// 2. 文档类型验证
if (!isValidDocType(docType)) {
  throw new Error('Invalid document type');
}

// 3. 文件路径安全检查
const docPath = getDocPath(projectRoot, docType);
if (!docPath.startsWith(projectRoot)) {
  throw new Error('Path traversal detected');
}
```

---

## 🧪 测试架构

### 测试策略
- **单元测试**: 覆盖所有工具和提示函数
- **集成测试**: 测试 MCP 服务端完整流程
- **安全测试**: 验证路径验证和安全检查
- **性能测试**: 验证响应时间和内存使用

### 测试覆盖
- **工具测试**: 4个核心工具的完整测试
- **提示测试**: 32个提示的功能测试
- **安全测试**: 路径验证和类型检查测试
- **集成测试**: 端到端服务测试

---

## 🚀 部署架构

### 部署模式
1. **本地开发**: 直接运行 TypeScript 源码
2. **NPM 包**: 发布为 NPM 包，支持 npx 安装
3. **Cursor 集成**: 通过 .cursor/rules/ 配置集成

### 部署要求
- **环境**: Node.js 18+
- **依赖**: 最小化依赖，快速启动
- **权限**: 文件系统读写权限
- **网络**: 无需网络连接，本地运行

---

## 📈 性能架构

### 性能指标
- **启动时间**: < 1秒
- **响应时间**: < 100ms
- **内存使用**: < 50MB
- **并发支持**: 单项目并发操作

### 优化策略
- **异步操作**: 所有 I/O 操作异步处理
- **缓存机制**: 文档内容缓存
- **轻量级**: 最小化依赖和代码体积
- **类型安全**: TypeScript 编译时优化

---

## 🔮 扩展架构

### 扩展点
1. **新工具**: 在 `src/tools/` 添加新工具
2. **新提示**: 在 `src/prompts/` 添加新提示
3. **新文档类型**: 在 `src/types/docTypes.ts` 添加类型
4. **新验证规则**: 在 `src/context.ts` 添加验证

### 扩展流程
```
1. 定义新功能需求
2. 实现业务逻辑
3. 添加类型定义
4. 编写测试用例
5. 更新文档
6. 注册到服务
```

---

## 📝 更新历史

- **2025-08-07**: 更新到 v1.0.6，添加32个综合提示系统架构
- **2025-08-07**: 添加基于角色的提示架构和场景化指南
- **2025-07-30**: 完成 NPM 包发布架构和 Cursor 集成
- **2025-07-30**: 实现 6 个核心 prompts 架构
- **2025-07-30**: 完成测试框架架构，47个测试通过
- **2025-07-24**: 初始版本，基础 MCP 服务架构
