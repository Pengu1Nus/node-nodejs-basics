import fs from 'fs/promises';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    await fs.access(filePath);
  } catch (err) {
    throw new Error('FS operation failed');
  }

  const content = await fs.readFile(filePath, 'utf8');
  console.log(content);
};

await read();
