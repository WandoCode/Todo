import { TodoItem } from "./TodoItem";

export class TodoList {
    constructor() {
        this.maxKey = 0;
        this.todoItemList = [];
    }

    createTodoItem(basicDatasObject) {
        /* Add an item to this.todoItemList from the basicDatasObject.
        Set todoItem.key if needed and increment this.maxKey
        Return todoItem.key */

        const newItem = new TodoItem();
        newItem.loadFromBasicDatasObject(basicDatasObject);

        if (newItem.key == undefined) {
            newItem.key = this.maxKey;
            this.maxKey++;
        }

        this.todoItemList.push(newItem);

        return newItem.key;
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

    getItemsProjectList(project) {
        /* Return a list of the TodoItem with the given project. If no project, return todoItemList.*/

        /* Case with no given project */
        if (project == undefined) return this.todoItemList;

        /* Filter with the given project */
        return this.todoItemList.filter(el => {
            return (el.project == project);
        });
    }

    getTitleList(project) {
        /* Return a list of the title of the items with the given project.
        If no project (=undefined), return the title of all the item */

        const projectItemList = this.getItemsProjectList(project);

        return projectItemList.map(el => {
            return el.title;
        });
    }

    sortByPriority() {
        /* Sort the todoItem by priority order */

        return this.todoItemList.sort((a, b) => {
            return (a.priority - b.priority);
        });
    }

    sortByDate() {
        /* Sort the todoItem by date of creation */

        return this.todoItemList.sort((a, b) => {
            return (a.creationDate - b.creationDate);
        });
    }


}