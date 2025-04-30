import { resolve } from 'node:path';
import { getDestStat } from '../utils/checkIfDestExist.js';

export const validateCPInput = async (currentPath, src, destination) => {
  if (!src || !destination) return false;

  const srcPath = resolve(currentPath, src);
  const srcStat = await getDestStat(srcPath);
  if (!srcStat || srcStat.isDirectory()) return false;

  const destinationPath = resolve(currentPath, destination);
  const destStat = await getDestStat(destinationPath);
  if (!destStat || destStat.isFile()) return false;

  return true;
};