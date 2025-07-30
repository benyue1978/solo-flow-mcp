# 📋 任务计划文档（Tasks）

**项目名称：** soloflow-mcp  
**版本：** v0.4  
**文档更新时间：** 2025-07-30

---

## 🎯 项目现状分析

### ✅ 已完成功能（第一阶段和第二阶段完成）

| 功能模块 | 完成状态 | 说明 |
|----------|----------|------|
| 项目结构重构 | ✅ 完成 | 按需求文档重构目录结构 |
| DocType 枚举定义 | ✅ 完成 | 完整的文档类型约束 |
| 路径校验工具 | ✅ 完成 | validateProjectRoot 等工具函数 |
| MCP 操作实现 | ✅ 完成 | list, read, update, init 全部实现 |
| 服务入口重构 | ✅ 完成 | 简化为 stdio 模式，移除 HTTP 支持 |
| 资源文件管理 | ✅ 完成 | soloflow.mdc 作为资源文件 |
| 用户反馈优化 | ✅ 完成 | init 工具提供详细的状态反馈 |
| 测试框架搭建 | ✅ 完成 | Jest 配置，单元测试，集成测试 |
| 测试隔离优化 | ✅ 完成 | 完全隔离的测试环境，47个测试通过 |

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

### 🧪 第二阶段：测试框架搭建（优先级：P0）- ✅ 完成

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
    test('should extract document titles from markdown content', () => {});
    test('should handle files without markdown title', () => {});
    test('should skip non-markdown files', () => {});
  });
  ```

- [x] **测试隔离优化**
  - ✅ 去掉所有 before/after 钩子
  - ✅ 创建 `ensureTestSetup` 和 `ensureProjectRootOnly` 工具方法
  - ✅ 每个测试独立管理环境，完全隔离
  - ✅ 解决竞态条件问题
  - ✅ 所有 47 个测试通过
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

- [x] **mcp-inspector 集成测试**
  ```typescript
  // tests/integration/mcp-inspector.test.ts
  describe('MCP Inspector Integration', () => {
    test('should handle list operation via mcp-inspector', () => {});
    test('should handle read operation via mcp-inspector', () => {});
    test('should handle update operation via mcp-inspector', () => {});
    test('should handle init operation via mcp-inspector', () => {});
  });
  ```
  - ✅ 使用 CLI 模式避免浏览器交互
  - ✅ 正确解析 JSON 输出
  - ✅ 验证所有 MCP 操作

### 📚 第三阶段：文档与配置（优先级：P1）

**目标：** 完善项目文档和配置

#### 3.1 文档完善

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

#### 3.2 配置管理

- [ ] **环境配置**
  - 开发环境配置
  - 生产环境配置
  - 日志系统集成

- [ ] **构建优化**
  - TypeScript 编译优化
  - 代码压缩和打包
  - 依赖树优化

### 🚀 第四阶段：发布与部署（优先级：P0）

**目标：** 实现 npm 包发布，支持 npx 安装和 Cursor 集成

#### 4.1 NPM 包发布准备

- [x] **package.json 配置优化**
  ```json
  {
    "name": "@benyue1978/solo-flow-mcp",
    "version": "1.0.0",
    "description": "MCP server for SoloFlow project documentation management",
    "main": "dist/index.js",
    "bin": {
      "soloflow-mcp": "dist/index.js"
    },
    "files": [
      "dist/**/*",
      "README.md",
      "LICENSE"
    ],
    "keywords": ["mcp", "cursor", "documentation", "project-management"],
    "author": "SongYue <benyue1978@gmail.com>",
    "license": "MIT",
    "repository": {
      "type": "git",
      "url": "https://github.com/benyue1978/solo-flow-mcp.git"
    },
    "publishConfig": {
      "access": "public"
    }
  }
  ```

- [x] **构建脚本优化**
  ```json
  {
    "scripts": {
      "build": "tsc && npm run copy-resources",
      "copy-resources": "cp -r src/resources dist/",
      "prepublishOnly": "npm run build && npm test",
      "postpublish": "echo 'Package published successfully!'"
    }
  }
  ```

- [x] **入口文件配置**
  ```javascript
  // dist/index.js
  #!/usr/bin/env node
  import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/index.js';
  import { SoloFlowMCPServer } from './server.js';
  
  const server = new SoloFlowMCPServer();
  const transport = new StdioServerTransport();
  
  server.listen(transport);
  ```

#### 4.2 NPM 发布流程

- [x] **NPM 账号配置**
  ```bash
  # 登录 NPM
  npm login
  npm whoami
  ```

- [x] **包名验证和注册**
  ```bash
  # 检查包名可用性
  npm view @benyue1978/solo-flow-mcp
  npm publish --dry-run
  ```

- [x] **发布流程测试**
  ```bash
  # 本地测试发布
  npm pack
  npm publish --dry-run
  ```

#### 4.3 Npx 支持实现

- [x] **可执行文件配置**
  ```json
  {
    "bin": {
      "soloflow-mcp": "./dist/index.js"
    }
  }
  ```

- [x] **Shebang 和权限设置**
  ```bash
  # 确保文件可执行
  chmod +x dist/index.js
  ```

- [x] **全局安装测试**
  ```bash
  # 测试 npx 安装
  npx @benyue1978/solo-flow-mcp --help
  ```

#### 4.4 Cursor 集成文档

- [x] **Cursor 配置文档**
  ```json
  // .cursor/settings.json
  {
    "mcpServers": {
      "soloflow-mcp": {
        "command": "npx",
        "args": ["@benyue1978/solo-flow-mcp"]
      }
    }
  }
  ```

- [x] **使用示例文档**
  ```markdown
  ## 在 Cursor 中使用 SoloFlow MCP
  
  ### 安装
  ```bash
  # 无需安装，直接使用 npx
  npx @benyue1978/solo-flow-mcp
  ```
  
  ### 配置
  在项目根目录创建 `.cursor/settings.json`：
  ```json
  {
    "mcpServers": {
      "soloflow-mcp": {
        "command": "npx",
        "args": ["@benyue1978/solo-flow-mcp"]
      }
    }
  }
  ```
  
  ### 使用
  - 在 Cursor 中，AI 助手可以访问 `.soloflow/` 目录下的文档
  - 支持 list, read, update, init 操作
  - 自动管理项目文档结构
  ```

#### 4.5 发布验证

- [x] **功能验证**
  ```bash
  # 测试 npx 安装和运行
  npx @benyue1978/solo-flow-mcp
  ```

- [x] **集成测试**
  ```bash
  # 在真实 Cursor 环境中测试
  # 验证 MCP 协议通信
  # 验证文档操作功能
  ```

- [x] **性能测试**
  ```bash
  # 测试启动时间
  # 测试内存使用
  # 测试并发操作
  ```

### 🔧 第五阶段：安全与性能优化（优先级：P1）

**目标：** 提升安全性和性能

#### 5.1 安全增强

- [ ] **路径穿越防护增强**
  - 更严格的路径验证
  - 符号链接检测
  - 目录遍历攻击防护

- [ ] **文档类型白名单增强**
  - 更严格的类型校验
  - 文件扩展名验证
  - 内容格式验证

- [ ] **并发写入保护**
  - 文件锁机制
  - 原子操作保证
  - 冲突检测和解决

#### 5.2 性能优化

- [ ] **文件操作优化**
  - 异步操作优化
  - 缓存机制
  - 批量操作支持

- [ ] **错误处理优化**
  - 更详细的错误信息
  - 错误恢复机制
  - 日志记录优化

### 📊 第六阶段：监控与维护（优先级：P2）

**目标：** 建立监控和维护体系

#### 6.1 监控系统

- [ ] **性能监控**
  - 响应时间监控
  - 内存使用监控
  - 错误率监控

- [ ] **使用统计**
  - 下载量统计
  - 使用频率统计
  - 用户反馈收集

#### 6.2 维护计划

- [ ] **版本管理**
  - 语义化版本控制
  - 变更日志维护
  - 向后兼容性保证

- [ ] **文档维护**
  - API 文档更新
  - 使用指南维护
  - 故障排除指南

---

## 🎯 成功标准

### 功能完整性
- [x] 所有 MCP 操作（list, read, update, init）正常工作
- [x] 项目路径上下文隔离机制有效
- [x] 文档类型约束正确执行
- [x] 与 Cursor 等开发环境兼容
- [ ] 测试覆盖率 > 85%
- [ ] 所有安全测试用例通过
- [ ] NPM 包成功发布
- [ ] Npx 安装和使用正常
- [ ] Cursor 集成验证通过

### 发布标准
- [x] NPM 包可正常安装：`npm install @benyue1978/solo-flow-mcp`
- [x] Npx 可正常使用：`npx @benyue1978/solo-flow-mcp`
- [x] Cursor 配置后 MCP 服务正常工作
- [x] 所有测试在发布版本中通过（50个测试用例）
- [x] 文档完整且准确

---

## 🚨 风险与应对

### 技术风险

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| MCP SDK 版本兼容性 | 高 | 锁定版本，充分测试 |
| 文件系统权限问题 | 中 | 权限检查，错误处理 |
| 并发写入冲突 | 中 | 文件锁机制，重试逻辑 |
| 性能瓶颈 | 低 | 性能监控，优化算法 |
| NPM 包名冲突 | 高 | 提前验证包名可用性 |
| Npx 执行权限问题 | 中 | 正确的 shebang 和权限设置 |

### 项目风险

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| 需求变更 | 中 | 保持架构灵活性 |
| 时间延期 | 中 | 优先级管理，并行开发 |
| 测试覆盖不足 | 高 | 自动化测试，持续集成 |
| 发布流程问题 | 高 | 充分的发布前测试 |
| 用户反馈处理 | 中 | 建立反馈收集和处理机制 |

---

## 📊 进度跟踪

### 每周里程碑

| 周次 | 主要目标 | 交付物 | 状态 |
|------|----------|--------|------|
| 第1周 | 核心架构重构 | 基础 MCP 服务 | ✅ 完成 |
| 第2周 | 测试框架搭建 | 完整测试套件 | ✅ 完成 |
| 第3周 | 发布准备 | NPM 包和 npx 支持 | ✅ 完成 |
| 第4周 | 安全性能优化 | 生产就绪代码 | ⏳ 待开始 |
| 第5周 | 监控与维护 | 完整部署版本 | ⏳ 待开始 |

### 每日检查点

- [x] 代码提交和测试通过
- [x] 新功能有对应测试用例
- [x] 文档同步更新
- [ ] 性能指标符合要求
- [ ] 发布流程验证通过

---

## 📝 更新历史

- **2025-07-30**: 完成第四阶段发布与部署，NPM包发布准备完成，支持npx安装和Cursor集成
- **2025-07-30**: 添加第四阶段发布与部署任务，包含 NPM 包发布、npx 支持、Cursor 集成
- **2025-07-30**: 完成第二阶段测试框架搭建基础部分，Jest 配置和单元测试框架
- **2025-07-30**: 更新任务状态，第一阶段完成，开始第二阶段测试框架搭建
- **2025-07-24**: 初始版本，从 POC 到生产就绪的详细计划

---

本任务计划为 `soloflow-mcp` 项目提供详细的开发路线图，确保从 POC 到生产就绪版本的平滑过渡。 