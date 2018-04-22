export default interface FlagMapping {
  readonly fromCommandFlags: string[]

  readonly toCommandFlag: string

  /**
   * If `true` the flag will take priority over all other flags and parameters, effectively
   * moving the flag to the start of the arguments list
   */
  readonly hasPriority: boolean
}
