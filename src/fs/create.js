import { join } from 'path';
import { writeFile, access } from 'fs/promises';
import { getPath } from '../utils/pathSolver.js';

const { __filename, __dirname } = getPath(import.meta.url);
const filePath = join(__dirname, 'files', 'fresh.txt');
const text = 'I am fresh and young';

const create = async () => {
  const fileExists = await isFileExists(filePath);
  if (!fileExists) {
    await writeFile(filePath, text);
  } else {
    throw new Error('FS operation failed');
  }
};

const isFileExists = async(file) => {
  try {
    await access(file)
    return true;
  } catch (err) {
    return false;
  }
}

await create();
