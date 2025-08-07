/**
 * Testing function prompts for SoloFlow MCP
 * Testing and quality assurance functions
 */

// 1. Create Test Plan Prompt
export async function testingCreateTestPlanPrompt(args: {
  feature?: string;
  testType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const feature = args.feature || 'Feature';
  const testType = args.testType || 'Comprehensive';
  
  let response = `📋 Test Plan Creation Guide\n\n`;
  response += `🎯 Feature: ${feature}\n`;
  response += `🧪 Test Type: ${testType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Create Test Plan:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Understand what needs to be tested:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current Test Strategy\n`;
  response += `Review existing testing approach:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Test Plan Creation Process\n`;
  response += `- Analyze feature requirements\n`;
  response += `- Identify test scenarios\n`;
  response += `- Define test cases\n`;
  response += `- Plan test data\n`;
  response += `- Set up test environment\n`;
  response += `- Define acceptance criteria\n`;
  response += `- Plan test execution\n`;
  response += `- Document test plan\n\n`;
  
  response += `### 4. Update Test Strategy Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy",\n`;
  response += `    "content": "# Test Strategy\\n\\n## Test Plans\\n### ${feature} Test Plan\\n- **Test Type**: ${testType}\\n- **Status**: In Progress\\n- **Test Scenarios**:\\n  - [Scenario 1]\\n  - [Scenario 2]\\n- **Test Cases**:\\n  - [Test case 1]\\n  - [Test case 2]\\n- **Acceptance Criteria**:\\n  - [Criterion 1]\\n  - [Criterion 2]\\n\\n## Test Environment\\n- Development environment\\n- Test environment\\n- Production environment\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Created test plan for ${feature}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 5. Update Tasks Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "tasks",\n`;
  response += `    "content": "# Project Tasks\\n\\n## To Do\\n- [ ] [Other tasks]\\n\\n## In Progress\\n- [ ] Create test plan for ${feature}\\n\\n## Completed\\n- [x] [Previous completed tasks]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Started test plan for ${feature}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Test Plan Tips**:\n`;
  response += `- Cover all functional requirements\n`;
  response += `- Include positive and negative test cases\n`;
  response += `- Plan for edge cases and error scenarios\n`;
  response += `- Define clear acceptance criteria\n`;
  response += `- Consider performance and security testing\n`;
  response += `- Plan for regression testing\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Write Unit Tests Prompt
export async function testingWriteUnitTestsPrompt(args: {
  component?: string;
  language?: string;
  framework?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const component = args.component || 'Component';
  const language = args.language || 'TypeScript';
  const framework = args.framework || 'Jest';
  
  let response = `🧪 Unit Test Writing Guide\n\n`;
  response += `🎯 Component: ${component}\n`;
  response += `🔧 Language: ${language}\n`;
  response += `⚙️ Framework: ${framework}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Write Unit Tests:\n\n`;
  
  response += `### 1. Read Component Requirements\n`;
  response += `Understand what the component should do:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Test Strategy\n`;
  response += `Review testing standards:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Unit Test Writing Process\n`;
  response += `- Analyze component functionality\n`;
  response += `- Identify test scenarios\n`;
  response += `- Write test cases for each function\n`;
  response += `- Test normal operation\n`;
  response += `- Test edge cases\n`;
  response += `- Test error conditions\n`;
  response += `- Mock dependencies\n`;
  response += `- Ensure good test coverage\n\n`;
  
  response += `### 4. Unit Test Checklist\n`;
  response += `- [ ] All public functions are tested\n`;
  response += `- [ ] Edge cases are covered\n`;
  response += `- [ ] Error conditions are tested\n`;
  response += `- [ ] Dependencies are properly mocked\n`;
  response += `- [ ] Test names are descriptive\n`;
  response += `- [ ] Tests are independent\n`;
  response += `- [ ] Test coverage is adequate\n`;
  response += `- [ ] Tests are maintainable\n\n`;
  
  response += `### 5. Example Test Structure\n`;
  response += `\`\`\`${language}\n`;
  response += `describe('${component}', () => {\n`;
  response += `  describe('functionName', () => {\n`;
  response += `    it('should handle normal case', () => {\n`;
  response += `      // Arrange\n`;
  response += `      // Act\n`;
  response += `      // Assert\n`;
  response += `    });\n\n`;
  response += `    it('should handle edge case', () => {\n`;
  response += `      // Test edge case\n`;
  response += `    });\n\n`;
  response += `    it('should handle error condition', () => {\n`;
  response += `      // Test error handling\n`;
  response += `    });\n`;
  response += `  });\n`;
  response += `});\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 6. Update Test Strategy Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy",\n`;
  response += `    "content": "# Test Strategy\\n\\n## Unit Tests\\n### ${component}\\n- **Language**: ${language}\\n- **Framework**: ${framework}\\n- **Test Cases**:\\n  - [Test case 1]\\n  - [Test case 2]\\n- **Coverage**: [Coverage percentage]\\n\\n## Test Environment\\n- Development environment\\n- Test environment\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Added unit tests for ${component}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Unit Test Tips**:\n`;
  response += `- Follow AAA pattern (Arrange, Act, Assert)\n`;
  response += `- Write descriptive test names\n`;
  response += `- Test one thing per test case\n`;
  response += `- Mock external dependencies\n`;
  response += `- Aim for high test coverage\n`;
  response += `- Keep tests simple and maintainable\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 3. Run Tests Prompt
export async function testingRunTestsPrompt(args: {
  testType?: string;
  environment?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const testType = args.testType || 'All';
  const environment = args.environment || 'Development';
  
  let response = `▶️ Test Execution Guide\n\n`;
  response += `🧪 Test Type: ${testType}\n`;
  response += `🌍 Environment: ${environment}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Run Tests:\n\n`;
  
  response += `### 1. Read Test Strategy\n`;
  response += `Review testing approach:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Test Execution Process\n`;
  response += `- Prepare test environment\n`;
  response += `- Run unit tests\n`;
  response += `- Run integration tests\n`;
  response += `- Run end-to-end tests\n`;
  response += `- Monitor test results\n`;
  response += `- Document test failures\n`;
  response += `- Generate test reports\n`;
  response += `- Update test documentation\n\n`;
  
  response += `### 3. Test Execution Checklist\n`;
  response += `- [ ] Test environment is ready\n`;
  response += `- [ ] All dependencies are installed\n`;
  response += `- [ ] Test data is prepared\n`;
  response += `- [ ] Unit tests are running\n`;
  response += `- [ ] Integration tests are running\n`;
  response += `- [ ] End-to-end tests are running\n`;
  response += `- [ ] Test results are recorded\n`;
  response += `- [ ] Failed tests are documented\n\n`;
  
  response += `### 4. Common Test Commands\n`;
  response += `\`\`\`bash\n`;
  response += `# Run all tests\n`;
  response += `npm test\n\n`;
  response += `# Run specific test file\n`;
  response += `npm test -- --testPathPattern=ComponentName\n\n`;
  response += `# Run tests with coverage\n`;
  response += `npm test -- --coverage\n\n`;
  response += `# Run tests in watch mode\n`;
  response += `npm test -- --watch\n\n`;
  response += `# Run integration tests\n`;
  response += `npm run test:integration\n\n`;
  response += `# Run end-to-end tests\n`;
  response += `npm run test:e2e\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 5. Update Test Strategy Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy",\n`;
  response += `    "content": "# Test Strategy\\n\\n## Test Execution Results\\n### ${testType} Tests - ${environment}\\n- **Date**: ${new Date().toLocaleDateString()}\\n- **Status**: [Passed/Failed]\\n- **Total Tests**: [Number]\\n- **Passed**: [Number]\\n- **Failed**: [Number]\\n- **Coverage**: [Percentage]\\n\\n## Test Results\\n- [Test result 1]\\n- [Test result 2]\\n\\n## Failed Tests\\n- [Failed test 1]\\n- [Failed test 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Executed ${testType} tests in ${environment}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Test Execution Tips**:\n`;
  response += `- Run tests frequently during development\n`;
  response += `- Fix failing tests immediately\n`;
  response += `- Monitor test coverage trends\n`;
  response += `- Document test failures clearly\n`;
  response += `- Keep test environment consistent\n`;
  response += `- Use CI/CD for automated testing\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 4. Test Report Prompt
export async function testingTestReportPrompt(args: {
  testRun?: string;
  environment?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const testRun = args.testRun || 'Test Run';
  const environment = args.environment || 'Development';
  
  let response = `📊 Test Report Generation Guide\n\n`;
  response += `📋 Test Run: ${testRun}\n`;
  response += `🌍 Environment: ${environment}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Generate Test Report:\n\n`;
  
  response += `### 1. Read Test Strategy\n`;
  response += `Review test execution results:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Test Report Generation Process\n`;
  response += `- Collect test execution data\n`;
  response += `- Analyze test results\n`;
  response += `- Calculate test metrics\n`;
  response += `- Identify test failures\n`;
  response += `- Generate coverage report\n`;
  response += `- Document findings\n`;
  response += `- Create recommendations\n`;
  response += `- Update test documentation\n\n`;
  
  response += `### 3. Test Report Structure\n`;
  response += `## Executive Summary\n`;
  response += `- Test execution overview\n`;
  response += `- Key metrics and trends\n`;
  response += `- Overall assessment\n\n`;
  response += `## Test Results\n`;
  response += `- Total tests executed\n`;
  response += `- Passed tests\n`;
  response += `- Failed tests\n`;
  response += `- Test coverage\n`;
  response += `- Performance metrics\n\n`;
  response += `## Failed Tests Analysis\n`;
  response += `- List of failed tests\n`;
  response += `- Root cause analysis\n`;
  response += `- Impact assessment\n`;
  response += `- Fix recommendations\n\n`;
  response += `## Recommendations\n`;
  response += `- Immediate actions\n`;
  response += `- Long-term improvements\n`;
  response += `- Process enhancements\n\n`;
  
  response += `### 4. Update Test Strategy Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy",\n`;
  response += `    "content": "# Test Strategy\\n\\n## Test Reports\\n### ${testRun} - ${environment}\\n- **Date**: ${new Date().toLocaleDateString()}\\n- **Total Tests**: [Number]\\n- **Passed**: [Number]\\n- **Failed**: [Number]\\n- **Coverage**: [Percentage]\\n\\n## Key Findings\\n- [Finding 1]\\n- [Finding 2]\\n\\n## Recommendations\\n- [Recommendation 1]\\n- [Recommendation 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Generated test report for ${testRun}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 5. Update Notes Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes",\n`;
  response += `    "content": "# Project Notes\\n\\n## Test Reports\\n- ${testRun} (${environment})\\n  - Date: ${new Date().toLocaleDateString()}\\n  - Status: [Completed]\\n  - Key findings: [List findings]\\n\\n## Test Issues\\n- [Issue 1]\\n- [Issue 2]\\n\\n## Test Improvements\\n- [Improvement 1]\\n- [Improvement 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Generated test report"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Test Report Tips**:\n`;
  response += `- Include both quantitative and qualitative data\n`;
  response += `- Focus on actionable insights\n`;
  response += `- Track trends over time\n`;
  response += `- Provide clear recommendations\n`;
  response += `- Make reports accessible to stakeholders\n`;
  response += `- Use visualizations for better understanding\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 5. Performance Test Prompt
export async function testingPerformanceTestPrompt(args: {
  component?: string;
  loadType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const component = args.component || 'Application';
  const loadType = args.loadType || 'Load Testing';
  
  let response = `⚡ Performance Testing Guide\n\n`;
  response += `🎯 Component: ${component}\n`;
  response += `📊 Test Type: ${loadType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Perform Performance Testing:\n\n`;
  
  response += `### 1. Read System Architecture\n`;
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
  
  response += `### 2. Read Test Strategy\n`;
  response += `Review performance testing approach:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Performance Testing Process\n`;
  response += `- Define performance requirements\n`;
  response += `- Set up test environment\n`;
  response += `- Create test scenarios\n`;
  response += `- Execute load tests\n`;
  response += `- Monitor system metrics\n`;
  response += `- Analyze performance data\n`;
  response += `- Identify bottlenecks\n`;
  response += `- Generate performance report\n\n`;
  
  response += `### 4. Performance Test Checklist\n`;
  response += `- [ ] Performance requirements defined\n`;
  response += `- [ ] Test environment configured\n`;
  response += `- [ ] Test scenarios created\n`;
  response += `- [ ] Baseline measurements taken\n`;
  response += `- [ ] Load tests executed\n`;
  response += `- [ ] System metrics monitored\n`;
  response += `- [ ] Performance data analyzed\n`;
  response += `- [ ] Bottlenecks identified\n`;
  response += `- [ ] Performance report generated\n\n`;
  
  response += `### 5. Performance Metrics to Monitor\n`;
  response += `- Response time (average, 95th percentile)\n`;
  response += `- Throughput (requests per second)\n`;
  response += `- Error rate\n`;
  response += `- CPU usage\n`;
  response += `- Memory usage\n`;
  response += `- Network I/O\n`;
  response += `- Database performance\n`;
  response += `- Resource utilization\n\n`;
  
  response += `### 6. Update Test Strategy Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "test_strategy",\n`;
  response += `    "content": "# Test Strategy\\n\\n## Performance Tests\\n### ${component} - ${loadType}\\n- **Date**: ${new Date().toLocaleDateString()}\\n- **Test Scenarios**:\\n  - [Scenario 1]\\n  - [Scenario 2]\\n- **Performance Metrics**:\\n  - Response Time: [Value]\\n  - Throughput: [Value]\\n  - Error Rate: [Value]\\n\\n## Performance Requirements\\n- [Requirement 1]\\n- [Requirement 2]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Completed performance testing for ${component}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Performance Testing Tips**:\n`;
  response += `- Test in an environment similar to production\n`;
  response += `- Monitor all relevant system metrics\n`;
  response += `- Test with realistic data volumes\n`;
  response += `- Run tests for sufficient duration\n`;
  response += `- Document all test conditions\n`;
  response += `- Compare results against baselines\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
