import path from 'node:path';
import { logInvalidInput } from '../utils.js';

export const cd = (src, destination) => {
  try {
    const destinationPath = path.resolve(src, destination)
    return destinationPath
  } catch {
    logInvalidInput()
  }
}