from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/receive_data", methods=["POST"])
def receive_data():
    """
    Endpoint para capturar mensagens-chave enviadas pela OpenAI.
    """
    # Captura os dados da requisição
    data = request.json

    # Log para validar que os dados chegaram corretamente
    message = data.get('message')
    user_id = data.get('user_id')

    print(f"Mensagem recebida: {message}")
    print(f"ID do usuário: {user_id}")

    # Você pode adicionar aqui sua lógica (banco de dados, fila, etc.)
    
    # Retorna sucesso
    return jsonify({"status": "sucesso"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
