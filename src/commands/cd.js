import { resolve } from 'node:path';
import { setCurrentPath, ALREADY_IN_DIR_ERROR, DEFAULT_EOL } from '../constants.js';
import { getDestStat } from '../utils/checkIfDestExist.js';
import { logOperationFailed } from '../utils/logs.js';

export const cd = async (src, destination) => {
  const destinationPath = resolve(src, destination);
  
  if (src.toLowerCase() === destinationPath.toLowerCase()) {
    process.stdout.write(`${ALREADY_IN_DIR_ERROR}${DEFAULT_EOL}`);
  } else if (destinationPath && destinationPath !== src) {
    try {
      const destStat = await getDestStat(destinationPath);
      if (!destStat) throw new Error(`Path ${destinationPath} doesn't exist.`)

      setCurrentPath(destinationPath);
    } catch (err) {
      logOperationFailed(err.message);
    }
  }
};