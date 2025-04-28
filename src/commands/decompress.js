import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { DEFAULT_EOL } from '../constants.js';
import { logOperationFailed } from '../utils/logs.js';

export const decompress = async (currentPath, src, destination) => {
  try {
    const srcPath = path.resolve(currentPath, src);
    const srcFilename = path.basename(srcPath);
    const extIndex = srcFilename.indexOf('.');
    const filename = srcFilename.slice(0, extIndex);
    const destinationPath = path.resolve(currentPath, destination, filename);
    const brotli = createBrotliDecompress();
    const readableStream = createReadStream(srcPath);
    const writableStream = createWriteStream(destinationPath);
    writableStream.on('close', () => {
      process.stdout.write(`The file ${srcPath} is decompressed in ${destinationPath}${DEFAULT_EOL}`);
    });
    await pipeline(
      readableStream,
      brotli,
      writableStream
    );
  } catch (err) {
    logOperationFailed(err.message);
  }
};