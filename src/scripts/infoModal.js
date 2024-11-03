
export const infoModal = (infoModalOpened) => {
  const body = document.body;
  const modalWindowContainer = document.createElement('div');
  modalWindowContainer.classList.add('modal-window-container');
  modalWindowContainer.classList.add('z-index-10');
  body.appendChild(modalWindowContainer);

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal-window');
  modalWindow.classList.add('info');

  const infoDiv = document.createElement('div');
  infoDiv.textContent = 'Вы ввели символов меньше 3';
  modalWindow.appendChild(infoDiv);
  modalWindowContainer.appendChild(modalWindow);

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'CANCEL';
  cancelBtn.classList.add('modal-btn');
  cancelBtn.classList.add('cancel-btn');
  modalWindow.appendChild(cancelBtn);

  cancelBtn.addEventListener('click', () => {
    infoModalOpened.isOpen = false;
    modalWindowContainer.remove();
  });

  // Закрываем окно при клике на темное поле
  modalWindowContainer.addEventListener('click', (e) => {
    if(e.target === modalWindowContainer) {
      infoModalOpened.isOpen = false;
      modalWindowContainer.remove();
    }
  });
}