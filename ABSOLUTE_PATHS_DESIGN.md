# 绝对路径设计文档

## 🎯 设计目标

重新设计MCP工具，要求使用绝对路径参数，实现：
- ✅ 更高的安全性
- ✅ 更清晰的错误提示
- ✅ 更简单的实现逻辑
- ✅ 更好的用户体验

## 🔄 设计变更

### 之前的设计（复杂）
```typescript
// 复杂的项目根目录检测
function detectProjectRoot(): string {
  // 1. 环境变量
  // 2. 当前工作目录
  // 3. 向上搜索项目文件
  // 4. 回退到当前目录
}

// 相对路径验证
function validateFilePath(filePath: string, baseDir: string): boolean {
  // 复杂的路径解析和验证
}
```

### 现在的设计（简洁）
```typescript
// 简单的绝对路径验证
function validateAbsolutePath(filePath: string): boolean {
  // 1. 必须是绝对路径
  // 2. 不能访问系统目录
  // 3. 路径规范化
}
```

## 🛠️ 工具接口变更

### get_requirements_md
```json
{
  "name": "get_requirements_md",
  "description": "Read the requirements document using absolute path",
  "inputSchema": {
    "path": "string - Absolute path to requirements document"
  }
}
```

### get_tasks_md
```json
{
  "name": "get_tasks_md",
  "description": "Read the tasks document using absolute path",
  "inputSchema": {
    "path": "string - Absolute path to tasks document"
  }
}
```

### read_readme
```json
{
  "name": "read_readme",
  "description": "Read the README.md file using absolute path",
  "inputSchema": {
    "path": "string - Absolute path to README.md file"
  }
}
```

## 🔒 安全特性

### 1. 绝对路径要求
- 拒绝相对路径，防止路径遍历攻击
- 明确的路径来源，便于审计

### 2. 系统目录保护
```typescript
const forbiddenPrefixes = [
  '/etc/', '/var/', '/usr/', '/bin/', '/sbin/', '/dev/', '/proc/', '/sys/',
  'C:\\Windows\\', 'C:\\System32\\', 'C:\\Program Files\\', 'C:\\Program Files (x86)\\'
];
```

### 3. 路径规范化
- 使用 `path.resolve()` 规范化路径
- 防止符号链接攻击

## 📝 错误处理

### 相对路径错误
```
❌ Security Error: Invalid file path 'README.md'

Requirements:
- Path must be absolute (e.g., '/Users/username/project/README.md')
- Relative paths are not allowed for security reasons
- System directories are not accessible

Examples of valid paths:
- /Users/username/project/README.md
- /home/user/project/docs/requirements.md
- C:\Users\username\project\package.json
```

### 文件不存在错误
```
❌ File not found: '/Users/username/project/docs/requirements.md'

Possible issues:
- File does not exist
- You may have used a relative path instead of absolute path
- Check if the path is correct

Current working directory: /Users/username/project
Example absolute path: /Users/username/project/README.md
```

## 🧪 测试验证

运行测试脚本验证功能：
```bash
npm run test-absolute-paths
```

测试覆盖：
- ✅ 相对路径被拒绝
- ✅ 绝对路径正常工作
- ✅ 文件不存在时的错误提示
- ✅ 项目信息获取

## 💡 使用示例

### Cursor Rules 配置
```json
{
  "tool": "read_readme",
  "args": {
    "path": "/Users/username/project/README.md"
  }
}
```

### 动态路径生成
```javascript
// 在客户端生成绝对路径
const projectRoot = process.cwd();
const readmePath = path.join(projectRoot, 'README.md');

// 调用MCP工具
{
  "tool": "read_readme",
  "args": {
    "path": readmePath
  }
}
```

## 🎉 优势总结

1. **安全性提升**
   - 绝对路径要求防止路径遍历
   - 系统目录访问限制
   - 路径规范化处理

2. **错误处理改进**
   - 区分相对路径和文件不存在
   - 提供具体的修复建议
   - 显示当前工作目录信息

3. **实现简化**
   - 移除复杂的项目根目录检测
   - 简化路径验证逻辑
   - 减少配置复杂性

4. **用户体验优化**
   - 明确的错误消息
   - 具体的示例路径
   - 清晰的修复指导

## 🔮 未来扩展

1. **路径模板支持**
   - 支持环境变量替换
   - 支持用户目录展开

2. **批量操作**
   - 支持多个文件路径
   - 支持目录扫描

3. **权限控制**
   - 基于用户权限的路径访问
   - 项目级别的访问控制

## 📚 相关文档

- [Cursor Rules 配置](./.cursor/rules/project-tools.mdc)
- [README 文档](./README.md)
- [测试脚本](./test-absolute-paths.js) 