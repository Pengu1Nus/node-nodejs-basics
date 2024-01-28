import path from 'path';
import fs from 'fs/promises';
import { getPath } from '../utils/pathSolver.js';

const { __filename, __dirname } = getPath(import.meta.url);


const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    try {
        await fs.access(sourceDir);
    } catch (err) {
        throw new Error('FS operation failed')
    }

    try {
        await fs.access(destDir);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.message !== 'FS operation failed') {
            await fs.mkdir(destDir);
        } else {
            throw err;
        }
    }
    
    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const sourceFile = path.join(sourceDir, file);
      const destFile = path.join(destDir, file);
  
      await fs.copyFile(sourceFile, destFile);
    }
};

await copy();
