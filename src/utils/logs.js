import { DEFAULT_EOL, getCurrentPath } from '../constants.js';

export const logOperationFailed = (errMessage) => process.stdout.write(`Operation failed. ${errMessage || ''}${DEFAULT_EOL}`);

export const logInvalidInput = () => process.stdout.write(`Invalid input.${DEFAULT_EOL}`);

export const logAfterEachOperation = () => {
  const currentPath = getCurrentPath();
  process.stdout.write(`You are currently in ${currentPath}${DEFAULT_EOL}`);
  process.stdout.write(`Please, type your next command:${DEFAULT_EOL}`);
  process.stdout.write('> ');
};