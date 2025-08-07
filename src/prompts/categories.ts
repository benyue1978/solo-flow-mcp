/**
 * Prompt category definitions for SoloFlow MCP
 * Manages different categories of prompts
 */

export const PROMPT_CATEGORIES = {
  core: {
    name: 'Core Functions',
    description: 'Essential project management functions',
    prompts: ['init-project', 'check-project-status', 'generate-docs', 'setup-workspace']
  },
  role: {
    name: 'Role-based Functions',
    description: 'Specialized functions for different development roles',
    prompts: ['analyst-mode', 'architect-mode', 'developer-mode', 'tester-mode', 'project-manager-mode']
  },
  task: {
    name: 'Task Management',
    description: 'Advanced task management and breakdown functions',
    prompts: ['add-task', 'breakdown-requirements', 'breakdown-architecture', 'create-epic', 'create-story', 'estimate-tasks']
  },
  requirements: {
    name: 'Requirements Analysis',
    description: 'Requirements analysis and management functions',
    prompts: ['analyze-requirements', 'validate-requirements', 'prioritize-requirements']
  },
  development: {
    name: 'Development Functions',
    description: 'Code implementation and development functions',
    prompts: ['write-code', 'fix-bug', 'refactor-code', 'code-review-checklist']
  },
  testing: {
    name: 'Testing Functions',
    description: 'Testing and quality assurance functions',
    prompts: ['create-test-plan', 'write-unit-tests', 'run-tests', 'test-report', 'performance-test']
  },
  release: {
    name: 'Release Management',
    description: 'Complete release and deployment lifecycle management',
    prompts: ['commit-changes', 'create-release', 'deployment-checklist', 'rollback-plan', 'monitor-deployment']
  }
};

/**
 * Get all prompts for a specific category
 */
export function getCategoryPrompts(category: string): string[] {
  return PROMPT_CATEGORIES[category as keyof typeof PROMPT_CATEGORIES]?.prompts || [];
}

/**
 * Get category information
 */
export function getCategoryInfo(category: string) {
  return PROMPT_CATEGORIES[category as keyof typeof PROMPT_CATEGORIES];
}

/**
 * Get all available categories
 */
export function getAllCategories(): string[] {
  return Object.keys(PROMPT_CATEGORIES);
}
