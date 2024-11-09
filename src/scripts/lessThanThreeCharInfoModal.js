
export const lessThanThreeCharInfoModal = (infoModalOpened) => {
  const body = document.body;
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  modalContainer.classList.add('z-index-10');
  body.appendChild(modalContainer);

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.classList.add('info');

  const infoDiv = document.createElement('div');
  infoDiv.textContent = 'Вы ввели символов меньше 3';
  modal.appendChild(infoDiv);
  modalContainer.appendChild(modal);

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'CANCEL';
  cancelBtn.classList.add('modal-btn');
  cancelBtn.classList.add('cancel-btn');
  modal.appendChild(cancelBtn);

  cancelBtn.addEventListener('click', () => {
    infoModalOpened.isOpen = false;
    modalContainer.remove();
  });

  // Закрываем окно при клике на темное поле
  modalContainer.addEventListener('click', (e) => {
    if(e.target === modalContainer) {
      infoModalOpened.isOpen = false;
      modalContainer.remove();
    }
  });
}