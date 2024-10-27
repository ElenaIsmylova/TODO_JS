import { addTodoWindow } from "./scripts/addTodoWindow";
import { createTodo } from "./scripts/createTodo";

document.addEventListener('DOMContentLoaded', function() {
  
  const body = document.body;
  const inputSearch = document.getElementById('search-input');
  const themeBtn = document.getElementById('theme-btn');
  const addTodoBtn = document.getElementById('add-todo-btn');

  let storedTheme = localStorage.getItem('theme');
  let theme = storedTheme === null ? true : JSON.parse(storedTheme);
  theme ? body.classList.remove('dark-theme') : body.classList.add('dark-theme');
  themeBtn.addEventListener('click', () => {
    theme = !theme;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', JSON.stringify(theme));
  });

  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  function addTodo(todo) {
    todos.push(todo);
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
      const todoItem = createTodo(todos, index, removeTodo);
      todosList.appendChild(todoItem);
    });
    todos.length > 0 
      ? todosList.classList.remove('todos-list-empty') 
      : todosList.classList.add('todos-list-empty');
  }
  
  addTodoBtn.addEventListener('click', () => {
    addTodoWindow(addTodo);
  })

  renderTodos();
});