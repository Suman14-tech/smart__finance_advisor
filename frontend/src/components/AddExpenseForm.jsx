import React, { useState } from 'react';

const AddExpenseForm = ({ onAddExpense }) => {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [listening, setListening] = useState(false);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onerror = (e) => {
      console.error("Voice Error:", e);
      alert("Microphone error or permission denied.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Voice:', transcript);

      // Smart parsing
      const amountMatch = transcript.match(/\d+/);
      const categoryMatch = transcript.match(/on (\w+)/);
      const descriptionMatch = transcript.match(/for (.+)/);

      const today = new Date().toISOString().slice(0, 10);

      setAmount(amountMatch ? amountMatch[0] : '');
      setCategory(categoryMatch ? categoryMatch[1] : '');
      setDescription(descriptionMatch ? descriptionMatch[1] : transcript);
      setDate(today);
    };

    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddExpense) {
      onAddExpense({ date, category, amount, description });
      setDate('');
      setCategory('');
      setAmount('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add Expense</button>
      <button type="button" onClick={handleVoiceInput} style={{ marginLeft: '10px' }}>🎤 Voice Input</button>
      {listening && <p style={{ color: 'green' }}>🎙️ Listening...</p>}
    </form>
  );
};

export default AddExpenseForm;
