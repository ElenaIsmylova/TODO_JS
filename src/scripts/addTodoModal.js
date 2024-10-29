
export const addTodoModal = (addTodo) => {
  const body = document.body;
  const modalWindowContainer = document.createElement('div');
  modalWindowContainer.classList.add('modal-window-container');

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal-window');
  modalWindowContainer.appendChild(modalWindow);

  const title = document.createElement('h1');
  title.textContent = 'NEW NOTE';
  title.classList.add('modal-title');
  modalWindow.appendChild(title);

  const input = document.createElement('input');
  input.placeholder = 'Input your note...';
  input.classList.add('input');
  input.style.width = '100%';
  modalWindow.appendChild(input);

  const modalWindowBtnsWrapper = document.createElement('div');
  modalWindowBtnsWrapper.classList.add('modal-btns-wrapper');
  const cancelBtn = document.createElement('div');
  cancelBtn.textContent = 'CANCEL';
  cancelBtn.classList.add('modal-btn');
  cancelBtn.classList.add('cancel-btn');
  modalWindowBtnsWrapper.appendChild(cancelBtn);
  const applyBtn = document.createElement('div');
  applyBtn.textContent = 'APPLY';
  applyBtn.classList.add('modal-btn');
  applyBtn.classList.add('apply-btn');
  modalWindowBtnsWrapper.appendChild(applyBtn);
  modalWindow.appendChild(modalWindowBtnsWrapper);

  body.appendChild(modalWindowContainer);

  // Добавляем туду  нажатием кнопки 'enter'
  modalWindow.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.length >= 3) {
      const todo = {text: input.value, complete: false};
      addTodo(todo);
      modalWindowContainer.remove();
    }
  })

  // Добавляем туду при клике на кнопку 'apply'
  applyBtn.addEventListener('click', () => {
    if(input.value.length >= 3) {
      const todo = {text: input.value, complete: false};
      addTodo(todo);
      modalWindowContainer.remove();
    }
  });

  // Закрываем окно при клике на кнопку 'cancel'
  cancelBtn.addEventListener('click', () => {
    modalWindowContainer.remove();
  });

  // Закрываем окно при клике на темное поле
  modalWindowContainer.addEventListener('click', (e) => {
    if(e.target === modalWindowContainer) {
      modalWindowContainer.remove();
    }
  });
}