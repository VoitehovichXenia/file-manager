import path from 'node:path';
import { EOL } from 'node:os';
import { fileURLToPath } from 'node:url';

export const DEFAULT_EOL = EOL

export const getFilename = (url) => fileURLToPath(url)
export const getDirname = (url) => path.dirname(getFilename(url))

export const logOperationFailed = (errMessage) => process.stdout.write(`Operation failed. ${errMessage || ''}${EOL}`)
export const logInvalidInput = () => process.stdout.write(`Invalid input.${EOL}`)

const dequoteArg = (arg) => {
  let processedArg = arg
  if (processedArg.startsWith('\'') && processedArg.endsWith('\'')) {
    processedArg = processedArg.slice(1, processedArg.length - 1)
  }
  return processedArg
}

export const MULTIPLE_ARGS = 'multiple_args'
export const MULTIPLE_ARGS_SEPARATOR = '|'
export const getProcessedPath = (input, commandLength, { flag } = {}) => {
  let processedPath = input.trim().slice(commandLength)
  if (flag === MULTIPLE_ARGS) {
    processedPath = processedPath.split('\'').filter(item => item && item !== ' ').map(item => item.trim())
    if (processedPath.length === 1) {
      processedPath = processedPath[0].split(' ')
    }
    processedPath = processedPath.join(MULTIPLE_ARGS_SEPARATOR)
  }
  processedPath = dequoteArg(processedPath)
  return processedPath
}
export const FILENAME_REGEXP = /^[\w,\s-]+\.[a-zA-z]{2,}/
export const NOT_FILE_PATH_ERROR = 'It\'s not a valid file path'
export const INVALID_INPUT_ERROR = 'invalid_input'
export const EMPTY_FILE_MESSAGE = 'This file is empty.'
export const throwCustomError = (errText) => { throw new Error(errText) }