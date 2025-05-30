const statusEl = document.getElementById('status');

// URL da sua API
const API_URL = 'http://localhost:5000/produtos';

fetch('http://localhost:5000/produtos')
  .then(response => {
    if (response.ok) {
      statusEl.textContent = '✅ Conectado à API com sucesso!';
      statusEl.classList.add('online');
    } else {
      statusEl.textContent = `⚠️ Erro ao conectar à API (Status ${response.status})`;
      statusEl.classList.add('offline');
    }
  })
  .catch(error => {
    statusEl.textContent = '❌ Não foi possível se conectar à API.';
    statusEl.classList.add('offline');
    console.error('Erro de conexão:', error);
  });
