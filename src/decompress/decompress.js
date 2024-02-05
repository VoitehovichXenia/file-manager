import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import path from 'node:path';
import { stat } from 'node:fs/promises';
import { DEFAULT_EOL, logOperationFailed, throwCustomError, logInvalidInput, INVALID_INPUT_ERROR} from '../utils.js';

export const decompress = async (currentPath, src, destination) => {
  const srcPath = path.resolve(currentPath, src)
  const destinationPath = path.resolve(currentPath, destination)
  try {
    const srcStat = await stat (srcPath)
    if (srcStat.isDirectory()) throwCustomError(INVALID_INPUT_ERROR)
    const destStat = await stat (destinationPath)
    if (destStat) throw new Error
  } catch (err) {
    if (err.message && err.message !== INVALID_INPUT_ERROR) {
      const brotli = createBrotliDecompress();
      const readableStream = createReadStream(srcPath);
      const writableStream = createWriteStream(destinationPath);
      writableStream.on('close', () => {
        process.stdout.write(`The file ${srcPath} is decompressed ${destinationPath}${DEFAULT_EOL}`)
      })
        try {
          await pipeline(
            readableStream,
            brotli,
            writableStream
          );
        } catch (err) {
          logOperationFailed(err.message)
        }
    } else if (err.message === INVALID_INPUT_ERROR) {
      logInvalidInput()
    } else logOperationFailed(err.message)
  }
}