import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import Summary from './components/Summary';
import ExpenseCharts from './components/ExpenseCharts';  // ✅ Corrected import
import RazorpayButton from './components/RazorpayButton';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState({
    prediction: 0,
    anomaly: false,
    suggestion: "No data yet."
  });

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch insights (forecast, anomaly, suggestion)
  const fetchInsights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-insights');
      setInsights(response.data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  // Add new expense
  const handleAddExpense = async (expense) => {
    try {
      await axios.post('http://localhost:5000/add-expense', expense);
      fetchExpenses(); // update UI
      fetchInsights(); // update insights
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchInsights();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <AddExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseTable expenses={expenses} />
      <Summary
        forecast={insights.prediction}
        anomaly={insights.anomaly}
        suggestion={insights.suggestion}
        expenses={expenses}
      />
      <ExpenseCharts />
      <RazorpayButton />
    </div>
  );
}

export default App;
