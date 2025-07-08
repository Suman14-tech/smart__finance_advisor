import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Smart Personal Finance Advisor 💸</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '1rem'
  }
};

export default Header;
