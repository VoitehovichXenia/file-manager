const COMMANDS = {
  exit: '.exit',
}
let username = 'anonymus'

const setUserName = () => {
  const args = process.argv
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].startsWith('--username=')) {
      const name = args[i].split('--username=').join('')
      if (name) {
        username = name  
      }
    } 
  }
};

const sayHelloToUser = (username) => process.stdout.write(`Welcome to the File Manager, ${username}!\n\n`)
const sayGoodbyeToUser = (username) => {
  process.stdout.write(`\n\nThank you for using File Manager, ${username}, goodbye!\n`);
  process.exit();
};

setUserName();
sayHelloToUser(username);
process.stdin.resume()

process.stdin.on('data', function(chunk, key) {
  const command = chunk.toString().trim();
  if (command === COMMANDS.exit) sayGoodbyeToUser(username)
});

process.on('SIGINT', () => sayGoodbyeToUser(username));