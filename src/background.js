"use strict";

import Substituter from "./Substituter";

const substituter = new Substituter();
const ignoredElements = [
    "TEXTFIELD", "TEXTAREA", "SCRIPT", "STYLE"
]

function applyFunctionToChildren(node, func) {
    for (let child of node.childNodes) {
        if (ignoredElements.includes(node.nodeName)) {
            continue;
        }

        if (child.childNodes.length === 0) {
            func(child);
        } else {
            applyFunctionToChildren(child, func);
        }
    }
};

function replaceCommandsInNode(node) {
    if (ignoredElements.includes(node.nodeName)) {
        return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.nodeName === "INPUT") {
            if (node.type === "text" && node.readOnly) {
                node.value = substituter.replaceAllCommands(node.value);
            }
        } else if (node.innerText) {
            node.innerText = substituter.replaceAllCommands(node.innerText);
        }
    } else if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = substituter.replaceAllCommands(node.nodeValue);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    applyFunctionToChildren(document.body, replaceCommandsInNode);
});
