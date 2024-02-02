import { homedir } from 'node:os';
import { stat } from 'node:fs/promises';
import { getUpDirPath } from './up/up.js'
import { cd } from './cd/cd.js';
import { logOperationFailed } from './utils.js';

const DEFAULT_PATH = homedir()
const COMMANDS = {
  exit: '.exit',
  up: 'up',
  cd: 'cd',
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

const sayHelloToUser = (username) => process.stdout.write(`Welcome to the File Manager, ${username}!\n\n`)
const sayGoodbyeToUser = (username) => {
  process.stdout.write(`\n\nThank you for using File Manager, ${username}, goodbye!\n`);
  process.exit();
};

const logCurrentPath = (currentPath) => process.stdout.write(`You are currently in ${currentPath}\n`)

setUserName();
sayHelloToUser(username);
logCurrentPath(currentPath);
process.stdin.resume()

process.stdin.on('data', async function(chunk) {
  const command = chunk.toString().trim()
  if (command === COMMANDS.exit) sayGoodbyeToUser(username)
  if (command === COMMANDS.up) {
    const upperDirPath = getUpDirPath(currentPath)
    if (upperDirPath) {
      currentPath = upperDirPath
      logCurrentPath(currentPath)
    } else {
      logCurrentPath(currentPath)
      process.stdout.write('You\'ve already reached top level\n')
    }
  }
  if (command.startsWith(COMMANDS.cd + ' ')) {
    try {
      const inputPath = command.slice(3)
      const destination = cd(currentPath, inputPath)
      if (destination && destination !== currentPath) {
        const statit = await stat(destination)
        if (statit.isFile()) throw new Error('It\'s not path to directory')
        currentPath = destination
        logCurrentPath(currentPath)
      } else if (destination === currentPath) {
        process.stdout.write('You\'re already in this directory\n')
      }
    } catch (err) {
      logOperationFailed(err.message)
    }
  }
});

process.on('SIGINT', () => sayGoodbyeToUser(username));