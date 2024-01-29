import fs from 'fs';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  const readStream = fs.createReadStream(filePath);

  readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on('end', () => {
    process.stdout.write('\n');
  });

  readStream.on('error', (err) => {
    console.error('Error:', err);
  });
};

await read();
