import { addTodoModal } from "./scripts/addTodoModal";
import { createTodo } from "./scripts/createTodo";
import { deleteTodosInfoModal } from "./scripts/deleteTodosInfoModal";
import { processSetCurrentTime } from "./scripts/processSetCurrentTime";
import { undoDeleteTodoModal } from "./scripts/undoDeleteTodoModal";

document.addEventListener('DOMContentLoaded', function() {

  const body = document.body;
  const currentTodosList = document.getElementById('current-todos-list');
  const removedTodosList = document.getElementById('removed-todos-list');
  const allTodosAmount = document.getElementById('all-todos-amount');
  const inputSearch = document.getElementById('search-input');
  const selectTodos = document.getElementById('select-todos');
  const themeBtn = document.getElementById('theme-btn');
  const toggle = document.getElementById('toggle');
  const addTodoBtn = document.getElementById('add-todo-btn');

  processSetCurrentTime();

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

  themeBtn.addEventListener('click', () => {
    theme = !theme;
    body.classList.toggle(THEME_CLASS_MAP.DARK);
    body.classList.toggle(THEME_CLASS_MAP.LIGHT);
    localStorage.setItem('theme', JSON.stringify(theme));
  });

  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const removedTodos = JSON.parse(localStorage.getItem('removedTodos')) || [];
  allTodosAmount.textContent = `${todos.length + removedTodos.length}`;

  let SELECT_TODOS_VALUE = 'all';
  let filteredTodos = [...todos];

  const getLiTodos = (arr) => {
    let items = '';
    arr.map(todo => items += `<li>${todo.text}</li>`);
    return items;
  };

  currentTodosList.innerHTML = getLiTodos(todos);
  removedTodosList.innerHTML = getLiTodos(removedTodos);

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
    toggle.classList.toggle('active');

    if (toggle.classList.contains('active')) {
      if(todos.length > 0) {
        deleteTodosInfoModal(toggle, todos, saveTodos, renderTodos)
      } else {
        addTodoModal(addTodo, toggle);
      };
    };
  });

  function completeTodo(i, complete) {
    todos[i] = {
      ...todos[i],
      complete
    };
    saveTodos();
    renderTodos();
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
    const removedTodo = todos.splice(index, 1);
    removedTodos.push(removedTodo[0]);
    const i = removedTodos.length-1;

    localStorage.setItem('removedTodos', JSON.stringify(removedTodos));
    removedTodosList.innerHTML = getLiTodos(removedTodos);

    saveTodos();
    renderTodos();
    undoDeleteTodoModal(removedTodo[0], todos, saveTodos, renderTodos, removedTodosList, removedTodos, getLiTodos);
  };

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    currentTodosList.innerHTML = getLiTodos(todos);
    if (SELECT_TODOS_VALUE === 'all') filteredTodos = [...todos];
    if (SELECT_TODOS_VALUE === 'completed') filteredTodos = todos.filter(todo => todo.complete);
    if (SELECT_TODOS_VALUE === 'uncompleted') filteredTodos = todos.filter(todo => !todo.complete);
  };

  function renderTodos() {
    const todosList = document.getElementById('todos-list');
    todosList.innerHTML = '';

    filteredTodos.forEach((todo, index) => {
      const todoItem = createTodo(todo, index, completeTodo, editTodo, removeTodo);
      todosList.appendChild(todoItem);
    });
    filteredTodos.length > 0 
      ? todosList.classList.remove('todos-list-empty') 
      : todosList.classList.add('todos-list-empty');

    allTodosAmount.textContent = `${todos.length + removedTodos.length}`;
  };
  
  addTodoBtn.addEventListener('click', () => {
    addTodoModal(addTodo);
  });

  renderTodos();
});