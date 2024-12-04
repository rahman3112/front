import React, { useState } from 'react';
import './HomePage.css'; // Assuming you have the CSS file for styling

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
        <div className="container">
            <h1>Item Rating Predictor</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="day">Day:</label>
                <input
                    type="number"
                    id="day"
                    name="day"
                    min="1"
                    max="31"
                    value={formData.day}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="month">Month:</label>
                <input
                    type="number"
                    id="month"
                    name="month"
                    min="1"
                    max="12"
                    value={formData.month}
                    onChange={handleChange}
                    required
                />

                {/* Year input field is removed since it's always set as 2006 */}
                
                <label htmlFor="cloth_type">Cloth Type:</label>
                <select
                    id="cloth_type"
                    name="cloth_type"
                    value={formData.cloth_type}
                    onChange={handleChange}
                    required
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

                <label htmlFor="payment_method">Payment Method:</label>
                <select
                    id="payment_method"
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    required
                >
                    <option value="1">Credit Card</option>
                    <option value="0">Cash</option>
                </select>

                <label htmlFor="purchase_amount">Purchase Amount ($):</label>
                <input
                    type="number"
                    id="purchase_amount"
                    name="purchase_amount"
                    step="0.01"
                    value={formData.purchase_amount}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="actual_rating">Actual Rating (Optional):</label>
                <input
                    type="number"
                    id="actual_rating"
                    name="actual_rating"
                    min="1"
                    max="5"
                    value={formData.actual_rating}
                    onChange={handleChange}
                />

                <button type="submit">Predict Rating</button>
            </form>

            {result && <div id="result">Predicted Rating: {result}</div>}
            {error && <div id="error" style={{ color: 'red' }}>Error: {error}</div>}
        </div>
    );
};

export default HomePage;
