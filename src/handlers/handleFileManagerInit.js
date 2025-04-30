import { setUsername, DEFAULT_EOL, getUsername, DEFAULT_CLI_USERNAME_NAME } from '../constants.js';
import { logAfterEachOperation } from '../utils/logs.js';

export const handleFileManagerInit = () => {
  const agrgsName = process.argv.find(arg => arg.startsWith(`--${DEFAULT_CLI_USERNAME_NAME}=`))
  // Used as npm ajusts "npm_config_" prefix to CLI arguments
  const envName = process.env[`npm_config_${DEFAULT_CLI_USERNAME_NAME}`]
 
  if (agrgsName) setUsername(agrgsName)
  else setUsername(envName)

  process.stdout.write(`Welcome to the File Manager, ${getUsername()}!${DEFAULT_EOL.repeat(2)}`);
  logAfterEachOperation();
};