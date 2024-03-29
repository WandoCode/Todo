import './style.css';
import { TodoList } from './TodoList';
import { initTodoList} from './App';
import { addNode, addButton, cbClickList, addSelectMenu, displayTitles, cbSelectProject, cbAddItem} from './helpers'

/* Load todoList from Storage or a empty one if no datas */

let todoList = initTodoList();
/* Event Listeners */


/* VARIABLES GLOBAL */
let currentProject = "";
let todoListArray = todoList.todoItemList;
let projectTitleHTML;
/* == DISPLAY == */

const body = document.querySelector("body");

const header = addNode(body, "header");
const main = addNode(body, "main");

/* HEADER */
projectTitleHTML = addNode(header, "div", "project-title");
projectTitleHTML.innerText = currentProject;

/* MAIN */
const lateralMenu = addNode(main, "div", "lateral-menu");
const todoItemElement = addNode(main, "div", "todo-display");
const addItemBtnDiv =  addNode(main, "div", "add-btn-div");

/* MENU LATERAL */
/* Display available project */
const selectMenusDiv = addNode(lateralMenu, "DIV", "select-div");
let arrayOfProject = todoList.getProjectsList();
const selectMenuProject = addSelectMenu(selectMenusDiv, arrayOfProject, "project-select", "Filter by:");
const titleListDiv = addNode(lateralMenu, "div", "title-list-container");

/* Sort by selection */
const sortbySelector = addSelectMenu(selectMenusDiv, ["Creation date", "Due date", "Title", "Priority"], "sortby-selector", "Sort by:");

/* Default sorting is used */
let sortbyChoice = "";

/* Initialize display of title: show all title */
let titleListElement = displayTitles(titleListDiv, todoList, "", sortbyChoice);

/* Add item BUTTON */
const addItemBtn = addButton(addItemBtnDiv, "add-item-btn", "➕");
addItemBtn.onclick = () => {
    todoItemElement.innerHTML = "";
    cbAddItem(todoList, todoItemElement);
}

/* Listen to sort by the value in the sort by menu */
sortbySelector.addEventListener("change", e => {
    sortbyChoice = e.target.value;

    currentProject = document.querySelector(".project-select").value;

    /* Display title */
    titleListElement = cbSelectProject(currentProject, todoList, titleListDiv, sortbyChoice);

    titleListElement.addEventListener("click", e => {
        todoItemElement.innerHTML = "";
        cbClickList(e, todoList, todoItemElement);
    });
});

/* Listen for click on the titleListElement */
titleListElement.addEventListener("click", e => {
    todoItemElement.innerHTML = "";
    cbClickList(e, todoList, todoItemElement);
});

/* Listen to the menu to display to choosen project. */
selectMenuProject.addEventListener("change", (e) => {
    todoItemElement.innerHTML = "";

    currentProject = e.target.value;

    /* Display titles */
    titleListElement = cbSelectProject(currentProject, todoList, titleListDiv, sortbyChoice);

    titleListElement.addEventListener("click", e => {
        todoItemElement.innerHTML = "";
        cbClickList(e, todoList, todoItemElement);
    });
});






