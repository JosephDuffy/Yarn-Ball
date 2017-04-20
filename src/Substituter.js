"use strict";

import isValidPackageName from "validate-npm-package-name";
import escapeStringRegexp from "escape-string-regexp";

const commandParametersRegex = /((?:(?: [^ \.\"\']+))*)/;

export default class Substituter {

    replaceAllCommands(text) {
        text = replaceInstallCommands(text);
        text = replaceConfigCommands(text);
        text = replaceLinkCommands(text);
        return text;
    }

    validatePackageName(packageName) {
        // TODO: Support "@josephduffy/yarn-ball@1.0.1" style packages
        if (!isValidPackageName(packageName.split("@")[0]).validForOldPackages) {
            throw new Error(`${packageName} is not a valid package name`);
        }
    }

    replaceInstallCommands(text) {
        const mappings = {
            "add": {
                "regex": /i(?!nit)(?:nstall)/,
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
                "regex": /i(?!nit)(?:nstall)/,
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
                "regex": /(?:c(?:onfig)? )?set/,
                "minParameters": 2
            },
            "config get": {
                "regex": /(?:c(?:onfig)? )?get/,
                "minParameters": 1,
                "maxParameters": 1
            },
            "config delete": {
                "regex": /c(?:onfig)? delete/,
                "minParameters": 1,
                "maxParameters": 1
            },
            "config list": {
                "regex": /c(?:onfig)? list/,
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

    replaceUsingMappings(text, mappings, flagMappings = {}) {
        for (let yarnCommandName in mappings) {
            const { regex: npmRegex, supportsGlobal = false, maxParameters = -1, minParameters = 0, parameterValidator = null } = mappings[yarnCommandName];
            const supportsParameters = maxParameters != 0

            let ignoredStrings = [];
            let match;

            function performMatch() {
                let regexString = "";

                if (ignoredStrings.length > 0) {
                    regexString += "^" + ignoredStrings.map((string) => `(?!${escapeStringRegexp(string)})`);
                }

                regexString += `(npm ${npmRegex.source})`;
                if (supportsParameters) {
                    regexString += /((?:(?: [^ \.\"\']+))*)/.source;
                }
                const regex = new RegExp(regexString)
                match = text.match(regex)
            }

            performMatch();

            while (match) {
                let flags = [];
                let parameters = [];
                let parsedCommand = match[1];
                let args = (match.length > 2) ? match[2].split(" ").slice(1) : [];

                let yarnCommand = "yarn";

                if (args.includes("-g") || args.includes("--global")) {
                    if (supportsGlobal) {
                        yarnCommand += " global";
                    } else {
                        throw new Error("A Global flag was found in a command that doesn't have a global equivalent")
                    }
                }

                yarnCommand += " " + yarnCommandName;

                argumentLoop:
                for (let argument of args) {
                    if (argument === "-g" || argument === "--global") {
                        parsedCommand += " " + argument;
                        continue;
                    }

                    for (let yarnFlag in flagMappings) {
                        const npmFlags = flagMappings[yarnFlag];

                        if (npmFlags.includes(argument)) {
                            if (yarnFlag !== "") {
                                flags.push(yarnFlag);
                            }
                            parsedCommand += " " + argument;
                            continue argumentLoop;
                        }
                    }

                    if (supportsParameters) {
                        if (parameterValidator !== null) {
                            parameterValidator(argument);
                        }

                        parameters.push(argument);
                        parsedCommand += " " + argument;
                        continue;
                    }

                    break;
                }

                if (parameters.length < minParameters) {
                    ignoredStrings.push(match[0]);
                    performMatch();
                    continue;
                } else {
                    const flagsString = flags.reduce((previousValue, currentValue) => `${previousValue} ${currentValue}`, "");
                    const parametersString = parameters.reduce((previousValue, currentValue) => `${previousValue} ${currentValue}`, "");
                    yarnCommand += flagsString + parametersString;
                }

                text = text.replace(parsedCommand, yarnCommand);

                performMatch();
            }
        }

        return text;
    }

}
