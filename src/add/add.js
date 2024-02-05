import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import {
  logOperationFailed,
  logInvalidInput,
  FILENAME_REGEXP,
  throwCustomError,
  INVALID_INPUT_ERROR,
  DEFAULT_EOL
} from '../utils.js';

export const add = async (currentPath, fileName) => {
  try {
    if (!FILENAME_REGEXP.test(fileName)) throwCustomError(INVALID_INPUT_ERROR);
    const filePath = path.resolve(currentPath, fileName);
    await writeFile(filePath, '', { flag: 'wx' });
    process.stdout.write(`Empty file was created in ${filePath}${DEFAULT_EOL}`);
  } catch (err) {
    if (err.message === INVALID_INPUT_ERROR) logInvalidInput();
    else logOperationFailed(err.message);
  }
};