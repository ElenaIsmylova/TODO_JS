import { addTodoModal } from "./scripts/addTodoModal";
import { createTodo } from "./scripts/createTodo";
import { deleteTodosInfoModal } from "./scripts/deleteTodosInfoModal";
import { getTime } from "./scripts/getTime";

document.addEventListener('DOMContentLoaded', function() {
  
  const body = document.body;
  const inputSearch = document.getElementById('search-input');
  const themeBtn = document.getElementById('theme-btn');
  const toggle = document.getElementById('toggle');
  const addTodoBtn = document.getElementById('add-todo-btn');

  const THEME_CLASS_MAP = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  }

  const THEME_LOCAL_STORAGE_KEY = localStorage.getItem('theme');
  let theme = THEME_LOCAL_STORAGE_KEY === null ? true : JSON.parse(THEME_LOCAL_STORAGE_KEY);

  if(theme) {
    body.classList.remove(THEME_CLASS_MAP.DARK);
    body.classList.add(THEME_CLASS_MAP.LIGHT);
  } else {
    body.classList.add(THEME_CLASS_MAP.DARK);
    body.classList.remove(THEME_CLASS_MAP.LIGHT);
  }
  themeBtn.addEventListener('click', () => {
    theme = !theme;
    body.classList.toggle(THEME_CLASS_MAP.DARK);
    body.classList.toggle(THEME_CLASS_MAP.LIGHT);
    localStorage.setItem('theme', JSON.stringify(theme));
  });

  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  function addTodo(todo) {
    todos.push(todo);
    saveTodos();
    renderTodos();
  }

  getTime();

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');

    if (toggle.classList.contains('active')) {
      if(todos.length > 0) {
        deleteTodosInfoModal(toggle, todos, saveTodos, renderTodos)
      } else {
        addTodoModal(addTodo, toggle);
      }
    }
  });

  function completeTodo(i, complete) {
    todos[i] = {
      ...todos[i],
      complete
    }
    saveTodos();
    renderTodos();
  }

  function editTodo(i, newText) {
    todos[i] = {
      ...todos[i],
      text: newText
    }
    saveTodos();
    renderTodos();
  }

  function removeTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    const todosList = document.getElementById('todos-list');
    todosList.innerHTML = '';

    todos.forEach((todos, index) => {
      const todoItem = createTodo(todos, index, completeTodo, editTodo, removeTodo);
      todosList.appendChild(todoItem);
    });
    todos.length > 0 
      ? todosList.classList.remove('todos-list-empty') 
      : todosList.classList.add('todos-list-empty');
  }
  
  addTodoBtn.addEventListener('click', () => {
    addTodoModal(addTodo);
  })

  renderTodos();
});