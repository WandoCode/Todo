import './style.css';
import { addItemToTodoList, removeItemToTodoList, updateTodoItem, initTodoList, clearTodoList} from './App';
import { addNode, addButton } from './helpers'

/* Load todoList from Storage or a empty one if no datas */
let todoList = initTodoList();

/* == DISPLAY == */

const body = document.querySelector("body");

const header = addNode(body, "header");
const main = addNode(body, "main");
const footer = addNode(body, "footer");


