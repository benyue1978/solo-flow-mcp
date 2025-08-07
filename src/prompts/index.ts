/**
 * SoloFlow MCP Prompts Index
 * Central registry for all prompts organized by category
 */

// Import mapping and categories
import { resolvePromptPath } from './mapping.js';
import { getAllCategories } from './categories.js';

// Import core prompts
import {
  coreInitProjectPrompt,
  coreCheckProjectStatusPrompt
} from './core-prompts.js';

// Import role prompts
import {
  roleAnalystModePrompt,
  roleArchitectModePrompt,
  roleDeveloperModePrompt,
  roleTesterModePrompt,
  roleProjectManagerModePrompt
} from './role-prompts.js';

// Import task prompts
import {
  taskAddTaskPrompt,
  taskBreakdownRequirementsPrompt,
  taskBreakdownArchitecturePrompt,
  taskCreateEpicPrompt,
  taskCreateStoryPrompt,
  taskEstimateTasksPrompt
} from './task-prompts.js';

// Import requirements prompts
import {
  requirementsAnalyzeRequirementsPrompt,
  requirementsValidateRequirementsPrompt,
  requirementsPrioritizeRequirementsPrompt
} from './requirements-prompts.js';

// Import development prompts
import {
  developmentWriteCodePrompt,
  developmentFixBugPrompt,
  developmentRefactorCodePrompt,
  developmentCodeReviewChecklistPrompt
} from './development-prompts.js';

// Import testing prompts
import {
  testingCreateTestPlanPrompt,
  testingWriteUnitTestsPrompt,
  testingRunTestsPrompt,
  testingTestReportPrompt,
  testingPerformanceTestPrompt
} from './testing-prompts.js';

// Import release prompts
import {
  releaseCommitChangesPrompt,
  releaseCreateReleasePrompt,
  releaseDeploymentChecklistPrompt,
  releaseRollbackPlanPrompt,
  releaseMonitorDeploymentPrompt
} from './release-prompts.js';

// Import docs prompts
import {
  docsGenerateDocsPrompt
} from './docs-prompts.js';

// Import workspace prompts
import {
  workspaceSetupWorkspacePrompt
} from './workspace-prompts.js';

// Export all prompts for registration
export const ALL_PROMPTS = {
  // Core prompts
  'core-init-project': coreInitProjectPrompt,
  'core-check-project-status': coreCheckProjectStatusPrompt,
  'core-generate-docs': docsGenerateDocsPrompt,
  'core-setup-workspace': workspaceSetupWorkspacePrompt,
  
  // Role prompts
  'role-analyst-mode': roleAnalystModePrompt,
  'role-architect-mode': roleArchitectModePrompt,
  'role-developer-mode': roleDeveloperModePrompt,
  'role-tester-mode': roleTesterModePrompt,
  'role-project-manager-mode': roleProjectManagerModePrompt,
  
  // Task prompts
  'task-add-task': taskAddTaskPrompt,
  'task-breakdown-requirements': taskBreakdownRequirementsPrompt,
  'task-breakdown-architecture': taskBreakdownArchitecturePrompt,
  'task-create-epic': taskCreateEpicPrompt,
  'task-create-story': taskCreateStoryPrompt,
  'task-estimate-tasks': taskEstimateTasksPrompt,
  
  // Requirements prompts
  'requirements-analyze-requirements': requirementsAnalyzeRequirementsPrompt,
  'requirements-validate-requirements': requirementsValidateRequirementsPrompt,
  'requirements-prioritize-requirements': requirementsPrioritizeRequirementsPrompt,
  
  // Development prompts
  'development-write-code': developmentWriteCodePrompt,
  'development-fix-bug': developmentFixBugPrompt,
  'development-refactor-code': developmentRefactorCodePrompt,
  'development-code-review-checklist': developmentCodeReviewChecklistPrompt,
  
  // Testing prompts
  'testing-create-test-plan': testingCreateTestPlanPrompt,
  'testing-write-unit-tests': testingWriteUnitTestsPrompt,
  'testing-run-tests': testingRunTestsPrompt,
  'testing-test-report': testingTestReportPrompt,
  'testing-performance-test': testingPerformanceTestPrompt,
  
  // Release prompts
  'release-commit-changes': releaseCommitChangesPrompt,
  'release-create-release': releaseCreateReleasePrompt,
  'release-deployment-checklist': releaseDeploymentChecklistPrompt,
  'release-rollback-plan': releaseRollbackPlanPrompt,
  'release-monitor-deployment': releaseMonitorDeploymentPrompt
};

// Export mapping and category utilities
export { resolvePromptPath } from './mapping.js';
export { getAllCategories, getCategoryPrompts, getCategoryInfo } from './categories.js';
