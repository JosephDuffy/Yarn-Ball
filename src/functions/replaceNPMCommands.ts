import isValidPackageName = require('validate-npm-package-name')
import XRegExp = require('xregexp')
import replaceCommands from './replaceCommands'

export default function replaceNPMCommands(text: string) {
  return replaceCommands('npm', 'yarn', text, [
    {
      fromSubcommand: 'add',
      toSubcommandRegex: /i(?!nit)(?:nstall)?/,
      minParameters: 1,
      parameterValidator: validatePackageName,
      flagMappings: [
        {
          toCommandFlag: 'global',
          fromCommandFlags: ['-g', '--global'],
          hasPriority: true,
        },
        {
          toCommandFlag: '',
          fromCommandFlags: ['-S', '--save'],
          hasPriority: false,
        },
        {
          toCommandFlag: '--dev',
          fromCommandFlags: ['-D', '--save-dev'],
          hasPriority: false,
        },
        {
          toCommandFlag: '--optional',
          fromCommandFlags: ['-O', '--save-optional'],
          hasPriority: false,
        },
        {
          toCommandFlag: '--exact',
          fromCommandFlags: ['-E', '--save-exact'],
          hasPriority: false,
        },
      ],
    },
    {
      fromSubcommand: 'remove',
      toSubcommandRegex: /(?:uninstall|remove|rm|r|un|unlink)/,
      minParameters: 1,
      parameterValidator: validatePackageName,
      flagMappings: [
        {
          toCommandFlag: 'global',
          fromCommandFlags: ['-g', '--global'],
          hasPriority: true,
        },
      ],
    },
    {
      fromSubcommand: 'install',
      toSubcommandRegex: /i(?!nit)(?:nstall)?/,
      maxParameters: 0,
      parameterValidator: validatePackageName,
    },

    // TODO: Find out if these should support global or not
    // Docs (https://yarnpkg.com/en/docs/cli/config) say yes, CLI says no
    {
      fromSubcommand: 'config set',
      toSubcommandRegex: /(?:c(?:onfig)?[^\S\n\r])?set/,
      minParameters: 2,
    },
    {
      fromSubcommand: 'config get',
      toSubcommandRegex: /(?:c(?:onfig)?[^\S\n\r])?get/,
      minParameters: 1,
      maxParameters: 1,
    },
    {
      fromSubcommand: 'config delete',
      toSubcommandRegex: /c(?:onfig)?[^\S\n\r]delete/,
      minParameters: 1,
      maxParameters: 1,
    },
    {
      fromSubcommand: 'config list',
      toSubcommandRegex: /c(?:onfig)?[^\S\n\r]list/,
      maxParameters: 0,
    },

    {
      fromSubcommand: 'link',
      toSubcommandRegex: /(?:link|ln)/,
      parameterValidator: validatePackageName,
    },

    {
      fromSubcommand: 'install --force',
      toSubcommandRegex: /rebuild/,
      parameterValidator: validatePackageName,
    },

    {
      fromSubcommand: 'cache clean',
      toSubcommandRegex: /cache[^\S\n\r]clean/,
      parameterValidator: validatePackageName,
    },
  ])
}

function validatePackageName(packageName: string) {
  const splitPackageName = packageName.split('@')
  const packageNameWithoutVersion = splitPackageName[0] === '' ? '@' + splitPackageName[1] : splitPackageName[0]

  if (!isValidPackageName(packageNameWithoutVersion).validForOldPackages) {
    throw new Error(`${packageName} is not a valid package name`)
  }
}
