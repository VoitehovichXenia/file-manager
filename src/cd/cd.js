import path from 'node:path';
import { stat } from 'node:fs/promises';
import {
  logInvalidInput,
  throwCustomError,
  NOT_DIR_PATH_ERROR,
  ALREADY_IN_DIR_ERROR,
  DEFAULT_EOL,
} from '../utils.js';

export const cd = async (src, destination) => {
  try {
    const destinationPath = path.resolve(src, destination);
    if (src !== destinationPath) {
      const destStat = await stat(destination);
      if (destStat.isFile()) throwCustomError(NOT_DIR_PATH_ERROR);
    } else {
      process.stdout.write(`${ALREADY_IN_DIR_ERROR}${DEFAULT_EOL}`);
    }
    return destinationPath
  } catch {
    logInvalidInput();
  }
};