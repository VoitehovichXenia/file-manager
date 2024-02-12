import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { DEFAULT_EOL, INVALID_INPUT_ERROR } from '../constants.js';
import { logOperationFailed, logInvalidInput } from '../utils/logs.js';

export const add = async (currentPath, fileName) => {
  try {
    const filePath = path.resolve(currentPath, fileName);
    await writeFile(filePath, '', { flag: 'wx' });
    process.stdout.write(`Empty file was created in ${filePath}${DEFAULT_EOL}`);
  } catch (err) {
    if (err.message === INVALID_INPUT_ERROR) logInvalidInput();
    else logOperationFailed(err.message);
  }
};