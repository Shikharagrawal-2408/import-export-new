import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (no page reload)
        setError('');

        if (!email || !password) {
            setError('Please enter valid credentials');
            return;
        }

        // Use the normal backend flow for all accounts

        // For other users, use the normal backend flow
        const result = await login(email, password);
        if (result.success) {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            navigate(savedUser?.role === 'admin' ? '/admin-dashboard' : '/dashboard');
        } else {
            setError(result.message || 'Invalid credentials');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p>Login to your Trade Portal account</p>
                {error && <div className="auth-error">{error}</div>}
                
                {/* 5. Correct form structure and handleLogin function */}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Login</button>
                    
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="/forgotpassword" style={{ fontSize: '0.9rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>Forgot Password?</Link>
                    </div>
                </form>

                <div className="demo-shortcuts" style={{
                    marginTop: '2rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <button
                        type="button"
                        onClick={() => { setEmail('client@trade.com'); setPassword('password'); }}
                        style={{
                            background: 'white',
                            color: 'var(--text-color)',
                            border: '1px solid var(--border-color)',
                            padding: '0.8rem 2.5rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        👤 User Login
                    </button>
                </div>

                <p className="auth-footer" style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '700' }}>Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
