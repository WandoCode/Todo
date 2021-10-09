export class TodoItem {
    constructor(title, description, notes, creationDate, dueDate, priority, project) {
        this.key;
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    updateItem(title, description, notes, dueDate, priority, project) {
        /*set each variable of TodoItems with the corresponding given ones.*/
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.project = project;
    }

    loadFromBasicDatasObject(basicDatasObject) {
        /*set each variable comming from basicDatasObject of TodoItems with the corresponding given ones.*/
        this.key = basicDatasObject.key;
        this.title = basicDatasObject.title;
        this.description = basicDatasObject.description;
        this.notes = basicDatasObject.notes;
        this.creationDate = new Date(JSON.parse(basicDatasObject.creationDate));
        this.dueDate = new Date(JSON.parse(basicDatasObject.dueDate));
        this.priority = basicDatasObject.priority;
        this.project = basicDatasObject.project;
    }
}