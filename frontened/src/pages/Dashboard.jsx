import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [inquiries, setInquiries] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const inquiryRes = await axios.get('http://localhost:5000/api/inquiries/my', config);
                setInquiries(inquiryRes.data);

                const orderRes = await axios.get('http://localhost:5000/api/orders/my', config);
                setOrders(orderRes.data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <div className="user-welcome">
                        <h1>Welcome back, {user?.name}!</h1>
                        <p>Track your inquiries and shipments here.</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </header>

                <div className="dashboard-grid">
                    <div className="dash-card">
                        <h3>Recent Inquiries</h3>
                        {inquiries.length > 0 ? (
                            <ul className="dash-list">
                                {inquiries.slice(-3).reverse().map(i => (
                                    <li key={i._id} className="dash-item">
                                        <span className="item-title">{i.serviceType}</span>
                                        <span className={`item-status ${i.status.toLowerCase()}`}>{i.status}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="empty-state">No active inquiries.</div>
                        )}
                        <Link to="/contact" className="dash-link">New Inquiry →</Link>
                    </div>

                    <div className="dash-card">
                        <h3>Shipment Tracking</h3>
                        {orders.length > 0 ? (
                            <ul className="dash-list">
                                {orders.map(o => (
                                    <li key={o._id} className="dash-item">
                                        <div className="item-info">
                                            <span className="item-title">#{o._id.substring(0, 8)}</span>
                                            <span className="item-subtitle">{o.status} - {o.trackingId}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <>
                                <div className="empty-state">No active shipments.</div>
                                <input type="text" placeholder="Tracking ID..." className="dash-input" />
                                <button className="dash-btn">Track Now</button>
                            </>
                        )}
                    </div>

                    <div className="dash-card">
                        <h3>Saved Products</h3>
                        <div className="empty-state">No products saved yet.</div>
                        <Link to="/products" className="dash-link">Browse Catalog →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
