from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Lista para armazenar mensagens recebidas
messages = []


@app.route("/")
def home():
    """
    Renderiza a interface no navegador com mensagens.
    """
    return render_template("index.html", messages=messages)


@app.route("/receive_data", methods=["POST"])
def receive_data():
    """
    Endpoint para capturar mensagens-chave enviadas pela OpenAI.
    """
    try:
        # Captura os dados da requisição
        data = request.json
        message = data.get("message")
        user_id = data.get("user_id")

        # Adiciona na lista de mensagens
        if message and user_id:
            messages.append({"message": message, "user_id": user_id})
            print(f"Mensagem recebida: {message}")
            print(f"ID do usuário: {user_id}")
        else:
            print("Dados inválidos recebidos!")

        # Retorna sucesso
        return jsonify({"status": "sucesso"}), 200

    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({"error": "Erro interno"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
