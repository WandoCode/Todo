export function addNode(parentNode, nodeType, nodeClass, text, nodeId) {
    /* Append a new node of the given type to the parentNode. 
       If nodeClass and/or text, add it as classList and/or innerText 
       Return the new node */
       
    const newElement = document.createElement(`${nodeType}`);
    parentNode.appendChild(newElement);

    if (nodeClass != undefined && nodeClass != 0) {
        newElement.classList.add(nodeClass);
    }
    if (text != undefined && text != 0) {
        newElement.innerText = text;
    }
    if (nodeId != undefined && nodeId != 0) {
        newElement.id = nodeId;
    }

    return newElement;
}

export function addButton(parentNode, nodeClass, text, callBackFct){
    /* Create and add a new button that call the callBackFct when clicked.*/

    const newButton = document.createElement("BUTTON");
    parentNode.appendChild(newButton)

    if (nodeClass != undefined && nodeClass != 0) {
        newButton.classList.add(nodeClass);
    }
    if (text != undefined && text != 0) {
        newButton.innerText = text;
    }

    newButton.onclick = callBackFct;

    return newButton;
}