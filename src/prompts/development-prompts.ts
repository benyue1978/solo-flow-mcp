/**
 * Development function prompts for SoloFlow MCP
 * Code implementation and development functions
 */

// 1. Write Code Prompt
export async function developmentWriteCodePrompt(args: {
  feature?: string;
  language?: string;
  framework?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const feature = args.feature || 'New Feature';
  const language = args.language || 'TypeScript';
  const framework = args.framework || '';
  
  let response = `💻 Code Implementation Guide\n\n`;
  response += `🎯 Feature: ${feature}\n`;
  response += `🔧 Language: ${language}\n`;
  if (framework) {
    response += `⚙️ Framework: ${framework}\n`;
  }
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Implement Code:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `First, understand what needs to be implemented:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read System Architecture\n`;
  response += `Understand the technical architecture:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Read Current Tasks\n`;
  response += `Check development tasks:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Implementation Steps\n`;
  response += `- Analyze requirements and architecture\n`;
  response += `- Design the code structure\n`;
  response += `- Write clean, maintainable code\n`;
  response += `- Add comprehensive comments\n`;
  response += `- Follow coding standards and best practices\n`;
  response += `- Consider error handling and edge cases\n`;
  response += `- Write unit tests for the new code\n`;
  response += `- Update documentation\n\n`;
  
  response += `### 5. Code Quality Checklist\n`;
  response += `- [ ] Code follows project conventions\n`;
  response += `- [ ] Variable and function names are clear\n`;
  response += `- [ ] Code is properly documented\n`;
  response += `- [ ] Error handling is comprehensive\n`;
  response += `- [ ] Performance considerations are addressed\n`;
  response += `- [ ] Security best practices are followed\n`;
  response += `- [ ] Unit tests are written and passing\n`;
  response += `- [ ] Code review is completed\n\n`;
  
  response += `### 6. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [Remaining tasks]\\n\\n## In Progress\\n- [ ] Implement ${feature}\\n\\n## Completed\\n- [x] [Previous completed tasks]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Started implementing ${feature}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 7. Update Notes Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes",\n`;
  response += `    "content": "# Project Notes\\n\\n## Development Notes\\n- Started implementing ${feature}\\n- Using ${language}${framework ? ' with ' + framework : ''}\\n- Key technical decisions: [List decisions]\\n\\n## Implementation Details\\n- [Implementation detail 1]\\n- [Implementation detail 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Started ${feature} implementation"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Development Tips**:\n`;
  response += `- Write self-documenting code with clear names\n`;
  response += `- Add comprehensive error handling\n`;
  response += `- Write tests as you develop (TDD approach)\n`;
  response += `- Follow established patterns and conventions\n`;
  response += `- Document complex logic and decisions\n`;
  response += `- Consider performance and security from the start\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Fix Bug Prompt
export async function developmentFixBugPrompt(args: {
  bugDescription?: string;
  severity?: string;
  component?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const bugDescription = args.bugDescription || 'Bug Description';
  const severity = args.severity || 'medium';
  const component = args.component || 'Unknown';
  
  const severityEmoji = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢'
  }[severity] || '🟡';
  
  let response = `🐛 Bug Fix Guide\n\n`;
  response += `🎯 Bug: ${bugDescription}\n`;
  response += `⚠️ Severity: ${severity} ${severityEmoji}\n`;
  response += `🔧 Component: ${component}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Fix Bug:\n\n`;
  
  response += `### 1. Read Bug Report\n`;
  response += `Understand the bug details:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Test Strategy\n`;
  response += `Check existing tests:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Bug Fix Process\n`;
  response += `- Reproduce the bug consistently\n`;
  response += `- Identify the root cause\n`;
  response += `- Analyze the affected code\n`;
  response += `- Design the fix\n`;
  response += `- Implement the fix\n`;
  response += `- Write regression tests\n`;
  response += `- Test the fix thoroughly\n`;
  response += `- Update documentation\n\n`;
  
  response += `### 4. Bug Fix Checklist\n`;
  response += `- [ ] Bug is reproducible\n`;
  response += `- [ ] Root cause is identified\n`;
  response += `- [ ] Fix addresses the root cause\n`;
  response += `- [ ] Fix doesn't introduce new bugs\n`;
  response += `- [ ] Regression tests are written\n`;
  response += `- [ ] All tests pass\n`;
  response += `- [ ] Code review is completed\n`;
  response += `- [ ] Documentation is updated\n\n`;
  
  response += `### 5. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [Other tasks]\\n\\n## In Progress\\n- [ ] Fix bug: ${bugDescription} (${severity} priority)\\n\\n## Completed\\n- [x] [Previous completed tasks]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Started fixing ${bugDescription}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 6. Update Notes Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes",\n`;
  response += `    "content": "# Project Notes\\n\\n## Bug Reports\\n- ${bugDescription} (${severity} priority)\\n  - Component: ${component}\\n  - Status: In Progress\\n  - Root cause: [To be identified]\\n\\n## Bug Fixes\\n- [Fix details will be added here]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Started fixing ${bugDescription}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Bug Fix Tips**:\n`;
  response += `- Always reproduce the bug first\n`;
  response += `- Focus on the root cause, not symptoms\n`;
  response += `- Write tests to prevent regression\n`;
  response += `- Test the fix thoroughly\n`;
  response += `- Document the fix and reasoning\n`;
  response += `- Consider if the bug indicates a larger issue\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 3. Refactor Code Prompt
export async function developmentRefactorCodePrompt(args: {
  component?: string;
  reason?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const component = args.component || 'Component';
  const reason = args.reason || 'Improve code quality';
  
  let response = `🔧 Code Refactoring Guide\n\n`;
  response += `🎯 Component: ${component}\n`;
  response += `📋 Reason: ${reason}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Refactor Code:\n\n`;
  
  response += `### 1. Read Current Code\n`;
  response += `Understand the existing implementation:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read System Architecture\n`;
  response += `Understand the overall design:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Refactoring Process\n`;
  response += `- Analyze current code structure\n`;
  response += `- Identify refactoring opportunities\n`;
  response += `- Plan the refactoring approach\n`;
  response += `- Ensure all tests pass before refactoring\n`;
  response += `- Make small, incremental changes\n`;
  response += `- Run tests after each change\n`;
  response += `- Update documentation\n`;
  response += `- Verify functionality is preserved\n\n`;
  
  response += `### 4. Refactoring Checklist\n`;
  response += `- [ ] All existing tests pass\n`;
  response += `- [ ] Refactoring plan is documented\n`;
  response += `- [ ] Changes are made incrementally\n`;
  response += `- [ ] Tests are updated as needed\n`;
  response += `- [ ] All tests pass after refactoring\n`;
  response += `- [ ] Code is more maintainable\n`;
  response += `- [ ] Performance is not degraded\n`;
  response += `- [ ] Documentation is updated\n\n`;
  
  response += `### 5. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [Other tasks]\\n\\n## In Progress\\n- [ ] Refactor ${component} (${reason})\\n\\n## Completed\\n- [x] [Previous completed tasks]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Started refactoring ${component}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 6. Update Notes Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes",\n`;
  response += `    "content": "# Project Notes\\n\\n## Refactoring Activities\\n- ${component} refactoring (${reason})\\n  - Status: In Progress\\n  - Goals: [List refactoring goals]\\n  - Changes: [List planned changes]\\n\\n## Technical Decisions\\n- [Technical decision 1]\\n- [Technical decision 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Started refactoring ${component}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Refactoring Tips**:\n`;
  response += `- Always have comprehensive tests before refactoring\n`;
  response += `- Make small, incremental changes\n`;
  response += `- Run tests after each change\n`;
  response += `- Focus on improving maintainability\n`;
  response += `- Preserve existing functionality\n`;
  response += `- Document the reasoning behind changes\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 4. Code Review Checklist Prompt (moved from quality)
export async function developmentCodeReviewChecklistPrompt(args: {
  codeLanguage?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const codeLanguage = args.codeLanguage || 'General';
  
  let response = `🔍 Code Review Checklist\n\n`;
  response += `**Programming Language**: ${codeLanguage}\n`;
  response += `**Review Date**: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## 📋 Review Items\n\n`;
  response += `### 1. Code Quality\n`;
  response += `- [ ] Variable and function names are clear\n`;
  response += `- [ ] Code structure is clear and understandable\n`;
  response += `- [ ] Comments are sufficient and accurate\n`;
  response += `- [ ] Code formatting follows standards\n`;
  response += `- [ ] No duplicate code\n\n`;
  
  response += `### 2. Functional Correctness\n`;
  response += `- [ ] Expected functionality is implemented\n`;
  response += `- [ ] Edge cases are handled correctly\n`;
  response += `- [ ] Error handling is comprehensive\n`;
  response += `- [ ] Input validation is sufficient\n`;
  response += `- [ ] Output format is correct\n\n`;
  
  response += `### 3. Performance Considerations\n`;
  response += `- [ ] Algorithm complexity is reasonable\n`;
  response += `- [ ] Memory usage is efficient\n`;
  response += `- [ ] Database queries are optimized\n`;
  response += `- [ ] Avoid unnecessary computations\n\n`;
  
  response += `### 4. Security\n`;
  response += `- [ ] Input data is validated\n`;
  response += `- [ ] Sensitive information is protected\n`;
  response += `- [ ] Access control is comprehensive\n`;
  response += `- [ ] Logs don't contain sensitive information\n\n`;
  
  response += `### 5. Maintainability\n`;
  response += `- [ ] Code is modular\n`;
  response += `- [ ] Dependencies are clear\n`;
  response += `- [ ] Test coverage is sufficient\n`;
  response += `- [ ] Documentation is complete\n\n`;
  
  response += `## ✅ Review Result\n`;
  response += `- [ ] Approved\n`;
  response += `- [ ] Changes Requested\n`;
  response += `- [ ] Rejected\n\n`;
  
  response += `## 💡 Improvement Suggestions\n`;
  response += `1. \n`;
  response += `2. \n`;
  response += `3. \n\n`;
  
  response += `**Note**: After completing the code review, remember to update relevant documentation.\n\n`;
  response += `### 6. Documentation Update\n`;
  response += `Don't forget to update your project documentation:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n`;
  response += `Then read and update relevant documents like tasks.md or notes.md.`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
