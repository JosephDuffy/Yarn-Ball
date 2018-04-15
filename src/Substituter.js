"use strict";

import isValidPackageName from "validate-npm-package-name";
import XRegExp from "xregexp";

export default class Substituter {

    replaceAllCommands(text) {
        text = this.replaceInstallCommands(text);
        text = this.replaceConfigCommands(text);
        text = this.replaceLinkCommands(text);
        text = this.replaceRebuildCommands(text);
        text = this.replaceCacheCleanCommands(text);
        return text;
    }

    validatePackageName(packageName) {
        let splitPackageName = packageName.split("@")[0]
        let packageNameWithoutVersion = splitPackageName[0] == '' ? '@'+splitPackageName[1] : splitPackageName[0];

        if (!isValidPackageName(packageNameWithoutVersion).validForOldPackages) {
            throw new Error(`${packageName} is not a valid package name`);
        }
    }

    replaceInstallCommands(text) {
        const mappings = {
            "add": {
                "regex": /i(?!nit)(?:nstall)?/,
                "supportsGlobal": true,
                "minParameters": 1,
                "parameterValidator": this.validatePackageName
            },
            "remove": {
                "regex": /(?:uninstall|remove|rm|r|un|unlink)/,
                "supportsGlobal": true,
                "minParameters": 1,
                "parameterValidator": this.validatePackageName
            }
        }

        const flagMappings = {
            "": ["-S", "--save"],
            "--dev": ["-D", "--save-dev"],
            "--optional": ["-O", "--save-optional"],
            "--exact": ["-E", "--save-exact"],
        }

        text = this.replaceUsingMappings(text, mappings, flagMappings, true);
        text = this.replaceUsingMappings(text, {
            "install": {
                "regex": /i(?!nit)(?:nstall)?/,
                "maxParameters": 0
            }
        });

        return text;
    }

    replaceConfigCommands(text) {
        // TODO: Find out if these should support global or not
        // Docs (https://yarnpkg.com/en/docs/cli/config) say yes, CLI says no
        const mappings = {
            "config set": {
                "regex": /(?:c(?:onfig)?[^\S\n\r])?set/,
                "minParameters": 2
            },
            "config get": {
                "regex": /(?:c(?:onfig)?[^\S\n\r])?get/,
                "minParameters": 1,
                "maxParameters": 1
            },
            "config delete": {
                "regex": /c(?:onfig)?[^\S\n\r]delete/,
                "minParameters": 1,
                "maxParameters": 1
            },
            "config list": {
                "regex": /c(?:onfig)?[^\S\n\r]list/,
                "maxParameters": 0
            }
        }

        return this.replaceUsingMappings(text, mappings);
    }

    replaceLinkCommands(text) {
        const mappings = {
            "link": {
                "regex": /(?:link|ln)/,
                "parameterValidator": this.validatePackageName
            }
        }

        return this.replaceUsingMappings(text, mappings);
    }

    replaceRebuildCommands(text) {
        const mappings = {
            "install --force": {
                "regex": /rebuild/,
                "parameterValidator": this.validatePackageName
            }
        }

        return this.replaceUsingMappings(text, mappings);
    }

    replaceCacheCleanCommands(text) {
        const mappings = {
            "cache clean": {
                "regex": /cache[^\S\n\r]clean/,
                "parameterValidator": this.validatePackageName
            }
        }

        return this.replaceUsingMappings(text, mappings);
    }

    replaceUsingMappings(text, commandMappings, flagMappings = {}) {
        for (let yarnCommandName in commandMappings) {
            const { regex: npmRegex, supportsGlobal = false, maxParameters = -1, minParameters = 0, parameterValidator = null } = commandMappings[yarnCommandName];
            const supportsParameters = maxParameters != 0

            let regexString = "";

            regexString += `(npm\[^\\S\\n\\r]${npmRegex.source})`;
            if (supportsParameters) {
                regexString += /((?:(?:[^\S\n\r][^\n|\r|\.|"|']+))*)/.source;
            }

            const regex = new RegExp(regexString, "g");

            XRegExp.forEach(text, regex, (match) => {
                let flags = [];
                let parameters = [];
                let isGlobal = false;
                let parsedCommand = match[1];
                const args = (match.length > 2) ? match[2].match(/\s\S+/g) || [] : [];

                argumentLoop:
                for (let argument of args) {
                    const trimmedArgument = argument.trim();
                    if (trimmedArgument === "-g" || trimmedArgument === "--global") {
                        if (supportsGlobal) {
                            isGlobal = true;
                        } else {
                            throw new Error("A Global flag was found in a command that doesn't have a global equivalent");
                        }
                        parsedCommand += argument;
                        continue;
                    }

                    for (let yarnFlag in flagMappings) {
                        const npmFlags = flagMappings[yarnFlag];

                        if (npmFlags.includes(trimmedArgument)) {
                            if (yarnFlag !== "") {
                                flags.push(yarnFlag);
                            }
                            parsedCommand += argument;
                            continue argumentLoop;
                        }
                    }

                    if (supportsParameters) {
                        if (parameterValidator !== null) {
                            try {
                                parameterValidator(trimmedArgument);
                            } catch(error) {
                                break argumentLoop;
                            }
                        }

                        parameters.push(trimmedArgument);
                        parsedCommand += argument;
                        continue;
                    }

                    // End the for-loop on the first invalid argument
                    break;
                }

                if (parameters.length < minParameters) {
                    return;
                }

                let yarnCommand = "yarn";

                if (isGlobal) {
                    yarnCommand += " global";
                }

                yarnCommand += " " + yarnCommandName;

                const flagsString = flags.reduce((previousValue, currentValue) => `${previousValue} ${currentValue}`, "");
                const parametersString = parameters.reduce((previousValue, currentValue) => `${previousValue} ${currentValue}`, "");

                yarnCommand += flagsString + parametersString;

                const parsedCommandRegex = new RegExp(`${XRegExp.escape(parsedCommand)}`);
                text = text.replace(parsedCommandRegex, yarnCommand);
            });
        }

        return text;
    }

}
