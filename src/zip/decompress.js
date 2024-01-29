import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const decompress = async () => {
  const sourceFilePath = path.join(__dirname, 'files', 'archive.gz');
  const destFilePath = path.join(__dirname, 'files', 'fileToCompress1.txt');

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destFilePath);
  const gunzip = zlib.createGunzip();

  readStream.pipe(gunzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File decompressed.');
  });

  writeStream.on('error', (err) => {
    console.error('Error:', err);
  });
};

await decompress();
