import { resolve, basename, dirname } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { DEFAULT_EOL } from '../constants.js';
import { logOperationFailed } from '../utils/logs.js';
import { getDestStat } from '../utils/checkIfDestExist.js'

export const COMPRESS_FLAG = 'compress'
export const DECOMPRESS_FLAG = 'decompress'

export const zlib = async (currentPath, src, destination, flag) => {
  try {
    const srcPath = resolve(currentPath, src);
    const srcFilename = basename(srcPath);
    let destinationPath = resolve(currentPath, destination);
    const destStat = await getDestStat(destinationPath);
    if (destStat && destStat.isDirectory()) {
      const extIndex = srcFilename.lastIndexOf('.');
      const filename = srcFilename.slice(0, extIndex);
      destinationPath = resolve(currentPath, destination, `${filename}${flag === COMPRESS_FLAG ? '.br' : ''}`);
    }

    const brotli = flag === COMPRESS_FLAG
      ? createBrotliCompress()
      : createBrotliDecompress();
    const readableStream = createReadStream(srcPath);
    const writableStream = createWriteStream(destinationPath);

    await pipeline(
      readableStream,
      brotli,
      writableStream
    );

    process.stdout.write(`The file ${srcPath} is ${flag === COMPRESS_FLAG ? 'compressed' : 'decompressed'} in ${destinationPath}${DEFAULT_EOL}`);
    
  } catch (err) {
    logOperationFailed(err.message);
  }
}
