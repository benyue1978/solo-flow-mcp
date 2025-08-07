# 🚀 部署文档（Deployment）

**项目名称：** soloflow-mcp  
**版本：** v1.0.6  
**文档更新时间：** 2025-08-07

---

## 🎯 部署概述

### 部署目标
`soloflow-mcp` 采用多种部署模式，为不同用户场景提供灵活的项目文档管理服务。部署策略遵循以下原则：

- **本地优先**: 无需外部服务，完全本地运行
- **轻量级**: 最小化依赖，快速启动
- **跨平台**: 支持 Windows, macOS, Linux
- **易集成**: 与 Cursor 等 IDE 无缝集成

### 部署模式
1. **开发模式**: 直接运行 TypeScript 源码
2. **NPM 包模式**: 通过 npx 安装和使用
3. **Cursor 集成模式**: 通过 .cursor/rules/ 配置集成

---

## 📦 部署环境要求

### 系统要求
- **操作系统**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)
- **Node.js**: 18.0.0 或更高版本
- **内存**: 最小 512MB RAM
- **磁盘**: 最小 100MB 可用空间
- **网络**: 无需网络连接（本地运行）

### 依赖检查
```bash
# 检查 Node.js 版本
node --version  # 应 >= 18.0.0

# 检查 NPM 版本
npm --version   # 应 >= 8.0.0

# 检查系统架构
node -p "process.arch"  # x64, arm64, etc.
```

---

## 🔧 部署方式详解

### 1. 开发模式部署

#### 1.1 源码部署
```bash
# 克隆项目
git clone https://github.com/benyue1978/solo-flow-mcp.git
cd solo-flow-mcp

# 安装依赖
npm install

# 构建项目
npm run build

# 运行服务
npm start
```

#### 1.2 开发环境配置
```bash
# 安装开发依赖
npm install --save-dev

# 运行测试
npm test

# 运行代码检查
npm run lint

# 运行类型检查
npm run type-check
```

### 2. NPM 包部署

#### 2.1 全局安装
```bash
# 全局安装
npm install -g @benyue1978/soloflow-mcp

# 验证安装
soloflow-mcp --version
```

#### 2.2 npx 临时使用
```bash
# 直接使用（无需安装）
npx @benyue1978/soloflow-mcp

# 指定版本使用
npx @benyue1978/soloflow-mcp@1.0.6
```

#### 2.3 项目本地安装
```bash
# 在项目中安装
npm install @benyue1978/soloflow-mcp

# 在 package.json 中添加脚本
{
  "scripts": {
    "soloflow": "soloflow-mcp"
  }
}

# 运行
npm run soloflow
```

### 3. Cursor 集成部署

#### 3.1 自动集成
```bash
# 在项目根目录运行初始化
npx @benyue1978/soloflow-mcp init

# 或手动创建配置
mkdir -p .cursor/rules
```

#### 3.2 手动配置
创建 `.cursor/rules/soloflow.mdc` 文件：
```markdown
# SoloFlow MCP Configuration

## Tools
- list: List project documents
- read: Read document content
- update: Update document content
- init: Initialize project

## Prompts
- core/init-project: Initialize new project
- core/check-project-status: Check project status
- core/generate-docs: Generate documentation
- core/setup-workspace: Setup workspace
- role/analyst-mode: Switch to analyst mode
- role/architect-mode: Switch to architect mode
- role/developer-mode: Switch to developer mode
- role/tester-mode: Switch to tester mode
- role/project-manager-mode: Switch to project manager mode
- task/add-task: Add new task
- task/breakdown-requirements: Break down requirements
- task/breakdown-architecture: Break down architecture
- task/create-epic: Create epic
- task/create-story: Create story
- task/estimate-tasks: Estimate tasks
- requirements/analyze-requirements: Analyze requirements
- requirements/validate-requirements: Validate requirements
- requirements/prioritize-requirements: Prioritize requirements
- design/create-ui: Create UI design
- design/system-architecture: Design system architecture
- design/api-interface: Design API interface
- design/database-schema: Design database schema
- design/review-design: Review design
- development/write-code: Write code
- development/fix-bug: Fix bug
- development/refactor-code: Refactor code
- development/code-review-checklist: Code review checklist
- testing/create-test-plan: Create test plan
- testing/write-unit-tests: Write unit tests
- testing/run-tests: Run tests
- testing/test-report: Generate test report
- testing/performance-test: Performance test
- release/commit-changes: Commit changes
- release/create-release: Create release
- release/deployment-checklist: Deployment checklist
- release/rollback-plan: Rollback plan
- release/monitor-deployment: Monitor deployment
```

---

## 🔄 部署流程

### 1. 项目初始化流程
```bash
# 1. 选择项目根目录
cd /path/to/your/project

# 2. 初始化 SoloFlow MCP
npx @benyue1978/soloflow-mcp init

# 3. 验证初始化结果
ls -la .soloflow/
ls -la .cursor/rules/
```

### 2. 服务启动流程
```bash
# 1. 启动 MCP 服务
npx @benyue1978/soloflow-mcp

# 2. 服务将在 stdio 模式下运行
# 3. Cursor 等 IDE 将自动连接
```

### 3. 配置验证流程
```bash
# 1. 检查项目文档
ls -la .soloflow/

# 2. 检查 Cursor 配置
cat .cursor/rules/soloflow.mdc

# 3. 测试工具调用
# 在 Cursor 中测试工具和提示功能
```

---

## 🔐 安全配置

### 1. 路径安全
- **绝对路径验证**: 确保所有操作使用绝对路径
- **路径遍历防护**: 防止 `../` 等路径遍历攻击
- **系统目录保护**: 禁止访问 `/etc`, `/var` 等系统目录

### 2. 权限控制
- **文件权限**: 基于文件系统权限控制
- **目录权限**: 确保 `.soloflow/` 目录权限正确
- **读写权限**: 验证读写权限的有效性

### 3. 类型安全
- **文档类型验证**: 只允许访问预定义的文档类型
- **输入验证**: 所有输入参数进行类型检查
- **边界检查**: 验证所有边界条件

---

## 📊 性能配置

### 1. 启动优化
```bash
# 使用生产模式启动
NODE_ENV=production npx @benyue1978/soloflow-mcp

# 启用性能监控
NODE_OPTIONS="--max-old-space-size=512" npx @benyue1978/soloflow-mcp
```

### 2. 内存配置
```bash
# 限制内存使用
export NODE_OPTIONS="--max-old-space-size=256"

# 启用垃圾回收优化
export NODE_OPTIONS="$NODE_OPTIONS --expose-gc"
```

### 3. 响应时间优化
- **异步操作**: 所有 I/O 操作异步处理
- **缓存机制**: 文档内容缓存
- **轻量级**: 最小化依赖和代码体积

---

## 🛠️ 故障排除

### 1. 常见问题

#### 问题 1: 服务启动失败
```bash
# 错误: Cannot find module '@modelcontextprotocol/sdk'
# 解决方案:
npm install @modelcontextprotocol/sdk
```

#### 问题 2: 权限错误
```bash
# 错误: EACCES: permission denied
# 解决方案:
chmod 755 .soloflow/
chmod 644 .soloflow/*.md
```

#### 问题 3: 路径验证失败
```bash
# 错误: Invalid project root path
# 解决方案:
# 确保使用绝对路径
cd /absolute/path/to/project
```

#### 问题 4: Cursor 集成失败
```bash
# 错误: MCP server not found
# 解决方案:
# 1. 检查 .cursor/rules/soloflow.mdc 文件
# 2. 重启 Cursor
# 3. 验证 MCP 服务配置
```

### 2. 调试模式
```bash
# 启用调试日志
DEBUG=soloflow-mcp:* npx @benyue1978/soloflow-mcp

# 启用详细日志
VERBOSE=true npx @benyue1978/soloflow-mcp
```

### 3. 日志分析
```bash
# 查看服务日志
tail -f /tmp/soloflow-mcp.log

# 分析错误日志
grep ERROR /tmp/soloflow-mcp.log
```

---

## 📈 监控和维护

### 1. 性能监控
```bash
# 监控内存使用
ps aux | grep soloflow-mcp

# 监控响应时间
time npx @benyue1978/soloflow-mcp list

# 监控文件系统
du -sh .soloflow/
```

### 2. 健康检查
```bash
# 检查服务状态
curl -X POST http://localhost:3000/health

# 检查文档完整性
ls -la .soloflow/*.md

# 检查配置有效性
cat .cursor/rules/soloflow.mdc
```

### 3. 备份和恢复
```bash
# 备份项目文档
tar -czf soloflow-backup-$(date +%Y%m%d).tar.gz .soloflow/

# 恢复项目文档
tar -xzf soloflow-backup-20250807.tar.gz
```

---

## 🔄 更新和升级

### 1. 版本升级
```bash
# 升级到最新版本
npm update @benyue1978/soloflow-mcp

# 或重新安装
npm uninstall @benyue1978/soloflow-mcp
npm install @benyue1978/soloflow-mcp@latest
```

### 2. 配置迁移
```bash
# 备份旧配置
cp .cursor/rules/soloflow.mdc .cursor/rules/soloflow.mdc.backup

# 更新配置
npx @benyue1978/soloflow-mcp init --force
```

### 3. 数据迁移
```bash
# 迁移项目文档
cp -r .soloflow/ .soloflow.backup/

# 验证迁移结果
diff -r .soloflow/ .soloflow.backup/
```

---

## 📝 部署检查清单

### 预部署检查
- [ ] Node.js 版本 >= 18.0.0
- [ ] 项目路径为绝对路径
- [ ] 有足够的磁盘空间
- [ ] 有读写权限

### 部署后验证
- [ ] 服务正常启动
- [ ] 工具功能正常
- [ ] 提示功能正常
- [ ] Cursor 集成正常
- [ ] 文档读写正常

### 性能验证
- [ ] 启动时间 < 1秒
- [ ] 响应时间 < 100ms
- [ ] 内存使用 < 50MB
- [ ] 无内存泄漏

### 安全验证
- [ ] 路径验证正常
- [ ] 类型检查正常
- [ ] 权限控制正常
- [ ] 无安全漏洞

---

## 📝 更新历史

- **2025-08-07**: 更新到 v1.0.6，添加32个提示的部署配置
- **2025-08-07**: 添加基于角色的提示部署和场景化指南
- **2025-07-30**: 完成 NPM 包发布和 Cursor 集成部署
- **2025-07-30**: 实现 6 个核心 prompts 部署配置
- **2025-07-30**: 完成测试框架部署，47个测试通过
- **2025-07-24**: 初始版本，基础部署策略设计