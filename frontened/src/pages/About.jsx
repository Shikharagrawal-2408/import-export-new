import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <h1 className="hero-title">Your Trusted <span className="gradient-text">Trade Partner</span></h1>
                <p className="hero-subtitle">Bringing transparency, reliability, and direct factory access to global businesses.</p>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="mission-content">
                    <h2 className="section-title">Our Mission</h2>
                    <p className="mission-text">
                        We empower small and medium enterprises to compete globally by providing the same logistics expertise and sourcing power that large corporations enjoy. Our goal is to make international trade as simple as domestic shipping.
                    </p>
                </div>
            </section>

            {/* Founder Story */}
            <section className="founder-section">
                <h2 className="section-title">Our Story</h2>
                <div className="founder-content">
                    <p className="founder-text">
                        After working 5+ years in international trade and supply chain, our founder recognized a common challenge: small and medium businesses struggle with finding reliable suppliers, managing quality, and navigating complex shipping processes.
                    </p>
                    <p className="founder-text">
                        We started this company to bridge that gap—offering personalized service, transparent communication, and direct factory access to businesses looking for long-term trading relationships.
                    </p>
                    <p className="founder-highlight">
                        <strong>Not looking to be the biggest. Just the most reliable.</strong>
                    </p>
                </div>
            </section>

            {/* Our Approach */}
            <section className="approach-section">
                <h2 className="section-title">The Quality-First Approach</h2>
                <div className="approach-grid">
                    <div className="approach-card">
                        <h3>Direct Factory Partnerships</h3>
                        <p>We work directly with ISO-certified manufacturers. No middlemen, no hidden markups.</p>
                    </div>
                    <div className="approach-card">
                        <h3>Rigorous Quality Checks</h3>
                        <p>Sample testing and pre-shipment inspections are mandatory for every client order.</p>
                    </div>
                    <div className="approach-card">
                        <h3>Clear Communication</h3>
                        <p>Dedicated account managers who speak your language and understand your market.</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-grid">
                <div className="stat-card">
                    <span className="stat-number">200+</span>
                    <span className="stat-label">Factories Audited</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">99.8%</span>
                    <span className="stat-label">Shipping Accuracy</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Support Access</span>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <h2>Want to know more about our sourcing process?</h2>
                <button className="cta-button">Download Process Guide</button>
            </section>
        </div>
    );
}

export default About;
