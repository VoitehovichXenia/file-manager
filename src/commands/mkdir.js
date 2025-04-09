import { resolve } from 'node:path';
import { mkdir as coremkdir } from 'node:fs/promises';
import { logInvalidInput, logOperationFailed } from '../utils/logs.js';
import { DEFAULT_EOL } from '../constants.js';

export const mkdir = async (currentPath, inputPath) => {
  try {
    const destPath = resolve(currentPath, inputPath);

    await coremkdir(destPath);
    process.stdout.write(`New directory was created in ${destPath}${DEFAULT_EOL}`);
  } catch (err) {
    if (err.errno === -4058) logInvalidInput();
    else logOperationFailed(err.message);
  }
};