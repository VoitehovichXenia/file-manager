import { stat } from 'node:fs/promises';

export const getDestStat = async (path) => {
  try {
    const destStat = await stat(path);
    return destStat;
  } catch {
    return null;
  }
};