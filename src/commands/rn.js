import { resolve, dirname } from 'node:path';
import { rename } from 'node:fs/promises';
import { logOperationFailed } from '../utils/logs.js';
import { DEFAULT_EOL } from '../constants.js';

export const rn = async (currentPath, oldFileName, newFileName) => {
  try {
    const src = resolve(currentPath, oldFileName);
    const destination = resolve(dirname(src), newFileName);

    await rename(src, destination);

    process.stdout.write(`File ${src} was renamed in ${destination}${DEFAULT_EOL}`);
  } catch (err) {
    logOperationFailed(err.message);
  }
};