import React, { useState } from 'react';

const GanPage = () => {
  const [input, setInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To handle error messages

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleGenerateImage = async () => {
    if (!input) {
      setError('Cloth type is required');
      return;
    }

    setLoading(true);
    setGeneratedImage(null);
    setOriginalImage(null);
    setAccuracy(null);
    setError(null); // Reset error message

    try {
      const response = await fetch('http://localhost:4000/gan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cloth_type: input }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedImage(data.generatedImage);
        setOriginalImage(data.originalImage);
        setAccuracy(data.accuracy.toFixed(2)); // Formatting accuracy to 2 decimal places
      } else {
        setError('Error generating image: ' + data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Generate Fashion Item</h1>
      
      {/* Error Message */}
      {error && <div style={styles.error}>{error}</div>}

      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Enter description of the fashion item"
        rows="4"
        cols="50"
        style={styles.textArea}
      />
      <button onClick={handleGenerateImage} disabled={loading} style={styles.button}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {generatedImage && (
        <div style={styles.imageContainer}>
          <h3>Generated Image</h3>
          <img
            src={`data:image/png;base64,${generatedImage}`}
            alt="Generated Fashion Item"
            style={styles.image}
          />
        </div>
      )}

      {originalImage && (
        <div style={styles.imageContainer}>
          <h3>Original Image</h3>
          <img
            src={`data:image/png;base64,${originalImage}`}
            alt="Original Fashion Item"
            style={styles.image}
          />
        </div>
      )}

      {accuracy !== null && (
        <div style={styles.accuracyContainer}>
          <h3>Accuracy</h3>
          <p>{accuracy}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
  },
  imageContainer: {
    marginTop: '20px',
    textAlign: 'center',  // Center the images in the container
  },
  image: {
    maxWidth: '100%', // Ensure the image is responsive and scales correctly
    height: 'auto', // Maintain the aspect ratio
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  // Optional: Add shadow for aesthetics
    maxHeight: '500px', // Limit the height of the image to prevent overflow
  },
  accuracyContainer: {
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '10px',
  }
};

export default GanPage;
