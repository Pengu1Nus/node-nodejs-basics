import path from 'path';
import { spawn } from 'child_process';
import { getPath } from '../utils/pathSolver.js';

const { __dirname } = getPath(import.meta.url);
const scriptPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit', 'ipc'],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('error', (err) => {
    console.error('Error:', err);
  });

  child.on('exit', (code, signal) => {
    if (code) {
      console.log(`Child process finished: ${code}`);
    } else if (signal) {
      console.log(`Child process end: ${signal}`);
    } else {
      console.log('Child process finished successfully');
    }
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(process.argv.slice(2));
