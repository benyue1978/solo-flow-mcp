# Project Notes

## Development Notes

### 架构设计决策
- **选择 MCP 协议**: 为了与 Cursor 等开发环境无缝集成
- **使用 StdioServerTransport**: 避免网络依赖，提高安全性
- **固定文档类型**: 通过枚举约束确保文档结构一致性
- **路径隔离机制**: 每次调用显式传入 projectRoot，支持多项目并行

### 技术实现要点
- **无状态设计**: 每次请求独立处理，无内存状态
- **异步操作**: 所有文件操作使用 async/await
- **错误处理**: 详细的错误信息和恢复机制
- **类型安全**: 完整的 TypeScript 类型定义

### Prompts 功能设计
- **简化原则**: 专注于个人项目开发者需求
- **中文友好**: 支持中文交互和文档内容
- **最佳实践**: 提供软件工程标准流程指导
- **文档连续性**: update 前先 read 的流程保证内容不丢失

## Issue Records

### 已解决的问题
- **Issue #1**: 测试环境隔离问题
  - **问题**: 测试之间存在竞态条件
  - **解决**: 去掉 before/after 钩子，每个测试独立管理环境
  - **结果**: 47个测试全部通过

- **Issue #2**: NPM 包发布配置
  - **问题**: 包名冲突和发布权限
  - **解决**: 使用 @benyue1978 命名空间，配置正确的 package.json
  - **结果**: 成功发布到 NPM Registry

- **Issue #3**: Cursor 集成配置
  - **问题**: MCP 服务在 Cursor 中无法正确加载
  - **解决**: 正确的 .cursor/settings.json 配置和 shebang 设置
  - **结果**: Cursor 可以正确识别和使用 MCP 服务

### 当前关注的问题
- **性能优化**: 大文档的读写性能
- **错误处理**: 更详细的错误信息和用户指导
- **文档同步**: 多用户环境下的文档一致性

## Solutions

### 测试框架解决方案
```typescript
// 测试隔离工具
export function ensureTestSetup(projectRoot: string) {
  // 确保测试环境干净
}

export function ensureProjectRootOnly(projectRoot: string) {
  // 确保只操作指定项目根目录
}
```

### 安全验证解决方案
```typescript
// 路径安全验证
export function validateProjectRoot(projectRoot: string) {
  // 验证绝对路径和系统目录访问
}

// 文档类型验证
export function validateDocType(type: string) {
  // 验证文档类型是否在预定义列表中
}
```

### Prompts 实现解决方案
```typescript
// Prompts 注册
server.registerPrompt("init-project", {
  title: "项目初始化",
  description: "初始化项目文档结构",
  argsSchema: {
    projectName: z.string().optional()
  }
}, initProjectPrompt);
```

## Performance Optimizations

### 文件操作优化
- **异步读写**: 使用 fs/promises 避免阻塞
- **错误缓存**: 避免重复的错误检查
- **批量操作**: 支持批量文档操作

### 内存使用优化
- **流式处理**: 大文档的流式读写
- **垃圾回收**: 及时释放不需要的资源
- **无状态设计**: 避免内存泄漏

## Future Enhancements

### 功能扩展计划
- **搜索功能**: 全文搜索和关键词匹配
- **版本控制**: 文档版本历史和回滚
- **模板系统**: 更多文档模板和自定义模板
- **协作功能**: 多用户文档协作

### 技术改进计划
- **性能监控**: 详细的性能指标收集
- **错误追踪**: 更好的错误报告和分析
- **自动化测试**: 持续集成和自动化部署

## Update History
- 2025-07-30: 初始版本，记录开发笔记和解决方案