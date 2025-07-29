import { isNameValid } from '../utils/isNameValid.js';

export const validateRNInput = (src, oldFilename, newFilename) => {
  if (!src || !oldFilename || !newFilename) return false;

  if (oldFilename === newFilename) return false;

  return isNameValid(oldFilename) && isNameValid(newFilename);
};