import { homedir } from 'node:os';
import { getUpDirPath } from './up/up.js'

const DEFAULT_PATH = homedir()
const COMMANDS = {
  exit: '.exit',
  up: 'up',
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

process.stdin.on('data', function(chunk, key) {
  const command = chunk.toString().trim();
  if (command === COMMANDS.exit) sayGoodbyeToUser(username)
  if (command === COMMANDS.up) {
    const upperDirPath = getUpDirPath(currentPath)
    if (upperDirPath) {
      currentPath = upperDirPath
      logCurrentPath(currentPath)
    } else {
      logCurrentPath(currentPath)
      console.log('You\'ve already reached top level\n')
    }
  }
});

process.on('SIGINT', () => sayGoodbyeToUser(username));