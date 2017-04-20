"use strict";

import Substituter from "./Substituter";

function applyFunctionToChildren(node, func) {
    for (let child of node.childNodes) {
        if (child.childNodes.length === 0) {
            func(child);
        } else {
            applyFunctionToChildren(child, func);
        }
    }
};

document.addEventListener("DOMContentLoaded", (event) => {

    const substituter = new Substituter();

    applyFunctionToChildren(document.body, (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.nodeName === "INPUT") {
                if (node.type === "text" && node.readOnly) {
                    node.value = substituter.replaceAllCommands(node.value);
                }
            } else if (node.nodeName !== "TEXTFIELD" && node.innerText) {
                node.innerText = substituter.replaceAllCommands(node.innerText);
            }
        } else if (node.nodeType === Node.TEXT_NODE && node.parentNode.nodeName !== "TEXTAREA") {
            node.nodeValue = substituter.replaceAllCommands(node.nodeValue);
        }
    });
});
