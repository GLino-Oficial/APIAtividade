let produtoAtual = null;

function carregarProdutoParaEdicao() {
  const nomeBuscado = document.getElementById('buscar-produto-editar').value.trim().toLowerCase();
  const mensagem = document.getElementById('mensagem-edicao');
  const form = document.getElementById('form-edicao');
  mensagem.innerHTML = '';
  form.style.display = 'none';
  produtoAtual = null;

  fetch('http://localhost:5000/produtos')
    .then(res => res.json())
    .then(produtos => {
      const encontrado = produtos.find(p => p.nome.toLowerCase() === nomeBuscado);
      if (encontrado) {
        produtoAtual = encontrado;
        document.getElementById('novo-nome').value = encontrado.nome;
        document.getElementById('novo-preco').value = encontrado.preco;
        form.style.display = 'block';
      } else {
        mensagem.innerHTML = '<span style="color: red;">Produto não encontrado.</span>';
      }
    })
    .catch(err => {
      mensagem.innerHTML = '<span style="color: red;">Erro ao buscar produto.</span>';
      console.error(err);
    });
}

function salvarEdicao() {
  const novoNome = document.getElementById('novo-nome').value.trim();
  const novoPreco = parseFloat(document.getElementById('novo-preco').value);
  const mensagem = document.getElementById('mensagem-edicao');

  if (!produtoAtual || !novoNome || isNaN(novoPreco)) {
    mensagem.innerHTML = '<span style="color: red;">Preencha todos os campos corretamente.</span>';
    return;
  }

  fetch(`http://localhost:5000/produtos/${produtoAtual.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: novoNome,
      preco: novoPreco
    })
  })
  .then(res => {
    if (res.ok) {
      mensagem.innerHTML = '<span style="color: green;">Produto atualizado com sucesso!</span>';
    } else {
      mensagem.innerHTML = '<span style="color: red;">Erro ao atualizar produto (Status ' + res.status + ').</span>';
    }
  })
  .catch(err => {
    mensagem.innerHTML = '<span style="color: red;">Erro de conexão ao salvar edição.</span>';
    console.error(err);
  });
}
