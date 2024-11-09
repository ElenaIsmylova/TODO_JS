import { lessThanThreeCharInfoModal } from "./lessThanThreeCharInfoModal";

export const editTodoModal = (todo, index, editTodo) => {
  const body = document.body;
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modalContainer.appendChild(modal);

  const title = document.createElement('h1');
  title.textContent = 'EDIT NOTE';
  title.classList.add('modal-title');
  modal.appendChild(title);

  const input = document.createElement('input');
  input.value = todo.text;
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
  applyBtn.textContent = 'EDIT';
  applyBtn.classList.add('modal-btn');
  applyBtn.classList.add('apply-btn');
  modalBtnsWrapper.appendChild(applyBtn);
  modal.appendChild(modalBtnsWrapper);

  body.appendChild(modalContainer);
  input.focus();

  let infoModalOpened = {isOpen: false};

  // Редактируем туду при клике на кнопку 'edit'
  applyBtn.addEventListener('click', () => {
    if(input.value.length >= 3 && input.value !== todo.text) {
      editTodo(index, input.value);
      modalContainer.remove();
      infoModalOpened.isOpen = false;
    } else if (input.value.length < 3 && !infoModalOpened.isOpen) {
      infoModalOpened.isOpen = true;
      lessThanThreeCharInfoModal(infoModalOpened);
    }
  });

  // Редактируем туду  нажатием кнопки 'enter'
  body.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.length >= 3 && input.value !== todo.text) {
      editTodo(index, input.value);
      modalContainer.remove();
      infoModalOpened.isOpen = false;
    } else if (e.key === 'Enter' && input.value.length < 3 && !infoModalOpened.isOpen) {
      infoModalOpened.isOpen = true;
      lessThanThreeCharInfoModal(infoModalOpened);
    }
  })

  // Закрываем окно при клике на кнопку 'cancel'
  cancelBtn.addEventListener('click', () => {
    modalContainer.remove();
  });

  // Закрываем окно при клике на темное поле
  modalContainer.addEventListener('click', (e) => {
    if(e.target === modalContainer) {
      modalContainer.remove();
    }
  });
}