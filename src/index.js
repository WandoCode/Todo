import './style.css';
import { TodoList } from './TodoList';
import { addItemToTodoList, removeItemToTodoList, updateTodoItem, initTodoList, clearTodoList} from './App';
import { addNode, addButton, createList, updateProject } from './helpers'

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
let arrayOfProject = todoList.getProjectsList();
const listOfProject = createList("UL", lateralMenu, arrayOfProject, "project-list");

listOfProject.addEventListener("click", (e) => {
    currentProject = e.target.innerText;
    todoListArray = todoList.getItemsProjectList(currentProject);
    updateProject(currentProject, projectTitle, todoListArray, todoListElement, todoList);
});


