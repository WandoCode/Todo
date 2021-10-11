import { makeBasicDatasObject } from './BasicDatasObject';
/* Helpers function around the managment of the datas with localStorage */



export const loadDatas = () => {
    /* Return a list of object stored in localStorage with the key starting with "todoItem-". */
    let dataList = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.includes("todoItem")) {
            dataList.push(JSON.parse(localStorage.getItem(key)));
        }
    }

    return dataList;
};

export const initializeTodoItemList = (dataList, todoListObject) => {
    /* Populate the todoList Object with datas coming from dataList */

    dataList.forEach(el => {
        todoListObject.createTodoItem(el)
    });
    
    todoListObject.maxKey = parseInt(localStorage.getItem("maxKey"));
};

export const saveItem = (item, todoListObject) => {
    /* Save an item in localStorage at the key "todoItem-{basicDatas.id}" after formating it in a basicDatasObject.
    Do not save a basicDatas with basicDatas.key=undefiened.
    if the key "todoItem-{basicDatas.id}" is already taken: replace the value by the new one */

    /* Do not save object with undefinde key */
    if (item.key == undefined) {
        return;
    }

    /* Just to be sure that we store a stringify object */
    const basicDataObject = makeBasicDatasObject(item)
    /* Store datas */
    localStorage.setItem(`todoItem-${basicDataObject.key}`, JSON.stringify(basicDataObject));
    console.log(todoListObject.maxKey)
    localStorage.setItem("maxKey", `${todoListObject.maxKey}`)
};

export const removeItembyKey = (key) => {
    /* Remove the basicDataObject with the key "todoItem-{key}" */
    localStorage.removeItem(`todoItem-${key}`);
}