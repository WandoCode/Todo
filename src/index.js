import './style.css';
import { makeBasicDatasObject } from './BasicDatasObject';
import { TodoItem } from './TodoItem';
import { TodoList } from './TodoList';

let dateA = new Date();
let dateB = new Date();


let testA = new TodoItem("title", "descr", "not", dateA, dateB, 2, "proj");
let basicDataTest = makeBasicDatasObject(testA);
let testB = new TodoItem("titleB", "descrB", "notB", dateA, dateB, 2, "projB");

let todoList = new TodoList();
todoList.addTodoItem(testA);

todoList.createTodoItem(basicDataTest);
todoList.addTodoItem(testB);

console.log(todoList.todoItemList);
console.log(todoList.getProjectsList());
console.log(todoList.getTodoItem(2));

todoList.updateTodoItem(1, "titleC", "descrC", "notC", dateA, dateB, 4, "projC");
console.log(todoList.todoItemList);


