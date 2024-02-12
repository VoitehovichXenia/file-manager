import path from 'node:path';
import { logOperationFailed } from '../utils/logs.js';

export const up = (currentPath) => {
  try {
    const upperDirPath = path.resolve(currentPath, '../');
    return upperDirPath === currentPath ? null : upperDirPath;
  } catch (err) {
    logOperationFailed(err.message);
  }
};