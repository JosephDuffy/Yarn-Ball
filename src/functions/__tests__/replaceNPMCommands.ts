import replaceNPMCommands from '../replaceNPMCommands'

interface Mappings {
  // NPM command => yarn command
  [npmCommand: string]: string
}

describe('replaceNPMCommands()', () => {
  function checkMappings(inputMappings: Mappings) {
    for (let input in inputMappings) {
      const expectedOutput = inputMappings[input]
      const output = replaceNPMCommands(input)
      expect(output).toEqual(expectedOutput)
    }
  }

  // Init

  it('should not substitute npm init commands', () => {
    const inputMappings = {
      'npm init': 'npm init',
    }

    checkMappings(inputMappings)
  })

  // Install

  it('should substitute npm install commands without packages', () => {
    const inputMappings = {
      'npm install': 'yarn install',
      'foobar npm install': 'foobar yarn install',
      'foobar npm install. another-package-name': 'foobar yarn install. another-package-name',
      'npm install. another-package-name': 'yarn install. another-package-name',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm install commands with 1 or more packages', () => {
    const inputMappings = {
      'npm install package-name': 'yarn add package-name',
      'npm install package-name second-name-2': 'yarn add package-name second-name-2',
      'foobar npm install package-name second-name-2': 'foobar yarn add package-name second-name-2',
      'foobar npm install package-name second-name-2. another-package-name':
        'foobar yarn add package-name second-name-2. another-package-name',
      'npm install package-name second-name-2. another-package-name':
        'yarn add package-name second-name-2. another-package-name',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm i commands without packages', () => {
    const inputMappings = {
      'npm i': 'yarn install',
      'foobar npm i': 'foobar yarn install',
      'foobar npm i. another-package-name': 'foobar yarn install. another-package-name',
      'npm i. another-package-name': 'yarn install. another-package-name',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm i commands with 1 or more packages', () => {
    const inputMappings = {
      'npm i package-name': 'yarn add package-name',
      'npm i package-name second-name-2': 'yarn add package-name second-name-2',
      'foobar npm i package-name second-name-2': 'foobar yarn add package-name second-name-2',
      'foobar npm i package-name second-name-2. another-package-name':
        'foobar yarn add package-name second-name-2. another-package-name',
      'npm i package-name second-name-2. another-package-name':
        'yarn add package-name second-name-2. another-package-name',
    }

    checkMappings(inputMappings)
  })

  // Global flag

  it('should substitute npm install commands with the --global flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install --global package-name': 'yarn global add package-name',
      'npm install --global package-name second-name-2': 'yarn global add package-name second-name-2',
      'foobar npm install --global package-name second-name-2': 'foobar yarn global add package-name second-name-2',
      'foobar npm install --global package-name second-name-2. another-package-name':
        'foobar yarn global add package-name second-name-2. another-package-name',
      'npm install --global package-name second-name-2. another-package-name':
        'yarn global add package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 --global': 'yarn global add package-name second-name-2',
      'foobar npm install package-name second-name-2 --global': 'foobar yarn global add package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm install commands with the -g flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install -g package-name': 'yarn global add package-name',
      'npm install -g package-name second-name-2': 'yarn global add package-name second-name-2',
      'foobar npm install -g package-name second-name-2': 'foobar yarn global add package-name second-name-2',
      'foobar npm install -g package-name second-name-2. another-package-name':
        'foobar yarn global add package-name second-name-2. another-package-name',
      'npm install -g package-name second-name-2. another-package-name':
        'yarn global add package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 -g': 'yarn global add package-name second-name-2',
      'foobar npm install package-name second-name-2 -g': 'foobar yarn global add package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  // Save flag

  it('should substitute npm install commands with the --save flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install --save package-name': 'yarn add package-name',
      'npm install --save package-name second-name-2': 'yarn add package-name second-name-2',
      'foobar npm install --save package-name second-name-2': 'foobar yarn add package-name second-name-2',
      'foobar npm install --save package-name second-name-2. another-package-name':
        'foobar yarn add package-name second-name-2. another-package-name',
      'npm install --save package-name second-name-2. another-package-name':
        'yarn add package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 --save': 'yarn add package-name second-name-2',
      'foobar npm install package-name second-name-2 --save': 'foobar yarn add package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm install commands with the -S flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install -S package-name': 'yarn add package-name',
      'npm install -S package-name second-name-2': 'yarn add package-name second-name-2',
      'foobar npm install -S package-name second-name-2': 'foobar yarn add package-name second-name-2',
      'foobar npm install -S package-name second-name-2. another-package-name':
        'foobar yarn add package-name second-name-2. another-package-name',
      'npm install -S package-name second-name-2. another-package-name':
        'yarn add package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 -S': 'yarn add package-name second-name-2',
      'foobar npm install package-name second-name-2 -S': 'foobar yarn add package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  // Save dev flag

  it('should substitute npm install commands with the --save-dev flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install --save-dev package-name': 'yarn add --dev package-name',
      'npm install --save-dev package-name second-name-2': 'yarn add --dev package-name second-name-2',
      'foobar npm install --save-dev package-name second-name-2': 'foobar yarn add --dev package-name second-name-2',
      'foobar npm install --save-dev package-name second-name-2. another-package-name':
        'foobar yarn add --dev package-name second-name-2. another-package-name',
      'npm install --save-dev package-name second-name-2. another-package-name':
        'yarn add --dev package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 --save-dev': 'yarn add --dev package-name second-name-2',
      'foobar npm install package-name second-name-2 --save-dev': 'foobar yarn add --dev package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm install commands with the -D flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install -D package-name': 'yarn add --dev package-name',
      'npm install -D package-name second-name-2': 'yarn add --dev package-name second-name-2',
      'foobar npm install -D package-name second-name-2': 'foobar yarn add --dev package-name second-name-2',
      'foobar npm install -D package-name second-name-2. another-package-name':
        'foobar yarn add --dev package-name second-name-2. another-package-name',
      'npm install -D package-name second-name-2. another-package-name':
        'yarn add --dev package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 -D': 'yarn add --dev package-name second-name-2',
      'foobar npm install package-name second-name-2 -D': 'foobar yarn add --dev package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  // Save optional flag

  it('should substitute npm install commands with the --save-optional flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install --save-optional package-name': 'yarn add --optional package-name',
      'npm install --save-optional package-name second-name-2': 'yarn add --optional package-name second-name-2',
      'foobar npm install --save-optional package-name second-name-2':
        'foobar yarn add --optional package-name second-name-2',
      'foobar npm install --save-optional package-name second-name-2. another-package-name':
        'foobar yarn add --optional package-name second-name-2. another-package-name',
      'npm install --save-optional package-name second-name-2. another-package-name':
        'yarn add --optional package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 --save-optional': 'yarn add --optional package-name second-name-2',
      'foobar npm install package-name second-name-2 --save-optional':
        'foobar yarn add --optional package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm install commands with the -O flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install -O package-name': 'yarn add --optional package-name',
      'npm install -O package-name second-name-2': 'yarn add --optional package-name second-name-2',
      'foobar npm install -O package-name second-name-2': 'foobar yarn add --optional package-name second-name-2',
      'foobar npm install -O package-name second-name-2. another-package-name':
        'foobar yarn add --optional package-name second-name-2. another-package-name',
      'npm install -O package-name second-name-2. another-package-name':
        'yarn add --optional package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 -O': 'yarn add --optional package-name second-name-2',
      'foobar npm install package-name second-name-2 -O': 'foobar yarn add --optional package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  // Save exact flag

  it('should substitute npm install commands with the --save-exact flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install --save-exact package-name': 'yarn add --exact package-name',
      'npm install --save-exact package-name second-name-2': 'yarn add --exact package-name second-name-2',
      'foobar npm install --save-exact package-name second-name-2':
        'foobar yarn add --exact package-name second-name-2',
      'foobar npm install --save-exact package-name second-name-2. another-package-name':
        'foobar yarn add --exact package-name second-name-2. another-package-name',
      'npm install --save-exact package-name second-name-2. another-package-name':
        'yarn add --exact package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 --save-exact': 'yarn add --exact package-name second-name-2',
      'foobar npm install package-name second-name-2 --save-exact':
        'foobar yarn add --exact package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm install commands with the -E flag', () => {
    const inputMappings = {
      // Before the packages
      'npm install -E package-name': 'yarn add --exact package-name',
      'npm install -E package-name second-name-2': 'yarn add --exact package-name second-name-2',
      'foobar npm install -E package-name second-name-2': 'foobar yarn add --exact package-name second-name-2',
      'foobar npm install -E package-name second-name-2. another-package-name':
        'foobar yarn add --exact package-name second-name-2. another-package-name',
      'npm install -E package-name second-name-2. another-package-name':
        'yarn add --exact package-name second-name-2. another-package-name',
      // After the packages
      'npm install package-name second-name-2 -E': 'yarn add --exact package-name second-name-2',
      'foobar npm install package-name second-name-2 -E': 'foobar yarn add --exact package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  // Uninstall

  it('should not substitute npm uninstall commands 0 packages', () => {
    const inputMappings = {
      'npm uninstall': 'npm uninstall',
      'foobar npm uninstall': 'foobar npm uninstall',
      'foobar npm uninstall. another-package-name': 'foobar npm uninstall. another-package-name',
      'npm uninstall. another-package-name': 'npm uninstall. another-package-name',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm uninstall commands with 1 or more packages', () => {
    const inputMappings = {
      'npm uninstall package-name': 'yarn remove package-name',
      'npm uninstall package-name second-name-2': 'yarn remove package-name second-name-2',
      'foobar npm uninstall package-name second-name-2': 'foobar yarn remove package-name second-name-2',
      'foobar npm uninstall package-name second-name-2. another-package-name':
        'foobar yarn remove package-name second-name-2. another-package-name',
      'npm uninstall package-name second-name-2. another-package-name':
        'yarn remove package-name second-name-2. another-package-name',
    }

    checkMappings(inputMappings)
  })

  // Global flag

  it('should substitute npm uninstall commands with the --global flag', () => {
    const inputMappings = {
      // Before the packages
      'npm uninstall --global package-name': 'yarn global remove package-name',
      'npm uninstall --global package-name second-name-2': 'yarn global remove package-name second-name-2',
      'foobar npm uninstall --global package-name second-name-2':
        'foobar yarn global remove package-name second-name-2',
      'foobar npm uninstall --global package-name second-name-2. another-package-name':
        'foobar yarn global remove package-name second-name-2. another-package-name',
      'npm uninstall --global package-name second-name-2. another-package-name':
        'yarn global remove package-name second-name-2. another-package-name',
      // After the packages
      'npm uninstall package-name second-name-2 --global': 'yarn global remove package-name second-name-2',
      'foobar npm uninstall package-name second-name-2 --global':
        'foobar yarn global remove package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm uninstall commands with the -g flag', () => {
    const inputMappings = {
      // Before the packages
      'npm uninstall -g package-name': 'yarn global remove package-name',
      'npm uninstall -g package-name second-name-2': 'yarn global remove package-name second-name-2',
      'foobar npm uninstall -g package-name second-name-2': 'foobar yarn global remove package-name second-name-2',
      'foobar npm uninstall -g package-name second-name-2. another-package-name':
        'foobar yarn global remove package-name second-name-2. another-package-name',
      'npm uninstall -g package-name second-name-2. another-package-name':
        'yarn global remove package-name second-name-2. another-package-name',
      // After the packages
      'npm uninstall package-name second-name-2 -g': 'yarn global remove package-name second-name-2',
      'foobar npm uninstall package-name second-name-2 -g': 'foobar yarn global remove package-name second-name-2',
    }

    checkMappings(inputMappings)
  })

  it('should not substitute npm config set commands with an incorrect number of arguments', () => {
    const inputMappings = {
      'npm config set': 'npm config set',
      'npm config set init-license': 'npm config set init-license',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm config set commands with the correct number of parameters', () => {
    const inputMappings = {
      'npm config set init-license MIT': 'yarn config set init-license MIT',
      'test test npm config set init-license MIT': 'test test yarn config set init-license MIT',
      'npm config set init-license MIT test test. More text': 'yarn config set init-license MIT test test. More text',
      'test test npm config set init-license MIT test test. More text':
        'test test yarn config set init-license MIT test test. More text',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm c set commands', () => {
    const inputMappings = {
      'npm c set init-license MIT': 'yarn config set init-license MIT',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm set commands', () => {
    const inputMappings = {
      'npm set init-license MIT': 'yarn config set init-license MIT',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm link commands', () => {
    const inputMappings = {
      'npm link': 'yarn link',
      'npm link package-name': 'yarn link package-name',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm ln commands', () => {
    const inputMappings = {
      'npm link': 'yarn link',
      'npm link package-name': 'yarn link package-name',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm rebuild commands', () => {
    const inputMappings = {
      'npm rebuild': 'yarn install --force',
      'test test npm rebuild': 'test test yarn install --force',
      'npm rebuild test test': 'yarn install --force test test',
      'test test npm rebuild test test': 'test test yarn install --force test test',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm cache clean commands', () => {
    const inputMappings = {
      'npm cache clean': 'yarn cache clean',
      'test test npm cache clean': 'test test yarn cache clean',
      'npm cache clean test test': 'yarn cache clean test test',
      'test test npm cache clean test test': 'test test yarn cache clean test test',
    }

    checkMappings(inputMappings)
  })

  it('should substitute npm commands with non-breaking spaces', () => {
    expect(replaceNPMCommands('npm install --save package-name')).toEqual('yarn add package-name')
  })

  it('should substitute npm commands with tabs', () => {
    expect(replaceNPMCommands('npm	install	--save	package-name')).toEqual('yarn add package-name')
  })

  it('should substitute npm commands with new lines and a non-replaceable command on the second line', () => {
    const input = `npm install
npm test`
    const expectedOutput = `yarn install
npm test`
    expect(replaceNPMCommands(input)).toEqual(expectedOutput)
  })

  it('should substitute npm commands with new lines and a replaceable command on the second line', () => {
    const input = `npm install
npm install --save package-name`
    const expectedOutput = `yarn install
yarn add package-name`
    expect(replaceNPMCommands(input)).toEqual(expectedOutput)
  })
})
