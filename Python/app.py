from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)  # Isso permite requisições de outros domínios, como o Live Server

# Base de dados
produtos = []

# Gerar ID
def gerar_id():
    if not produtos:
        return 1
    return produtos[-1]['id'] + 1

#Rota GET - listar todos
@app.route('/produtos', methods =['GET'])
def listar_produtos():
    return jsonify(produtos)

# Rota GET - obter produto por ID
@app.route('/produtos/<int:id>', methods=['GET'])
def obter_produto(id):
    for produto in produtos:
        if produto['id'] == id:
            return jsonify(produto)
    return jsonify({"erro": "Produto não encontrado"}), 404

# Rota POST - cadastrar novo produto
@app.route('/produtos', methods=['POST'])
def criar_produto():
    dados = request.get_json()
    
# Verifica se os campos obrigatórios foram enviados
    if 'nome' not in dados or 'preco' not in dados:
        return jsonify({"erro": "Os campos 'nome' e 'preco' são obrigatórios."}), 400
    
# Criar produto
    novo_produto = {
        "id": gerar_id(),
        "nome": dados['nome'],
        "preco": dados['preco']
    }
    
    produtos.append(novo_produto)
    return jsonify(novo_produto), 201

@app.route('/produtos/<int:id>', methods=['PUT'])
def atualizar_produto(id):
    dados = request.get_json()
    nome = dados.get('nome')
    preco = dados.get('preco')

    for produto in produtos:
        if produto['id'] == id:
            produto['nome'] = nome
            produto['preco'] = preco
            return jsonify(produto), 200

    return jsonify({'erro': 'Produto não encontrado'}), 404

@app.route('/produtos/<int:id>', methods=['DELETE'])
def excluir_produto(id):
    global produtos  # Para garantir que a lista de produtos seja alterada corretamente
    for produto in produtos:
        if produto['id'] == id:
            produtos = [p for p in produtos if p['id'] != id]  # Remove o produto da lista
            return jsonify({'mensagem': 'Produto excluído com sucesso!'}), 200
    
    return jsonify({'erro': 'Produto não encontrado'}), 404


# Inicia o servidor
if __name__ == '__main__':
    app.run(debug=True)