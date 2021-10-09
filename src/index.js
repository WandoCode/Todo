import './style.css';
import { addItemToTodoList, removeItemToTodoList, updateTodoItem, initTodoList, clearTodoList} from './App';

/* Load todoList from Storage or a empty one if no datas */
let todoList = initTodoList();
