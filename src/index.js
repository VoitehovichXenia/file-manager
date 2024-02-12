import * as readline from 'node:readline/promises';
import { handleUserInput } from './handlers/handleUserInput.js';
import { handleFileManagerInit } from './handlers/handleFileManagerInit.js';
import { getCurrentPath, getUsername, DEFAULT_EOL } from './constants.js';
import { logAfterEachOperation } from './utils/logs.js';

(function () {
  handleFileManagerInit();

  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readlineInterface.on('line', async (input) => {
    const printAfterEachOperationMessage = await handleUserInput({ userInput: input, readlineInterface });
    if (printAfterEachOperationMessage) {
      const currentPath = getCurrentPath();
      logAfterEachOperation(currentPath);
    }
  });

  readlineInterface.on('close', () => {
    const username = getUsername();
    process.stdout.write(`\n\nThank you for using File Manager, ${username}, goodbye!${DEFAULT_EOL}`);
  });
})()