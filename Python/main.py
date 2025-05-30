## Importar Flask
from flask import Flask, jsonify, request

app = Flask(__name__)

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