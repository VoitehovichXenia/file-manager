import { readdir } from 'node:fs/promises';
import { logOperationFailed } from '../utils/logs.js';
import { DEFAULT_EOL } from '../constants.js';

const DIRECTORY_TYPE = 'directory';
const FILE_TYPE = 'file';

export const ls = async (pathToDir) => {
  try {
    const dirContent = await readdir(pathToDir, {
      recursive: false,
      withFileTypes: true
    });

    if (dirContent.length) {
      const dirData = dirContent.map(child => {
        const childData = {};
        childData.Name = child.name;
        childData.Type = `${child.isDirectory() ? DIRECTORY_TYPE : FILE_TYPE}`;
        return childData;
      });
      dirData.sort((a, b) => {
        if (a.Type !== b.Type) {
          return a.Type < b.Type ? -1 : 1;
        }
        return a.Name.toLowerCase() < b.Name.toLowerCase() ? -1 : 1;
      });

      console.table(dirData);
    } else {
      process.stdout.write(`${pathToDir} folder is empty.${DEFAULT_EOL}`);
    }
  } catch (err) {
    logOperationFailed(err.message);
  }
};