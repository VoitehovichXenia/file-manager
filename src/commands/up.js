import { resolve } from 'node:path';
import { logOperationFailed } from '../utils/logs.js';

export const up = (currentPath) => {
  try {
    const upperDirPath = resolve(currentPath, '../');
    return upperDirPath === currentPath ? null : upperDirPath;
  } catch (err) {
    logOperationFailed(err.message);
  }
};