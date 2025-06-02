function buscarProduto() {
  const nomeDigitado = document.getElementById('input-nome-produto').value.trim().toLowerCase();
  const resultadoDiv = document.getElementById('resultado-busca');

  if (!nomeDigitado) {
    resultadoDiv.innerHTML = '<span style="color: red;">Digite um nome para buscar.</span>';
    return;
  }

  fetch('http://localhost:5000/produtos')
    .then(res => res.json())
    .then(produtos => {
      const encontrado = produtos.find(p => p.nome.toLowerCase() === nomeDigitado);

      if (encontrado) {
        resultadoDiv.innerHTML = `
          <strong>Produto encontrado:</strong><br>
          Nome: ${encontrado.nome}<br>
          Preço: R$ ${encontrado.preco.toFixed(2)}
        `;
      } else {
        resultadoDiv.innerHTML = '<span style="color: red;">Produto não encontrado.</span>';
      }
    })
    .catch(error => {
      resultadoDiv.innerHTML = '<span style="color: red;">Erro ao buscar produto.</span>';
      console.error('Erro ao buscar:', error);
    });
}
