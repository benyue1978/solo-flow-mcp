/**
 * Design function prompts for SoloFlow MCP
 * UI/UX design and interface design functions
 */

// 1. Design UI Interface Prompt
export async function designCreateUIPrompt(args: {
  component?: string;
  page?: string;
  designType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const component = args.component || 'Main Interface';
  const page = args.page || 'Home Page';
  const designType = args.designType || 'User Interface';
  
  let response = `🎨 UI Design Guide\n\n`;
  response += `🎯 Component: ${component}\n`;
  response += `📄 Page: ${page}\n`;
  response += `🎨 Design Type: ${designType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Design UI Interface:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Understand user requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current UI Design\n`;
  response += `Review existing UI design:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "ui_design"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. UI Design Process\n`;
  response += `- Analyze user requirements\n`;
  response += `- Define user personas\n`;
  response += `- Create wireframes\n`;
  response += `- Design visual mockups\n`;
  response += `- Define interaction patterns\n`;
  response += `- Plan responsive design\n`;
  response += `- Consider accessibility\n`;
  response += `- Document design decisions\n\n`;
  
  response += `### 4. Design Components\n`;
  response += `#### Layout Design\n`;
  response += `- Header and navigation\n`;
  response += `- Main content area\n`;
  response += `- Sidebar and menus\n`;
  response += `- Footer and links\n\n`;
  
  response += `#### Component Design\n`;
  response += `- Form components\n`;
  response += `- Button styles\n`;
  response += `- Input fields\n`;
  response += `- Modal dialogs\n`;
  response += `- Data tables\n`;
  response += `- Charts and graphs\n\n`;
  
  response += `#### Interaction Design\n`;
  response += `- Click and hover states\n`;
  response += `- Loading states\n`;
  response += `- Error handling\n`;
  response += `- Success feedback\n`;
  response += `- Navigation flow\n\n`;
  
  response += `### 5. Update UI Design Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "ui_design",\n`;
  response += `    "content": "# UI Design\\n\\n## Design Principles\\n- **Simplicity**: Clean and intuitive interface\\n- **Consistency**: Uniform design patterns\\n- **Usability**: Easy to use and navigate\\n- **Accessibility**: Inclusive design for all users\\n\\n## Page Design\\n### ${page}\\n- **Layout**: [Layout description]\\n- **Components**: [Component list]\\n- **Interactions**: [Interaction patterns]\\n\\n## Component Design\\n### ${component}\\n- **Purpose**: [Component purpose]\\n- **Props**: [Component properties]\\n- **States**: [Component states]\\n- **Styling**: [Style guidelines]\\n\\n## Design System\\n- **Colors**: [Color palette]\\n- **Typography**: [Font choices]\\n- **Spacing**: [Spacing system]\\n- **Icons**: [Icon set]\\n\\n## Responsive Design\\n- **Mobile**: [Mobile design considerations]\\n- **Tablet**: [Tablet design considerations]\\n- **Desktop**: [Desktop design considerations]\\n\\n## Accessibility\\n- **WCAG Compliance**: [Compliance level]\\n- **Keyboard Navigation**: [Keyboard support]\\n- **Screen Reader**: [Screen reader support]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Created UI design for ${component}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **UI Design Tips**:\n`;
  response += `- Focus on user experience\n`;
  response += `- Keep designs simple and clean\n`;
  response += `- Ensure consistency across components\n`;
  response += `- Consider mobile-first design\n`;
  response += `- Test with real users\n`;
  response += `- Document design decisions\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Review UI Design Prompt
export async function designReviewUIPrompt(args: {
  reviewType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const reviewType = args.reviewType || 'Comprehensive';
  
  let response = `🔍 UI Design Review Guide\n\n`;
  response += `📋 Review Type: ${reviewType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Review UI Design:\n\n`;
  
  response += `### 1. Read UI Design Document\n`;
  response += `Review current UI design:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "ui_design"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Requirements Document\n`;
  response += `Check against requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Review Process\n`;
  response += `- Check design consistency\n`;
  response += `- Verify usability requirements\n`;
  response += `- Assess accessibility compliance\n`;
  response += `- Review responsive design\n`;
  response += `- Validate interaction patterns\n`;
  response += `- Check visual hierarchy\n`;
  response += `- Review color contrast\n`;
  response += `- Document review findings\n\n`;
  
  response += `### 4. Review Checklist\n`;
  response += `#### Usability\n`;
  response += `- [ ] Interface is intuitive\n`;
  response += `- [ ] Navigation is clear\n`;
  response += `- [ ] Actions are discoverable\n`;
  response += `- [ ] Feedback is immediate\n\n`;
  
  response += `#### Accessibility\n`;
  response += `- [ ] Keyboard navigation works\n`;
  response += `- [ ] Screen reader compatible\n`;
  response += `- [ ] Color contrast meets standards\n`;
  response += `- [ ] Text is readable\n\n`;
  
  response += `#### Responsive Design\n`;
  response += `- [ ] Mobile layout works\n`;
  response += `- [ ] Tablet layout works\n`;
  response += `- [ ] Desktop layout works\n`;
  response += `- [ ] Touch targets are adequate\n\n`;
  
  response += `#### Visual Design\n`;
  response += `- [ ] Design is consistent\n`;
  response += `- [ ] Visual hierarchy is clear\n`;
  response += `- [ ] Colors are appropriate\n`;
  response += `- [ ] Typography is readable\n\n`;
  
  response += `### 5. Update UI Design Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "ui_design",\n`;
  response += `    "content": "# UI Design Review\\n\\n## Review Results\\n- **Usability**: [Status]\\n- **Accessibility**: [Status]\\n- **Responsive Design**: [Status]\\n- **Visual Design**: [Status]\\n\\n## Issues Found\\n- [Issue 1]\\n- [Issue 2]\\n\\n## Recommendations\\n- [Recommendation 1]\\n- [Recommendation 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: UI design review completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Review Tips**:\n`;
  response += `- Test with real users\n`;
  response += `- Use accessibility tools\n`;
  response += `- Check on different devices\n`;
  response += `- Document all findings\n`;
  response += `- Prioritize critical issues\n`;
  response += `- Plan for improvements\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
