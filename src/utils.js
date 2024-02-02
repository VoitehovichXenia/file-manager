import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const getFilename = (url) => fileURLToPath(url)
export const getDirname = (url) => path.dirname(getFilename(url))

export const logOperationFailed = (errMessage) => process.stdout.write(`Operation failed. ${errMessage || ''}\n`)
export const logInvalidInput = () => process.stdout.write(`Invalid input.\n`)