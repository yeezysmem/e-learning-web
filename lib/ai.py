from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS class
from g4f.client import Client

app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app

client = Client()

@app.route('/api/chat/completions', methods=['POST'])
def handle_chat_completions():
    data = request.get_json()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=data.get("messages", []),
        # Add other parameters as needed
    )
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
