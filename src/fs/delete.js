import fs from 'fs/promises';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const remove = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await fs.access(filePath);
  } catch (err) {
    throw new Error('FS operation failed');
  }
  await fs.unlink(filePath);
};

await remove();
