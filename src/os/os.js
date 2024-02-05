import { EOL, cpus, userInfo, arch } from 'node:os'
import { logInvalidInput, logOperationFailed } from '../utils.js'

const OS_COMMANDS = {
  eol: '--EOL',
  cpus: '--cpus',
  homedir: '--homedir',
  username: '--username',
  arch: '--architecture'
}
export const os = (arg) => {
  try {
    if (arg === OS_COMMANDS.eol) {
      process.stdout.write(`The operating system end-of-line marker: ${JSON.stringify(EOL)}${EOL}`);
    }
    else if (arg === OS_COMMANDS.cpus) {
      process.stdout.write(`The operating system cpus:${EOL}`);
      const cpusInfo = cpus();
      if (cpusInfo) {
        cpusInfo.forEach((cpu, index) => process.stdout.write(`${index + 1}: ${cpu.model}${EOL}`))
      } else throw new Error
    }
    else if (arg === OS_COMMANDS.homedir) {
      const pathToHomedir = userInfo()
      process.stdout.write(`Home directory: ${pathToHomedir.homedir}${EOL}`);
    }
    else if (arg === OS_COMMANDS.username) {
      const pathToHomedir = userInfo()
      process.stdout.write(`Username: ${pathToHomedir.username}${EOL}`);
    }
    else if (arg === OS_COMMANDS.arch) {
      const architecture = arch()
      process.stdout.write(`CPU architecture: ${architecture}${EOL}`);
    }
    else logInvalidInput()
  } catch (err) {
    logOperationFailed(err.message)
  }
}