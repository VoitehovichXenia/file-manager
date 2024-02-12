import { up } from '../commands/up.js'
import { cd } from '../commands/cd.js';
import { ls } from '../commands/ls.js';
import { cat } from '../commands/cat.js';
import { add } from '../commands/add.js';
import { rn } from '../commands/rn.js';
import { rm } from '../commands/rm.js';
import { cp } from '../commands/cp.js';
import { os } from '../commands/os.js';
import { hash } from '../commands/hash.js';
import { compress } from '../commands/compress.js';
import { decompress } from '../commands/decompress.js';

import { COMMANDS, getCurrentPath, setCurrentPath, DEFAULT_EOL, MULTIPLE_ARGS_FLAG, MULTIPLE_ARGS_SEPARATOR, COMMAND_MV } from '../constants.js';
import { getProcessedPath } from '../utils/getProcessedPath.js';
import { logInvalidInput } from '../utils/logs.js';

export const handleUserInput = async ({ userInput, readlineInterface }) => {
  const command = userInput.toString().trim();
  const currentPath = getCurrentPath();
  if (command === COMMANDS.exit) readlineInterface.close();
  else if (command === COMMANDS.up) {
    const upperDirPath = up(currentPath);
    if (upperDirPath) {
      setCurrentPath(upperDirPath);
    } else {
      process.stdout.write(`You\'ve already reached top level${DEFAULT_EOL}`);
    }
  }
  else if (command.startsWith(COMMANDS.cd + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.cd.length + 1);
    const destination = await cd(currentPath, inputPath);
    if (destination && destination !== currentPath) {
      setCurrentPath(destination);
    }
  }
  else if (command === COMMANDS.ls) {
    await ls(currentPath)
  }
  else if (command.startsWith(COMMANDS.cat + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.cat.length + 1);
    await cat(currentPath, inputPath);
    return false;
  }
  else if (command.startsWith(COMMANDS.add + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.add.length + 1);
    await add(currentPath, inputPath);
  }
  else if (command.startsWith(COMMANDS.rn + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.rn.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);
    await rn(currentPath, inputPath[0], inputPath[1]);
  }
  else if (command.startsWith(COMMANDS.rm + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.rm.length + 1);
    await rm(currentPath, inputPath);
  }
  else if (command.startsWith(COMMANDS.cp + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.cp.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);
    await cp(currentPath, inputPath[0], inputPath[1]);
  }
  else if (command.startsWith(COMMANDS.mv + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.mv.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);
    await cp(currentPath, inputPath[0], inputPath[1], COMMAND_MV);
    await rm(currentPath, inputPath[0], COMMAND_MV);
  }
  else if (command.startsWith(COMMANDS.os + ' ')) {
    const inputArg = getProcessedPath(command, COMMANDS.os.length + 1);
    os(inputArg);
  }
  else if (command.startsWith(COMMANDS.hash + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.hash.length + 1);
    await hash(currentPath, inputPath);
  }
  else if (command.startsWith(COMMANDS.compress + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.compress.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);
    await compress(currentPath, inputPath[0], inputPath[1]);
  }
  else if (command.startsWith(COMMANDS.decompress + ' ')) {
    const inputPath = getProcessedPath(command, COMMANDS.decompress.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);
    await decompress(currentPath, inputPath[0], inputPath[1]);
  }
  else {
    logInvalidInput();
  }
  return true;
}