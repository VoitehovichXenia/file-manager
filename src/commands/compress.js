import { resolve, basename } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { DEFAULT_EOL } from '../constants.js';
import { logOperationFailed } from '../utils/logs.js';

export const compress = async (currentPath, src, destination) => {
  try {
    const srcPath = resolve(currentPath, src);
    const srcFilename = basename(srcPath);
    const extIndex = srcFilename.lastIndexOf('.');
    const filename = srcFilename.slice(0, extIndex) + '.br';
    const destinationPath = resolve(currentPath, destination, filename);
    const writableStream = createWriteStream(destinationPath);
    writableStream.on('close', () => {
      process.stdout.write(`The file ${srcPath} is compressed in ${destinationPath}${DEFAULT_EOL}`);
    });
    await pipeline(
      createReadStream(srcPath),
      createBrotliCompress(),
      writableStream
    );
  } catch (err) {
    logOperationFailed(err.message);
  }
};