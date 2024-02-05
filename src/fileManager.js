import { homedir } from 'node:os';
import { stat } from 'node:fs/promises';
import { up } from './up/up.js'
import { cd } from './cd/cd.js';
import { ls } from './ls/ls.js';
import { logOperationFailed, getProcessedPath, MULTIPLE_ARGS, MULTIPLE_ARGS_SEPARATOR, DEFAULT_EOL } from './utils.js';
import { cat } from './cat/cat.js';
import { add } from './add/add.js';
import { rn } from './rn/rn.js';
import { rm } from './rm/rm.js';
import { cp } from './cp/cp.js';
import { mv } from './mv/mv.js';
import { os } from './os/os.js';

const DEFAULT_PATH = homedir()
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
  os: 'os'
}
let username = 'anonymus'
let currentPath = DEFAULT_PATH

const setUserName = () => {
  const args = process.argv
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].startsWith('--username=')) {
      const name = args[i].split('--username=').join('')
      if (name) {
        username = name  
      }
    } 
  }
};

const sayHelloToUser = (username) => process.stdout.write(`Welcome to the File Manager, ${username}!${DEFAULT_EOL.repeat(2)}`)
const sayGoodbyeToUser = (username) => {
  process.stdout.write(`\n\nThank you for using File Manager, ${username}, goodbye!${DEFAULT_EOL}`);
  process.exit();
};

const logCurrentPath = (currentPath) => process.stdout.write(`You are currently in ${currentPath}${DEFAULT_EOL}`)

setUserName();
sayHelloToUser(username);
logCurrentPath(currentPath);
process.stdin.resume()

process.stdin.on('data', async function(chunk) {
  const command = chunk.toString().trim()
  if (command === COMMANDS.exit) sayGoodbyeToUser(username)
  if (command === COMMANDS.up) {
    const upperDirPath = up(currentPath)
    if (upperDirPath) {
      currentPath = upperDirPath
      logCurrentPath(currentPath)
    } else {
      logCurrentPath(currentPath)
      process.stdout.write(`You\'ve already reached top level${DEFAULT_EOL}`)
    }
  }
  if (command.startsWith(COMMANDS.cd + ' ')) {
    try {
      const inputPath = getProcessedPath(command, COMMANDS.cd.length + 1)
      const destination = cd(currentPath, inputPath)
      if (destination && destination !== currentPath) {
        const statit = await stat(destination)
        if (statit.isFile()) throw new Error('It\'s not path to directory')
        currentPath = destination
        logCurrentPath(currentPath)
      } else if (destination === currentPath) {
        process.stdout.write(`You\'re already in this directory${DEFAULT_EOL}`)
      }
    } catch (err) {
      logOperationFailed(err.message)
    }
  }
  if (command === COMMANDS.ls) {
    await ls(currentPath)
  }
  if (command.startsWith(COMMANDS.cat + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.cat.length + 1)
    await cat(currentPath, inputPath)
  }
  if (command.startsWith(COMMANDS.add + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.add.length + 1)
    await add(currentPath, inputPath)
  }
  if (command.startsWith(COMMANDS.rn + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.rn.length + 1, { flag: MULTIPLE_ARGS })
      .split(MULTIPLE_ARGS_SEPARATOR)
    await rn(currentPath, inputPath[0], inputPath[1])
  }
  if (command.startsWith(COMMANDS.rm + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.rm.length + 1)
    await rm(currentPath, inputPath)
  }
  if (command.startsWith(COMMANDS.cp + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.cp.length + 1, { flag: MULTIPLE_ARGS })
    .split(MULTIPLE_ARGS_SEPARATOR)
    await cp(currentPath, inputPath[0], inputPath[1])
  }
  if (command.startsWith(COMMANDS.mv + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.mv.length + 1, { flag: MULTIPLE_ARGS })
    .split(MULTIPLE_ARGS_SEPARATOR)
    await mv(currentPath, inputPath[0], inputPath[1])
  }
  if (command.startsWith(COMMANDS.os + ' ')) {
    const inputArg = getProcessedPath(command, COMMANDS.rm.length + 1)
    os(inputArg)
  }
});

process.on('SIGINT', () => sayGoodbyeToUser(username));