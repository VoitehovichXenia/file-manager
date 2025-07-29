import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { DEFAULT_EOL } from '../constants.js';
import { logOperationFailed, logAfterEachOperation } from '../utils/logs.js';

export const hash = async (currentPath, fileToHash) => {
  try {
    const hash = createHash('sha256');
    const filePath = resolve(currentPath, fileToHash);
    const readableStream = createReadStream(filePath);

    readableStream.on('data', (chunck) => { hash.update(chunck); });
    readableStream.on('end', () => {
      const hexHash = hash.digest('hex');
      process.stdout.write(`Hashed: ${hexHash}${DEFAULT_EOL}`);
      logAfterEachOperation();
    });
    readableStream.on('err', (err) => logOperationFailed(err.message));
  } catch (err) {
    logOperationFailed(err.message);
  }
};