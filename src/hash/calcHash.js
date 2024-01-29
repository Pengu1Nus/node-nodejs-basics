import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = crypto.createHash('sha256');
  const input = fs.createReadStream(filePath);

  input.on('readable', () => {
    const data = input.read();
    if (data) hash.update(data);
    else {
      console.log(hash.digest('hex'));
    }
  });
};

await calculateHash();
