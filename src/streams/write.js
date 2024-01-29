import fs from 'fs';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = fs.createWriteStream(filePath);

  process.stdin.pipe(writeStream);

  process.stdin.on('end', () => {
    console.log('Finish writing.');
  });

  writeStream.on('error', (err) => {
    console.error('Error:', err);
  });
};

await write();
