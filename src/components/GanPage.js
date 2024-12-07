import React, { useState, useEffect } from 'react';
import label0 from './label0.png';
import label1 from './label1.png';
import label2 from './label2.png';
import label3 from './label3.png';
import gen0 from './gen0.jpg';
import gen1 from './gen1.jpg';
import gen3 from './gen3.jpg';

const GanPage = () => {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showImages, setShowImages] = useState(false);

  const labels = [
    { id: 0, name: 'T-Shirt', originalImage: label0, generatedImage: gen0 },
    { id: 1, name: 'Jeans', originalImage: label1, generatedImage: gen1 },
    { id: 2, name: 'Dress', originalImage: label2, generatedImage: '/images/gendress.jpg' },
    { id: 3, name: 'Dress', originalImage: label3, generatedImage: gen3 },
    { id: 4, name: 'Dress', originalImage: '/images/originaldress.jpg', generatedImage: '/images/gendress.jpg' },
    { id: 5, name: 'Dress', originalImage: '/images/originaldress.jpg', generatedImage: '/images/gendress.jpg' },
    { id: 6, name: 'Dress', originalImage: '/images/originaldress.jpg', generatedImage: '/images/gendress.jpg' },
    { id: 7, name: 'Dress', originalImage: '/images/originaldress.jpg', generatedImage: '/images/gendress.jpg' },
  ];

  useEffect(() => {
    setShowImages(false);
  }, [selectedLabel]);

  const handleGenerateImage = () => {
    if (!selectedLabel) {
      setError('Please select a label');
      return;
    }

    setLoading(true);
    setError(null);
    setShowImages(false);

    setTimeout(() => {
      setLoading(false);
      setShowImages(true);
    }, 2000);
  };

  const selectedData = labels.find((label) => label.id.toString() === selectedLabel);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Generate Fashion Item</h1>
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
      {error && <div style={styles.error}>{error}</div>}
      {showImages && selectedData && (
        <div style={styles.resultsContainer}>
          <div style={styles.resultItem}>
            <h3 style={styles.subtitle}>Original Image</h3>
            <img
              src={selectedData.originalImage}
              alt="Original Fashion Item"
              style={styles.image}
            />
          </div>
          <div style={styles.resultItem}>
            <h3 style={styles.subtitle}>Generated Image</h3>
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
    height: '100vh',
    margin: 0,
    backgroundColor: '#0B0C10',
    color: '#C5C6C7',
    fontFamily: '"Arial", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '60px',
    fontWeight: 'bold',
    color: '#66FCF1',
    marginBottom: '30px',
  },
  selectBox: {
    width: '80%',
    maxWidth: '500px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #45A29E',
    marginBottom: '20px',
    backgroundColor: '#1F2833',
    color: '#C5C6C7',
  },
  button: {
    backgroundColor: '#66FCF1',
    color: '#0B0C10',
    padding: '15px 30px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
  },
  buttonHover: {
    backgroundColor: '#45A29E',
  },
  error: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginTop: '30px',
  },
  resultItem: {
    backgroundColor: '#1F2833',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#66FCF1',
    marginBottom: '10px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    maxHeight: '300px',
  },
};

export default GanPage;
