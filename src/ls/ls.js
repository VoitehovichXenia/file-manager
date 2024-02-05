import { readdir } from 'node:fs/promises'
import { logOperationFailed } from '../utils.js'


export const ls = async (pathToDir) => {
  const INDEX_COLUMN_TEXT = '   Index   '
  const INDEX_COLUMN_TEXT_LEN = INDEX_COLUMN_TEXT.length
  const TYPE_COLUMN_TEXT = '    Type    '
  const TYPE_COLUMN_TEXT_LEN = TYPE_COLUMN_TEXT.length
  const DIRECTORY_TYPE_TEXT = ' directory  '
  const FILE_TYPE_TEXT = ' file       '
  try {
    const dirContent = await readdir(pathToDir, {
      recursive: false,
      withFileTypes: true
    })
    if (dirContent.length) {
      const nameColumnLength = Math.max(...dirContent.map(item => item.name.length)) + 2
      const rightNameSpace = Math.floor((nameColumnLength - 4) / 2)
      const leftNameSpace = nameColumnLength - 4 - rightNameSpace
      const nameColumnText = `${' '.repeat(rightNameSpace)}Name${' '.repeat(leftNameSpace)}`
      const horizontalBorderLength = INDEX_COLUMN_TEXT_LEN + nameColumnLength + TYPE_COLUMN_TEXT_LEN + 3
      const horizontalBorder = `${'='.repeat(horizontalBorderLength)}\n`
      const innerBorder = `${'-'.repeat(horizontalBorderLength)}\n`
      process.stdout.write(horizontalBorder)
      process.stdout.write(`${INDEX_COLUMN_TEXT}|${nameColumnText}|${TYPE_COLUMN_TEXT}|\n`)
      process.stdout.write(horizontalBorder)
      dirContent.forEach((child, index) => {
        const rightNameSpace = Math.floor((nameColumnLength - child.name.length) / 2)
        const leftNameSpace = nameColumnLength - child.name.length - rightNameSpace
        const indexText = `${index < 10 ? ' '.repeat(5) : index < 100 ? ' '.repeat(4) : ' '.repeat(3)}${index}${index < 10 ? ' '.repeat(5) : index < 100 ? ' '.repeat(5) : ' '.repeat(3)}`
        const nameText = `${' '.repeat(rightNameSpace)}${child.name}${' '.repeat(leftNameSpace)}`
        const typeText = `${child.isDirectory() ? DIRECTORY_TYPE_TEXT : FILE_TYPE_TEXT}`
        process.stdout.write(`${indexText}|${nameText}|${typeText}|\n`)
        process.stdout.write(innerBorder)
      })
    } else {
      process.stdout.write(`${pathToDir} folder is empty.\n`)
    }
  } catch (err) {
    logOperationFailed(err.message)
  }
}