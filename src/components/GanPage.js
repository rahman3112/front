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
    <div >
      <h1>Generate Fashion Item</h1>
      
      {/* Error Message */}
      {error && <div >{error}</div>}

      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Enter description of the fashion item"
        rows="4"
        cols="50"
        
      />
      <button onClick={handleGenerateImage} disabled={loading} >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {generatedImage && (
        <div >
          <h3>Generated Image</h3>
          <img
            src={`data:image/png;base64,${generatedImage}`}
            alt="Generated Fashion Item"
       
          />
        </div>
      )}

      {originalImage && (
        <div>
          <h3>Original Image</h3>
          <img
            src={`data:image/png;base64,${originalImage}`}
            alt="Original Fashion Item"
            
          />
        </div>
      )}

      {accuracy !== null && (
        <div>
          <h3>Accuracy</h3>
          <p>{accuracy}</p>
        </div>
      )}
    </div>
  );
};


export default GanPage;
