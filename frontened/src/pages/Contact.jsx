import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Contact.css';

function Contact() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        country: '',
        serviceType: 'Import Management',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const inquiryData = {
                ...formData,
                user: user?._id || null
            };
            await axios.post('http://localhost:5000/api/inquiries', inquiryData);
            setSuccess(true);
            setFormData({ name: '', email: '', company: '', country: '', serviceType: 'Import Management', message: '' });
        } catch (err) {
            console.error('Error sending inquiry:', err);
            alert('Failed to send inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <h1 className="contact-title">Start Your <span className="gradient-text">Trade Inquiry</span></h1>
                <p className="contact-subtitle">Get a specialized quote from our B2B consultants within 24 hours.</p>
            </section>

            <div className="contact-container">
                <div className="contact-info">
                    <h2 className="info-title">Why Talk to Us?</h2>
                    <p className="info-subtitle">Our experts help you navigate complex international trade hurdles.</p>

                    <div className="info-cards">
                        <div className="info-card">
                            <span className="info-icon">📧</span>
                            <div>
                                <span className="info-label">Email Support</span>
                                <span className="info-value">trade@tradeportal.com</span>
                            </div>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">📞</span>
                            <div>
                                <span className="info-label">Direct Line</span>
                                <span className="info-value">+1 (555) TRADE-88</span>
                            </div>
                        </div>
                    </div>

                    <div className="trust-badges">
                        <span className="trust-label">✓ Verified Supplier Network</span>
                        <span className="trust-label">✓ Pre-shipment Inspections</span>
                        <span className="trust-label">✓ Secured Escrow Payments</span>
                    </div>
                </div>

                <section className="contact-form-section">
                    {success ? (
                        <div className="success-view">
                            <h3>✅ Inquiry Received!</h3>
                            <p>Thank you for reaching out. A trade specialist will contact you soon.</p>
                            <Link to="/dashboard" className="view-dash-btn" style={{
                                display: 'inline-block',
                                marginTop: '1.5rem',
                                padding: '1rem 2rem',
                                background: 'var(--primary-color)',
                                color: 'white',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '700'
                            }}>Go to Dashboard</Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="form-title">Detailed Inquiry Form</h2>
                            <form className="admin-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" name="name" className="form-input" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" name="email" className="form-input" placeholder="Work email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Company Name</label>
                                        <input type="text" name="company" className="form-input" placeholder="Your business name" value={formData.company} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Target Country</label>
                                        <input type="text" name="country" className="form-input" placeholder="Destination / Origin" value={formData.country} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Service Type</label>
                                    <select name="serviceType" className="form-select" value={formData.serviceType} onChange={handleChange}>
                                        <option>Import Management</option>
                                        <option>Export Support</option>
                                        <option>Quality Inspection</option>
                                        <option>Customs Consulting</option>
                                        <option>Freight Forwarding</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Your Requirements</label>
                                    <textarea name="message" className="form-textarea" rows="4" placeholder="Describe your product, volume, and timeline..." value={formData.message} onChange={handleChange} required></textarea>
                                </div>

                                <button type="submit" className="form-submit" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                                    {loading ? 'Sending...' : 'Send Inquiry Now'}
                                </button>
                            </form>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Contact;
