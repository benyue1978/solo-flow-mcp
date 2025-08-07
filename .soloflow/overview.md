# Project Overview

## Project Description
`soloflow-mcp` 是一个基于 Model Context Protocol (MCP) 的本地服务，用于向大模型提供项目文档访问与更新能力。其核心目标是将 `.soloflow/` 目录中的文档暴露为结构化接口，供 AI 使用。

## Project Goals
- [x] 构建支持 MCP 的服务端，实现文档管理功能
- [x] 将 `.soloflow/` 下的文档暴露为 MCP 对象
- [x] 响应 LLM 发起的 `read`, `update`, `list`, `init` 等操作
- [x] 使用 `StdioServerTransport` 接收请求，适配如 Cursor 的本地集成
- [x] 提供 `.cursor/rules/soloflow.mdc` 文件，指导工具如何与本服务交互
- [x] 保持文档格式为 Markdown，并兼容 Mermaid 等富文本语法
- [x] 所有文档结构基于固定 `DocType` 列表映射
- [x] 不引入任何后端数据库，仅依赖本地文件系统
- [x] 支持项目初始化，自动创建必要的配置文件和目录结构
- [x] 实现 32 个综合 prompts 功能，支持完整软件开发生命周期
- [x] 发布 NPM 包，支持 npx 安装和 Cursor 集成
- [x] 提供双语文档支持 (英文 + 中文README)

## Core Features
- **MCP 协议支持**: 完整的 Model Context Protocol 实现
- **文档管理**: 支持 8 种预定义文档类型的读写操作
- **项目初始化**: 自动创建项目配置和目录结构
- **综合提示系统**: 32个prompts覆盖完整软件开发生命周期
- **安全隔离**: 严格的项目路径验证和文档类型约束
- **NPM 包发布**: 支持 npx 安装和 Cursor 集成
- **测试覆盖**: 完整的单元测试、集成测试和安全测试
- **双语文档**: 支持英文和中文README
- **场景化指南**: 8个常见开发场景的使用指南

## Technical Stack
- **开发语言**: TypeScript
- **MCP 框架**: @modelcontextprotocol/sdk
- **通信协议**: StdioServerTransport
- **测试框架**: Jest
- **包管理**: NPM

## Project Status
- **当前版本**: v1.0.6
- **测试状态**: 50个测试用例全部通过
- **发布状态**: NPM 包已发布 (@benyue1978/soloflow-mcp)
- **集成状态**: 支持 Cursor 集成和 npx 安装
- **文档状态**: 双语文档完整，8个核心文档全部更新

## Update History
- 2025-08-07: 发布v1.0.6，添加双语文档支持和32个综合提示系统
- 2025-08-07: 添加8个场景化使用指南和基于角色的提示功能
- 2025-07-30: 完成 NPM 包发布和 Cursor 集成
- 2025-07-30: 实现 6 个核心 prompts 功能
- 2025-07-30: 完成测试框架搭建，47个测试通过
- 2025-07-24: 初始版本，基础 MCP 服务实现