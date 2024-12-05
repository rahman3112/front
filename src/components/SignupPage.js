import React, { useState } from 'react'; 
import axios from 'axios'; //used to send server requests to the backend 

const SignupPage = () => {
  const [email, setEmail] = useState('');  //the usestate is used to update what the user is giving in as an input so that the correct info can be sent to the backend 
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => { // async lets the code run in background while the site is being loaded  
    e.preventDefault(); //prevents the default or blank/empty page from being submitted 
    try {
      const response = await axios.post('https://back-5rp5.onrender.com/signup', { //await pauses the other things until a response is obtained from the server 
        email,
        password,   //here email and password are passed to the backend 
      });
      if (response.data.success) { // if the response from the backend is received 
        alert('Signup successful. Please login.');
        window.location.href = '/';  // Redirect to Login after successful signup
      } else {
        alert('Signup failed.'); // In case of signup failure 
      }
    } catch (error) {
      console.error('Signup error', error); // if the handleSignup function is showing or giving us an error 
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
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}   //whatever the user sends in as an input in the email block it is updated and stored 
            onChange={(e) => setEmail(e.target.value)} // e.target.value gives us the current input that is given by the user 
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
            onChange={(e) => setPassword(e.target.value)}  // same goes for the password field too
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
            Sign Up
          </button>
        </form>
        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#C5C6C7',
          }}
        >
          Already have an account?{' '}
          <a
            href="/"
            style={{
              color: '#66FCF1',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;  //exporting the component 
