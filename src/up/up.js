import path from 'node:path';

export const getUpDirPath = (currentPath) => {
  const upperDirPath = path.resolve(currentPath, '../')
  return upperDirPath === currentPath ? null : upperDirPath
}