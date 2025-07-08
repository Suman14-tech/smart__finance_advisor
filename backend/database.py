import sqlite3

def init_db():
    conn = sqlite3.connect('expenses.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS expenses
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  date TEXT,
                  category TEXT,
                  amount REAL,
                  description TEXT)''')
    conn.commit()
    conn.close()

def add_expense(date, category, amount, description):
    conn = sqlite3.connect('expenses.db')
    c = conn.cursor()
    c.execute("INSERT INTO expenses (date, category, amount, description) VALUES (?, ?, ?, ?)",
              (date, category, amount, description))
    conn.commit()
    conn.close()

def get_all_expenses():
    conn = sqlite3.connect('expenses.db')
    c = conn.cursor()
    c.execute("SELECT date, category, amount, description FROM expenses ORDER BY date DESC")
    rows = c.fetchall()
    conn.close()
    expenses = []
    for row in rows:
        expenses.append({
            'date': row[0],
            'category': row[1],
            'amount': row[2],
            'description': row[3]
        })
    return expenses
