import { resolve } from 'node:path';

import { up } from '../commands/up.js';
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
import { mkdir } from '../commands/mkdir.js';

import { validateCPInput } from '../validators/cp_input.js';
import { validateCDInput } from '../validators/cd_input.js';
import { validateCATInput } from '../validators/cat_input.js';
import { validateADDInput } from '../validators/add_input.js';
import { validateRMInput } from '../validators/rm_input.js';
import { validateCOMPRESSInput } from '../validators/compress_input.js';
import { validateDECOMPRESSInput } from '../validators/decompress_input.js';
import { validateHASHInput } from '../validators/hash_input.js';
import { validateMKDIRInput } from '../validators/mkdir_input.js';
import { validateRNInput } from '../validators/rn_input.js';

import { COMMANDS, getCurrentPath, setCurrentPath, DEFAULT_EOL, MULTIPLE_ARGS_FLAG, MULTIPLE_ARGS_SEPARATOR, ALREADY_IN_DIR_ERROR } from '../constants.js';
import { getProcessedPath } from '../utils/getProcessedPath.js';
import { logAfterEachOperation, logInvalidInput } from '../utils/logs.js';


export const handleUserInput = async ({ userInput, readlineInterface }) => {
  const command = userInput.toString().trim();
  const currentPath = getCurrentPath();
  try {
    if (command === COMMANDS.exit) readlineInterface.close();
    else if (command === COMMANDS.up) {
      const upperDirPath = up(currentPath);
      if (upperDirPath) {
        setCurrentPath(upperDirPath);
      } else {
        process.stdout.write(`You've already reached top level${DEFAULT_EOL}`);
      }
    }
    else if (command.startsWith(COMMANDS.cd + ' ')) {
      const destination = getProcessedPath(command, COMMANDS.cd.length + 1);

      if (!(await validateCDInput(currentPath, destination))) throw new Error();

      await cd(currentPath, destination);
    }
    else if (command === COMMANDS.ls) {
      await ls(currentPath);
    }
    else if (command.startsWith(COMMANDS.cat + ' ')) {
      const filename = getProcessedPath(command, COMMANDS.cat.length + 1);

      if (!validateCATInput(currentPath, filename)) throw new Error();

      await cat(currentPath, filename);
      return false;
    }
    else if (command.startsWith(COMMANDS.add + ' ')) {
      const filename = getProcessedPath(command, COMMANDS.add.length + 1);

      if (!validateADDInput(currentPath, filename)) throw new Error();

      await add(currentPath, filename);
    }
    else if (command.startsWith(COMMANDS.rn + ' ')) {
      const [oldFilename, newFilename] = getProcessedPath(command, COMMANDS.rn.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);

      if (!validateRNInput(currentPath, oldFilename, newFilename)) throw new Error;

      await rn(currentPath, oldFilename, newFilename);
    }
    else if (command.startsWith(COMMANDS.rm + ' ')) {
      const filename = getProcessedPath(command, COMMANDS.rm.length + 1);

      if (!(await validateRMInput(currentPath, filename))) throw new Error;

      await rm(currentPath, filename, { onlyFiles: true, messageLog: true });
    }
    else if (command.startsWith(COMMANDS.cp + ' ')) {
      const [src, destination] = getProcessedPath(command, COMMANDS.cp.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);

      if (!(await validateCPInput(currentPath, src, destination))) throw new Error();

      await cp(currentPath, src, destination, { isFileMoved: false });
    }
    else if (command.startsWith(COMMANDS.mv + ' ')) {
      const [src, destination] = getProcessedPath(command, COMMANDS.mv.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);

      if (!(await validateCPInput(currentPath, src, destination))) throw new Error();

      await cp(currentPath, src, destination, { isFileMoved: true });
      await rm(currentPath, src, { onlyFiles: true, messageLog: false });
    }
    else if (command.startsWith(COMMANDS.hash + ' ')) {
      const filename = getProcessedPath(command, COMMANDS.hash.length + 1);

      if(!(await validateHASHInput(currentPath, filename))) throw new Error;

      await hash(currentPath, filename);
    }
    else if (command.startsWith(COMMANDS.compress + ' ')) {
      const [filename, destination] = getProcessedPath(command, COMMANDS.compress.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);

      if (!(await validateCOMPRESSInput(currentPath, filename, destination))) throw new Error;

      await compress(currentPath);
    }
    else if (command.startsWith(COMMANDS.decompress + ' ')) {
      const [filename, destination] = getProcessedPath(command, COMMANDS.decompress.length + 1, { flag: MULTIPLE_ARGS_FLAG }).split(MULTIPLE_ARGS_SEPARATOR);

      if (!(await validateDECOMPRESSInput(currentPath, filename, destination))) throw new Error;

      await decompress(currentPath, filename, destination);
    }
    else if (command.startsWith(COMMANDS.mkdir + ' ')) {
      const destination = getProcessedPath(command, COMMANDS.mkdir.length + 1,);

      if (!(await validateMKDIRInput(currentPath, destination))) throw new Error;

      await mkdir(currentPath, destination);
    }
    else if (command.startsWith(COMMANDS.os + ' ')) {
      const inputArg = getProcessedPath(command, COMMANDS.os.length + 1);
      os(inputArg);
    }
    else logInvalidInput();
    return true;
  } catch {
    logInvalidInput();
    logAfterEachOperation();
  }
};