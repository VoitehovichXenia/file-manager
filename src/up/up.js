import path from 'node:path';

export const up = (currentPath) => {
  const upperDirPath = path.resolve(currentPath, '../')
  return upperDirPath === currentPath ? null : upperDirPath
}