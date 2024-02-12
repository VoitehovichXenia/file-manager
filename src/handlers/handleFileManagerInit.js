import { setUsername, DEFAULT_EOL, getCurrentPath, getUsername } from '../constants.js';
import { logAfterEachOperation } from '../utils/logs.js';

export const handleFileManagerInit = () => {
  const args = process.argv;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].startsWith('--username=')) {
      const name = args[i].split('--username=').join('');
      if (name) {
        setUsername(name)
      }
    } 
  }
  process.stdout.write(`Welcome to the File Manager, ${getUsername()}!${DEFAULT_EOL.repeat(2)}`)
  logAfterEachOperation(getCurrentPath())
}