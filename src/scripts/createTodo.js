
export const createTodo = (todo, index, completeTodo, removeTodo) => {

  const todoWrapper = document.createElement('li');
  todoWrapper.classList.add('todo-wrapper');

  const checkboxWrapper = document.createElement('label'); 
  checkboxWrapper.classList.add('checkbox-wrapper');
  const checkbox = document.createElement('input');
  checkboxWrapper.appendChild(checkbox);
  const checkmark = document.createElement('span');
  checkmark.classList.add('checkmark');
  checkboxWrapper.appendChild(checkmark);
  checkbox.type = 'checkbox';
  checkbox.checked = todo.complete;
  checkbox.classList.add('checkbox');
  todoWrapper.appendChild(checkboxWrapper);

  const todoItem = document.createElement('div');
  todoItem.classList.add('todo');
  todoItem.style.textDecoration
  todoItem.textContent = todo.text;
  if (todo.complete) {
    todoItem.style.textDecoration = 'line-through';
    todoItem.style.color = '#949191';
  }
  todoWrapper.appendChild(todoItem);

  const editBtn = document.createElement('div');
  editBtn.classList.add('edit');
  todoWrapper.appendChild(editBtn);
  
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('delete');
  todoWrapper.appendChild(deleteBtn);

  checkbox.addEventListener('change', (e) => {
    const complete = e.target.checked;
    completeTodo(index, complete);
  })

  deleteBtn.addEventListener('click', () => {
    removeTodo(index);
  });

  return todoWrapper;
}