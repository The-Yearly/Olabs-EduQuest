from flask import Flask, render_template, request, jsonify
from routes.api import get_recommendations

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    recommendations = get_recommendations(data)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
