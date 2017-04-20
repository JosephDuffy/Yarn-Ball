"use strict";

import isValidPackageName from "validate-npm-package-name";

const commandParametersRegex = `((?:(?:\\ [^\\s]+))+)`;

function applyFunctionToChildren(node, func) {
    for (let child of node.childNodes) {
        if (child.childNodes.length === 0) {
            func(child);
        } else {
            applyFunctionToChildren(child, func);
        }
    }
};

applyFunctionToChildren(document.body, (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.nodeName === "INPUT") {
            if (node.type === "text" && node.readOnly) {
                node.value = replaceInstallCommands(node.value);
            }
        } else if (node.nodeName !== "TEXTFIELD" && node.innerText) {
            node.innerText = replaceInstallCommands(node.innerText);
        }
    } else if (node.nodeType === Node.TEXT_NODE && node.parentNode.nodeName !== "TEXTAREA") {
        node.nodeValue = replaceInstallCommands(node.nodeValue);
    }
});

function replaceInstallCommands(text) {
    if (text === undefined) {
        return text;
    }

    let installRegex = new RegExp(`(npm\ i(?:nstall)?)${commandParametersRegex}`);
    
    let match = text.match(installRegex);

    while (match) {
        let flags = [];
        let packages = [];
        const command = match[1];
        const parameters = match[2].split(" ").slice(1);
        let parsedCommand = command;
        let isGlobalCommand = false;

        for (let parameter of parameters) {
            if (parameter === "-g" || parameter === "--global") {
                isGlobalCommand = true;
            } else if (parameter === "-s" || parameter === "--save") {
                // "save" is the default and only option for `yarn`
                // TODO: Provide an option to only replace if save is specified
            } else if (parameter === "-D" || parameter === "--save-dev") {
                flags.push("--dev");
            } else if (parameter ===  "-O" || parameter === "--save-optional") {
                flags.push("--optional");
            } else if (parameter ===  "-E" || parameter === "--save-exact") {
                flags.push("--exact");
            } else {
                // TODO: Support "@josephduffy/yarn-ball@1.0.1" style packages
                const packageName = parameter.split("@")[0];
                if (isValidPackageName(packageName).validForOldPackages) {
                    packages.push(parameter);
                }
            }

            parsedCommand += " " + parameter;
        }

        if (packages.length === 0) {
            // TODO: Add to ignore list
            match = null;
            continue;
        }

        const flagsString = flags.reduce((previousValue, currentValue) => `${previousValue} ${currentValue}`, "");
        const packagesString = packages.reduce((previousValue, currentValue) => `${previousValue} ${currentValue}`, "");
        const yarnCommand = `yarn${isGlobalCommand ? " global": ""} add${flagsString}${packagesString}`;

        text = text.replace(parsedCommand, yarnCommand);

        match = text.match(installRegex);
    }

    return text;
}

replaceInstallCommands();
