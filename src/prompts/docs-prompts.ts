/**
 * Documentation generation function prompts for SoloFlow MCP
 * Documentation and implementation description functions
 */

// 1. Generate Documentation Prompt
export async function docsGenerateDocsPrompt(args: {
  docType?: string;
  component?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const docType = args.docType || 'Implementation';
  const component = args.component || 'Current Implementation';
  
  let response = `📚 Documentation Generation Guide\n\n`;
  response += `📄 Document Type: ${docType}\n`;
  response += `🔧 Component: ${component}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Generate Documentation:\n\n`;
  
  response += `### 1. Read Current Implementation\n`;
  response += `Understand the current codebase:\n`;
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
  response += `Understand the system design:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Read Requirements Document\n`;
  response += `Understand what was implemented:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 4. Documentation Generation Process\n`;
  response += `- Analyze current implementation\n`;
  response += `- Identify key components and features\n`;
  response += `- Document technical decisions\n`;
  response += `- Describe implementation approach\n`;
  response += `- Document API interfaces\n`;
  response += `- Create usage examples\n`;
  response += `- Document configuration options\n`;
  response += `- Generate troubleshooting guide\n\n`;
  
  response += `### 5. Documentation Types\n`;
  response += `#### API Documentation\n`;
  response += `- Endpoint descriptions\n`;
  response += `- Request/response formats\n`;
  response += `- Authentication methods\n`;
  response += `- Error codes and handling\n`;
  response += `- Usage examples\n\n`;
  
  response += `#### Implementation Guide\n`;
  response += `- Architecture overview\n`;
  response += `- Component descriptions\n`;
  response += `- Data flow diagrams\n`;
  response += `- Configuration options\n`;
  response += `- Deployment instructions\n\n`;
  
  response += `#### User Manual\n`;
  response += `- Feature descriptions\n`;
  response += `- Step-by-step instructions\n`;
  response += `- Screenshots and examples\n`;
  response += `- Troubleshooting guide\n`;
  response += `- FAQ section\n\n`;
  
  response += `#### Developer Guide\n`;
  response += `- Setup instructions\n`;
  response += `- Development environment\n`;
  response += `- Code structure\n`;
  response += `- Testing procedures\n`;
  response += `- Contribution guidelines\n\n`;
  
  response += `### 6. Update Documentation\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes",\n`;
  response += `    "content": "# Project Documentation\\n\\n## Implementation Overview\\n### ${component}\\n- **Implementation Date**: ${new Date().toLocaleDateString()}\\n- **Technology Stack**: [List technologies]\\n- **Architecture**: [Architecture description]\\n\\n## Key Components\\n- [Component 1]: [Description]\\n- [Component 2]: [Description]\\n\\n## Technical Decisions\\n- [Decision 1]: [Rationale]\\n- [Decision 2]: [Rationale]\\n\\n## API Documentation\\n### Endpoints\\n- [Endpoint 1]: [Description]\\n- [Endpoint 2]: [Description]\\n\\n## Usage Examples\\n\\\`\`\`javascript\\n// Example 1\\n// Example 2\\n\\\`\`\`\\n\\n## Configuration\\n- [Config 1]: [Description]\\n- [Config 2]: [Description]\\n\\n## Troubleshooting\\n- [Issue 1]: [Solution]\\n- [Issue 2]: [Solution]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Generated ${docType} documentation"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Documentation Tips**:\n`;
  response += `- Keep documentation up to date\n`;
  response += `- Use clear, concise language\n`;
  response += `- Include practical examples\n`;
  response += `- Document both what and why\n`;
  response += `- Consider different audience levels\n`;
  response += `- Use diagrams when helpful\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
