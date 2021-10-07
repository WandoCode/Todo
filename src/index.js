import './style.css';
import { makeBasicDatasObject } from './BasicDatasObject';
import { TodoItem } from './TodoItem';
import { TodoList } from './TodoList';

let dateA = new Date();
let dateB = new Date();


let testA = new TodoItem("title", "", "", dateA, dateB, 2, "");
let basicDataTest = makeBasicDatasObject(testA);

let todoList = new TodoList();
todoList.addTodoItem(testA);

todoList.createTodoItem(basicDataTest);

console.log(todoList.todoItemList);

