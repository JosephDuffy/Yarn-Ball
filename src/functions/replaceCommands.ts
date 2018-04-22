import XRegExp = require('xregexp')
import FlagMapping from '../interfaces/FlagMapping'
import SubcommandMapping from '../interfaces/SubcommandMapping'

export default replaceCommands

function replaceCommands(
  fromCommand: string,
  toCommand: string,
  text: string,
  subcommandMappings: SubcommandMapping[],
) {
  let modifiedText = text

  for (const subcommandMapping of subcommandMappings) {
    const {
      fromSubcommand,
      toSubcommandRegex,
      maxParameters = -1,
      minParameters = 0,
      parameterValidator = null,
      flagMappings = [],
    } = subcommandMapping

    const supportsParameters = maxParameters !== 0

    // Any number of whitespace characters, other than newline and carriage return
    const argumentSeparatorRegex = /[^\S\n\r]+/
    const fromCommandRegex = new RegExp(XRegExp.escape(fromCommand))
    const argumentRegex = /\S+/
    const untrimmedArgumentRegex = new RegExp(argumentSeparatorRegex.source + argumentRegex.source)

    // prettier-ignore
    const regexString =
      '(' +
        fromCommandRegex.source +
        argumentSeparatorRegex.source +
        toSubcommandRegex.source +
      ')' +
      '(' +
        '(?:' +
          untrimmedArgumentRegex.source +
        ')*' +
      ')'

    const regex = new RegExp(regexString, 'g')

    XRegExp.forEach(text, regex, match => {
      const flags: string[] = []
      const parameters: string[] = []
      let parsedCommand = match[1]
      const args = match.length > 2 ? match[2].match(new RegExp(untrimmedArgumentRegex, 'g')) || [] : []

      let mappedCommand = toCommand

      argumentLoop: for (const argument of args) {
        const trimmedArgument = argument.trim()

        for (const flagMapping of flagMappings) {
          const { toCommandFlag, fromCommandFlags } = flagMapping

          if (fromCommandFlags.includes(trimmedArgument)) {
            if (toCommandFlag !== '') {
              if (flagMapping.hasPriority) {
                mappedCommand += ' ' + toCommandFlag
              } else {
                flags.push(toCommandFlag)
              }
            }
            parsedCommand += argument
            continue argumentLoop
          }
        }

        if (parameterValidator !== null) {
          try {
            parameterValidator(trimmedArgument)

            if (!supportsParameters) {
              return
            }
          } catch (error) {
            break
          }
        } else if (!supportsParameters) {
          break
        }

        parameters.push(trimmedArgument)
        parsedCommand += argument
      }

      if (parameters.length < minParameters) {
        return
      }

      mappedCommand += ' ' + fromSubcommand

      if (flags.length > 0) {
        mappedCommand += ' ' + flags.join(' ')
      }

      if (parameters.length > 0) {
        mappedCommand += ' ' + parameters.join(' ')
      }

      const parsedCommandRegex = new RegExp(XRegExp.escape(parsedCommand))
      modifiedText = modifiedText.replace(parsedCommandRegex, mappedCommand)
    })
  }

  return modifiedText
}
