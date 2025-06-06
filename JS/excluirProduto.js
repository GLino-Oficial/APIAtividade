function excluirProduto() {
  const id = document.getElementById('produto-id-excluir').value.trim();
  const mensagem = document.getElementById('mensagem-exclusao');

  if (!id) {
    mensagem.textContent = 'Informe o ID do produto.';
    mensagem.style.color = 'red';
    return;
  }

  const confirmar = confirm(`Tem certeza que deseja excluir o produto de ID ${id}?`);

  if (!confirmar) {
    mensagem.textContent = 'Exclusão cancelada.';
    mensagem.style.color = 'orange';
    return;
  }

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

