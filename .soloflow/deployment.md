# Deployment Configuration

## Deployment Environment

### 开发环境
- **Node.js**: 版本 18+ 
- **TypeScript**: 版本 5.0+
- **NPM**: 版本 9.0+
- **操作系统**: macOS, Linux, Windows

### 测试环境
- **Jest**: 测试框架
- **覆盖率**: 目标 > 85%
- **测试类型**: 单元测试、集成测试、安全测试

### 生产环境
- **NPM 包**: @benyue1978/solo-flow-mcp
- **发布渠道**: NPM Registry
- **安装方式**: npx @benyue1978/solo-flow-mcp

## Deployment Process

### 1. 代码构建
```bash
# 安装依赖
npm install

# 构建 TypeScript
npm run build

# 复制资源文件
npm run copy-resources
```

### 2. 测试验证
```bash
# 运行所有测试
npm test

# 运行安全测试
npm run test:security

# 生成覆盖率报告
npm run test:coverage
```

### 3. 发布部署
```bash
# 发布前构建和测试
npm run prepublishOnly

# 发布到 NPM
npm publish

# 发布后验证
npm pack
```

### 4. 集成验证
```bash
# 测试 npx 安装
npx @benyue1978/solo-flow-mcp --help

# 测试 Cursor 集成
# 在项目根目录创建 .cursor/settings.json
```

## Configuration Management

### 环境变量
- **NODE_ENV**: 运行环境 (development, test, production)
- **DEBUG**: 调试模式开关
- **LOG_LEVEL**: 日志级别

### 配置文件
- **package.json**: 项目配置和依赖
- **tsconfig.json**: TypeScript 编译配置
- **jest.config.cjs**: Jest 测试配置
- **.cursor/settings.json**: Cursor 集成配置

### 数据库配置
- **无数据库依赖**: 仅使用本地文件系统
- **文档存储**: `.soloflow/*.md` 文件
- **配置存储**: `.cursor/rules/soloflow.mdc`

## Monitoring and Logging

### 性能监控
- **响应时间**: 所有操作 < 100ms
- **内存使用**: 轻量级运行，无状态服务
- **错误率**: 目标 < 1%

### 日志记录
- **操作日志**: MCP 操作记录
- **错误日志**: 异常情况记录
- **安全日志**: 路径验证和安全事件

## Security Configuration

### 路径安全
- **绝对路径验证**: 只接受绝对路径
- **目录遍历防护**: 防止路径穿越攻击
- **文档类型白名单**: 只允许预定义文档类型

### 权限控制
- **文件系统权限**: 读写 `.soloflow/` 目录
- **配置目录权限**: 读写 `.cursor/rules/` 目录
- **并发控制**: 文件锁机制防止并发写入冲突

## Update History
- 2025-07-30: 初始版本，定义部署配置和流程