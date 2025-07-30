# 📋 任务计划文档（Tasks）

**项目名称：** soloflow-mcp  
**版本：** v0.4  
**文档更新时间：** 2025-07-30

---

## 🎯 项目现状分析

### ✅ 已完成功能（第一阶段完成）

| 功能模块 | 完成状态 | 说明 |
|----------|----------|------|
| 项目结构重构 | ✅ 完成 | 按需求文档重构目录结构 |
| DocType 枚举定义 | ✅ 完成 | 完整的文档类型约束 |
| 路径校验工具 | ✅ 完成 | validateProjectRoot 等工具函数 |
| MCP 操作实现 | ✅ 完成 | list, read, update, init 全部实现 |
| 服务入口重构 | ✅ 完成 | 简化为 stdio 模式，移除 HTTP 支持 |
| 资源文件管理 | ✅ 完成 | soloflow.mdc 作为资源文件 |
| 用户反馈优化 | ✅ 完成 | init 工具提供详细的状态反馈 |

### 🔄 当前架构状态

```bash
# 当前项目结构
├── src/
│   ├── index.ts              # 服务启动入口（stdio 模式）
│   ├── context.ts            # projectRoot 校验 + 路径工具
│   ├── tools/                # MCP 指令处理器
│   │   ├── list.ts          ✅ 实现
│   │   ├── read.ts          ✅ 实现
│   │   ├── update.ts        ✅ 实现
│   │   └── init.ts          ✅ 实现
│   ├── types/
│   │   └── docTypes.ts      ✅ DocType 枚举定义
│   └── resources/
│       └── soloflow.mdc     ✅ 资源文件
├── .soloflow/               ✅ 文档目录
├── .cursor/rules/           ✅ Cursor 规则
└── package.json             ✅ 更新依赖
```

---

## 📋 开发阶段规划

### 🧪 第二阶段：测试框架搭建（优先级：P0）

**目标：** 建立完整的测试体系

#### 2.1 测试环境搭建

- [x] **安装测试依赖**
  ```bash
  npm install --save-dev jest @types/jest ts-jest
  ```

- [x] **配置 Jest**
  ```javascript
  // jest.config.cjs
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
  };
  ```

- [x] **创建测试目录结构**
  ```bash
  mkdir -p tests/{unit,integration,security,fixtures,utils}
  ```

#### 2.2 单元测试实现

- [x] **路径校验测试**
  ```typescript
  // tests/unit/context.test.ts
  describe('Project Path Validation', () => {
    test('should accept valid absolute path', () => {});
    test('should reject relative path', () => {});
    test('should reject system directories', () => {});
    test('should validate project root exists', () => {});
  });
  ```

- [x] **MCP 操作测试**
  ```typescript
  // tests/unit/list.test.ts
  describe('List Operation', () => {
    test('should list documents in .soloflow directory', () => {});
    test('should return empty array for empty directory', () => {});
    test('should extract document titles', () => {});
  });

  // tests/unit/read.test.ts
  describe('Read Operation', () => {
    test('should read existing document', () => {});
    test('should return null for non-existent document', () => {});
    test('should validate document type', () => {});
  });

  // tests/unit/update.test.ts
  describe('Update Operation', () => {
    test('should create new document', () => {});
    test('should update existing document', () => {});
    test('should create .soloflow directory if needed', () => {});
  });

  // tests/unit/init.test.ts
  describe('Init Operation', () => {
    test('should create soloflow.mdc file', () => {});
    test('should skip existing files', () => {});
    test('should provide detailed feedback', () => {});
  });
  ```

- [x] **测试基础设施**
  - 创建独立的测试目录结构 (`tests/fixtures/test-project/`)
  - 实现测试工具函数 (`tests/utils/test-helpers.ts`)
  - 使用真实文件系统测试，替代 mock 测试
  - 修复 TypeScript 配置，支持 ES2022 模块
  - 所有 41 个测试用例全部通过

#### 2.3 集成测试实现

- [ ] **MCP 服务器集成测试**
  ```typescript
  // tests/integration/mcp-server.test.ts
  describe('MCP Server Integration', () => {
    test('should handle list request via stdio', () => {});
    test('should handle read request via stdio', () => {});
    test('should handle update request via stdio', () => {});
    test('should handle init request via stdio', () => {});
  });
  ```

#### 2.4 安全测试实现

- [ ] **路径安全测试**
  ```typescript
  // tests/security/path-validation.test.ts
  describe('Path Security Validation', () => {
    test('should prevent directory traversal', () => {});
    test('should validate projectRoot format', () => {});
    test('should reject system directory access', () => {});
  });
  ```

- [ ] **文档类型校验测试**
  ```typescript
  // tests/security/doc-type-validation.test.ts
  describe('Document Type Validation', () => {
    test('should accept valid document types', () => {});
    test('should reject invalid document types', () => {});
    test('should handle case sensitivity', () => {});
  });
  ```

### 🔐 第三阶段：安全与性能优化（优先级：P1）

**目标：** 确保安全性和性能符合要求

#### 3.1 安全增强

- [ ] **路径穿越防护增强**
  ```typescript
  // 增强 validateProjectRoot 函数
  function validateProjectRoot(projectRoot: string): ValidationResult {
    // 检查路径穿越攻击 (../)
    // 检查系统目录访问
    // 检查相对路径
    // 检查符号链接
  }
  ```

- [ ] **文档类型白名单增强**
  ```typescript
  // 严格校验 DocType 枚举值
  function validateDocType(type: string): ValidationResult {
    const validTypes: DocType[] = ['overview', 'requirements', ...];
    return validTypes.includes(type as DocType);
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

#### 3.2 性能优化

- [ ] **文件操作优化**
  ```typescript
  // 缓存机制
  class DocumentCache {
    private cache = new Map<string, { content: string, timestamp: number }>();
    
    async getDocument(path: string): Promise<string> {}
    async invalidateCache(path: string): Promise<void> {}
  }
  ```

- [ ] **错误处理优化**
  ```typescript
  // 统一错误处理
  class MCPError extends Error {
    constructor(message: string, public code: string) {
      super(message);
    }
  }
  ```

### 📚 第四阶段：文档与配置（优先级：P1）

**目标：** 完善项目文档和配置

#### 4.1 文档完善

- [ ] **更新 README.md**
  - 安装说明
  - 使用示例
  - API 文档
  - 与 Cursor 集成说明

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

- [ ] **环境配置**
  ```typescript
  // src/config.ts
  export interface Config {
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    maxFileSize: number;
    cacheEnabled: boolean;
  }
  ```

### 🚀 第五阶段：部署与监控（优先级：P2）

**目标：** 准备生产部署

#### 5.1 部署准备

- [ ] **Docker 容器化**
  ```dockerfile
  # Dockerfile
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  COPY dist/ ./dist/
  CMD ["node", "dist/index.js"]
  ```

- [ ] **CI/CD 流程**
  ```yaml
  # .github/workflows/ci.yml
  name: CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
        - run: npm ci
        - run: npm test
        - run: npm run build
  ```

#### 5.2 监控与日志

- [ ] **性能监控**
  ```typescript
  // src/monitoring.ts
  export class PerformanceMonitor {
    recordOperation(operation: string, duration: number): void {}
    getMetrics(): PerformanceMetrics {}
  }
  ```

---

## 📅 时间规划

### 第二周：测试框架搭建
- **Day 1-2**: 测试环境搭建，单元测试
- **Day 3-4**: 集成测试，安全测试
- **Day 5**: 性能测试，测试覆盖率

### 第三周：安全与性能优化
- **Day 1-2**: 安全增强，路径校验
- **Day 3-4**: 性能优化，并发处理
- **Day 5**: 压力测试，性能调优

### 第四周：文档与配置
- **Day 1-2**: 文档完善，配置管理
- **Day 3-4**: 最终测试，发布准备

### 第五周：部署与监控
- **Day 1-2**: Docker 容器化，CI/CD
- **Day 3-4**: 监控系统，生产部署

---

## 🎯 成功标准

### 功能完整性
- [x] 所有 MCP 操作（list, read, update, init）正常工作
- [x] 项目路径上下文隔离机制有效
- [x] 文档类型约束正确执行
- [x] 与 Cursor 等开发环境兼容
- [ ] 测试覆盖率 > 85%
- [ ] 所有安全测试用例通过

### 安全性
- [ ] 路径穿越攻击防护有效
- [ ] 文档类型白名单校验通过
- [ ] 并发写入保护机制正常
- [ ] 所有安全测试用例通过

### 性能指标
- [ ] 测试覆盖率 > 85%
- [ ] 响应时间 < 100ms（本地操作）
- [ ] 内存使用 < 50MB

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

| 周次 | 主要目标 | 交付物 | 状态 |
|------|----------|--------|------|
| 第1周 | 核心架构重构 | 基础 MCP 服务 | ✅ 完成 |
| 第2周 | 测试框架搭建 | 完整测试套件 | 🔄 进行中（基础完成） |
| 第3周 | 安全性能优化 | 生产就绪代码 | ⏳ 待开始 |
| 第4周 | 文档部署准备 | 可部署版本 | ⏳ 待开始 |
| 第5周 | 部署与监控 | 生产环境 | ⏳ 待开始 |

### 每日检查点

- [x] 代码提交和测试通过
- [x] 新功能有对应测试用例
- [x] 文档同步更新
- [ ] 性能指标符合要求

---

## 📝 更新历史

- **2025-07-30**: 完成第二阶段测试框架搭建基础部分，Jest 配置和单元测试框架
- **2025-07-30**: 更新任务状态，第一阶段完成，开始第二阶段测试框架搭建
- **2025-07-24**: 初始版本，从 POC 到生产就绪的详细计划

---

本任务计划为 `soloflow-mcp` 项目提供详细的开发路线图，确保从 POC 到生产就绪版本的平滑过渡。 