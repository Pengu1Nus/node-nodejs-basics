import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const compress = async () => {
  const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const destFilePath = path.join(__dirname, 'files', 'archive.gz');

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destFilePath);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File compressed');
  });

  writeStream.on('error', (err) => {
    console.error('Error:', err);
  });
};

await compress();
