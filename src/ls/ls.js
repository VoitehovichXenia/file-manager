import { readdir } from 'node:fs/promises'
import { DEFAULT_EOL, logOperationFailed } from '../utils.js'

export const ls = async (pathToDir) => {
  const DIRECTORY_TYPE = 'directory';
  const FILE_TYPE = 'file';
  try {
    const dirContent = await readdir(pathToDir, {
      recursive: false,
      withFileTypes: true
    });
    if (dirContent.length) {
      const dirData = []
      dirContent.forEach(child => {
        const childData = {}
        childData.Name = child.name
        childData.Type = `${child.isDirectory() ? DIRECTORY_TYPE : FILE_TYPE}`
        dirData.push(childData)
      });
      dirData.sort((a) => a.Type === DIRECTORY_TYPE ? -1 : 1)
      console.table(dirData)
    } else {
      process.stdout.write(`${pathToDir} folder is empty.${DEFAULT_EOL}`);
    }
  } catch (err) {
    logOperationFailed(err.message);
  }
};