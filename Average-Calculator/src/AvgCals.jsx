import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NumberPage = () => {
    const [numberId, setNumberId] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNumbers = async () => {
        setLoading(true);
        setError('');

        // Check if the entered value is one of 'p', 'f', 'e', or 'r'
        if (!['p', 'f', 'e', 'r'].includes(numberId.toLowerCase())) {
            setError('Invalid input. Please enter only "p", "f", "e", or "r".');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://20.244.56.144/test/${numberId}`);
            setResponse(response.data);
        } catch (error) {
            setError('Error fetching data');
        }

        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNumbers();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3 gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter 'p', 'f', 'e', or 'r'"
                        value={numberId}
                        onChange={(e) => setNumberId(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit" disabled={loading}>Fetch Numbers</button>
                </div>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {response && (
                <div>
                    <h3>Response</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default NumberPage;
