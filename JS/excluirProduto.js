function excluirProduto() {
  const id = document.getElementById('input-id-produto').value;
  const mensagem = document.getElementById('mensagem-excluir');

  fetch(`http://localhost:5000/produtos/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      if (data.mensagem) {
        mensagem.textContent = data.mensagem;
        mensagem.style.color = 'green';
      } else if (data.erro) {
        mensagem.textContent = data.erro;
        mensagem.style.color = 'red';
      }
    })
    .catch(error => {
      mensagem.textContent = 'Erro ao excluir produto.';
      mensagem.style.color = 'red';
      console.error(error);
    });
}

