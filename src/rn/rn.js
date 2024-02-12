import path from 'node:path';
import { rename } from 'node:fs/promises';
import {
  logOperationFailed,
  logInvalidInput,
  INVALID_INPUT_ERROR,
  DEFAULT_EOL
} from '../utils.js';

export const rn = async (currentPath, oldFileName, newFileName) => {
  try {
    const src = path.resolve(currentPath, oldFileName);
    const destination = path.resolve(path.dirname(src), newFileName);
    await rename(src, destination);
    process.stdout.write(`File ${src} was renamed in ${destination}${DEFAULT_EOL}`);
  } catch (err) {
    if (err.message === INVALID_INPUT_ERROR) logInvalidInput();
    else logOperationFailed(err.message);
  }
}