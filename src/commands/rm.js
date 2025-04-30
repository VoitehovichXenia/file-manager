import { resolve } from 'node:path';
import { rm as coreRm } from 'node:fs/promises';
import { DEFAULT_EOL } from '../constants.js';
import { logOperationFailed } from '../utils/logs.js';

export const rm = async (currentPath, inputPath, { onlyFiles, messageLog }) => {
  try {
    const pathToRemove = resolve(currentPath, inputPath);
    await coreRm(pathToRemove, { recursive: !onlyFiles });
    if (messageLog) process.stdout.write(`The ${pathToRemove} has been removed${DEFAULT_EOL}`);
  } catch (err) {
    logOperationFailed(err.message);
  }
};