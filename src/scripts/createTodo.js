
export const createTodo = (todo, index, removeTodo) => {

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
  checkbox.classList.add('checkbox');
  todoWrapper.appendChild(checkboxWrapper);

  const todoItem = document.createElement('div');
  todoItem.classList.add('todo');
  todoItem.textContent = todo.text;
  todoWrapper.appendChild(todoItem);

  const editBtn = document.createElement('div');
  editBtn.classList.add('edit');
  todoWrapper.appendChild(editBtn);
  
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('delete');
  todoWrapper.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', () => {
    removeTodo(index);
  });

  return todoWrapper;
}