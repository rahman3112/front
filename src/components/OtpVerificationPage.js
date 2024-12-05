import React, { useState } from 'react';   
import axios from 'axios';    //importing necessary modules 

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [verificationType] = useState('email'); // sets the verification type variable as email that we had received from the earlier login page
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = verificationType === 'email'  // checks whether the verification type is email or not 
      ? 'https://back-5rp5.onrender.com/verify-email-otp'   // if true, sets endpoint to the email verification URL 
      : 'https://back-5rp5.onrender.com/verify-phone-otp';  // if false, sets it to the phone verification URL
    
    const email = localStorage.getItem('email');  // retrieves the email stored in our web application locally
    const phoneNumber = localStorage.getItem('phoneNumber');
    
    try {
      const response = await axios.post(endpoint, {
        email: verificationType === 'email' ? email : undefined, // if true, sends email
        phoneNumber: verificationType === 'phone' ? phoneNumber : undefined,
        otp
      });
      
      if (response.data.success) {
        if (verificationType === 'email') {
          // Redirect to PhonePage after successful email OTP verification
          window.location.href = '/phone';
        } else {
          // Redirect to HomePage after successful phone OTP verification
          window.location.href = '/home';
        }
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error', error);
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
          Verify OTP
        </h2>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}  //updates to the current value entered by user
            placeholder={verificationType === 'email' ? 'Enter Email OTP' : 'Enter Phone OTP'}
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
        </form>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
