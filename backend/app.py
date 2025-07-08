from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import numpy as np
from scipy import stats

app = Flask(__name__)
CORS(app)

# ✅ Show message if backend is running
@app.route('/')
def home():
    return '✅ Smart Finance Backend is working successfully!'

# ✅ Connect to SQLite
def get_db_connection():
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    return conn

# ✅ Initialize DB
@app.route('/init-db', methods=['GET'])
def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT
        )
    ''')
    conn.commit()
    conn.close()
    return jsonify({"message": "Database initialized ✅"})

# ✅ Add expense
@app.route('/add-expense', methods=['POST'])
def add_expense():
    data = request.json
    date = data.get('date')
    category = data.get('category')
    amount = data.get('amount')
    description = data.get('description', '')

    conn = get_db_connection()
    conn.execute(
        'INSERT INTO expenses (date, category, amount, description) VALUES (?, ?, ?, ?)',
        (date, category, amount, description)
    )
    conn.commit()
    conn.close()
    return jsonify({'message': 'Expense added ✅'})

# ✅ Get expenses
@app.route('/get-expenses', methods=['GET'])
def get_expenses():
    conn = get_db_connection()
    cursor = conn.execute('SELECT date, category, amount, description FROM expenses')
    expenses = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(expenses)

# ✅ ML Insights (forecast, anomaly, suggestion)
@app.route('/get-insights', methods=['GET'])
def get_insights():
    conn = get_db_connection()
    cursor = conn.execute('SELECT amount FROM expenses')
    amounts = [row['amount'] for row in cursor.fetchall()]
    conn.close()

    if not amounts:
        return jsonify({
            "prediction": 0,
            "anomaly": False,
            "suggestion": "No data yet. Start tracking your expenses."
        })

    arr = np.array(amounts)
    prediction = round(np.mean(arr), 2)
    z_scores = np.abs(stats.zscore(arr))
    anomaly_detected = bool(np.any(z_scores > 2))

    suggestion = "You are spending normally."
    if prediction > 5000:
        suggestion = "Consider budgeting more carefully."
    elif prediction < 1000:
        suggestion = "Great! You're managing your expenses well."

    return jsonify({
        "prediction": prediction,
        "anomaly": bool(anomaly_detected),
        "suggestion": suggestion
    })

if __name__ == '__main__':
    app.run(debug=True)
