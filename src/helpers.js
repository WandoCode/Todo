import { removeItemToTodoList, updateTodoItem} from './App'
import { TodoItem } from './TodoItem';

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

export function addButton(parentNode, nodeClass, text, callBackFct, data){
    /* Create and add a new button that call the callBackFct when clicked.*/

    const newButton = document.createElement("BUTTON");
    parentNode.appendChild(newButton)

    if (nodeClass != undefined && nodeClass != 0) {
        newButton.classList.add(nodeClass);
    }
    if (text != undefined && text != 0) {
        newButton.innerText = text;
    }

    newButton.addEventListener("click", (e) =>{
        callBackFct(e, data);
    });

    return newButton;
}

export const createList = (listeType, parentNode, dataArray, nodeClass, dataKeyValue) => {
    /* Add a list of type listeType (ul or ol) to parentNode, item coming from the given array.
    Use the dataKeyValue array to attribute a "data-key" attribute to each item in the list*/

    /* Add the list to parentNode */
    const newList = document.createElement(`${listeType}`);
    parentNode.appendChild(newList);

    if (nodeClass != undefined && nodeClass != 0) {
        newList.classList.add(nodeClass);
    }

    /* Populate the list */
    for (let i = 0; i < dataArray.length; i++) {
        const item = dataArray[i];
        const newLiEl = addNode(newList, "LI", 'listItem', item);
        newLiEl.setAttribute("data-key", dataKeyValue[i]);
    }

    return newList;
}

export const addSelectMenu = (parentNode, dataArray, nodeClass) => {
    /* Create a select menu with data provided in dataArray */

    const newSelect = addNode(parentNode, "select", nodeClass);
    newSelect.name = "project-selected";
    const blankOption = addNode(newSelect, "option", "project-option");
    blankOption.innerText = "";
    blankOption.value = "";

    for (let i = 0; i < dataArray.length; i++) {
        const el = dataArray[i];
        const newOption = addNode(newSelect, "option", "project-option");
        newOption.innerText = el;
        newOption.value = el;
    }

    return newSelect;
}

export const displayTitles = (parentNode, dataArray) => {
    /* Add the list of all the titles in the given project */

    /* Clear display */
    parentNode.innerHTML = "";

    const titleArray = [];
    const keyArray = [];
    for (let i = 0; i < dataArray.length; i++) {
        const el = dataArray[i];
        keyArray.push(el[0]);
        titleArray.push(el[1]);
    }

    /* Add new titles */
    const titleListElement = createList("UL", parentNode, titleArray, "title-list-project", keyArray);

    return titleListElement;
}