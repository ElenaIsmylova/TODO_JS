import { addTodoModal } from "./scripts/addTodoModal";
import { createTodo } from "./scripts/createTodo";
import { deleteTodosInfoModal } from "./scripts/deleteTodosInfoModal";
import { processSetCurrentTime } from "./scripts/processSetCurrentTime";
import { undoDeleteTodoModal } from "./scripts/undoDeleteTodoModal";

document.addEventListener('DOMContentLoaded', function() {

  const body = document.body;
  const leftPanelBlock = document.getElementsByClassName('left-panel-border');
  const currentTodos = document.getElementById('current-todos');
  const activeTodos = document.getElementById('active-todos');
  const completeTodos = document.getElementById('complete-todos');
  const inputSearch = document.getElementById('search-input');
  const searchBtn = document.getElementsByClassName('search-btn');
  const selectTodos = document.getElementById('select-todos');
  const themeBtn = document.getElementById('theme-btn');
  const toggle = document.getElementById('toggle');
  const addTodoBtn = document.getElementById('add-todo-btn');
  
  processSetCurrentTime();
  let inputValue = '';

  const THEME_CLASS_MAP = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };

  const THEME_LOCAL_STORAGE_KEY = localStorage.getItem('theme');
  let theme = THEME_LOCAL_STORAGE_KEY === null ? true : JSON.parse(THEME_LOCAL_STORAGE_KEY);

  if(theme) {
    body.classList.remove(THEME_CLASS_MAP.DARK);
    body.classList.add(THEME_CLASS_MAP.LIGHT);
  } else {
    body.classList.add(THEME_CLASS_MAP.DARK);
    body.classList.remove(THEME_CLASS_MAP.LIGHT);
  };

  inputSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      renderTodos();
    }
  })

  inputSearch.addEventListener('input', (e) => {
    inputValue = e.target.value.toLowerCase();
    if (inputValue.length === 0) {
      renderTodos();
    }
  })

  searchBtn[0].addEventListener('click', (e) => {
    renderTodos();
  })

  themeBtn.addEventListener('click', () => {
    theme = !theme;
    body.classList.toggle(THEME_CLASS_MAP.DARK);
    body.classList.toggle(THEME_CLASS_MAP.LIGHT);
    localStorage.setItem('theme', JSON.stringify(theme));
  });

  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  currentTodos.innerHTML = todos.length;
  activeTodos.innerHTML = todos.filter(todo => !todo.complete).length;
  completeTodos.innerHTML = todos.filter(todo => todo.complete).length;

  if (todos.length > 0) {
    leftPanelBlock[0].classList.add('show');
  } 

  let SELECT_TODOS_VALUE = 'all';
  let filteredTodos = [...todos];

  function addTodo(todo) {
    todos.push(todo);
    saveTodos();
    renderTodos();
  };

  selectTodos.addEventListener('change', (e) => {
    SELECT_TODOS_VALUE = e.target.value;

    if (e.target.value === 'all') filteredTodos = [...todos];
    if (e.target.value === 'completed') filteredTodos = todos.filter(todo => todo.complete);
    if (e.target.value === 'uncompleted') filteredTodos = todos.filter(todo => !todo.complete);

    renderTodos();
  });

  toggle.addEventListener('click', function() {
    if (todos.length === 0) {
      addTodoModal(addTodo, toggle);
    } else {
      toggle.classList.add('active');
      deleteTodosInfoModal(toggle, todos, saveTodos, renderTodos);
    }
  });

  function completeTodo(i, complete) {
    todos[i] = {
      ...todos[i],
      complete
    };
    saveTodos();
    renderTodos();
    activeTodos.innerHTML = todos.filter(todo => !todo.complete).length;
    completeTodos.innerHTML = todos.filter(todo => todo.complete).length;
  };

  function editTodo(i, newText) {
    todos[i] = {
      ...todos[i],
      text: newText
    };
    saveTodos();
    renderTodos();
  };

  function removeTodo(index) {
    const removedTodo = todos.splice(index, 1)[0];
    saveTodos();
    renderTodos();
    undoDeleteTodoModal(removedTodo, todos, saveTodos, renderTodos);
  };

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));

    currentTodos.innerHTML = todos.length;
    activeTodos.innerHTML = todos.filter(todo => !todo.complete).length;
    completeTodos.innerHTML = todos.filter(todo => todo.complete).length;

    if (SELECT_TODOS_VALUE === 'all') filteredTodos = [...todos];
    if (SELECT_TODOS_VALUE === 'completed') filteredTodos = todos.filter(todo => todo.complete);
    if (SELECT_TODOS_VALUE === 'uncompleted') filteredTodos = todos.filter(todo => !todo.complete);

    leftPanelBlock[0].classList.add('show');
  };

  function renderTodos() {
    const todosList = document.getElementById('todos-list');
    todosList.innerHTML = '';

    filteredTodos.filter(todo => todo.text.toLowerCase().includes(inputValue)).forEach((todo, index) => {
      const todoItem = createTodo(filteredTodos.length, todo, index, completeTodo, editTodo, removeTodo);
      todosList.appendChild(todoItem);
    });
    filteredTodos.length > 0 
      ? todosList.classList.remove('todos-list-empty') 
      : todosList.classList.add('todos-list-empty');
  };
  
  addTodoBtn.addEventListener('click', () => {
    addTodoModal(addTodo);
  });

  renderTodos();
});