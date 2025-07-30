import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { validateProjectRoot, getSoloflowPath } from '../context.js';
import { DocumentSummary, DocType } from '../types/docTypes.js';

/**
 * List all documents in the .soloflow directory
 */
export async function listHandler(args: { projectRoot: string }): Promise<DocumentSummary[]> {
  const { projectRoot } = args;
  
  // Validate project root
  const validation = validateProjectRoot(projectRoot);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }
  
  try {
    const soloflowPath = getSoloflowPath(projectRoot);
    const fs = await import('fs/promises');
    
    // Ensure .soloflow directory exists
    try {
      await fs.access(soloflowPath);
    } catch {
      // Directory doesn't exist, return empty array
      return [];
    }
    
    // Read all files in .soloflow directory
    const files = await readdir(soloflowPath);
    const documents: DocumentSummary[] = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const type = file.replace('.md', '') as DocType;
        const filePath = join(soloflowPath, file);
        
        try {
          const stats = await stat(filePath);
          
          // Try to extract title from file content
          let title: string | undefined;
          try {
            const content = await fs.readFile(filePath, 'utf-8');
            const firstLine = content.split('\n')[0];
            if (firstLine.startsWith('# ')) {
              title = firstLine.substring(2).trim();
            }
          } catch {
            // Ignore errors reading file content
          }
          
          documents.push({
            type,
            name: file,
            title,
            lastUpdated: stats.mtime
          });
        } catch {
          // Skip files that can't be read
        }
      }
    }
    
    return documents;
  } catch (error) {
    throw new Error(`Error listing documents: ${error}`);
  }
} 