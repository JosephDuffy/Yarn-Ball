import FlagMapping from './FlagMapping'

export default interface SubcommandMapping {
  readonly fromSubcommand: string

  readonly toSubcommandRegex: RegExp

  readonly minParameters?: number

  readonly maxParameters?: number

  readonly flagMappings?: FlagMapping[]

  parameterValidator?(packageName: string): void
}
