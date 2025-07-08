import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Correct way to import and attach

const Summary = ({ forecast, anomaly, suggestion, expenses }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Smart Finance Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Forecasted Expense: ₹${forecast || 0}`, 14, 30);
    doc.text(`Anomaly Detected: ${anomaly ? "Yes" : "No"}`, 14, 38);
    doc.text(`Suggestion: ${suggestion || "No suggestion"}`, 14, 46);

    // ✅ Use autoTable (now it works!)
    autoTable(doc, {
      startY: 55,
      head: [['Date', 'Category', 'Amount', 'Description']],
      body: expenses.map(exp => [
        exp.date,
        exp.category,
        exp.amount,
        exp.description || ''
      ])
    });

    doc.save('finance_report.pdf');
  };

  return (
    <div style={styles.container}>
      <h2>📊 Monthly Summary</h2>
      <p>📈 Forecasted Next Month Expense: ₹{forecast || 0}</p>
      <p>⚠️ Anomaly Detected: {anomaly ? 'Yes' : 'No'}</p>
      <p>💡 Suggestion: {suggestion || 'No suggestion'}</p>
      <button onClick={downloadPDF} style={styles.button}>
        📄 Download PDF Report
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f1f1f1',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginTop: '1.5rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Summary;
