import path from 'node:path';
import { stat } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { FILE_ALREADY_EXISTS_MESSAGE, DEFAULT_EOL, INVALID_INPUT_ERROR, COMMAND_CP, COMMAND_MV } from '../constants.js';
import { logInvalidInput, logOperationFailed } from '../utils/logs.js';
import { throwCustomError } from '../utils/throwCustomError.js';

export const cp = async (currentPath, src, destination, flag = COMMAND_CP) => {
  try {
    const srcPath = path.resolve(currentPath, src);
    const srcStat = await stat(srcPath);
    if (srcStat.isDirectory()) throwCustomError(INVALID_INPUT_ERROR);
    let destinationPath = path.resolve(currentPath, destination);
    const destStat = await stat(destinationPath);
    if (destStat.isFile()) throwCustomError(INVALID_INPUT_ERROR);
    const filename = path.basename(srcPath);
    destinationPath = path.resolve(destinationPath, filename);
    try {
      const isDestFileExist = await stat(destinationPath);
      if (isDestFileExist) throw new Error (FILE_ALREADY_EXISTS_MESSAGE);
    } catch (err) {
      if (err.message !== FILE_ALREADY_EXISTS_MESSAGE) {
        const writableStream = createWriteStream(destinationPath);
        writableStream.on('close', () => {
          if (flag === COMMAND_CP) process.stdout.write(`The ${srcPath} has been copied into ${destinationPath}${DEFAULT_EOL}`);
          if (flag === COMMAND_MV) process.stdout.write(`The ${srcPath} has been moved into ${destinationPath}${DEFAULT_EOL}`);
        });
        await pipeline(
          createReadStream(srcPath),
          writableStream
        );
      } 
      else logOperationFailed(err.message);
    }
  } catch (err) {
    if (err.message === INVALID_INPUT_ERROR) logInvalidInput();
    if (err.message !== FILE_ALREADY_EXISTS_MESSAGE) logOperationFailed(err.message);
  }
};