import replaceNPMCommands from './functions/replaceNPMCommands'

document.addEventListener('DOMContentLoaded', event => {
  const ignoredElements = ['TEXTFIELD', 'TEXTAREA', 'SCRIPT', 'STYLE']

  applyFunctionToChildren(document.body, ignoredElements, replaceCommandsInNode)
})

function applyFunctionToChildren(element: HTMLElement, ignoredElements: string[], func: (node: Node) => void) {
  for (const child of element.childNodes) {
    if (ignoredElements.includes(child.nodeName)) {
      continue
    }

    if (child.childNodes.length === 0) {
      func(child)
    } else if (nodeIsHTMLElement(child)) {
      applyFunctionToChildren(child, ignoredElements, func)
    }
  }
}

function replaceCommandsInNode(node: Node) {
  if (nodeIsHTMLElement(node)) {
    if (nodeIsInputElement(node)) {
      if (node.type === 'text' && node.readOnly) {
        node.value = replaceNPMCommands(node.value)
      }
    } else if (node.innerText) {
      node.innerText = replaceNPMCommands(node.innerText)
    }
  } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue !== null) {
    node.nodeValue = replaceNPMCommands(node.nodeValue)
  }
}

function nodeIsHTMLElement(node: Node): node is HTMLElement {
  return node.nodeType === Node.ELEMENT_NODE
}

function nodeIsInputElement(node: Node): node is HTMLInputElement {
  return node.nodeName === 'INPUT'
}
