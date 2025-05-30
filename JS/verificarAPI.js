document.addEventListener('DOMContentLoaded', () => {
  const navbarStatusEl = document.getElementById('api-status');
  const API_URL = 'http://localhost:5000/produtos';

  fetch(API_URL)
    .then(response => {
      if (response.ok) {
        navbarStatusEl.textContent = '🟢 API Online';
      } else {
        navbarStatusEl.textContent = '🔴 API com Erro';
      }
    })
    .catch(error => {
      navbarStatusEl.textContent = '🔴 API Offline';
      console.error('Erro de conexão:', error);
    });
});
