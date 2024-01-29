import fs from 'fs/promises';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const rename = async () => {
  const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
  const newPath = path.join(__dirname, 'files', 'properFilename.md');

  try {
    await fs.access(oldPath);
  } catch (err) {
    throw new Error('FS operation failed');
  }

  try {
    await fs.access(newPath);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.message !== 'FS operation failed') {
      await fs.rename(oldPath, newPath);
    } else {
      throw err;
    }
  }
};

await rename();
