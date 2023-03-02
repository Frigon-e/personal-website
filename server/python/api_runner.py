import json
from flask import Flask, request, jsonify
from server.python.certificationChecker import get_Certs

app = Flask(__name__)


@app.route("/api/certification", methods=["POST"])
def certification():
    data = request.get_data()
    data = json.loads(data)
    print(data)
    output = get_Certs(data["member_ids"])
    return jsonify(output)


if __name__ == '__main__':
    app.run(port=5001, debug=True)