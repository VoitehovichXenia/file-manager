import { homedir } from 'node:os';
import * as readline from 'node:readline/promises';
import { up } from './up/up.js'
import { cd } from './cd/cd.js';
import { ls } from './ls/ls.js';
import { cat } from './cat/cat.js';
import { add } from './add/add.js';
import { rn } from './rn/rn.js';
import { rm } from './rm/rm.js';
import { cp } from './cp/cp.js';
import { mv } from './mv/mv.js';
import { os } from './os/os.js';
import { hash } from './hash/hash.js';
import { compress } from './compress/compress.js';
import { decompress } from './decompress/decompress.js';
import {
  getProcessedPath,
  MULTIPLE_ARGS,
  MULTIPLE_ARGS_SEPARATOR,
  DEFAULT_EOL,
  logInvalidInput,
  logCurrentPath,
  logPrompt
} from './utils.js';

const DEFAULT_PATH = homedir();
const COMMANDS = {
  exit: '.exit',
  up: 'up',
  cd: 'cd',
  ls: 'ls',
  cat: 'cat',
  add: 'add',
  rn: 'rn',
  rm: 'rm',
  cp: 'cp',
  mv: 'mv',
  os: 'os',
  hash: 'hash',
  compress: 'compress',
  decompress: 'decompress',
};
let username = 'Anonymus';
let currentPath = DEFAULT_PATH;

const setUserName = () => {
  const args = process.argv;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].startsWith('--username=')) {
      const name = args[i].split('--username=').join('');
      if (name) {
        username = name;
      }
    } 
  }
};

(function () {
  setUserName();
  process.stdout.write(`Welcome to the File Manager, ${username}!${DEFAULT_EOL.repeat(2)}`)
  logCurrentPath(currentPath);
  logPrompt();

  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readlineInterface.on('line', async (chunk) => {
    const command = chunk.toString().trim();
    if (command === COMMANDS.exit) readlineInterface.close();
    else if (command === COMMANDS.up) {
      const upperDirPath = up(currentPath);
      if (upperDirPath) {
        currentPath = upperDirPath;
        logCurrentPath(currentPath);
        logPrompt();
      } else {
        logCurrentPath(currentPath);
        process.stdout.write(`You\'ve already reached top level${DEFAULT_EOL}`);
        logPrompt();
      }
    }
    else if (command.startsWith(COMMANDS.cd + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.cd.length + 1);
      const destination = await cd(currentPath, inputPath);
      if (destination && destination !== currentPath) {
        currentPath = destination;
      }
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command === COMMANDS.ls) {
      await ls(currentPath)
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command.startsWith(COMMANDS.cat + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.cat.length + 1);
      await cat(currentPath, inputPath);
    }
    else if (command.startsWith(COMMANDS.add + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.add.length + 1);
      await add(currentPath, inputPath);
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command.startsWith(COMMANDS.rn + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.rn.length + 1, { flag: MULTIPLE_ARGS }).split(MULTIPLE_ARGS_SEPARATOR);
      await rn(currentPath, inputPath[0], inputPath[1]);
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command.startsWith(COMMANDS.rm + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.rm.length + 1);
      await rm(currentPath, inputPath);
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command.startsWith(COMMANDS.cp + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.cp.length + 1, { flag: MULTIPLE_ARGS }).split(MULTIPLE_ARGS_SEPARATOR);
      await cp(currentPath, inputPath[0], inputPath[1]);
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command.startsWith(COMMANDS.mv + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.mv.length + 1, { flag: MULTIPLE_ARGS }).split(MULTIPLE_ARGS_SEPARATOR);
      await mv(currentPath, inputPath[0], inputPath[1]);
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command.startsWith(COMMANDS.os + ' ')) {
      const inputArg = getProcessedPath(command, COMMANDS.os.length + 1);
      os(inputArg);
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command.startsWith(COMMANDS.hash + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.hash.length + 1);
      await hash(currentPath, inputPath);
    }
    else if (command.startsWith(COMMANDS.compress + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.compress.length + 1, { flag: MULTIPLE_ARGS }).split(MULTIPLE_ARGS_SEPARATOR);
      await compress(currentPath, inputPath[0], inputPath[1]);
      logCurrentPath(currentPath);
      logPrompt();
    }
    else if (command.startsWith(COMMANDS.decompress + ' ')) {
      const inputPath = getProcessedPath(command, COMMANDS.decompress.length + 1, { flag: MULTIPLE_ARGS }).split(MULTIPLE_ARGS_SEPARATOR);
      await decompress(currentPath, inputPath[0], inputPath[1]);
      logCurrentPath(currentPath);
      logPrompt();
    }
    else {
      logInvalidInput();
      logCurrentPath(currentPath);
      logPrompt();
    }
  });

  readlineInterface.on("close", () => {
    process.stdout.write(`\n\nThank you for using File Manager, ${username}, goodbye!${DEFAULT_EOL}`);
  });
})()