/**
 * Supported document types for SoloFlow MCP service
 * All documents are stored in .soloflow/ directory with .md extension
 */
export type DocType =
  | 'overview'
  | 'requirements'
  | 'system_architecture'
  | 'test_strategy'
  | 'ui_design'
  | 'tasks'
  | 'deployment'
  | 'notes';

/**
 * Validation result for project root and document type validation
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Document summary information returned by list operation
 */
export interface DocumentSummary {
  type: DocType;
  name: string;
  title?: string;
  lastUpdated: Date;
} 