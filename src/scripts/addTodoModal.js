import { lessThanThreeCharInfoModal } from "./lessThanThreeCharInfoModal";

export const addTodoModal = (addTodo) => {
  const body = document.body;
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modalContainer.appendChild(modal);

  const title = document.createElement('h1');
  title.textContent = 'NEW NOTE';
  title.classList.add('modal-title');
  modal.appendChild(title);

  const input = document.createElement('input');
  input.placeholder = 'Input your note...';
  input.classList.add('input');
  input.style.width = '100%';
  modal.appendChild(input);

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

  body.appendChild(modalContainer);
  input.focus();

  let infoModalOpened = {isOpen: false};

  // Добавляем туду  нажатием кнопки 'enter'
  modalContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.length >= 3) {
      const todo = {text: input.value, complete: false, id: new Date()};
      addTodo(todo);
      modalContainer.remove();
      infoModalOpened.isOpen = false;
      toggle.classList.remove('active');
    } else if (e.key === 'Enter' && input.value.length < 3 && !infoModalOpened.isOpen) {
      infoModalOpened.isOpen = true;
      lessThanThreeCharInfoModal(infoModalOpened);
    }
  })

  // Добавляем туду при клике на кнопку 'apply'
  applyBtn.addEventListener('click', () => {
    if(input.value.length >= 3) {
      const todo = {text: input.value, complete: false};
      addTodo(todo);
      modalContainer.remove();
      infoModalOpened.isOpen = false;
      toggle.classList.remove('active');
    } else if (input.value.length < 3 && !infoModalOpened.isOpen) {
      infoModalOpened.isOpen = true;
      lessThanThreeCharInfoModal(infoModalOpened);
    }
  });

  // Закрываем окно при клике на кнопку 'cancel'
  cancelBtn.addEventListener('click', () => {
    modalContainer.remove();
    toggle.classList.remove('active');
  });

  // Закрываем окно при клике на темное поле
  modalContainer.addEventListener('click', (e) => {
    if(e.target === modalContainer) {
      modalContainer.remove();
      toggle.classList.remove('active');
    }
  });
}