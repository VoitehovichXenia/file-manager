import { homedir, EOL } from 'node:os';

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
  mkdir: 'mkdir'
};
export const OS_COMMANDS = {
  eol: '--EOL',
  cpus: '--cpus',
  homedir: '--homedir',
  username: '--username',
  arch: '--architecture'
};

export const DEFAULT_EOL = EOL;

export const DEFAULT_CLI_USERNAME_NAME = 'username'

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

export const MULTIPLE_ARGS_FLAG = 'multiple_args';
export const MULTIPLE_ARGS_SEPARATOR = '|';

export const FILE_ALREADY_EXISTS_MESSAGE = 'File already exists in the destination folder';
export const ALREADY_IN_DIR_ERROR = 'You\'re already in this directory';
export const EMPTY_FILE_MESSAGE = 'This file is empty.';