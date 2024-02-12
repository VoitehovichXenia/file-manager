import { homedir, EOL } from "node:os";

export const COMMAND_CP = 'cp';
export const COMMAND_MV = 'mv';
export const COMMAND_RM = 'rm';

export const COMMANDS = {
  exit: '.exit',
  up: 'up',
  cd: 'cd',
  ls: 'ls',
  cat: 'cat',
  add: 'add',
  rn: 'rn',
  rm: 'rm',
  cp: 'cp',
  mv: 'mv',
  os: 'os',
  hash: 'hash',
  compress: 'compress',
  decompress: 'decompress',
};
export const OS_COMMANDS = {
  eol: '--EOL',
  cpus: '--cpus',
  homedir: '--homedir',
  username: '--username',
  arch: '--architecture'
};

export const DEFAULT_EOL = EOL

let username = 'Anonymus';
export const getUsername = () => username;
export const setUsername = (newUsername) => {
  if (newUsername) {
    username = newUsername;
  }
};

let currentPath = homedir();
export const getCurrentPath = () => currentPath;
export const setCurrentPath = (newPath) => {
  if (newPath) {
    currentPath = newPath;
  }
};

export const MULTIPLE_ARGS_FLAG = 'multiple_args'
export const MULTIPLE_ARGS_SEPARATOR = '|'

export const FILE_ALREADY_EXISTS_MESSAGE = 'File already exists in the destination folder'
export const NOT_FILE_PATH_ERROR = 'It\'s not a valid file path'
export const NOT_DIR_PATH_ERROR = 'It\'s not a valid directory path'
export const INVALID_INPUT_ERROR = 'invalid_input'
export const ALREADY_IN_DIR_ERROR = 'You\'re already in this directory'
export const EMPTY_FILE_MESSAGE = 'This file is empty.'