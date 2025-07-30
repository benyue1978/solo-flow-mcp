import { join, isAbsolute, resolve } from 'path';
import { existsSync, statSync } from 'fs';
import { DocType, ValidationResult } from './types/docTypes.js';

/**
 * Validate project root path for security and correctness
 */
export function validateProjectRoot(projectRoot: string): ValidationResult {
  try {
    // Must be absolute path
    if (!isAbsolute(projectRoot)) {
      return {
        isValid: false,
        error: 'Project root must be an absolute path'
      };
    }
    
    // Resolve to canonical path
    const resolvedPath = resolve(projectRoot);
    
    // Basic security check - ensure it's not trying to access system directories
    const forbiddenPrefixes = [
      '/etc/', '/var/', '/usr/', '/bin/', '/sbin/', '/dev/', '/proc/', '/sys/',
      'C:\\Windows\\', 'C:\\System32\\', 'C:\\Program Files\\', 'C:\\Program Files (x86)\\'
    ];
    
    for (const prefix of forbiddenPrefixes) {
      if (resolvedPath.startsWith(prefix)) {
        return {
          isValid: false,
          error: 'Access to system directories is not allowed'
        };
      }
    }
    
    // Check if directory exists
    if (!existsSync(resolvedPath)) {
      return {
        isValid: false,
        error: 'Project root directory does not exist'
      };
    }
    
    // Check if it's actually a directory (only if it exists)
    const stats = statSync(resolvedPath);
    if (!stats.isDirectory()) {
      return {
        isValid: false,
        error: 'Project root must be a directory'
      };
    }
    
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: `Error validating project root: ${error}`
    };
  }
}

/**
 * Validate document type against allowed types
 */
export function validateDocType(type: string): ValidationResult {
  const validTypes: DocType[] = [
    'overview',
    'requirements',
    'system_architecture',
    'test_strategy',
    'ui_design',
    'tasks',
    'deployment',
    'notes'
  ];
  
  if (!validTypes.includes(type as DocType)) {
    return {
      isValid: false,
      error: `Invalid document type: ${type}. Valid types are: ${validTypes.join(', ')}`
    };
  }
  
  return { isValid: true };
}

/**
 * Get the .soloflow directory path for a project
 */
export function getSoloflowPath(projectRoot: string): string {
  return join(projectRoot, '.soloflow');
}

/**
 * Get the full path for a specific document
 */
export function getDocumentPath(projectRoot: string, type: DocType): string {
  const soloflowPath = getSoloflowPath(projectRoot);
  return join(soloflowPath, `${type}.md`);
}

/**
 * Ensure .soloflow directory exists
 */
export async function ensureSoloflowDirectory(projectRoot: string): Promise<void> {
  const soloflowPath = getSoloflowPath(projectRoot);
  const fs = await import('fs/promises');
  
  try {
    await fs.access(soloflowPath);
  } catch {
    await fs.mkdir(soloflowPath, { recursive: true });
  }
} 