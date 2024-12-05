import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image1 from './pexels-jmendezrf-1536619.jpg';
import Image2 from './hq720.jpg';
import Image3 from './images.jpeg';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  // Array of image URLs
  const images = [
    Image1,
    Image2,
    Image3,
    Image2,
  ];

  // Handlers for toggling images
  const handlePreviousImage = () =>
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );

  const handleNextImage = () =>
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

  return (
    <div
      style={{
        height: '100vh',
        margin: 0,
        backgroundColor: '#0B0C10',
        backgroundImage: 'url("/path-to-your-texture.jpg")', // Optional textured background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#C5C6C7',
        fontFamily: '"Arial", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '60px',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          color: '#66FCF1',
          fontSize: '18px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSignup}
            style={{
              padding: '10px 20px',
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
            Signup
          </button>
          <button
            onClick={handleLogin}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#0B0C10',
              backgroundColor: '#C5C6C7',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            color: '#66FCF1',
            marginBottom: '20px',
          }}
        >
          Smart Fashion
        </h1>
        <p
          style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#C5C6C7',
          }}
        >
         Unlock the Future of Fashion with AI
Smart Fashion harnesses the power of artificial intelligence to generate unique fashion designs and predict the ratings of various styling options. Whether you're a designer seeking fresh ideas or a retailer optimizing your offerings, our AI-driven platform provides data-backed insights to stay ahead of trends and create the perfect looks.

Experience how technology and creativity come together to transform your fashion journey with Smart Fashion.







        </p>
      </div>

      {/* Fashion Image Carousel */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '600px',
          height: '400px',
          margin: '0 auto',
        }}
      >
        {/* Previous Button */}
        <button
          onClick={handlePreviousImage}
          style={{
            position: 'absolute',
            left: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '10px 20px',
            fontSize: '16px',
            color: '#66FCF1',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          &lt;
        </button>

        {/* Current Image */}
        <img
          src={images[currentImageIndex]}
          alt={`Fashion ${currentImageIndex + 1}`}
          style={{
            width: '80%',
            height: '100%',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            objectFit: 'cover',
          }}
        />

        {/* Next Button */}
        <button
          onClick={handleNextImage}
          style={{
            position: 'absolute',
            right: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '10px 20px',
            fontSize: '16px',
            color: '#66FCF1',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
