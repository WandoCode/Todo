
/* Module with the helpers for the application */

const isADate = (textDate) => {
    /* verify the given parameter is a string with the correct
    format to use it with Date(). 
    Return true or false. */

    const date = new Date(textDate);
    return (date != "Invalid Date");
}

const isATitle = (text) => {
    /* verify the given parameter is a string not too long (max 20 letters)
    and contain at least 1 letter.
    Return true or false. */

    if (typeof text != "string" || text.length > 20 || text.length < 1) {
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
        return false;
    }
    else {
        return true;
    }
}

const isAPriority = (num) => {
    /* Verify the given parameter is the string of a positive integer. Return true or false. */

    if (typeof num != "string" || typeof +num != "number" || num < 0) {
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
        return false;
    }
    else {
        return true;
    }
}

export const validateDatas = (title, description, notes, creationDate, dueDate, priority, project) => {
    /* validate each datas by calling the right fct. Return true or false. */

    return (isATitle(title) && isADescription(description) && isANote(notes) 
    && isADate(creationDate) && isADate(dueDate) && isAPriority(priority) && isAProject(project));
}

export const createBasicDatasObjectFromForm = (key, title, description, notes, creationDate, dueDate, priority, project) => {
/* Validate datas and return a BasicDatasObject. Key have to provided if we want to update the datas of an existing object.
Otherwise key must be set to undefined */


}