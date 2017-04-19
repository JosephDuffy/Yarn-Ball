"use strict";

import isValidPackageName from "validate-npm-package-name";

const commandParametersRegex = `((?:(?:\\ [^\\s]+))+)`;

function applyFunctionToChildren(node, func) {
    for (let child of node.childNodes) {
        func(child);
        applyFunctionToChildren(child, func);
    }
};

applyFunctionToChildren(document.body, (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
        node.innerHTML = replaceInstallCommands(node.innerHTML);
    } else if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = replaceInstallCommands(node.nodeValue);
    }
});

function replaceInstallCommands(text) {
    if (text === undefined) {
        return text;
    }

    let installRegex = new RegExp(`npm\ i(?:nstall)?${commandParametersRegex}`);
    
    let match = text.match(installRegex);

    while (match) {
        let flags = [];
        let packages = [];
        const parameters = match[1].split(" ").slice(1);

        for (let parameter of parameters) {
            if (parameter === "-s" || parameter === "--save") {
                continue;
            } else if (parameter === "-D" || parameter === "--save-dev") {
                flags.push("-D");
            } else if (!isValidPackageName(parameter).validForOldPackages) {
                break;
            } else {
                packages.push(parameter);
            }
        }

        if (packages.length === 0) {
            // TODO: Add to ignore list
            match = null;
            continue;
        }

        const flagsString = flags.reduce((previousValue, currentValue) => `${previousValue} ${currentValue}`, "");
        const packagesString = packages.reduce((previousValue, currentValue) => `${previousValue} ${currentValue}`, "");
        const yarnCommand = `yarn add${flagsString}${packagesString}`;

        text = text.replace(installRegex, yarnCommand);

        match = text.match(installRegex);
    }

    return text;
}

replaceInstallCommands();
