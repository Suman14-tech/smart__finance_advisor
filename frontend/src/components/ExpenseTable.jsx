import React, { useState } from 'react';

const ExpenseTable = ({ expenses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories from expenses
  const categories = ['All', ...new Set(expenses.map(exp => exp.category))];

  // Filter logic
  const filteredExpenses = expenses.filter(exp => {
    const description = (exp.description || '').toLowerCase(); // ✅ FIXED
    const matchesSearch = description.includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>📋 Expense Table</h2>

      {/* Filter controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="🔍 Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Expenses Table */}
      <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f1f1f1' }}>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((exp, index) => (
            <tr key={index}>
              <td>{exp.date}</td>
              <td>{exp.category}</td>
              <td>₹{exp.amount}</td>
              <td>{exp.description || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;