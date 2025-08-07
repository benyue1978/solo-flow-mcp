/**
 * Path mapping system for SoloFlow MCP prompts
 * Maps user-friendly paths to actual prompt names
 */

export const PROMPT_MAPPING = {
  // Core functions - User-friendly paths -> Actual prompt names
  "core/init-project": "core-init-project",
  "core/check-project-status": "core-check-project-status",
  "core/generate-docs": "core-generate-docs",
  "core/setup-workspace": "core-setup-workspace",
  
  // Role-based functions
  "role/analyst-mode": "role-analyst-mode",
  "role/architect-mode": "role-architect-mode",
  "role/developer-mode": "role-developer-mode",
  "role/tester-mode": "role-tester-mode",
  "role/project-manager-mode": "role-project-manager-mode",
  
  // Task management functions
  "task/add-task": "task-add-task",
  "task/breakdown-requirements": "task-breakdown-requirements",
  "task/breakdown-architecture": "task-breakdown-architecture",
  "task/create-epic": "task-create-epic",
  "task/create-story": "task-create-story",
  "task/estimate-tasks": "task-estimate-tasks",
  
  // Requirements analysis functions
  "requirements/analyze-requirements": "requirements-analyze-requirements",
  "requirements/validate-requirements": "requirements-validate-requirements",
  "requirements/prioritize-requirements": "requirements-prioritize-requirements",
  
  // Design functions
  "design/create-ui": "design-create-ui",
  "design/system-architecture": "design-system-architecture",
  "design/api-interface": "design-api-interface",
  "design/database-schema": "design-database-schema",
  "design/review-design": "design-review-design",
  
  // Development functions
  "development/write-code": "development-write-code",
  "development/fix-bug": "development-fix-bug",
  "development/refactor-code": "development-refactor-code",
  "development/code-review-checklist": "development-code-review-checklist",
  
  // Testing functions
  "testing/create-test-plan": "testing-create-test-plan",
  "testing/write-unit-tests": "testing-write-unit-tests",
  "testing/run-tests": "testing-run-tests",
  "testing/test-report": "testing-test-report",
  "testing/performance-test": "testing-performance-test",
  
  // Release functions
  "release/commit-changes": "release-commit-changes",
  "release/create-release": "release-create-release",
  "release/deployment-checklist": "release-deployment-checklist",
  "release/rollback-plan": "release-rollback-plan",
  "release/monitor-deployment": "release-monitor-deployment"
};

// Reverse mapping: Actual names -> User-friendly paths
export const PROMPT_REVERSE_MAPPING = Object.fromEntries(
  Object.entries(PROMPT_MAPPING).map(([key, value]) => [value, key])
);

/**
 * Resolve user-friendly path to actual prompt name
 */
export function resolvePromptPath(userPath: string): string {
  // User input: /soloflow-mcp/core/init-project
  // Returns: core-init-project (actual registered name)
  
  const path = userPath.replace('/soloflow-mcp/', '');
  return PROMPT_MAPPING[path as keyof typeof PROMPT_MAPPING] || path;
}

/**
 * Get user-friendly display name from actual prompt name
 */
export function getPromptDisplayName(actualName: string): string {
  // Actual name: core-init-project
  // Returns: core/init-project (user-friendly display)
  
  return PROMPT_REVERSE_MAPPING[actualName] || actualName;
}
