import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const NumberPage = () => {
    const [numberId, setNumberId] = useState()
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const fetchNumbers = async () => {
        setLoading(true);
        setError('');


        // Check if the entered value is one of 'p', 'f', 'e', or 'r'
        if (!['p', 'f', 'e', 'r'].includes(numberId.toLowerCase())) {
            setError('Invalid input. Please enter only "p", "f", "e", or "r".');
            setLoading(false);
            return;
        }


        const clientId = '83cdafaa-8054-46d0-b1b6-84f52c8fb4bc';
        const clientSecret = 'WwCJryEgnCIbGtTx';

        try {
            const authResponse = await axios.post('http://20.244.56.144/test/auth', {
                clientId,
                clientSecret,
            });

            const accessToken = authResponse.data.access_token;

            const numberResponse = await axios.get(`http://20.244.56.144/test/${numberId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setResponse(numberResponse.data);
            setNumberId('');

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
                <div className="input-group mb-3 gap-1">
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
