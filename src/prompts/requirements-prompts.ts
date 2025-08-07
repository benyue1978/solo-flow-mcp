/**
 * Requirements analysis function prompts for SoloFlow MCP
 * Requirements analysis and management functions
 */

// 1. Analyze Requirements Prompt
export async function requirementsAnalyzeRequirementsPrompt(args: {
  domain?: string;
  scope?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const domain = args.domain || 'General';
  const scope = args.scope || 'Full System';
  
  let response = `📋 Requirements Analysis Guide\n\n`;
  response += `🎯 Domain: ${domain}\n`;
  response += `📊 Scope: ${scope}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Analyze Requirements:\n\n`;
  
  response += `### 1. Read Project Overview\n`;
  response += `Understand the project context:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "overview"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current Requirements\n`;
  response += `Review existing requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Requirements Analysis Process\n`;
  response += `- Identify stakeholders and their needs\n`;
  response += `- Analyze business objectives\n`;
  response += `- Define functional requirements\n`;
  response += `- Identify non-functional requirements\n`;
  response += `- Clarify ambiguous requirements\n`;
  response += `- Identify missing requirements\n`;
  response += `- Validate requirement feasibility\n`;
  response += `- Document analysis findings\n\n`;
  
  response += `### 4. Analysis Framework\n`;
  response += `#### Business Requirements\n`;
  response += `- Business objectives and goals\n`;
  response += `- Key performance indicators\n`;
  response += `- Success criteria\n`;
  response += `- Business constraints\n\n`;
  
  response += `#### Functional Requirements\n`;
  response += `- User stories and use cases\n`;
  response += `- System features and capabilities\n`;
  response += `- Data requirements\n`;
  response += `- Interface requirements\n\n`;
  
  response += `#### Non-Functional Requirements\n`;
  response += `- Performance requirements\n`;
  response += `- Security requirements\n`;
  response += `- Usability requirements\n`;
  response += `- Reliability requirements\n`;
  response += `- Scalability requirements\n\n`;
  
  response += `### 5. Update Requirements Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements",\n`;
  response += `    "content": "# Project Requirements\\n\\n## Business Requirements\\n- [Business objective 1]\\n- [Business objective 2]\\n\\n## Functional Requirements\\n- [Requirement 1]\\n- [Requirement 2]\\n\\n## Non-Functional Requirements\\n- Performance: [Performance criteria]\\n- Security: [Security requirements]\\n- Usability: [Usability criteria]\\n\\n## Analysis Findings\\n- [Finding 1]\\n- [Finding 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Requirements analysis completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Analysis Tips**:\n`;
  response += `- Focus on stakeholder needs\n`;
  response += `- Use clear, measurable criteria\n`;
  response += `- Consider both current and future needs\n`;
  response += `- Validate requirements with stakeholders\n`;
  response += `- Document assumptions and constraints\n`;
  response += `- Consider technical feasibility\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Validate Requirements Prompt
export async function requirementsValidateRequirementsPrompt(args: {
  validationType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const validationType = args.validationType || 'Comprehensive';
  
  let response = `✅ Requirements Validation Guide\n\n`;
  response += `🔍 Validation Type: ${validationType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Validate Requirements:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Review current requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Validation Process\n`;
  response += `- Check requirement completeness\n`;
  response += `- Validate requirement clarity\n`;
  response += `- Verify requirement consistency\n`;
  response += `- Assess requirement feasibility\n`;
  response += `- Validate requirement testability\n`;
  response += `- Check requirement traceability\n`;
  response += `- Validate with stakeholders\n`;
  response += `- Document validation results\n\n`;
  
  response += `### 3. Validation Checklist\n`;
  response += `#### Completeness\n`;
  response += `- [ ] All business objectives covered\n`;
  response += `- [ ] All user needs addressed\n`;
  response += `- [ ] All system functions defined\n`;
  response += `- [ ] All constraints identified\n\n`;
  
  response += `#### Clarity\n`;
  response += `- [ ] Requirements are unambiguous\n`;
  response += `- [ ] Requirements are specific\n`;
  response += `- [ ] Requirements are measurable\n`;
  response += `- [ ] Requirements are testable\n\n`;
  
  response += `#### Consistency\n`;
  response += `- [ ] No conflicting requirements\n`;
  response += `- [ ] Requirements align with goals\n`;
  response += `- [ ] Technical requirements feasible\n`;
  response += `- [ ] Resource requirements realistic\n\n`;
  
  response += `#### Feasibility\n`;
  response += `- [ ] Technical feasibility confirmed\n`;
  response += `- [ ] Resource availability verified\n`;
  response += `- [ ] Timeline constraints realistic\n`;
  response += `- [ ] Budget constraints met\n\n`;
  
  response += `### 4. Update Requirements Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements",\n`;
  response += `    "content": "# Project Requirements\\n\\n## Validated Requirements\\n- [Requirement 1] ✅\\n- [Requirement 2] ✅\\n\\n## Validation Results\\n- **Completeness**: [Status]\\n- **Clarity**: [Status]\\n- **Consistency**: [Status]\\n- **Feasibility**: [Status]\\n\\n## Issues Found\\n- [Issue 1]\\n- [Issue 2]\\n\\n## Recommendations\\n- [Recommendation 1]\\n- [Recommendation 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Requirements validation completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Validation Tips**:\n`;
  response += `- Use stakeholder feedback\n`;
  response += `- Test requirements with prototypes\n`;
  response += `- Consider edge cases\n`;
  response += `- Validate with technical team\n`;
  response += `- Document validation decisions\n`;
  response += `- Plan for requirement changes\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 3. Prioritize Requirements Prompt
export async function requirementsPrioritizeRequirementsPrompt(args: {
  priorityMethod?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const priorityMethod = args.priorityMethod || 'MoSCoW';
  
  let response = `🎯 Requirements Prioritization Guide\n\n`;
  response += `📊 Priority Method: ${priorityMethod}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Prioritize Requirements:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Review current requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Prioritization Process\n`;
  response += `- Identify business value\n`;
  response += `- Assess technical complexity\n`;
  response += `- Consider dependencies\n`;
  response += `- Evaluate risks\n`;
  response += `- Consider resource constraints\n`;
  response += `- Assess time constraints\n`;
  response += `- Apply prioritization method\n`;
  response += `- Document prioritization decisions\n\n`;
  
  response += `### 3. MoSCoW Prioritization Method\n`;
  response += `#### Must Have (M)\n`;
  response += `- Critical for project success\n`;
  response += `- Cannot be delivered without\n`;
  response += `- Core functionality\n\n`;
  
  response += `#### Should Have (S)\n`;
  response += `- Important but not critical\n`;
  response += `- Can be delayed if necessary\n`;
  response += `- High business value\n\n`;
  
  response += `#### Could Have (C)\n`;
  response += `- Desirable but not essential\n`;
  response += `- Nice to have features\n`;
  response += `- Lower priority\n\n`;
  
  response += `#### Won't Have (W)\n`;
  response += `- Not in current scope\n`;
  response += `- Future consideration\n`;
  response += `- Out of scope for now\n\n`;
  
  response += `### 4. Alternative Methods\n`;
  response += `#### Value vs Complexity Matrix\n`;
  response += `- High Value, Low Complexity: Do First\n`;
  response += `- High Value, High Complexity: Plan Carefully\n`;
  response += `- Low Value, Low Complexity: Do Later\n`;
  response += `- Low Value, High Complexity: Avoid\n\n`;
  
  response += `#### Kano Model\n`;
  response += `- Must-be Quality: Basic expectations\n`;
  response += `- One-dimensional Quality: More is better\n`;
  response += `- Attractive Quality: Delighters\n`;
  response += `- Indifferent Quality: No impact\n\n`;
  
  response += `### 5. Update Requirements Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements",\n`;
  response += `    "content": "# Project Requirements\\n\\n## Prioritized Requirements\\n\\n### Must Have (M)\\n- [Requirement 1] - [Business value]\\n- [Requirement 2] - [Business value]\\n\\n### Should Have (S)\\n- [Requirement 3] - [Business value]\\n- [Requirement 4] - [Business value]\\n\\n### Could Have (C)\\n- [Requirement 5] - [Business value]\\n- [Requirement 6] - [Business value]\\n\\n### Won't Have (W)\\n- [Requirement 7] - [Reason]\\n- [Requirement 8] - [Reason]\\n\\n## Prioritization Criteria\\n- Business Value: [Criteria]\\n- Technical Complexity: [Criteria]\\n- Dependencies: [Criteria]\\n- Risks: [Criteria]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Requirements prioritization completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Prioritization Tips**:\n`;
  response += `- Focus on business value\n`;
  response += `- Consider technical dependencies\n`;
  response += `- Involve stakeholders in decisions\n`;
  response += `- Be prepared to reprioritize\n`;
  response += `- Document rationale for decisions\n`;
  response += `- Review priorities regularly\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
