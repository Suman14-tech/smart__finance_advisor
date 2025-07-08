import React from 'react';

const RazorpayButton = () => {
  const handlePayment = () => {
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // ✅ Razorpay test key
      amount: 10000, // ₹100 in paise
      currency: "INR",
      name: "Smart Finance Advisor",
      description: "Mock Premium Payment",
      image: "https://your-logo-url.com", // optional logo
      handler: function (response) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Suman",
        email: "suman@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#007bff"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button onClick={handlePayment} style={{
        backgroundColor: '#28a745',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        💳 Make Mock Payment
      </button>
    </div>
  );
};

export default RazorpayButton;
