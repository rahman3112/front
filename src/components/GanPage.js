import React, { useState, useEffect } from 'react';

const GanPage = () => {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To handle error messages
  const [showImages, setShowImages] = useState(false); // To control when to display images

  // Predefined labels for input and corresponding images
  const labels = [
    { 
      id: 0, 
      name: 'T-Shirt', 
      originalImage: '/images/originaltshirt.jpg', 
      generatedImage: '/images/gentshirt.jpg' 
    },
    { 
      id: 1, 
      name: 'Jeans', 
      originalImage: '/images/originaljeans.jpg', 
      generatedImage: '/images/genjeans.jpg' 
    },
    { 
      id: 2, 
      name: 'Dress', 
      originalImage: '/images/originaldress.jpg', 
      generatedImage: '/images/gendress.jpg' 
    },
  ];

  // Reset the images display when label changes
  useEffect(() => {
    setShowImages(false);
  }, [selectedLabel]);

  const handleGenerateImage = () => {
    if (!selectedLabel) {
      setError('Please select a label');
      return;
    }

    setLoading(true);
    setError(null); // Reset error message
    setShowImages(false); // Hide images initially

    // Simulate image retrieval process with a delay
    setTimeout(() => {
      setLoading(false);
      setShowImages(true); // Show images after delay
    }, 2000); // 2-second delay
  };

  const selectedData = labels.find(label => label.id.toString() === selectedLabel);

  return (
    <div style={styles.container}>
      <h1>Generate Fashion Item</h1>

      {/* Input Section */}
      <select
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
        style={styles.selectBox}
      >
        <option value="">Select a Label</option>
        {labels.map((label) => (
          <option key={label.id} value={label.id}>
            Label {label.id}: {label.name}
          </option>
        ))}
      </select>
      <button onClick={handleGenerateImage} disabled={loading} style={styles.button}>
        {loading ? 'Loading...' : 'Generate Image'}
      </button>

      {/* Error Message */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Results Section */}
      {showImages && selectedData && (
        <div style={styles.resultsContainer}>
          <div style={styles.resultItem}>
            <h3>Original Image</h3>
            <img
              src={selectedData.originalImage}
              alt="Original Fashion Item"
              style={styles.image}
            />
          </div>

          <div style={styles.resultItem}>
            <h3>Generated Image</h3>
            <img
              src={selectedData.generatedImage}
              alt="Generated Fashion Item"
              style={styles.image}
            />
          </div>
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
  selectBox: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '20px',
    gap: '10px',
    flexWrap: 'wrap', // Allows wrapping on smaller screens
  },
  resultItem: {
    flex: '1 1 calc(33% - 20px)', // Each result item takes one-third of the row width
    textAlign: 'center',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Optional: Add shadow for aesthetics
  },
  image: {
    maxWidth: '100%', // Ensure the image is responsive and scales correctly
    height: 'auto', // Maintain the aspect ratio
    borderRadius: '8px',
    maxHeight: '300px', // Limit the height of the image
  },
};

export default GanPage;