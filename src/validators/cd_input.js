import { resolve } from 'node:path';
import { getDestStat } from '../utils/checkIfDestExist.js';
import { isDirnameValid } from '../utils/isDirnameValid.js';

export const validateCDInput = async (src, destination) => {
  if (!src || !destination) return false;

  if (!isDirnameValid(destination)) return false;

  const destinationPath = resolve(src, destination);
  const destStat = await getDestStat(destinationPath);
  if (destStat?.isFile()) {
    return false;
  }

  return true;
};