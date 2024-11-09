

export const deleteTodosInfoModal = (toggle, todos, saveTodos, renderTodos) => {
  const body = document.body;
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  body.appendChild(modalContainer);

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.classList.add('info');

  const infoDiv = document.createElement('div');
  infoDiv.textContent = 'Вы действительно хотите удалить весь список дел?';
  modal.appendChild(infoDiv);
  modalContainer.appendChild(modal);

  const modalBtnsWrapper = document.createElement('div');
  modalBtnsWrapper.classList.add('modal-btns-wrapper');
  const cancelBtn = document.createElement('div');
  cancelBtn.textContent = 'CANCEL';
  cancelBtn.classList.add('modal-btn');
  cancelBtn.classList.add('cancel-btn');
  modalBtnsWrapper.appendChild(cancelBtn);
  const applyBtn = document.createElement('div');
  applyBtn.textContent = 'APPLY';
  applyBtn.classList.add('modal-btn');
  applyBtn.classList.add('apply-btn');
  modalBtnsWrapper.appendChild(applyBtn);
  modal.appendChild(modalBtnsWrapper);

  applyBtn.addEventListener('click', () => {
    todos.length = 0;
    saveTodos();
    renderTodos();
    toggle.classList.toggle('active');
    modalContainer.remove();
  });

  cancelBtn.addEventListener('click', () => {
    toggle.classList.toggle('active');
    modalContainer.remove();
  });

  modalContainer.addEventListener('click', (e) => {
    if(e.target === modalContainer) {
      toggle.classList.toggle('active');
      modalContainer.remove();
    }
  });
}