export const makeBasicDatasObject = (todoItem) => {
    const basicDatasObject = {
        "key": todoItem.key,
        "title": todoItem.title,
        "description": todoItem.description,
        "notes": todoItem.notes,
        "creationDate": todoItem.creationDate,
        "dueDate": todoItem.dueDate,
        "priority": todoItem.priority,
        "project": todoItem.project
    }
    return basicDatasObject;
}