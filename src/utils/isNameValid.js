export const isNameValid = (filename) => {
  return /^[^<>:"/\\|?*]+$/.test(filename);
};
