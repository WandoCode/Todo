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
}