import { DEFAULT_EOL } from '../constants.js';

export const logOperationFailed = (errMessage) => process.stdout.write(`Operation failed. ${errMessage || ''}${DEFAULT_EOL}`);

export const logInvalidInput = () => process.stdout.write(`Invalid input.${DEFAULT_EOL}`);

export const logAfterEachOperation = (currentPath) => {
  process.stdout.write(`You are currently in ${currentPath}${DEFAULT_EOL}`);
  process.stdout.write(`> `)
};