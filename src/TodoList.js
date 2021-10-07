import { TodoItem } from "./TodoItem";

export class TodoList {
    constructor() {
        this.maxKey = 0;
        this.todoItemList = [];
    }

    addTodoItem(todoItem) {
        /* Add a new item to the todoItemList. Set todoItem.key if needed and increment this.maxKey
        Return todoItem.key */

        if (todoItem.key == undefined) {
            todoItem.key = this.maxKey;
            this.maxKey++;
        }

        this.todoItemList.push(todoItem);

        return todoItem.key;
    }

    createTodoItem(basicDatasObject) {
        /* Add an item to this.todoItemList from the basicDatasObject */

        const newItem = new TodoItem();
        newItem.loadFromBasicDatasObject(basicDatasObject);
        this.addTodoItem(newItem);
    }

    removeItem(key) {
        /* Remove the TodoItem object with the given key from todoItemList */
        const index = this.todoItemList.findIndex((el) => {
            return (el.key == key) ? true : false;
        });
        this.todoItemList.splice(index, 1);
    }

    removeAllItem() {
        /* Remove all item from the todoItemList */
        this.todoItemList = [];
    }

    getProjectsList() {
        /* Return a list of all the different project of the object in the todoItemList */
        let projectList = [];

        for (let i = 0; i < this.todoItemList.length; i++) {
            let el = this.todoItemList[i];
            let index = projectList.indexOf(el.project);

            /* If the project is not already in the list, add it */
            if (index == -1) {
                projectList.push(el.project);
            }
        };

        return projectList;
    }

    getTodoItem(key){
        /* Return the TodoItem from todoItemList with the given key */
        return this.todoItemList.find(el => {
            return (el.key == key);
        });
    }

    updateTodoItem(key, title, description, notes, creationDate, dueDate, priority, project) {
        /* Replace the datas of the todoItem with the given key with the datas provided */
        const item = this.getTodoItem(key);
        item.updateItem(title, description, notes, creationDate, dueDate, priority, project);
    }

}