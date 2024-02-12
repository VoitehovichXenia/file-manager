import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { stat } from 'node:fs/promises';
import { DEFAULT_EOL, INVALID_INPUT_ERROR, FILE_ALREADY_EXISTS_MESSAGE } from '../constants.js';
import { logOperationFailed, logInvalidInput } from '../utils/logs.js';
import { throwCustomError } from '../utils/throwCustomError.js';

export const compress = async (currentPath, src, destination) => {
  if (!src || !destination) return logInvalidInput()
  const srcPath = path.resolve(currentPath, src);
  let destinationPath = path.resolve(currentPath, destination);

  try {
    const srcStat = await stat (srcPath);
    if (srcStat.isDirectory()) throwCustomError(INVALID_INPUT_ERROR);
    const destStat = await stat (destinationPath);
    if (destStat.isDirectory()) {
      const srcFilename = path.basename(srcPath);
      const extIndex = srcFilename.indexOf('.');
      const filename = srcFilename.slice(0, extIndex) + '.br';
      destinationPath = path.resolve(destinationPath, filename);
      throwCustomError();
    }
    if (destStat) throwCustomError(FILE_ALREADY_EXISTS_MESSAGE);
  } catch (err) {
    if (err.message !== INVALID_INPUT_ERROR && err.message !== FILE_ALREADY_EXISTS_MESSAGE) {
      console.log(destinationPath);
      const writableStream = createWriteStream(destinationPath);
      writableStream.on('close', () => {
        process.stdout.write(`The file ${srcPath} is compressed in ${destinationPath}${DEFAULT_EOL}`);
      });
      try {
        await pipeline(
          createReadStream(srcPath),
          createBrotliCompress(),
          writableStream
        );
      } catch (err) {
        logOperationFailed(err.message);
      }
    } else if (err.message === INVALID_INPUT_ERROR) {
      logInvalidInput();
    } else logOperationFailed(err.message);
  }
};