import { isNameValid } from '../utils/isNameValid.js';

export const validateCATInput = (src, filename) => {
  if (!src || !filename) return false;

  return isNameValid(filename);
};