declare module 'validate-npm-package-name' {
  function validate(packageName: String): ValidationResult

  interface ValidationResult {
    validForNewPackages: boolean
    validForOldPackages: boolean
  }

  export = validate
}
