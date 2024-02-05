import { DEFAULT_EOL, NOT_FILE_PATH_ERROR, logOperationFailed, throwCustomError } from "../utils.js";
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path'

export const hash = async (currentPath, fileToHash) => {
  try {
    const hash = createHash('sha256');
    const filePath = path.resolve(currentPath, fileToHash);
    const srcStat = await stat(filePath)
    if (srcStat.isDirectory()) throwCustomError(NOT_FILE_PATH_ERROR)
    const readableStream = createReadStream(filePath);

    readableStream.on('data', (chunck) => { hash.update(chunck) })
    readableStream.on('end', () => {
      const hexHash = hash.digest('hex')
      process.stdout.write(`Hashed: ${hexHash}${DEFAULT_EOL}`)
    });
    readableStream.on('err', (err) => logOperationFailed(err.message));
    
  } catch (err) {
    logOperationFailed(err.message)
  }
}