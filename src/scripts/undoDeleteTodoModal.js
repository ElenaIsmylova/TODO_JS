export const undoDeleteTodoModal = (
  removedTodo, 
  todos, 
  saveTodos, 
  renderTodos, 
  removedTodosList, 
  removedTodos, 
  getLiTodos
) => {
  const undoTodosWrapper = document.getElementById('undo-todos-wrapper');
  const undoModal = document.getElementById('undo-modal');

  const clonedUndoModal = undoModal.cloneNode(true);
  clonedUndoModal.id = new Date();
  clonedUndoModal.classList.remove('display-none');
  
  const timerElement = clonedUndoModal.querySelector('.timer');
  const progressCircle = clonedUndoModal.querySelector('.progress');

  const yesBtn = clonedUndoModal.querySelector('.yes');
  const noBtn = clonedUndoModal.querySelector('.no');

  const totalBarTime = 50;
  let timeBarLeft = 50;
  let timeSecLeft = 5;

  const intervalSec = setInterval(() => {
    if (timeSecLeft <= 0) {
      clearInterval(intervalSec);
  } else {
    timeSecLeft -= 1;
    timerElement.textContent = timeSecLeft;
  }
  }, 1000);

  const intervalBar = setInterval(() => {
    if (timeBarLeft <= 0) {
        clearInterval(intervalBar);
    } else {
        timeBarLeft -= 1;
        const progress = (timeBarLeft / totalBarTime) * 62.8319;
        progressCircle.style.strokeDashoffset = progress;
    }
  }, 100);

  yesBtn.addEventListener('click', () => {
    todos.push(removedTodo);
    const index = removedTodos.findIndex(todo => todo.id === removedTodo.id);
    removedTodos.splice(index, 1);
    localStorage.setItem('removedTodos', JSON.stringify(removedTodos));
    removedTodosList.innerHTML = getLiTodos(removedTodos);
    saveTodos();
    renderTodos();
    clonedUndoModal.remove();
    clearInterval(intervalSec);
    clearInterval(intervalBar);
  });

  noBtn.addEventListener('click', () => {
    clonedUndoModal.remove();
    clearInterval(intervalSec);
    clearInterval(intervalBar);
  });
  
  undoTodosWrapper.appendChild(clonedUndoModal);

  setTimeout(() => {
    clonedUndoModal.remove();
  }, 5000);
}