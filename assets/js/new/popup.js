// popup.js
export function setupPopup() {
  const popup = document.getElementById('popup');
  const close = document.getElementById('closePopup');
  const open  = document.getElementById('openPopup');

  if (!popup) return;

  close?.addEventListener('click', () => popup.style.display = 'none');
  open ?.addEventListener('click', () => popup.style.display = 'block');
  window.addEventListener('click', e => {
    if (e.target === popup) popup.style.display = 'none';
  });
}
