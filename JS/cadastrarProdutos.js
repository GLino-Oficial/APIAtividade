$(document).ready(function () {
  $('#formProduto').submit(function (e) {
    e.preventDefault();

    const produto = {
      nome: $('#nome').val(),
      preco: parseFloat($('#preco').val())
    };

    $.ajax({
      url: 'http://localhost:5000/produtos',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(produto),
      success: function () {
        alert('Produto cadastrado com sucesso!');
        $('#formProduto')[0].reset();
      },
      error: function () {
        alert('Erro ao cadastrar produto.');
      }
    });
  });
});
