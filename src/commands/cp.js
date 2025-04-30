import { resolve, basename } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { FILE_ALREADY_EXISTS_MESSAGE, DEFAULT_EOL } from '../constants.js';
import { logOperationFailed } from '../utils/logs.js';
import { getDestStat } from '../utils/checkIfDestExist.js';

export const cp = async (currentPath, src, destination, { isFileMoved }) => {
  try {
    const srcPath = resolve(currentPath, src);
    let destinationPath = resolve(currentPath, destination);
    const filename = basename(srcPath);
    destinationPath = resolve(destinationPath, filename);
    const isDestFileExist = await getDestStat(destinationPath);
    if (!isDestFileExist) {
      const writableStream = createWriteStream(destinationPath);
      writableStream.on('close', () => {
        if (isFileMoved) process.stdout.write(`The ${srcPath} has been moved into ${destinationPath}${DEFAULT_EOL}`);
        else process.stdout.write(`The ${srcPath} has been copied into ${destinationPath}${DEFAULT_EOL}`);
      });
      await pipeline(
        createReadStream(srcPath),
        writableStream
      );
    } else throw new Error(FILE_ALREADY_EXISTS_MESSAGE);
  } catch (err) {
    logOperationFailed(err.message);
  }
};