import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default to user
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (name && email && password && role) {
            const result = await register(name, email, password, role);
            if (result.success) {
                const savedUser = JSON.parse(localStorage.getItem('user'));
                navigate(savedUser?.role === 'admin' ? '/admin-dashboard' : '/dashboard');
            } else {
                setError(result.message);
            }
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p>Join the Trade Portal community</p>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Account Type</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                borderRadius: '10px',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'var(--text-color)',
                                fontSize: '0.95rem',
                                marginTop: '0.5rem',
                                outline: 'none'
                            }}
                        >
                            <option value="user" style={{ color: '#000' }}>User</option>
                            <option value="admin" style={{ color: '#000' }}>Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="auth-btn">Register</button>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
