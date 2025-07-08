import axios from 'axios';

const API_BASE = 'http://127.0.0.1:5000'; // Or 'http://localhost:5000'

export async function fetchExpenses() {
  const res = await axios.get(`${API_BASE}/get-expenses`); // ✅ Correct route
  return res.data;
}

export async function addExpense(expense) {
  const res = await axios.post(`${API_BASE}/add-expense`, expense); // ✅ Correct route
  return res.data;
}

export async function getInsights() {
  const res = await axios.get(`${API_BASE}/get-insights`); // ✅ Correct route
  return res.data;
}

