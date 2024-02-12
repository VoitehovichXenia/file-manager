import path from 'node:path';
import { rm as coreRm } from 'node:fs/promises';
import { COMMAND_RM, DEFAULT_EOL } from '../constants.js';
import { logOperationFailed } from '../utils/logs.js';

export const rm = async (currentPath, inputPath, flag = COMMAND_RM) => {
  try {
    const pathToRemove = path.resolve(currentPath, inputPath);
    await coreRm(pathToRemove, {
      recursive: true
    });
    if (flag === COMMAND_RM) process.stdout.write(`The ${pathToRemove} has been removed${DEFAULT_EOL}`);
  } catch (err) {
    logOperationFailed(err.message);
  }
};