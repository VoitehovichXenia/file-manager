import { resolve } from 'node:path';
import { getDestStat } from '../utils/checkIfDestExist.js';

export const validateZlibInput = async (src, filename, destination, flag) => {
  if (!src || !filename || !destination) return false;

  const destinationPath = resolve(src, destination);
  const srcPath = resolve(src, filename);
  const srcStat = await getDestStat(srcPath);
  const destStat = await getDestStat(destinationPath);

  if (!srcStat) return false;
  if (srcStat?.isDirectory()) return false;
  if (destStat) return destStat.isDirectory();
  else if (flag === 'compress') {
    if (filename.endsWith('.br')) return false;
    destination.endsWith('.br');
  }
  else if (flag === 'decompress') {
    if (!filename.endsWith('.br')) return false;
    return !destination.endsWith('.br');
  }
      
  return true;
};
