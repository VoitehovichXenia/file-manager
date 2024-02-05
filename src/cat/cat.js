import path from 'node:path';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import {
  DEFAULT_EOL,
  EMPTY_FILE_MESSAGE,
  NOT_FILE_PATH_ERROR,
  logOperationFailed,
  throwCustomError,
  logCurrentPath,
  logPrompt
} from '../utils.js';

export const cat = async (currentPath, pathToFile) => {
  try {
    const filePath = path.resolve(currentPath, pathToFile);
    const statit = await stat(filePath);
    if (statit.isDirectory()) throwCustomError(NOT_FILE_PATH_ERROR);
    const readableStream = createReadStream(filePath);
    let isFileEmpty = true;
    readableStream.once('data', () => {
      isFileEmpty = false;
    });
    readableStream.on('data', (chunk) => {
      chunk && process.stdout.write(chunk);
    });
    readableStream.on('end', () => {
      process.stdout.write(`${isFileEmpty ? EMPTY_FILE_MESSAGE : ''}${DEFAULT_EOL}`);
      process.stdin.resume();
      logCurrentPath(currentPath)
      logPrompt()
    });
    readableStream.on('error', (err) => logOperationFailed(err.message));
  } catch (err) {
    logOperationFailed(err.message);
  }
};