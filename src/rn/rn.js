import path from 'node:path'
import { rename } from 'node:fs/promises'
import { logOperationFailed, logInvalidInput, throwCustomError, INVALID_INPUT_ERROR, FILENAME_REGEXP } from '../utils.js'

export const rn = async (currentPath, oldFileName, newFileName) => {
  try {
    if (
      !FILENAME_REGEXP.test(oldFileName) ||
      !FILENAME_REGEXP.test(newFileName)
    ) throwCustomError(INVALID_INPUT_ERROR)
    const src = path.resolve(currentPath, oldFileName)
    const destination = path.resolve(currentPath, newFileName)
    await rename(src, destination)
    process.stdout.write(`File ${src} was renamed in ${destination}\n`)
  } catch (err) {
    if (err.message === INVALID_INPUT_ERROR) logInvalidInput()
    else logOperationFailed(err.message)
  }
}