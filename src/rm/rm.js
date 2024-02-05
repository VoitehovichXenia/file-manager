import path from 'node:path';
import { rm as coreRm } from 'node:fs/promises';
import { logOperationFailed } from '../utils.js';

export const rm = async (currentPath, inputPath) => {
  try {
    const pathToRemove = path.resolve(currentPath, inputPath)
    await coreRm(pathToRemove, {
      recursive: true
    })
    process.stdout.write(`The ${pathToRemove} has been removed\n`)
  } catch (err) {
    logOperationFailed(err.message)
  }
}