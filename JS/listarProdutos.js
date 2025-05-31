$(document).ready(function () {
  const apiUrl = 'http://localhost:5000/produtos'; 

  $.getJSON(apiUrl, function (produtos) {
    const tbody = $('#produtos-table tbody');

    produtos.forEach(produto => {
      const precoFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(produto.preco);

      const linha = `
        <tr>
          <td>${produto.id}</td>
          <td>${produto.nome}</td>
          <td>${precoFormatado}</td>
        </tr>
      `;
      tbody.append(linha);
    });
  }).fail(function () {
    alert('Erro ao carregar os produtos.');
  });
});
