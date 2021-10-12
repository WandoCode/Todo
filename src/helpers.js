import { removeItemToTodoList } from './App'


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

    newButton.addEventListener("click", () =>{
        callBackFct(data);
    });

    return newButton;
}

export const createList = (listeType, parentNode, dataArray, nodeClass) => {
    /* Add a list of type listeType (ul or ol) to parentNode, item coming from the given array */

    /* Add the list to parentNode */
    const newList = document.createElement(`${listeType}`);
    parentNode.appendChild(newList);

    if (nodeClass != undefined && nodeClass != 0) {
        newList.classList.add(nodeClass);
    }

    /* Populate the list */
    for (let i = 0; i < dataArray.length; i++) {
        const item = dataArray[i];
        addNode(newList, "LI", 'listItem', item);
    }

    return newList;
}


export const updateProject = (currentProject, projectTitleElement, todoListArray, todoListElement, todoList) => {
    /* Update all the datas linked to the currentProject project: 
    load todoItem linked, update project name displayed, etc. */

    /* Change project title displayed */
    projectTitleElement.innerText = currentProject;

    /* Display the note for the given project */
    /* Make sure other item vanish */
    todoListElement.innerHTML = "";
    console.log(todoList)
    /* Load item of the current project */
    for (let i = 0; i < todoListArray.length; i++) {
        const item = todoListArray[i];

        const newItem = addNode(todoListElement, "div", "todo-item");
        const newTitle = addNode(newItem, "div", "item-title",item.title);
        const newCreationDate = addNode(newItem, "div", "item-creation-date", item.creationDate);
        const newDescription = addNode(newItem, "div", "item-description", item.description);
        const newNote = addNode(newItem, "div", "item-note", item.notes);
        const newDueDate = addNode(newItem, "div", "item-due-date", item.dueDate);
        const updateItem = addButton(newItem, "btn-update", "Update Note", createUpdateForm, item);
        const removeItem = addButton()
    }
}


const createUpdateForm = (todoItem) => {
    /* TODO */
    console.log("remove " + todoItem.title);
}

