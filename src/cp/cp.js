import path from 'node:path';
import { stat } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import {
  DEFAULT_EOL,
  INVALID_INPUT_ERROR,
  logInvalidInput,
  logOperationFailed,
  throwCustomError
} from '../utils.js';

export const cp = async (currentPath, src, destination) => {
  try {
    const srcPath = path.resolve(currentPath, src);
    const srcStat = await stat(srcPath);
    if (srcStat.isDirectory()) throwCustomError(INVALID_INPUT_ERROR);
    let destinationPath = path.resolve(currentPath, destination);
    const destStat = await stat(destinationPath);
    if (destStat.isFile()) throwCustomError(INVALID_INPUT_ERROR);
    const filename = path.basename(srcPath);
    destinationPath = path.resolve(destination, filename);
    try {
      const isDestFileExist = await stat(destinationPath);
      if (isDestFileExist) throw new Error;
    } catch (err) {
      if (err.message) {
        const readableStream = createReadStream(srcPath);
        const writableStream = createWriteStream(destinationPath);
        writableStream.on('close', () => {
          process.stdout.write(`The ${srcPath} has been copied into ${destinationPath}${DEFAULT_EOL}`);
        });
        await pipeline(
          readableStream,
          writableStream
        );
      } 
      else logOperationFailed(err.message);
    }
  } catch (err) {
    if (err.message === INVALID_INPUT_ERROR) logInvalidInput();
    logOperationFailed(err.message);
  }
};