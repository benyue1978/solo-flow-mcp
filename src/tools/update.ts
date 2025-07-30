import { validateProjectRoot, validateDocType, getDocumentPath, ensureSoloflowDirectory } from '../context.js';
import { DocType } from '../types/docTypes.js';

/**
 * Update document content by type
 */
export async function updateHandler(args: { projectRoot: string; type: DocType; content: string }): Promise<{ ok: true }> {
  const { projectRoot, type, content } = args;
  
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
  
  // Validate content is not empty
  if (!content || content.trim().length === 0) {
    throw new Error('Document content cannot be empty');
  }
  
  try {
    // Ensure .soloflow directory exists
    await ensureSoloflowDirectory(projectRoot);
    
    const documentPath = getDocumentPath(projectRoot, type);
    const fs = await import('fs/promises');
    
    // Write content to file
    await fs.writeFile(documentPath, content, 'utf-8');
    
    return { ok: true };
  } catch (error) {
    throw new Error(`Error updating document: ${error}`);
  }
} 