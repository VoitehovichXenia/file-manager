import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { DEFAULT_EOL, EMPTY_FILE_MESSAGE } from '../constants.js';
import { logOperationFailed, logAfterEachOperation } from '../utils/logs.js';

export const cat = async (currentPath, filename) => {
  try {
    const destPath = resolve(currentPath, filename);

    const readableStream = createReadStream(destPath);
    let isFileEmpty = true;
    readableStream.once('data', () => {
      isFileEmpty = false;
    });
    readableStream.on('data', (chunk) => {
      chunk && process.stdout.write(chunk);
    });
    readableStream.on('end', () => {
      process.stdout.write(`${isFileEmpty ? EMPTY_FILE_MESSAGE : ''}${DEFAULT_EOL}`);
      logAfterEachOperation();
    });
    readableStream.on('error', (err) => {
      logOperationFailed(err.message)
      logAfterEachOperation();
    });
  } catch (err) {
    logOperationFailed(err.message);
    logAfterEachOperation();
  }
};