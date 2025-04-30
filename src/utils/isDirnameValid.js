export const isDirnameValid = (filename) => {
  return /^[^<>|?*]+$/.test(filename);
};