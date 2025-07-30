# 📋 任务计划文档（Tasks）

**项目名称：** soloflow-mcp  
**版本：** v0.3  
**文档更新时间：** 2025-07-24

---

## 🎯 项目现状分析

### ✅ 当前 POC 已完成功能

| 功能模块 | 完成状态 | 说明 |
|----------|----------|------|
| MCP Server 基础框架 | ✅ 完成 | 基于 @modelcontextprotocol/sdk v1.16.0 |
| 双传输协议支持 | ✅ 完成 | Stdio（默认）+ Streamable HTTP |
| 基础工具实现 | ✅ 完成 | hello_world, get_requirements_md, get_tasks_md |
| 文件资源支持 | ✅ 完成 | file:///hello.txt, file:///README.md |
| 健康检查端点 | ✅ 完成 | GET /health |
| 安全路径校验 | ✅ 完成 | validateAbsolutePath 函数 |
| 测试脚本 | ✅ 完成 | test-http.js, test-stdio.js 等 |

### 🔄 需要重构的功能

| 功能模块 | 当前状态 | 目标状态 |
|----------|----------|----------|
| 文档操作 | 分散的工具 | 统一的 MCP 操作 |
| 项目路径 | 硬编码路径 | 动态 projectRoot 参数 |
| 文档类型 | 固定工具 | DocType 枚举约束 |
| 目录结构 | 不符合需求 | 按需求文档重构 |

---

## 📋 开发阶段规划

### 🚀 第一阶段：核心架构重构（优先级：P0）

**目标：** 将 POC 重构为符合需求文档的 MCP 服务

#### 1.1 项目结构重构

- [ ] **重构目录结构**
  ```bash
  # 目标结构
  ├── src/
  │   ├── index.ts              # 服务启动入口
  │   ├── context.ts            # projectRoot 校验 + 路径工具
  │   ├── tools/                # MCP 指令处理器
  │   │   ├── list.ts
  │   │   ├── read.ts
  │   │   ├── update.ts
  │   │   └── init.ts
  │   └── types/
  │       └── docTypes.ts       # DocType 枚举定义
  ├── .soloflow/
  │   ├── requirements.md
  │   ├── system_architecture.md
  │   ├── test_strategy.md
  │   ├── tasks.md
  │   └── README.md
  ├── .cursor/
  │   └── rules/
  │       └── soloflow.mdc
  ├── package.json
  ├── tsconfig.json
  ├── .gitignore
  ├── README.md
  ├── tests/
  │   ├── unit/
  │   ├── integration/
  │   └── utils/
  ```

- [ ] **创建 DocType 枚举**
  ```typescript
  // src/types/docTypes.ts
  export type DocType =
    | 'overview'
    | 'requirements'
    | 'system_architecture'
    | 'test_strategy'
    | 'ui_design'
    | 'tasks'
    | 'deployment'
    | 'notes';
  ```

- [ ] **实现路径校验工具**
  ```typescript
  // src/context.ts
  export function validateProjectRoot(projectRoot: string): ValidationResult
  export function getSoloflowPath(projectRoot: string): string
  export function getDocumentPath(projectRoot: string, type: DocType): string
  ```

#### 1.2 核心 MCP 操作实现

- [ ] **实现 `list` 操作**
  ```typescript
  // src/tools/list.ts
  export async function listHandler(args: { projectRoot: string }): Promise<DocumentSummary[]>
  ```

- [ ] **实现 `read` 操作**
  ```typescript
  // src/tools/read.ts
  export async function readHandler(args: { projectRoot: string, type: DocType }): Promise<{ raw: string | null }>
  ```

- [ ] **实现 `update` 操作**
  ```typescript
  // src/tools/update.ts
  export async function updateHandler(args: { projectRoot: string, type: DocType, content: string }): Promise<{ ok: true }>
  ```

- [ ] **实现 `init` 操作**
  ```typescript
  // src/tools/init.ts
  export async function initHandler(args: { projectRoot: string }): Promise<{ ok: true, createdFiles: string[], skippedFiles: string[] }>
  ```

#### 1.3 服务入口重构

- [ ] **重构 server.ts**
  ```typescript
  // src/index.ts
  const server = new McpServer({
    transport: new StdioServerTransport(),
    handlers: {
      init: initHandler,
      list: listHandler,
      read: readHandler,
      update: updateHandler
    }
  });
  ```

### 🧪 第二阶段：测试框架搭建（优先级：P0）

**目标：** 建立完整的测试体系

#### 2.1 测试环境搭建

- [ ] **安装测试依赖**
  ```bash
  npm install --save-dev jest @types/jest ts-jest
  ```

- [ ] **配置 Jest**
  ```javascript
  // jest.config.js
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts']
  };
  ```

- [ ] **创建测试目录结构**
  ```bash
  mkdir -p tests/{unit,integration,security,fixtures,utils}
  ```

#### 2.2 单元测试实现

- [ ] **路径校验测试**
  ```typescript
  // tests/unit/context.test.ts
  describe('Project Path Validation', () => {
    test('should accept valid absolute path', () => {});
    test('should reject relative path', () => {});
    test('should reject system directories', () => {});
  });
  ```

- [ ] **MCP 操作测试**
  ```typescript
  // tests/unit/list.test.ts
  // tests/unit/read.test.ts
  // tests/unit/update.test.ts
  // tests/unit/init.test.ts
  ```

#### 2.3 集成测试实现

- [ ] **MCP 服务器集成测试**
  ```typescript
  // tests/integration/mcp-server.test.ts
  describe('MCP Server Integration', () => {
    test('should handle list request', () => {});
    test('should handle read request', () => {});
    test('should handle update request', () => {});
    test('should handle init request', () => {});
  });
  ```

#### 2.4 安全测试实现

- [ ] **路径安全测试**
  ```typescript
  // tests/security/path-validation.test.ts
  describe('Path Security Validation', () => {
    test('should prevent directory traversal', () => {});
    test('should validate projectRoot format', () => {});
  });
  ```

- [ ] **文档类型校验测试**
  ```typescript
  // tests/security/doc-type-validation.test.ts
  describe('Document Type Validation', () => {
    test('should accept valid document types', () => {});
    test('should reject invalid document types', () => {});
  });
  ```

### 🔐 第三阶段：安全与性能优化（优先级：P1）

**目标：** 确保安全性和性能符合要求

#### 3.1 安全增强

- [ ] **路径穿越防护**
  ```typescript
  // 增强 validateProjectRoot 函数
  function validateProjectRoot(projectRoot: string): ValidationResult {
    // 检查路径穿越攻击
    // 检查系统目录访问
    // 检查相对路径
  }
  ```

- [ ] **文档类型白名单**
  ```typescript
  // 严格校验 DocType 枚举值
  function validateDocType(type: string): ValidationResult {
    const validTypes = ['overview', 'requirements', ...];
    return validTypes.includes(type);
  }
  ```

- [ ] **并发写入保护**
  ```typescript
  // 实现文件锁机制
  class FileLock {
    async acquire(path: string): Promise<void> {}
    async release(path: string): Promise<void> {}
  }
  ```

### 📚 第四阶段：文档与配置（优先级：P1）

**目标：** 完善项目文档和配置

#### 4.1 文档完善

- [ ] **更新 README.md**
  - 安装说明
  - 使用示例
  - API 文档

- [ ] **创建示例项目**
  ```bash
  # 创建示例项目结构
  mkdir -p examples/test-project/.soloflow
  touch examples/test-project/.soloflow/{overview,requirements}.md
  ```

#### 4.2 配置管理

- [ ] **日志系统**
  ```typescript
  // src/logger.ts
  export class Logger {
    info(message: string): void {}
    error(message: string, error?: Error): void {}
    debug(message: string): void {}
  }
  ```

---

## 📅 时间规划

### 第一周：核心架构重构
- **Day 1-2**: 项目结构重构，DocType 定义
- **Day 3-4**: 实现 list, read, update 操作
- **Day 5**: 实现 init 操作，基础测试

### 第二周：测试框架搭建
- **Day 1-2**: 测试环境搭建，单元测试
- **Day 3-4**: 集成测试，安全测试
- **Day 5**: 性能测试，测试覆盖率

### 第三周：安全与性能优化
- **Day 1-2**: 安全增强，路径校验
- **Day 3-4**: 性能优化，并发处理
- **Day 5**: 压力测试，性能调优

### 第四周：文档与部署
- **Day 1-2**: 文档完善，配置管理
- **Day 3-4**: 最终测试，发布准备

---

## 🎯 成功标准

### 功能完整性
- [ ] 所有 MCP 操作（list, read, update, init）正常工作
- [ ] 项目路径上下文隔离机制有效
- [ ] 文档类型约束正确执行
- [ ] 与 Cursor 等开发环境兼容

### 安全性
- [ ] 路径穿越攻击防护有效
- [ ] 文档类型白名单校验通过
- [ ] 并发写入保护机制正常
- [ ] 所有安全测试用例通过

### 性能指标
- [ ] 测试覆盖率 > 85%

---

## 🚨 风险与应对

### 技术风险

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| MCP SDK 版本兼容性 | 高 | 锁定版本，充分测试 |
| 文件系统权限问题 | 中 | 权限检查，错误处理 |
| 并发写入冲突 | 中 | 文件锁机制，重试逻辑 |
| 性能瓶颈 | 低 | 性能监控，优化算法 |

### 项目风险

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| 需求变更 | 中 | 保持架构灵活性 |
| 时间延期 | 中 | 优先级管理，并行开发 |
| 测试覆盖不足 | 高 | 自动化测试，持续集成 |

---

## 📊 进度跟踪

### 每周里程碑

| 周次 | 主要目标 | 交付物 |
|------|----------|--------|
| 第1周 | 核心架构重构 | 基础 MCP 服务 |
| 第2周 | 测试框架搭建 | 完整测试套件 |
| 第3周 | 安全性能优化 | 生产就绪代码 |
| 第4周 | 文档部署准备 | 可部署版本 |

### 每日检查点

- [ ] 代码提交和测试通过
- [ ] 新功能有对应测试用例
- [ ] 文档同步更新
- [ ] 性能指标符合要求

---

本任务计划为 `soloflow-mcp` 项目提供详细的开发路线图，确保从 POC 到生产就绪版本的平滑过渡。 