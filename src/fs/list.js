import fs from 'fs/promises';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const list = async () => {
  const dirPath = path.join(__dirname, 'files');

  try {
    await fs.access(dirPath);
  } catch (err) {
    throw new Error('FS operation failed');
  }

  const files = await fs.readdir(dirPath);
  console.log(files);
};

await list();
