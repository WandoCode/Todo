import './style.css';
import { TodoList } from './TodoList';
import { addItemToTodoList, removeItemToTodoList, updateTodoItem, initTodoList, clearTodoList} from './App';
import { addNode, addButton, createList, addSelectMenu, displayTitles } from './helpers'

/* Load todoList from Storage or a empty one if no datas */

let todoList = initTodoList();
/* Event Listeners */


/* VARIABLES GLOBAL */
let currentProject = "";
let todoListArray = todoList.todoItemList;
/* == DISPLAY == */

const body = document.querySelector("body");

const header = addNode(body, "header");
const main = addNode(body, "main");
const footer = addNode(body, "footer");

/* HEADER */
const projectTitle = addNode(header, "div", "project-title");
projectTitle.innerText = currentProject;

/* MAIN */
const lateralMenu = addNode(main, "div", "lateral-menu");
const todoListElement = addNode(main, "div", "todo-display");

/* MENU LATERAL */
/* Display available project */
let arrayOfProject = todoList.getProjectsList();
const selectMenuProject = addSelectMenu(lateralMenu, arrayOfProject, "project-select");
const titleListDiv = addNode(lateralMenu, "div", "title-list-container");

/* Listen to the menu to display to choosen project. */
selectMenuProject.addEventListener("change", (e) => {

    /* Get current project's name */
    currentProject = e.target.value;

    /* Display title of item in the current project */
    let titleList = todoList.getTitleList(currentProject); 
    const titleListElement = displayTitles(titleListDiv, titleList, "title-list");

    /* Listen for click on the titleListElement */
    titleListElement.addEventListener("click");
});


