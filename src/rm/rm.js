import path from 'node:path';
import { rm as coreRm } from 'node:fs/promises';
import { DEFAULT_EOL, logOperationFailed } from '../utils.js';

export const rm = async (currentPath, inputPath) => {
  try {
    const pathToRemove = path.resolve(currentPath, inputPath);
    await coreRm(pathToRemove, {
      recursive: true
    });
    process.stdout.write(`The ${pathToRemove} has been removed${DEFAULT_EOL}`);
  } catch (err) {
    logOperationFailed(err.message);
  }
};