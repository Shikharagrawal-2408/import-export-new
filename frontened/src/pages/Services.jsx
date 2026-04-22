import React from 'react';
import './Services.css';

function Services() {
    const services = [
        {
            id: 1,
            title: 'Global Sourcing',
            description: 'Identify and vet reliable manufacturers with technical production audits.',
            features: ['Factory Audits', 'Sample Procurement', 'Price Negotiation'],
            icon: '🔍',
            price: 'From $499'
        },
        {
            id: 2,
            title: 'Import Management',
            description: 'End-to-end management of your import operations and documentation.',
            features: ['Customs Clearance', 'Import Duties Calc', 'Compliance Check'],
            icon: '🚢',
            price: 'From $299/shipment'
        },
        {
            id: 3,
            title: 'Quality Inspection',
            description: 'On-site 4rd-party inspection before your goods leave the port.',
            features: ['AQL Standards', 'Loading Supervision', 'Lab Testing'],
            icon: '🛡️',
            price: 'Custom Quote'
        },
        {
            id: 4,
            title: 'Logistics & Warehousing',
            description: 'Ocean, Air, and Land freight combined with safe storage solutions.',
            features: ['Container Consolidation', 'Fulfillment', '3PL Solutions'],
            icon: '📦',
            price: 'Volume-based'
        },
        {
            id: 5,
            title: 'Trade Consulting',
            description: 'Expert advice on market entry, tariff optimization, and risk management.',
            features: ['Tariff Planning', 'Trade Financing', 'Market Research'],
            icon: '📊',
            price: 'From $150/hr'
        },
        {
            id: 6,
            title: 'Certification Support',
            description: 'Assistance in obtaining necessary compliance certificates (ISO, CE, UL).',
            features: ['Testing Coordination', 'Documentation Support', 'Compliance Audit'],
            icon: '📜',
            price: 'Custom Quote'
        }
    ];

    return (
        <div className="services-page">
            <section className="services-hero">
                <h1 className="hero-title">Comprehensive <span className="gradient-text">Trade Solutions</span></h1>
                <p className="hero-subtitle">Customized services to streamline your global supply chain operations.</p>
            </section>

            <div className="services-grid">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-desc">{service.description}</p>
                        <ul className="service-features">
                            {service.features.map((f, i) => (
                                <li key={i}><span>✓</span> {f}</li>
                            ))}
                        </ul>
                        <div className="service-footer">
                            <span className="service-price">{service.price}</span>
                            <button className="service-btn">Get Service</button>
                        </div>
                    </div>
                ))}
            </div>

            <section className="services-trust">
                <p className="trust-quote">
                    "We don't just move boxes; we manage the integrity of your entire supply chain."
                </p>
            </section>

            <section className="services-cta">
                <h2>Need a Custom B2B Solution?</h2>
                <p>Our consultants are ready to build a tailor-made plan for your business needs.</p>
                <button className="primary-cta">Request a Strategic Consultation</button>
            </section>
        </div>
    );
}

export default Services;
