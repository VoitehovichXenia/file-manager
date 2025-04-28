import { resolve } from 'node:path';
import { getDestStat } from '../utils/checkIfDestExist.js';
import { isNameValid } from '../utils/isNameValid.js';

export const validateCOMPRESSInput = async (src, filename, destination) => {
  if (!src || !filename || !destination) return false;

  if (!isNameValid(filename)) return false;

  const destinationPath = resolve(src, destination);
  const destStat = await getDestStat(destinationPath);
      
  return !destStat;
};