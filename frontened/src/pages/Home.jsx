import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Connecting Global Businesses through <span className="gradient-text">Reliable Trade</span>
                    </h1>
                    <p className="hero-subtitle">
                        Direct factory sourcing, verified quality control, and seamless end-to-end logistics for your international trade success.
                    </p>
                    <div className="hero-ctas">
                        <button className="primary-cta">Get a Free Quote</button>

                        <button
                            className="secondary-cta"
                            onClick={() => {
                                document.getElementById("services")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                            }}
                        >
                            Explore Services
                        </button>
                    </div>

                </div>
            </section>

            {/* Trust Stats */}
            <section className="stats-section">
                <div className="stat-card">
                    <span className="stat-value">500+</span>
                    <span className="stat-label">Verified Suppliers</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">45+</span>
                    <span className="stat-label">Countries Served</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Quality Guaranteed</span>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="why-us">
                <h2 className="section-title">Why Partner With Us?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Direct Sourcing</h3>
                        <p>Access direct manufacturer pricing without middlemen. We negotiate for you.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Quality Assurance</h3>
                        <p>Every shipment undergoes rigorous 4rd-party inspection before it leaves the factory.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🚢</div>
                        <h3>End-to-End Support</h3>
                        <p>From custom clearance to door-to-door delivery, we handle the complexity.</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="process-section">
                <h2 className="section-title">Global Trade Made Simple</h2>
                <div className="process-steps">
                    <div className="step">
                        <div className="step-num">01</div>
                        <h3>Send Inquiry</h3>
                        <p>Tell us what you need and your target specifications.</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-num">02</div>
                        <h3>Get Quote</h3>
                        <p>Receive a comprehensive offer including logistics and insurance.</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-num">03</div>
                        <h3>Start Shipment</h3>
                        <p>Monitor your cargo in real-time through our portal.</p>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="testimonial-section">
                <div className="testimonial-card">
                    <p className="testimonial-text">
                        "The level of transparency and technical detail they provide is unmatched. Our logistics costs dropped by 15% in the first quarter of working together."
                    </p>
                    <div className="testimonial-author">
                        <strong>- Marc Lefebvre</strong>
                        <span>Procurement Manager, EU Industrial Ltd.</span>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta">
                <h2>Ready to Scale Your International Trade?</h2>
                <button className="primary-cta large">Talk to a Consultant Today</button>
            </section>
        </div>
    );
}

export default Home;
