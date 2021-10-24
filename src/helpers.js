import { removeItemToTodoList, updateTodoItem, addItemToTodoList } from './App'
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

    if (callBackFct != undefined){
        newButton.addEventListener("click", (e) =>{
            callBackFct(e, data);
        });
    }

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

export const displayTitles = (parentNode, todoList, project, sortbyChoice) => {
    /* Add the list of all the titles in the given project */

    /* Clear display */
    parentNode.innerHTML = "";

    /* Get the item for the given project sorted by the given parameter */
    let dataArray = todoList.getItemsProjectList(project);
    let sortedData = sortByData(dataArray, sortbyChoice);
    console.table(sortedData);
    /* Get an array of the title and key */
    const titleArray = [];
    const keyArray = [];
    for (let i = 0; i < sortedData.length; i++) {
        const el = sortedData[i];
        keyArray.push(el.key);
        titleArray.push(el.title);
    }

    /* Add new titles */
    const titleListElement = createList("UL", parentNode, titleArray, "title-list-project", keyArray);

    return titleListElement;
}

const sortByData = (dataArray, sorting) => {

    let sortKey;
    if (sorting == "Creation date") {
        sortKey = "creationDate";
    }
    else if (sorting == "Due date"){
        sortKey = "dueDate";
    }
    else if (sorting == "Title"){
        sortKey = "title";
    }
    else if (sorting == "Priority"){
        sortKey = "priority";
    }
    else {
        sortKey = "key";
    }

    let sortedArray = dataArray.sort((a, b) => {
        return (a[sortKey] > b[sortKey]) ? 1 : -1;
    });

    return sortedArray;
}


export const cbSelectProject = (currentProject, todoList, titleListDiv, sortbyChoice) => {
    /* Display title of item in the current project */
    return displayTitles(titleListDiv, todoList, currentProject, sortbyChoice);
}

const tagAsSelected = (target) => {
/* Tag an element as selected */

/* Erase previous selected tag */
    let titleItemList = document.querySelectorAll(".listItem");

    for (let i = 0; i < titleItemList.length; i++) {
        const element = titleItemList[i];
        element.removeAttribute("id");
    }

    /* Add a selected tag to to choosen title */
    target.id = "selected-title";
}

export const cbClickList = (e, todoList, parentNode) => {
    /* Cb fct when a title is clicked */

    /* tag the title as selected */
    tagAsSelected(e.target);

    /* Get item key */
    const itemKey = e.target.getAttribute("data-key");
    
    /* Get todo item */
    const item = todoList.getTodoItem(itemKey);

    /* Display item details in the main screen */
    return displayTodoItem(todoList, item, parentNode);
}

const displayTodoItem = (todoList, item, parentNode) => {
    /* Display item details in the main screen */ 

    const itemFormDiv = addNode(parentNode, "div", "form-div");
    const itemForm = addNode(itemFormDiv, "form");
    itemForm.id = "item-form";

    const itemKey = createKeyForm(itemForm, item.key);
    const itemTitle = createFormElement(itemForm, "short", item.title, "item-title");
    const itemDescr = createFormElement(itemForm, "long", item.description, "item-descr");
    const itemNote = createFormElement(itemForm, "textarea", item.notes, "item-notes");
    const itemDueDate = createFormElement(itemForm, "date", item.dueDate, "item-date");
    const itemProject = createFormElement(itemForm, "long", item.project, "item-project");
    const itemPriority = createFormElement(itemForm, "number", item.priority, "item-priority");

    const removeBtn = addButton(itemForm, "rmv-btn", "Delete note", cbRemoveBtn, [todoList, item.key]);
    const updateBtn = addButton(itemForm, "update-btn", "Update note", cbUpdateBtn, [todoList, item.key]);

    return itemFormDiv;
}

const cbUpdateBtn = (e, data) => {
    /* Update the item with key  = data[1] */
    e.preventDefault();

    /* Extract datas from the form */
    const itemForm = document.forms[0];
    let newTitle = itemForm.elements["item-title"].value;
    let newDescr = itemForm.elements["item-descr"].value;
    let newNote = itemForm.elements["item-notes"].value;
    let newDueDate = itemForm.elements["item-date"].value;
    let newProject = itemForm.elements["item-project"].value;
    let newPriority = itemForm.elements["item-priority"].value;

    /* Update data base */
    updateTodoItem(data[0], data[1], newTitle, newDescr, newNote, newDueDate, newPriority, newProject);

    /* Upadte title list display */
    let selectedTitle = document.querySelector("#selected-title");
    selectedTitle.innerText = newTitle;
}


const cbRemoveBtn = (e, data) => {
/* Remove the item with key  = data[1] from storage */
    e.preventDefault();

    /* Remove from db*/
    removeItemToTodoList(data[0], data[1]);

    /* Upate display */
    let formDiv = document.querySelector(".form-div");
    formDiv.remove();

    let selectedTitle = document.querySelector("#selected-title");
    selectedTitle.remove();
}

const createFormElement = (parentNode, inputType, data, nodeId) => {
/* Create an inupt field of the given type and add it to the given node */
    let inputForm;
    if (inputType == "short") {
        inputForm = document.createElement("input");
        inputForm.setAttribute("max", "20");
    }
    else if (inputType == "long") {
        inputForm = document.createElement("input");
        inputForm.setAttribute("max", "30");
    }
    else if (inputType == "textarea") {
        inputForm = document.createElement("TEXTAREA");
        inputForm.setAttribute("maxLength", "300");
    }
    else if (inputType == "textarea") {
        inputForm= document.createElement("input");
        inputForm.setAttribute("type", "date");
    }
    else if (inputType == "number") {
        inputForm= document.createElement("input");
        inputForm.setAttribute("type", "number");
    }
    else if (inputType == "date") {
        inputForm= document.createElement("input");
        inputForm.setAttribute("type", "date");
    }
    else{
        return;
    }

    /* Convert a string date to the correct format to display */
    if (inputType == "date") {
        let date;
        if (data == "") {
            date = new Date()
        }
        else {
            date = new Date(data)
        }
        data = date.toISOString().slice(0, 10)
    }

    inputForm.value = data;
    inputForm.id = nodeId

    parentNode.appendChild(inputForm);

    return inputForm;
}

const createKeyForm = (parentNode, data) => {
    /* Create an invisible field to contains the item's key */
    const inputForm = document.createElement("input");
    inputForm.value = data;
    inputForm.style.display = "none";
    inputForm.id = "item-key"

    parentNode.appendChild(inputForm);

    return inputForm;
}

export const cbAddItem = (todoList, parentNode) => {
    /* Cb fct to add a new todo item */

    /* Create an empty form to create a new note */
    const itemFormDiv = addNode(parentNode, "div", "form-div");
    const itemForm = addNode(itemFormDiv, "form");
    itemForm.id = "item-form";

    const itemTitle = createFormElement(itemForm, "short", "", "item-title");
    const itemDescr = createFormElement(itemForm, "long", "", "item-descr");
    const itemNote = createFormElement(itemForm, "textarea", "", "item-notes");
    const itemDueDate = createFormElement(itemForm, "date", "", "item-date");
    const itemProject = createFormElement(itemForm, "long", "", "item-project");
    const itemPriority = createFormElement(itemForm, "number", "", "item-priority");

    const saveBtn = addButton(itemForm, "rmv-btn", "Save note", cbSaveBtn, [todoList]);

    return itemFormDiv;
}

const cbSaveBtn = (e, data) => {
/* Save a new note */

    /* Extract datas from the form */
    const itemForm = document.forms[0];
    let newTitle = itemForm.elements["item-title"].value;
    let newDescr = itemForm.elements["item-descr"].value;
    let newNote = itemForm.elements["item-notes"].value;
    let newDueDate = itemForm.elements["item-date"].value;
    let newProject = itemForm.elements["item-project"].value;
    let newPriority = itemForm.elements["item-priority"].value;

    /* Update data base */
    addItemToTodoList(data[0], newTitle, newDescr, newNote, newDueDate, newPriority, newProject);
}