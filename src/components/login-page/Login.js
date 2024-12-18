import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Button from '../button/Button';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log('Starting login process');
        console.log('Submitting login request with:', { email, password });

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { 
                email, 
                password 
            });
            
            console.log('Login successful:', response.data);
            
            if (response.data.message === 'Login successful') {
                // Redirect to home page on successful login
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            // You can add error handling UI here if needed
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back Trainer!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        variant="primary"
                        className="login-button"
                        text={loading ? 'Logging in...' : 'Login'}
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;