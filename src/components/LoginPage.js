import React, { useState } from 'react';
import axios from 'axios';  //importing all necessary modules 

const LoginPage = () => {
  const [email, setEmail] = useState(''); //used to change the email and pass as to what the user has entered 
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => { //on submission the function gets executed 
    e.preventDefault(); //prevents the default or empty page from being submitted 
    try {
      const response = await axios.post('https://localhost:5000/login', { //posts a request to backend and waits for a response
        email,
        password,
      });
      if (response.data.success) {  //if the backend successfully responds 
        localStorage.setItem('email', email); //stores the email locally in the web application for OTP verification
        window.location.href = '/otp-verification'; //redirecting to OTP verification page
      } else {
        alert('Login failed');
      }
    } catch (error) { //in case of any errors from the backend 
      console.error('Login error', error);
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
          borderRadius: '30px',
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
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} //updates the email as user types
            placeholder="Email"
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} //updates the password as user types
            placeholder="Password"
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
            Login
          </button>
        </form>
        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#C5C6C7',
          }}
        >
          Don't have an account?{' '}
          <a
            href="/signup"
            style={{
              color: '#66FCF1',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;  //exporting the login component 
