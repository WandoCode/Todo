import { TodoList } from "./TodoList";
import { saveItem, removeItembyKey, loadDatas, initializeTodoItemList} from "./Datas";
/* Module with the helpers for the application */

const isADate = (textDate) => {
    /* verify the given parameter is a string with the correct
    format to use it with Date(). 
    Return true or false. */

    const date = new Date(textDate);
    if (date == "Invalid Date") {
        console.log("Invalid dateString");
        return false;
    }
    return true;
}

const isATitle = (text) => {
    /* verify the given parameter is a string not too long (max 20 letters)
    and contain at least 1 letter.
    Return true or false. */

    if (typeof text != "string" || text.length > 20 || text.length < 1) {
        console.log("Invalid Title");
        return false;
    }
    else {
        return true;
    }
}

const isANote = (text) => {
    /* verify the given parameter is a string not too long (max 500 letters).
    Return true or false. */

    if (typeof text != "string" || text.length > 500) {
        console.log("Invalid note");
        return false;
    }
    else {
        return true;
    }
}

const isADescription = (text) => {
    /* verify the given parameter is a string not too long (max 30 letters).
    Return true or false. */

    if (typeof text != "string" || text.length > 30) {
        console.log("Invalid description");
        return false;
    }
    else {
        return true;
    }
}

const isAPriority = (num) => {
    /* Verify the given parameter is the string of a positive integer. Return true or false. */

    if (typeof num != "string" || typeof +num != "number" || num < 0) {
        console.log("Invalid priority");

        return false;
    }
    else {
        return true;
    }
}

const isAProject = (text) => {
    /* verify the given parameter is a string not too long (max 30 letters).
    Return true or false. */

    if (typeof text != "string" || text.length > 30) {
        console.log("Invalid project");
        return false;
    }
    else {
        return true;
    }
}

const validateDatas = (title, description, notes, dueDate, priority, project) => {
    /* validate each datas by calling the right fct. Return true or false. */

    return (isATitle(title) && isADescription(description) && isANote(notes) && isADate(dueDate) && isAPriority(priority) && isAProject(project));
}

const createBasicDatasObjectFromForm = (key, title, description, notes, dueDate, priority, project) => {
/* Validate datas and return a BasicDatasObject. */

    /* Datas validation (except for key) */
    if (!validateDatas(title, description, notes, dueDate, priority, project)){
        console.log("Invalid datas loaded from Form.")
        return -1;
    }

    /* Creation of the basicDatasObject */
    const basicDatasObject = {
        "key": key,
        "title": title,
        "description": description,
        "notes": notes,
        "creationDate": JSON.stringify(new Date()),
        "dueDate": JSON.stringify(dueDate),
        "priority": JSON.stringify(priority),
        "project": project
    }
    return basicDatasObject;
}

export const addItemToTodoList = (todoList, title, description, notes, dueDate, priority, project) => {
    /* Add an item to the todolist and save it as a basicDatasObject */

    /* Create a basicObject with key = undefined */
    const basicObject = createBasicDatasObjectFromForm(undefined, title, description, notes, dueDate, priority, project);
    
    /* Invalid BasicDAtasObject */
    if (basicObject == -1) {
        return;
    }

    /* Add the item to todolist */
    const key = todoList.createTodoItem(basicObject);

    /* Set the key before save it */
    basicObject.key = key;

    /* Save the item */
    saveItem(basicObject, todoList);
}

export const removeItemToTodoList = (todoList, key) => {
    /* Remove item with given key from todoList and storage */

    /* Remove item from storage */
    removeItembyKey(key);

    /* Remove item from todoList */
    todoList.removeItem(key);
}

export const clearTodoList = (todoList) => {
    /* Remove all item from storage and from todoList */

    localStorage.clear();
    todoList.removeAllItem();
}

export const updateTodoItem = (todoList, key, title, description, notes, dueDate, priority, project) => {
    /* Update an item in the todoList and storage */

    const basicObject = createBasicDatasObjectFromForm(key, title, description, notes, dueDate, priority, project);
    /* Invalid datas */
    if (basicObject == -1){
        return;
    }

    todoList.updateTodoItem(key, title, description, notes, dueDate, priority, project);
    saveItem(basicObject, todoList);
}

export const initTodoList = () => {
    /*Return a todoList loaded with availble DataTransfer, or empty if no datas */
    let todoList = new TodoList();

    /* Load datas from localStorage */
    const dataList = loadDatas();

    /* Datas are available */
    if (dataList.length != 0) {
        console.log("Initiate TodoList");
        initializeTodoItemList(dataList, todoList);
    }

    return todoList;
}