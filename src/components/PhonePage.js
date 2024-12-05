import React, { useState } from 'react';
import axios from 'axios';

const PhonePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');   // Store phone number and OTP entered by the user
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false); // To check whether OTP is sent (initially set to false)

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    try {
      await axios.post('https://back-5rp5.onrender.com/save-phone', { email, phoneNumber }); // Save phone number
      await axios.post('https://back-5rp5.onrender.com/send-phone-otp', { phoneNumber }); // Send OTP
      alert('Phone number submitted successfully. OTP sent to your phone.');
      setIsPhoneOtpSent(true); // Set flag to true once OTP is sent
    } catch (error) {
      console.error('Phone number submission error', error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://back-5rp5.onrender.com/verify-phone-otp', { // Verify OTP entered by the user
        phoneNumber,
        otp: phoneOtp,
      });
      if (response.data.success) {
        alert('Phone OTP verified successfully');
        window.location.href = '/home'; // Redirect to home page after OTP verification
      } else {
        alert('Invalid Phone OTP');
      }
    } catch (error) {
      console.error('Phone OTP verification error', error);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#0B0C10',
        color: '#C5C6C7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Arial", sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#1F2833',
          padding: '40px',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#66FCF1',
            marginBottom: '20px',
          }}
        >
          Phone Number Verification
        </h2>
        <form onSubmit={isPhoneOtpSent ? handleOtpSubmit : handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              backgroundColor: '#C5C6C7',
              border: 'none',
              borderRadius: '5px',
              color: '#0B0C10',
              fontSize: '16px',
            }}
          />
          {isPhoneOtpSent && (
            <>
              <input
                type="text"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '20px',
                  backgroundColor: '#C5C6C7',
                  border: 'none',
                  borderRadius: '5px',
                  color: '#0B0C10',
                  fontSize: '16px',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#0B0C10',
                  backgroundColor: '#66FCF1',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                Verify OTP
              </button>
            </>
          )}
          {!isPhoneOtpSent && (
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#0B0C10',
                backgroundColor: '#66FCF1',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              Submit Phone Number
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PhonePage;
