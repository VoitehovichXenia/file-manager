import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { DEFAULT_EOL } from '../constants.js';
import { logOperationFailed } from '../utils/logs.js';

export const add = async (currentPath, fileName) => {
  try {
    const destinationPath = resolve(currentPath, fileName);
    await writeFile(destinationPath, '', { flag: 'wx' });
    process.stdout.write(`Empty file was created in ${destinationPath}${DEFAULT_EOL}`);
  } catch (err) {
    logOperationFailed(err.message);
  }
};