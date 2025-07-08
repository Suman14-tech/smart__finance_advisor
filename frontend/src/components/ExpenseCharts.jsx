// Step 1: Chart components (Pie + Bar) using Recharts

// 1. Install recharts
// Run this in your frontend terminal:
// npm install recharts

// 2. Create a new file in src/components/ called ExpenseCharts.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D72638'];

function ExpenseCharts() {
  const [chartData, setChartData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get-expenses')
      .then((response) => {
        const expenses = response.data;

        // Pie Chart - Category Distribution
        const categoryTotals = {};
        expenses.forEach((exp) => {
          categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        });
        const pie = Object.entries(categoryTotals).map(([cat, amt]) => ({ name: cat, value: amt }));
        setChartData(pie);

        // Bar Chart - Spending by Date
        const dateTotals = {};
        expenses.forEach((exp) => {
          dateTotals[exp.date] = (dateTotals[exp.date] || 0) + exp.amount;
        });
        const bar = Object.entries(dateTotals).map(([date, amt]) => ({ date, amount: amt }));
        setBarData(bar);
      })
      .catch((err) => console.error('Error fetching chart data:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">📊 Expenses by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">📅 Expenses Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseCharts;
