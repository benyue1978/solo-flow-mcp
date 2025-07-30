import { validateProjectRoot, validateDocType, getDocumentPath, ensureSoloflowDirectory } from '../context.js';
import { DocType } from '../types/docTypes.js';

/**
 * Read document content by type
 */
export async function readHandler(args: { projectRoot: string; type: DocType }): Promise<{ raw: string | null }> {
  const { projectRoot, type } = args;
  
  // Validate project root
  const rootValidation = validateProjectRoot(projectRoot);
  if (!rootValidation.isValid) {
    throw new Error(rootValidation.error);
  }
  
  // Validate document type
  const typeValidation = validateDocType(type);
  if (!typeValidation.isValid) {
    throw new Error(typeValidation.error);
  }
  
  try {
    const documentPath = getDocumentPath(projectRoot, type);
    const fs = await import('fs/promises');
    
    // Check if file exists
    try {
      await fs.access(documentPath);
    } catch {
      // File doesn't exist, return null
      return { raw: null };
    }
    
    // Read file content
    const content = await fs.readFile(documentPath, 'utf-8');
    return { raw: content };
  } catch (error) {
    throw new Error(`Error reading document: ${error}`);
  }
} 