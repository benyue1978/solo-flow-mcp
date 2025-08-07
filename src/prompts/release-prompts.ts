/**
 * Release management function prompts for SoloFlow MCP
 * Complete release and deployment lifecycle management
 */

// 1. Commit Changes Prompt
export async function releaseCommitChangesPrompt(args: {
  commitType?: string;
  scope?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const commitType = args.commitType || 'feat';
  const scope = args.scope || 'general';
  
  let response = `📝 Commit Changes Guide\n\n`;
  response += `🎯 Commit Type: ${commitType}\n`;
  response += `📋 Scope: ${scope}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Commit Changes:\n\n`;
  
  response += `### 1. Review Changes\n`;
  response += `Check what has been modified:\n`;
  response += `\`\`\`bash\n`;
  response += `# Check current status\n`;
  response += `git status\n\n`;
  response += `# Review changes\n`;
  response += `git diff\n\n`;
  response += `# Add all changes\n`;
  response += `git add .\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current Tasks\n`;
  response += `Understand what was implemented:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Commit Process\n`;
  response += `- Review all changes\n`;
  response += `- Ensure tests pass\n`;
  response += `- Write descriptive commit message\n`;
  response += `- Follow conventional commit format\n`;
  response += `- Include scope and description\n`;
  response += `- Add breaking change notes if needed\n`;
  response += `- Commit the changes\n`;
  response += `- Update documentation\n\n`;
  
  response += `### 4. Conventional Commit Format\n`;
  response += `\`\`\`bash\n`;
  response += `git commit -m "${commitType}(${scope}): brief description of changes"\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 5. Commit Types\n`;
  response += `- **feat**: New feature\n`;
  response += `- **fix**: Bug fix\n`;
  response += `- **docs**: Documentation changes\n`;
  response += `- **style**: Code style changes\n`;
  response += `- **refactor**: Code refactoring\n`;
  response += `- **test**: Adding tests\n`;
  response += `- **chore**: Maintenance tasks\n\n`;
  
  response += `### 6. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [Remaining tasks]\\n\\n## In Progress\\n- [ ] [Current task]\\n\\n## Completed\\n- [x] [Completed task]\\n- [x] [Another completed task]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Committed ${commitType} changes for ${scope}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Commit Tips**:\n`;
  response += `- Write clear, descriptive commit messages\n`;
  response += `- Use conventional commit format\n`;
  response += `- Keep commits atomic and focused\n`;
  response += `- Test before committing\n`;
  response += `- Include relevant issue numbers\n`;
  response += `- Review changes before committing\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Create Release Prompt
export async function releaseCreateReleasePrompt(args: {
  version?: string;
  releaseType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const version = args.version || '1.0.0';
  const releaseType = args.releaseType || 'minor';
  
  let response = `🚀 Release Creation Guide\n\n`;
  response += `📦 Version: ${version}\n`;
  response += `🎯 Release Type: ${releaseType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Create Release:\n\n`;
  
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
  
  response += `### 2. Read Tasks Document\n`;
  response += `Review completed work:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Release Creation Process\n`;
  response += `- Review completed features\n`;
  response += `- Update version number\n`;
  response += `- Generate changelog\n`;
  response += `- Create release notes\n`;
  response += `- Tag the release\n`;
  response += `- Push to repository\n`;
  response += `- Update documentation\n`;
  response += `- Notify stakeholders\n\n`;
  
  response += `### 4. Version Numbering\n`;
  response += `- **Major**: Breaking changes (1.0.0 → 2.0.0)\n`;
  response += `- **Minor**: New features (1.0.0 → 1.1.0)\n`;
  response += `- **Patch**: Bug fixes (1.0.0 → 1.0.1)\n\n`;
  
  response += `### 5. Release Commands\n`;
  response += `\`\`\`bash\n`;
  response += `# Update version in package.json\n`;
  response += `npm version ${version}\n\n`;
  response += `# Create git tag\n`;
  response += `git tag -a v${version} -m "Release ${version}"\n\n`;
  response += `# Push tag\n`;
  response += `git push origin v${version}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 6. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [Future tasks]\\n\\n## In Progress\\n- [ ] [Current task]\\n\\n## Completed\\n- [x] [Completed task]\\n- [x] [Another completed task]\\n\\n## Releases\\n- [x] Release ${version} (${releaseType})\\n  - Date: ${new Date().toLocaleDateString()}\\n  - Features: [List features]\\n  - Fixes: [List fixes]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Created release ${version}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Release Tips**:\n`;
  response += `- Follow semantic versioning\n`;
  response += `- Include comprehensive changelog\n`;
  response += `- Test the release thoroughly\n`;
  response += `- Document breaking changes\n`;
  response += `- Notify all stakeholders\n`;
  response += `- Keep release notes clear and concise\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 3. Deployment Checklist Prompt
export async function releaseDeploymentChecklistPrompt(args: {
  environment?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const environment = args.environment || 'Production';
  
  let response = `🚀 Deployment Checklist\n\n`;
  response += `**Target Environment**: ${environment}\n`;
  response += `**Check Date**: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## 📋 Pre-deployment Checks\n\n`;
  response += `### 1. Code Quality\n`;
  response += `- [ ] Code review completed\n`;
  response += `- [ ] All tests passed\n`;
  response += `- [ ] Code coverage meets standards\n`;
  response += `- [ ] Static code analysis passed\n\n`;
  
  response += `### 2. Functional Validation\n`;
  response += `- [ ] Core functionality works\n`;
  response += `- [ ] User flows are complete\n`;
  response += `- [ ] Error handling is correct\n`;
  response += `- [ ] Data consistency verified\n\n`;
  
  response += `### 3. Performance Checks\n`;
  response += `- [ ] Response time is normal\n`;
  response += `- [ ] Memory usage is reasonable\n`;
  response += `- [ ] Database performance is normal\n`;
  response += `- [ ] Concurrent processing capability\n\n`;
  
  response += `### 4. Security Checks\n`;
  response += `- [ ] Security vulnerability scan passed\n`;
  response += `- [ ] Dependency security check\n`;
  response += `- [ ] Permission configuration is correct\n`;
  response += `- [ ] Data encryption verified\n\n`;
  
  response += `### 5. Environment Configuration\n`;
  response += `- [ ] Environment variables configured correctly\n`;
  response += `- [ ] Database connection is normal\n`;
  response += `- [ ] Third-party service integration\n`;
  response += `- [ ] Monitoring and alerting configured\n\n`;
  
  response += `### 6. Documentation Updates\n`;
  response += `- [ ] API documentation updated\n`;
  response += `- [ ] User manual updated\n`;
  response += `- [ ] Deployment documentation updated\n`;
  response += `- [ ] Change log recorded\n\n`;
  
  response += `## ✅ Deployment Decision\n`;
  response += `- [ ] All checks passed\n`;
  response += `- [ ] Risk assessment acceptable\n`;
  response += `- [ ] Rollback plan prepared\n`;
  response += `- [ ] Final approval\n\n`;
  
  response += `## 🔄 Post-deployment Verification\n`;
  response += `- [ ] Service started normally\n`;
  response += `- [ ] Functional verification passed\n`;
  response += `- [ ] Performance metrics normal\n`;
  response += `- [ ] Monitoring alerts normal\n`;
  response += `- [ ] User feedback collected\n\n`;
  
  response += `**Note**: After deployment, continuously monitor application status and handle exceptions promptly.\n\n`;
  response += `### 7. Documentation Update\n`;
  response += `Don't forget to update your project documentation:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "list",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n`;
  response += `Then read and update relevant documents like deployment.md or tasks.md.`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 4. Rollback Plan Prompt
export async function releaseRollbackPlanPrompt(args: {
  version?: string;
  reason?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const version = args.version || 'Current Version';
  const reason = args.reason || 'Issues detected';
  
  let response = `🔄 Rollback Plan Guide\n\n`;
  response += `📦 Version: ${version}\n`;
  response += `⚠️ Reason: ${reason}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Create Rollback Plan:\n\n`;
  
  response += `### 1. Read Deployment Document\n`;
  response += `Understand current deployment:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "deployment"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Project Overview\n`;
  response += `Understand system architecture:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "overview"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Rollback Plan Creation Process\n`;
  response += `- Assess the current situation\n`;
  response += `- Identify rollback triggers\n`;
  response += `- Plan rollback steps\n`;
  response += `- Prepare rollback resources\n`;
  response += `- Define rollback timeline\n`;
  response += `- Plan communication strategy\n`;
  response += `- Test rollback procedure\n`;
  response += `- Document rollback plan\n\n`;
  
  response += `### 4. Rollback Checklist\n`;
  response += `- [ ] Previous version is available\n`;
  response += `- [ ] Database backup is ready\n`;
  response += `- [ ] Configuration files are backed up\n`;
  response += `- [ ] Rollback procedure is tested\n`;
  response += `- [ ] Team is notified\n`;
  response += `- [ ] Monitoring is in place\n`;
  response += `- [ ] Communication plan is ready\n`;
  response += `- [ ] Rollback timeline is defined\n\n`;
  
  response += `### 5. Rollback Steps\n`;
  response += `1. **Assessment Phase**\n`;
  response += `   - Evaluate the severity of issues\n`;
  response += `   - Determine if rollback is necessary\n`;
  response += `   - Notify stakeholders\n\n`;
  response += `2. **Preparation Phase**\n`;
  response += `   - Verify previous version availability\n`;
  response += `   - Prepare rollback scripts\n`;
  response += `   - Backup current state\n\n`;
  response += `3. **Execution Phase**\n`;
  response += `   - Stop current deployment\n`;
  response += `   - Deploy previous version\n`;
  response += `   - Verify system functionality\n\n`;
  response += `4. **Verification Phase**\n`;
  response += `   - Test critical functionality\n`;
  response += `   - Monitor system performance\n`;
  response += `   - Confirm rollback success\n\n`;
  
  response += `### 6. Update Deployment Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "deployment",\n`;
  response += `    "content": "# Deployment Configuration\\n\\n## Rollback Plans\\n### ${version} Rollback\\n- **Reason**: ${reason}\\n- **Status**: Prepared\\n- **Previous Version**: [Version number]\\n- **Rollback Steps**:\\n  1. [Step 1]\\n  2. [Step 2]\\n  3. [Step 3]\\n\\n## Deployment Process\\n1. Code build\\n2. Test verification\\n3. Deployment release\\n4. Monitoring check\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Created rollback plan for ${version}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Rollback Tips**:\n`;
  response += `- Always have a rollback plan ready\n`;
  response += `- Test rollback procedures regularly\n`;
  response += `- Keep previous versions available\n`;
  response += `- Monitor systems closely after deployment\n`;
  response += `- Communicate clearly with stakeholders\n`;
  response += `- Document all rollback activities\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 5. Monitor Deployment Prompt
export async function releaseMonitorDeploymentPrompt(args: {
  environment?: string;
  duration?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const environment = args.environment || 'Production';
  const duration = args.duration || '24 hours';
  
  let response = `📊 Deployment Monitoring Guide\n\n`;
  response += `🌍 Environment: ${environment}\n`;
  response += `⏱️ Duration: ${duration}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Monitor Deployment:\n\n`;
  
  response += `### 1. Read Deployment Document\n`;
  response += `Understand deployment configuration:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "deployment"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Monitoring Process\n`;
  response += `- Set up monitoring alerts\n`;
  response += `- Monitor system metrics\n`;
  response += `- Track user feedback\n`;
  response += `- Monitor error rates\n`;
  response += `- Check performance metrics\n`;
  response += `- Verify functionality\n`;
  response += `- Document observations\n`;
  response += `- Take action if needed\n\n`;
  
  response += `### 3. Monitoring Checklist\n`;
  response += `- [ ] System is accessible\n`;
  response += `- [ ] Response times are normal\n`;
  response += `- [ ] Error rates are acceptable\n`;
  response += `- [ ] User feedback is positive\n`;
  response += `- [ ] Performance metrics are stable\n`;
  response += `- [ ] No critical alerts\n`;
  response += `- [ ] Database performance is normal\n`;
  response += `- [ ] Third-party services are working\n\n`;
  
  response += `### 4. Key Metrics to Monitor\n`;
  response += `- **Availability**: Uptime percentage\n`;
  response += `- **Performance**: Response time, throughput\n`;
  response += `- **Errors**: Error rate, error types\n`;
  response += `- **Resources**: CPU, memory, disk usage\n`;
  response += `- **User Experience**: User feedback, session duration\n`;
  response += `- **Business Metrics**: Conversion rates, user engagement\n\n`;
  
  response += `### 5. Monitoring Tools\n`;
  response += `- Application Performance Monitoring (APM)\n`;
  response += `- Log aggregation and analysis\n`;
  response += `- Real-time alerting systems\n`;
  response += `- User feedback collection\n`;
  response += `- Health check endpoints\n`;
  response += `- Dashboard and reporting\n\n`;
  
  response += `### 6. Update Deployment Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "deployment",\n`;
  response += `    "content": "# Deployment Configuration\\n\\n## Monitoring Results\\n### ${environment} - ${duration}\\n- **Date**: ${new Date().toLocaleDateString()}\\n- **Status**: [Stable/Issues Detected]\\n- **Availability**: [Percentage]\\n- **Performance**: [Metrics]\\n- **Errors**: [Error rate]\\n\\n## Monitoring Observations\\n- [Observation 1]\\n- [Observation 2]\\n\\n## Actions Taken\\n- [Action 1]\\n- [Action 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Completed monitoring for ${environment}"\n`;
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
  response += `    "content": "# Project Notes\\n\\n## Deployment Monitoring\\n- ${environment} monitoring (${duration})\\n  - Date: ${new Date().toLocaleDateString()}\\n  - Status: [Status]\\n  - Key findings: [List findings]\\n\\n## Monitoring Issues\\n- [Issue 1]\\n- [Issue 2]\\n\\n## Monitoring Improvements\\n- [Improvement 1]\\n- [Improvement 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Completed deployment monitoring"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Monitoring Tips**:\n`;
  response += `- Set up proactive monitoring\n`;
  response += `- Monitor both technical and business metrics\n`;
  response += `- Establish clear alert thresholds\n`;
  response += `- Document all incidents and responses\n`;
  response += `- Review monitoring data regularly\n`;
  response += `- Continuously improve monitoring setup\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
