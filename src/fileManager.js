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

setUserName();