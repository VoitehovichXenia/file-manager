import { MULTIPLE_ARGS_FLAG, MULTIPLE_ARGS_SEPARATOR } from '../constants.js';

export const getProcessedPath = (input, commandLength, { flag } = {}) => {
  let processedPath = input.trim().split('"').join('').slice(commandLength);
  if (flag === MULTIPLE_ARGS_FLAG) {
    processedPath = processedPath
      .split('"')
      .filter(item => item && item !== ' ')
      .map(item => item.trim());
    if (processedPath.length === 1) {
      processedPath = processedPath[0].split(' ');
    }
    processedPath = processedPath.join(MULTIPLE_ARGS_SEPARATOR);
  }

  return processedPath;
};