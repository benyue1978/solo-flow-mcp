# SoloFlow MCP 服务器

一个基于模型上下文协议（MCP）的服务器，用于项目文档管理，提供32个综合提示覆盖完整的软件开发生命周期。

[English](README.md) | 中文

## 功能特性

- 🚀 **MCP 协议支持**: 完整的模型上下文协议实现
- 📁 **文档管理**: 自动管理 `.soloflow/` 目录中的项目文档
- 🔧 **四个核心操作**: `list`、`read`、`update`、`init`
- 🎯 **32个综合提示**: 覆盖整个软件开发生命周期的内置提示
- 🛡️ **安全隔离**: 基于 `projectRoot` 的路径隔离
- 📝 **Markdown 支持**: 完整的 Markdown 文档格式支持
- 🎯 **Cursor 集成**: 完美支持 Cursor IDE 集成
- ⚡ **轻量级**: 仅支持 stdio 传输，无 HTTP 依赖

## 快速开始

### 1. 配置 Cursor

在项目根目录创建 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "soloflow-mcp": {
      "command": "npx",
      "args": ["@benyue1978/soloflow-mcp"]
    }
  }
}
```

[![安装 MCP 服务器](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=soloflow-mcp&config=ewogICAgImNvbW1hbmQiOiAibnB4IiwKICAgICJhcmdzIjogWwogICAgICAiLXkiLAogICAgICAiQGJlbnl1ZTE5Nzgvc29sb2Zsb3ctbWNwQGxhdGVzdCIKICAgIF0KfQ)

### 2. 初始化项目

```bash
# 在项目根目录运行
npx @benyue1978/soloflow-mcp init /path/to/your/project
```

### 3. 开始使用

在 Cursor 中，AI 助手现在可以：
- 列出项目文档：`list` 操作
- 读取文档内容：`read` 操作
- 更新文档内容：`update` 操作
- 初始化项目配置：`init` 操作
- 使用 32 个综合提示进行软件开发生命周期管理

## 综合提示系统

SoloFlow MCP 提供 32 个提示，分为 8 个类别，覆盖完整的软件开发生命周期：

### 📊 提示类别概览

| 类别 | 数量 | 描述 |
|------|------|------|
| **核心** | 4 | 基础项目管理功能 |
| **角色** | 5 | 不同开发角色的专门功能 |
| **任务** | 6 | 高级任务管理和分解功能 |
| **需求** | 3 | 需求分析和管理功能 |
| **设计** | 5 | 综合设计功能 |
| **开发** | 4 | 代码实现和开发功能 |
| **测试** | 5 | 测试和质量保证功能 |
| **发布** | 5 | 完整的发布和部署生命周期管理 |

## 🎯 基于场景的使用指南

### 场景 1：新项目设置

**目标**: 初始化新项目，建立适当的文档和工作区设置

**提示序列**:
1. `/soloflow-mcp/core/init-project` - 初始化项目文档结构
2. `/soloflow-mcp/core/setup-workspace` - 使用技术栈设置开发环境
3. `/soloflow-mcp/requirements/analyze-requirements` - 分析和记录需求
4. `/soloflow-mcp/requirements/prioritize-requirements` - 使用 MoSCoW 方法对需求进行优先级排序
5. `/soloflow-mcp/task/breakdown-requirements` - 将需求分解为可管理的任务

**使用示例**:
```bash
# 在 Cursor 聊天中输入：
/soloflow-mcp/core/init-project
/soloflow-mcp/core/setup-workspace --frontend React --backend Node.js --testing Jest --deployment Docker --database PostgreSQL
/soloflow-mcp/requirements/analyze-requirements --domain e-commerce --scope full-system
```

### 场景 2：需求分析阶段

**目标**: 全面的需求收集和分析

**提示序列**:
1. `/soloflow-mcp/role/analyst-mode` - 切换到分析师模式，专注于需求
2. `/soloflow-mcp/requirements/analyze-requirements` - 全面的需求分析
3. `/soloflow-mcp/requirements/validate-requirements` - 验证需求完整性
4. `/soloflow-mcp/requirements/prioritize-requirements` - 使用价值-复杂度矩阵进行优先级排序
5. `/soloflow-mcp/task/create-epic` - 从需求创建高级史诗

**使用示例**:
```bash
# 在 Cursor 聊天中输入：
/soloflow-mcp/role/analyst-mode
/soloflow-mcp/requirements/analyze-requirements --domain finance --scope full-system
/soloflow-mcp/requirements/validate-requirements --validationType comprehensive
```

### 场景 3：系统设计阶段

**目标**: 设计系统架构、UI 和数据模型

**提示序列**:
1. `/soloflow-mcp/role/architect-mode` - 切换到架构师模式，专注于设计
2. `/soloflow-mcp/design/system-architecture` - 设计整体系统架构
3. `/soloflow-mcp/design/api-interface` - 设计 API 接口和合约
4. `/soloflow-mcp/design/database-schema` - 设计数据库模式和数据模型
5. `/soloflow-mcp/design/create-ui` - 设计用户界面和用户体验
6. `/soloflow-mcp/design/review-design` - 审查和验证设计决策

**使用示例**:
```bash
# 在 Cursor 聊天中输入：
/soloflow-mcp/role/architect-mode
/soloflow-mcp/design/system-architecture --architectureType microservices
/soloflow-mcp/design/api-interface --apiType REST
/soloflow-mcp/design/database-schema --dbType PostgreSQL
```

### 场景 4：开发阶段

**目标**: 实现功能，确保代码质量和测试

**提示序列**:
1. `/soloflow-mcp/role/developer-mode` - 切换到开发者模式，专注于实现
2. `/soloflow-mcp/task/breakdown-architecture` - 将架构分解为实现任务
3. `/soloflow-mcp/development/write-code` - 使用最佳实践实现功能
4. `/soloflow-mcp/development/code-review-checklist` - 使用代码审查清单
5. `/soloflow-mcp/testing/write-unit-tests` - 编写全面的单元测试
6. `/soloflow-mcp/development/fix-bug` - 调试和修复出现的问题

**使用示例**:
```bash
# 在 Cursor 聊天中输入：
/soloflow-mcp/role/developer-mode
/soloflow-mcp/development/write-code --feature user-authentication --language TypeScript --framework Express
/soloflow-mcp/testing/write-unit-tests --component auth-service --language TypeScript --framework Jest
/soloflow-mcp/development/code-review-checklist --codeLanguage TypeScript
```

### 场景 5：测试阶段

**目标**: 全面的测试策略和执行

**提示序列**:
1. `/soloflow-mcp/role/tester-mode` - 切换到测试者模式，专注于质量
2. `/soloflow-mcp/testing/create-test-plan` - 创建全面的测试计划
3. `/soloflow-mcp/testing/write-unit-tests` - 为所有组件编写单元测试
4. `/soloflow-mcp/testing/run-tests` - 执行测试并分析结果
5. `/soloflow-mcp/testing/test-report` - 生成详细的测试报告
6. `/soloflow-mcp/testing/performance-test` - 进行性能测试

**使用示例**:
```bash
# 在 Cursor 聊天中输入：
/soloflow-mcp/role/tester-mode
/soloflow-mcp/testing/create-test-plan --feature payment-system --testType comprehensive
/soloflow-mcp/testing/run-tests --testType all --environment staging
/soloflow-mcp/testing/performance-test --component api-gateway --loadType stress
```

### 场景 6：发布管理

**目标**: 安全可靠的部署和监控

**提示序列**:
1. `/soloflow-mcp/role/project-manager-mode` - 切换到项目经理模式，进行协调
2. `/soloflow-mcp/release/commit-changes` - 使用适当的约定提交变更
3. `/soloflow-mcp/release/create-release` - 创建软件发布和版本控制
4. `/soloflow-mcp/release/deployment-checklist` - 使用部署清单
5. `/soloflow-mcp/release/monitor-deployment` - 监控部署状态
6. `/soloflow-mcp/release/rollback-plan` - 准备回滚计划（如需要）

**使用示例**:
```bash
# 在 Cursor 聊天中输入：
/soloflow-mcp/role/project-manager-mode
/soloflow-mcp/release/commit-changes --commitType feat --scope user-authentication
/soloflow-mcp/release/create-release --version 1.2.0 --releaseType minor
/soloflow-mcp/release/deployment-checklist --environment production
```

### 场景 7：Bug 修复和维护

**目标**: 高效的 Bug 修复和代码维护

**提示序列**:
1. `/soloflow-mcp/development/fix-bug` - 分析和修复 Bug
2. `/soloflow-mcp/development/refactor-code` - 重构代码以提高可维护性
3. `/soloflow-mcp/testing/run-tests` - 运行测试确保修复有效
4. `/soloflow-mcp/release/commit-changes` - 使用适当的消息提交修复
5. `/soloflow-mcp/core/generate-docs` - 更新变更的文档

**使用示例**:
```bash
# 在 Cursor 聊天中输入：
/soloflow-mcp/development/fix-bug --bugDescription "用户登录失败，返回 500 错误" --severity high
/soloflow-mcp/development/refactor-code --component auth-service --reason "改进错误处理"
/soloflow-mcp/core/generate-docs --docType api --component authentication
```

### 场景 8：项目管理和协调

**目标**: 有效的项目管理和团队协调

**提示序列**:
1. `/soloflow-mcp/role/project-manager-mode` - 切换到项目经理模式
2. `/soloflow-mcp/task/add-task` - 向项目添加新任务
3. `/soloflow-mcp/task/estimate-tasks` - 估算任务的时间和精力
4. `/soloflow-mcp/task/create-story` - 创建详细的用户故事
5. `/soloflow-mcp/core/check-project-status` - 检查整体项目状态
6. `/soloflow-mcp/task/create-epic` - 将任务组织成史诗

**使用示例**:
```bash
# 在 Cursor 聊天中输入：
/soloflow-mcp/role/project-manager-mode
/soloflow-mcp/task/add-task --taskTitle "实现 OAuth 集成" --priority high --category backend --estimatedTime 3d
/soloflow-mcp/task/estimate-tasks
/soloflow-mcp/core/check-project-status
```

## 📋 完整提示参考

### 核心功能 (4 个提示)
- `/soloflow-mcp/core/init-project` - 初始化项目文档结构
- `/soloflow-mcp/core/check-project-status` - 检查项目状态和文档完整性
- `/soloflow-mcp/core/generate-docs` - 为当前实现生成综合文档
- `/soloflow-mcp/core/setup-workspace` - 使用技术栈设置项目工作区

### 基于角色的功能 (5 个提示)
- `/soloflow-mcp/role/analyst-mode` - 切换到分析师模式进行需求分析
- `/soloflow-mcp/role/architect-mode` - 切换到架构师模式进行系统设计
- `/soloflow-mcp/role/developer-mode` - 切换到开发者模式进行实现
- `/soloflow-mcp/role/tester-mode` - 切换到测试者模式进行质量保证
- `/soloflow-mcp/role/project-manager-mode` - 切换到项目经理模式进行协调

### 任务管理 (6 个提示)
- `/soloflow-mcp/task/add-task` - 向项目添加新任务
- `/soloflow-mcp/task/breakdown-requirements` - 将需求分解为任务
- `/soloflow-mcp/task/breakdown-architecture` - 将架构分解为实现任务
- `/soloflow-mcp/task/create-epic` - 创建大规模功能史诗
- `/soloflow-mcp/task/create-story` - 创建详细的用户故事
- `/soloflow-mcp/task/estimate-tasks` - 估算任务的时间和精力

### 需求分析 (3 个提示)
- `/soloflow-mcp/requirements/analyze-requirements` - 全面的需求分析
- `/soloflow-mcp/requirements/validate-requirements` - 验证需求完整性
- `/soloflow-mcp/requirements/prioritize-requirements` - 使用各种方法对需求进行优先级排序

### 设计功能 (5 个提示)
- `/soloflow-mcp/design/create-ui` - 设计用户界面和用户体验
- `/soloflow-mcp/design/system-architecture` - 设计整体系统架构
- `/soloflow-mcp/design/api-interface` - 设计 API 接口和合约
- `/soloflow-mcp/design/database-schema` - 设计数据库模式和数据模型
- `/soloflow-mcp/design/review-design` - 审查和验证设计决策

### 开发功能 (4 个提示)
- `/soloflow-mcp/development/write-code` - 使用最佳实践实现功能
- `/soloflow-mcp/development/fix-bug` - 调试和修复代码问题
- `/soloflow-mcp/development/refactor-code` - 重构代码以提高可维护性
- `/soloflow-mcp/development/code-review-checklist` - 使用综合代码审查清单

### 测试功能 (5 个提示)
- `/soloflow-mcp/testing/create-test-plan` - 创建全面的测试计划
- `/soloflow-mcp/testing/write-unit-tests` - 为组件编写单元测试
- `/soloflow-mcp/testing/run-tests` - 执行测试并分析结果
- `/soloflow-mcp/testing/test-report` - 生成详细的测试报告
- `/soloflow-mcp/testing/performance-test` - 进行性能测试

### 发布管理 (5 个提示)
- `/soloflow-mcp/release/commit-changes` - 使用适当的约定提交变更
- `/soloflow-mcp/release/create-release` - 创建软件发布和版本控制
- `/soloflow-mcp/release/deployment-checklist` - 使用部署准备清单
- `/soloflow-mcp/release/rollback-plan` - 准备回滚计划
- `/soloflow-mcp/release/monitor-deployment` - 监控部署状态

## 支持的文档类型

| 文档类型 | 文件名 | 用途 |
|----------|--------|------|
| `overview` | `overview.md` | 项目概述和摘要 |
| `requirements` | `requirements.md` | 功能性和非功能性需求 |
| `system_architecture` | `system_architecture.md` | 技术架构设计 |
| `test_strategy` | `test_strategy.md` | 测试策略和计划 |
| `tasks` | `tasks.md` | 项目任务列表和进度 |
| `ui_design` | `ui_design.md` | UI/UX 设计规范 |
| `deployment` | `deployment.md` | 部署和基础设施文档 |
| `notes` | `notes.md` | 项目笔记和观察 |

## MCP 操作

### 核心操作

#### list - 列出文档

列出 `.soloflow/` 目录中的所有文档：

```json
{
  "name": "list",
  "description": "列出 .soloflow 目录中的所有文档",
  "inputSchema": {
    "projectRoot": "string - 项目根目录的绝对路径"
  }
}
```

**响应示例**:
```json
[
  {
    "type": "requirements",
    "title": "项目需求",
    "filename": "requirements.md"
  },
  {
    "type": "tasks", 
    "title": "项目任务",
    "filename": "tasks.md"
  }
]
```

#### read - 读取文档

读取特定文档类型的内容：

```json
{
  "name": "read",
  "description": "按类型读取文档内容",
  "inputSchema": {
    "projectRoot": "string - 项目根目录的绝对路径",
    "type": "string - 文档类型 (overview, requirements, 等)"
  }
}
```

**响应示例**:
```json
{
  "raw": "# 项目需求\n\n## 功能性需求\n1. 用户管理\n2. 数据存储"
}
```

#### update - 更新文档

创建或更新文档内容：

```json
{
  "name": "update",
  "description": "创建或更新文档内容",
  "inputSchema": {
    "projectRoot": "string - 项目根目录的绝对路径",
    "type": "string - 文档类型 (overview, requirements, 等)",
    "content": "string - Markdown 格式的文档内容"
  }
}
```

**响应示例**:
```json
{
  "ok": true,
  "message": "文档更新成功"
}
```

#### init - 初始化项目

初始化项目配置，创建 `.cursor/rules/soloflow.mdc` 文件：

```json
{
  "name": "init",
  "description": "初始化项目配置",
  "inputSchema": {
    "projectRoot": "string - 项目根目录的绝对路径"
  }
}
```

**响应示例**:
```json
{
  "message": "项目初始化成功。已创建 .cursor/rules/soloflow.mdc"
}
```

## 安全特性

### 路径隔离

- 所有操作都需要 `projectRoot` 参数
- 严格的绝对路径验证
- 防止路径遍历攻击
- 项目根目录必须存在

### 文档类型验证

- 预定义的文档类型白名单
- 严格的类型验证
- 防止任意文件访问

### 错误处理

- 详细的错误消息
- 优雅的失败处理
- 安全的默认行为

## 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/benyue1978/solo-flow-mcp.git
cd solo-flow-mcp

# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 启动开发服务器
npm start
```

### 项目结构

```
├── src/
│   ├── index.ts              # 服务启动入口
│   ├── context.ts            # 路径验证和工具函数
│   ├── tools/                # MCP 操作处理器
│   │   ├── list.ts          # 列出文档
│   │   ├── read.ts          # 读取文档
│   │   ├── update.ts        # 更新文档
│   │   └── init.ts          # 初始化项目
│   ├── prompts/              # 综合提示系统
│   │   ├── core-prompts.ts  # 核心项目管理提示
│   │   ├── role-prompts.ts  # 基于角色的提示
│   │   ├── task-prompts.ts  # 任务管理提示
│   │   ├── requirements-prompts.ts # 需求分析提示
│   │   ├── design-prompts.ts # 设计和架构提示
│   │   ├── development-prompts.ts # 开发和编码提示
│   │   ├── testing-prompts.ts # 测试和 QA 提示
│   │   ├── release-prompts.ts # 发布和部署提示
│   │   ├── docs-prompts.ts  # 文档提示
│   │   ├── workspace-prompts.ts # 工作区设置提示
│   │   ├── categories.ts    # 提示类别
│   │   ├── mapping.ts       # 路径映射系统
│   │   └── index.ts         # 提示注册表
│   ├── types/
│   │   └── docTypes.ts      # 文档类型定义
│   └── resources/
│       └── soloflow-content.ts # 资源文件内容
├── tests/                    # 测试文件
│   ├── unit/                # 单元测试
│   ├── integration/         # 集成测试
│   └── utils/               # 测试工具
└── .soloflow/               # 项目文档
```

## 测试

### 运行所有测试

```bash
npm test
```

### 运行特定测试

```bash
# 单元测试
npm run test:unit

# 集成测试
npm run test:integration

# 覆盖率测试
npm run test:coverage
```

### 测试覆盖率

- 单元测试：50 个测试用例
- 集成测试：mcp-inspector 集成
- 覆盖率目标：> 85%

## 使用示例

### 示例 1：初始化项目

```bash
# 在项目根目录
npx @benyue1978/soloflow-mcp init /Users/username/my-project
```

### 示例 2：创建需求文档

```bash
# 通过 MCP 操作创建需求文档
npx @benyue1978/soloflow-mcp update \
  --projectRoot /Users/username/my-project \
  --type requirements \
  --content "# 项目需求\n\n## 功能性需求\n1. 用户认证\n2. 数据持久化"
```

### 示例 3：在 Cursor 中使用

1. 配置 Cursor 设置
2. 初始化项目
3. 在 Cursor 中，AI 助手可以：
   - 列出项目文档
   - 读取文档内容
   - 更新文档内容
   - 管理项目配置
   - 使用 32 个综合提示进行软件开发生命周期管理

### 示例 4：在 Cursor 中使用提示

1. 配置 Cursor 设置（如上所示）
2. 在 Cursor 的聊天对话框中，输入 32 个提示中的任何一个：
   - `/soloflow-mcp/core/init-project` - 初始化项目文档
   - `/soloflow-mcp/requirements/analyze-requirements` - 分析需求
   - `/soloflow-mcp/design/system-architecture` - 设计系统架构
   - `/soloflow-mcp/development/write-code` - 使用最佳实践编写代码
   - `/soloflow-mcp/testing/create-test-plan` - 创建测试计划
   - `/soloflow-mcp/release/commit-changes` - 正确提交变更

3. AI 将自动执行提示并更新您的项目文档

## 故障排除

### 常见问题

**问：为什么需要绝对路径？**
答：为了安全隔离，确保 MCP 服务只能访问指定的项目目录。

**问：如何重置项目配置？**
答：删除 `.cursor/rules/soloflow.mdc` 文件，然后再次运行 `init` 操作。

**问：支持哪些文档格式？**
答：目前支持 Markdown 格式，将来可能支持其他格式。

**问：如何处理并发写入？**
答：当前版本使用简单的文件系统操作，建议避免对同一文档进行并发写入。

**问：如何有效使用提示？**
答：按照软件开发生命周期顺序使用提示。从核心功能开始，然后转向特定阶段，如需求、设计、开发、测试和发布。

### 错误代码

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `项目根目录不存在` | 项目根目录不存在 | 确保路径正确且目录存在 |
| `无效的文档类型` | 文档类型不在白名单中 | 使用预定义的文档类型 |
| `文档内容不能为空` | 文档内容为空 | 提供有效的文档内容 |

## 贡献

欢迎贡献！请按照以下步骤：

1. Fork 项目
2. 创建功能分支
3. 提交您的更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 更新日志

### v1.1.0
- 主要版本升级，增强项目文档管理功能
- 更新所有内部项目文档，反映v1.0.6功能和v1.1.0状态
- 改进package.json，提供更好的描述和元数据
- 通过综合文档更新增强项目结构
- 添加详细的技术规范和架构文档
- 更新部署和测试策略文档
- 改进项目笔记，包含综合开发历史
- 确保所有8个核心文档与最新项目状态同步
- 维护50个测试用例，100%通过率
- 完成双语文档支持（英文和中文）

### v1.0.6
- 添加综合双语文档支持，包含中文README
- 在英文和中文README文件之间添加语言选择链接
- 添加32个综合提示，覆盖整个软件开发生命周期
- 添加基于场景的使用指南，包含8个常见开发场景
- 添加基于角色的提示，适用于不同开发角色
- 添加需求分析、设计、开发、测试和发布管理提示
- 添加git_commit.mdc规则文件，用于标准化Git提交消息
- 创建git-commit-content.ts，包含嵌入式git提交指南
- 更新init工具，在项目初始化期间自动创建git_commit.mdc
- 使用Git提交消息约定增强项目设置
- 遵循规则文件创建和管理的一致模式

### v1.0.5
- 添加综合提示系统，包含32个覆盖整个软件开发生命周期的提示
- 添加基于场景的使用指南，包含8个常见开发场景
- 添加基于角色的提示，适用于不同开发角色
- 添加需求分析、设计、开发、测试和发布管理提示
- 添加git_commit.mdc规则文件，用于标准化Git提交消息
- 创建git-commit-content.ts，包含嵌入式git提交指南
- 更新init工具，在项目初始化期间自动创建git_commit.mdc
- 使用Git提交消息约定增强项目设置
- 遵循规则文件创建和管理的一致模式

### v1.0.4
- 使用最新的 MCP 提示和"更新前读取"规则更新 soloflow.mdc 内容
- 使用最新文档指南同步 soloflow-content.ts
- 改进有序列表格式以符合 MD029 标准
- 增强文档结构和最佳实践

### v1.0.2
- 添加综合项目文档（overview、ui_design、deployment、notes）
- 使用详细的提示使用指南更新 README.md
- 添加 Cursor 集成示例，用于直接提示使用
- 改进文档结构和用户体验

### v1.0.1
- 添加六个核心提示，用于软件工程最佳实践
- 添加测试覆盖率
- 添加 Cursor 集成支持
- 添加 NPM 包发布

### v1.0.0
- 初始版本发布
- 支持 list、read、update、init 操作
- 完整测试套件
- Cursor 集成支持
- NPM 包发布

## 联系方式

- 作者：SongYue <yuesong@gmail.com>
- 项目 URL：<https://github.com/benyue1978/solo-flow-mcp>
- NPM 包：<https://www.npmjs.com/package/@benyue1978/soloflow-mcp>
