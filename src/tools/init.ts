import { join } from 'path';
import { validateProjectRoot, ensureSoloflowDirectory } from '../context.js';

/**
 * Initialize project configuration
 */
export async function initHandler(args: { projectRoot: string }): Promise<{ 
  ok: true; 
  createdFiles: string[]; 
  skippedFiles: string[]; 
  message: string;
}> {
  const { projectRoot } = args;
  
  // Validate project root
  const validation = validateProjectRoot(projectRoot);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }
  
  const createdFiles: string[] = [];
  const skippedFiles: string[] = [];
  
  try {
    const fs = await import('fs/promises');
    
    // Ensure .soloflow directory exists
    await ensureSoloflowDirectory(projectRoot);
    
    // Create .cursor/rules directory
    const cursorRulesDir = join(projectRoot, '.cursor', 'rules');
    try {
      await fs.access(cursorRulesDir);
    } catch {
      await fs.mkdir(cursorRulesDir, { recursive: true });
    }
    
    // Create soloflow.mdc file
    const soloflowMdcPath = join(cursorRulesDir, 'soloflow.mdc');
    
    // Read the soloflow.mdc content from resources
    // Use path relative to the project root
    const resourcePath = join(process.cwd(), 'src', 'resources', 'soloflow.mdc');
    const soloflowMdcContent = await fs.readFile(resourcePath, 'utf-8');
    
    try {
      await fs.access(soloflowMdcPath);
      skippedFiles.push('.cursor/rules/soloflow.mdc');
    } catch {
      await fs.writeFile(soloflowMdcPath, soloflowMdcContent, 'utf-8');
      createdFiles.push('.cursor/rules/soloflow.mdc');
    }
    
    // Generate detailed message
    let message = '';
    if (createdFiles.length > 0) {
      message += `✅ Created files: ${createdFiles.join(', ')}\n`;
    }
    if (skippedFiles.length > 0) {
      message += `⚠️  Skipped existing files: ${skippedFiles.join(', ')}\n`;
      message += `   These files already exist and were not overwritten.\n`;
    }
    
    if (createdFiles.length === 0 && skippedFiles.length === 0) {
      message = 'ℹ️  No files were created or modified.';
    } else if (createdFiles.length > 0 && skippedFiles.length === 0) {
      message += '🎉 Project initialization completed successfully!';
    } else if (createdFiles.length === 0 && skippedFiles.length > 0) {
      message += 'ℹ️  Project is already initialized. All required files exist.';
    } else {
      message += '🔄 Project initialization completed with some existing files preserved.';
    }
    
    return { ok: true, createdFiles, skippedFiles, message };
  } catch (error) {
    throw new Error(`Error initializing project: ${error}`);
  }
} 