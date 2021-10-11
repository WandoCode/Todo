import './style.css';
import { TodoList } from './TodoList';
import { addItemToTodoList, removeItemToTodoList, updateTodoItem, initTodoList, clearTodoList} from './App';
import { addNode, addButton, createList} from './helpers'

/* Load todoList from Storage or a empty one if no datas */

let todoList = initTodoList();
addItemToTodoList(todoList, "BCCB", "This is a description", "Some note for more information", "2021-11-02", "1", "Projet test");
console.log(localStorage)
console.log(todoList.todoItemList)

console.log(todoList.maxKey)



/* == DISPLAY == */

const body = document.querySelector("body");

const header = addNode(body, "header");
const main = addNode(body, "main");
const footer = addNode(body, "footer");

/* MAIN */

const lateralMenu = addNode(main, "div", "lateral-menu");


/* MENU LATERAL */
let arrayOfProject = todoList.getProjectsList();
const listOfProject = createList("UL", lateralMenu, arrayOfProject, "project-list");