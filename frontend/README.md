# 💡 Smart Finance Advisor – AI-Powered Personal Finance Tracker

## 📅 May 2025 – Present  
**CMR Institute of Technology, Bengaluru**

---

## 📝 Overview

Smart Finance Advisor is a full-stack personal finance tracking system enhanced with Machine Learning and voice input. It empowers users to manage and forecast their expenses intelligently, visualize spending patterns, and generate PDF/email reports — all in a seamless and interactive interface.

---

## 🔧 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Recharts, jsPDF  
- **Backend**: Flask, SQLite, Flask-Mail, Razorpay Test API  
- **Machine Learning**: Python, Pandas, NumPy, Scikit-learn, LSTM  
- **Tools**: Postman, GitHub, VS Code, Jupyter Notebook

---

## 🛠️ Core Features

- 📊 **Expense Entry & Management** — Add daily expenses by category, date, and amount with filters and search.
- 🔍 **Category Filter & Search** — Instantly find and sort expenses based on category or keywords.
- 📈 **Visualization Dashboard** — Real-time Pie and Bar Charts show spending breakdowns and trends.
- 🧠 **ML Forecasting (LSTM)** — Predicts future spending based on historical data.
- 🚨 **Anomaly Detection** — Flags unusual spikes in expenses automatically.
- 📄 **PDF Report Download** — Generate and download expense summaries via jsPDF.
- 📧 **Email Report via Flask-Mail** — Auto-send monthly PDF reports to user inbox.
- 💳 **Razorpay Integration** — Simulates fund additions and donation tracking with mock payment flow.
- 🎙️ **Voice Input** — Add expenses using speech-to-text feature.

---

## 📸 Screenshots

### 🔍 Category Filter Feature
![Category Filter](screenshots/category_filter.png)

### 💰 Dashboard with Expense Input
![Dashboard](screenshots/dashboard.png)

### 📊 Charts (Pie + Bar)
![Charts](screenshots/charts.png)

### 📈 ML Forecasting + Anomaly Detection
![Forecast](screenshots/forecast.png)

### 💳 Razorpay Test Payment Page
![Razorpay](screenshots/razorpay.png)

---

## ⚙️ How to Run the App

### 🔹 Backend (Flask)
```bash
cd backend
python -m venv venv
venv\Scripts\activate         # for Windows
pip install -r requirements.txt
python app.py
