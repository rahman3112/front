import React, { useState } from 'react';

const HomePage = () => {
    const [formData, setFormData] = useState({
        day: '',
        month: '',
        cloth_type: 'Belt',
        payment_method: '1',
        purchase_amount: '',
        actual_rating: '',
        year: '2006' // Default year value set here
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous results
        setResult(null);
        setError(null);

        try {
            const response = await fetch('http://localhost:4000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Year will always be included in the request
            });

            const result = await response.json();

            if (response.ok) {
                setResult(result.rating);
            } else {
                setError(result.error || 'Something went wrong!');
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
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
                    maxWidth: '500px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
            >
                <h1
                    style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#66FCF1',
                        marginBottom: '30px',
                    }}
                >
                    Item Rating Predictor
                </h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="day"
                            style={{ display: 'block', marginBottom: '5px', color: '#66FCF1' }}
                        >
                            Day:
                        </label>
                        <input
                            type="number"
                            id="day"
                            name="day"
                            min="1"
                            max="31"
                            value={formData.day}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#C5C6C7',
                                border: 'none',
                                borderRadius: '5px',
                                color: '#0B0C10',
                                fontSize: '16px',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="month"
                            style={{ display: 'block', marginBottom: '5px', color: '#66FCF1' }}
                        >
                            Month:
                        </label>
                        <input
                            type="number"
                            id="month"
                            name="month"
                            min="1"
                            max="12"
                            value={formData.month}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#C5C6C7',
                                border: 'none',
                                borderRadius: '5px',
                                color: '#0B0C10',
                                fontSize: '16px',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="cloth_type"
                            style={{ display: 'block', marginBottom: '5px', color: '#66FCF1' }}
                        >
                            Cloth Type:
                        </label>
                        <select
                            id="cloth_type"
                            name="cloth_type"
                            value={formData.cloth_type}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#C5C6C7',
                                border: 'none',
                                borderRadius: '5px',
                                color: '#0B0C10',
                                fontSize: '16px',
                            }}
                        >
                            <option value="Belt">Belt</option>
                            <option value="Skirt">Skirt</option>
                            <option value="T-shirt">T-shirt</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Sneakers">Sneakers</option>
                            <option value="Dress">Dress</option>
                            <option value="Handbag">Handbag</option>
                            <option value="Jacket">Jacket</option>
                            <option value="Sweater">Sweater</option>
                            <option value="Scarf">Scarf</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="payment_method"
                            style={{ display: 'block', marginBottom: '5px', color: '#66FCF1' }}
                        >
                            Payment Method:
                        </label>
                        <select
                            id="payment_method"
                            name="payment_method"
                            value={formData.payment_method}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#C5C6C7',
                                border: 'none',
                                borderRadius: '5px',
                                color: '#0B0C10',
                                fontSize: '16px',
                            }}
                        >
                            <option value="1">Credit Card</option>
                            <option value="0">Cash</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="purchase_amount"
                            style={{ display: 'block', marginBottom: '5px', color: '#66FCF1' }}
                        >
                            Purchase Amount ($):
                        </label>
                        <input
                            type="number"
                            id="purchase_amount"
                            name="purchase_amount"
                            step="0.01"
                            value={formData.purchase_amount}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#C5C6C7',
                                border: 'none',
                                borderRadius: '5px',
                                color: '#0B0C10',
                                fontSize: '16px',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="actual_rating"
                            style={{ display: 'block', marginBottom: '5px', color: '#66FCF1' }}
                        >
                            Actual Rating (Optional):
                        </label>
                        <input
                            type="number"
                            id="actual_rating"
                            name="actual_rating"
                            min="1"
                            max="5"
                            value={formData.actual_rating}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#C5C6C7',
                                border: 'none',
                                borderRadius: '5px',
                                color: '#0B0C10',
                                fontSize: '16px',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '15px',
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
                        Predict Rating
                    </button>
                </form>

                {result && (
                    <div
                        id="result"
                        style={{
                            marginTop: '20px',
                            padding: '15px',
                            backgroundColor: '#2C3E50',
                            color: '#66FCF1',
                            borderRadius: '5px',
                            textAlign: 'center',
                        }}
                    >
                        Predicted Rating: {result}
                    </div>
                )}

                {error && (
                    <div
                        id="error"
                        style={{
                            marginTop: '20px',
                            padding: '15px',
                            backgroundColor: '#E74C3C',
                            color: '#FFFFFF',
                            borderRadius: '5px',
                            textAlign: 'center',
                        }}
                    >
                        Error: {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
