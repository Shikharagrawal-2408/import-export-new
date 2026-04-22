import React, { useState } from 'react';
import './ShipmentTracker.css';

// Mock Database of Shipments
const shipmentsDatabase = {
    'SH-2026-RTD-4782': {
        trackingNumber: 'SH-2026-RTD-4782',
        currentStage: 2,
        containerWeight: '24,500 kg',
        origin: 'Shanghai, China',
        destination: 'Rotterdam, Netherlands',
        estimatedDelivery: 'Feb 2, 2026',
        carrier: 'Global Shipping Co.',
        vesselName: 'MV Pacific Express',
        containerNumber: 'MSCU4567890',
        stages: [
            { id: 0, title: 'Order Processed', description: 'Your order has been confirmed and is being prepared', icon: '📦', date: 'Jan 15, 2026', location: 'Shanghai Port' },
            { id: 1, title: 'In Transit', description: 'Shipment is on its way to the destination', icon: '🚢', date: 'Jan 18, 2026', location: 'Pacific Ocean' },
            { id: 2, title: 'Customs Clearance', description: 'Undergoing customs inspection and documentation', icon: '🛃', date: 'Jan 25, 2026', location: 'Rotterdam Customs' },
            { id: 3, title: 'Delivered', description: 'Package delivered successfully', icon: '✅', date: 'Pending', location: 'Rotterdam Port' }
        ]
    },
    'SH-2026-NYC-8923': {
        trackingNumber: 'SH-2026-NYC-8923',
        currentStage: 3,
        containerWeight: '18,200 kg',
        origin: 'Mumbai, India',
        destination: 'New York, USA',
        estimatedDelivery: 'Jan 28, 2026',
        carrier: 'Atlantic Freight Lines',
        vesselName: 'MV Atlantic Star',
        containerNumber: 'HLCU7890123',
        stages: [
            { id: 0, title: 'Order Processed', description: 'Your order has been confirmed and is being prepared', icon: '📦', date: 'Jan 5, 2026', location: 'Mumbai Port' },
            { id: 1, title: 'In Transit', description: 'Shipment is on its way to the destination', icon: '🚢', date: 'Jan 8, 2026', location: 'Atlantic Ocean' },
            { id: 2, title: 'Customs Clearance', description: 'Customs documentation completed', icon: '🛃', date: 'Jan 22, 2026', location: 'New York Customs' },
            { id: 3, title: 'Delivered', description: 'Package delivered successfully', icon: '✅', date: 'Jan 28, 2026', location: 'New York Port' }
        ]
    },
    'SH-2026-SIN-5647': {
        trackingNumber: 'SH-2026-SIN-5647',
        currentStage: 1,
        containerWeight: '32,100 kg',
        origin: 'Hamburg, Germany',
        destination: 'Singapore',
        estimatedDelivery: 'Feb 10, 2026',
        carrier: 'Euro-Asia Shipping',
        vesselName: 'MV Silk Road',
        containerNumber: 'MAEU9876543',
        stages: [
            { id: 0, title: 'Order Processed', description: 'Your order has been confirmed and is being prepared', icon: '📦', date: 'Jan 20, 2026', location: 'Hamburg Port' },
            { id: 1, title: 'In Transit', description: 'Shipment is on its way to the destination', icon: '🚢', date: 'Jan 23, 2026', location: 'Indian Ocean' },
            { id: 2, title: 'Customs Clearance', description: 'Awaiting customs inspection and documentation', icon: '🛃', date: 'Pending', location: 'Singapore Customs' },
            { id: 3, title: 'Delivered', description: 'Package will be delivered soon', icon: '✅', date: 'Pending', location: 'Singapore Port' }
        ]
    }
};

const ShipmentTracker = () => {
    const [trackingInput, setTrackingInput] = useState('');
    const [shipment, setShipment] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!trackingInput.trim()) return;

        setIsSearching(true);
        setNotFound(false);

        // Simulate API call delay
        setTimeout(() => {
            const foundShipment = shipmentsDatabase[trackingInput.toUpperCase()];

            if (foundShipment) {
                setShipment(foundShipment);
                setNotFound(false);
            } else {
                setShipment(null);
                setNotFound(true);
            }
            setIsSearching(false);
        }, 800);
    };

    const handleReset = () => {
        setTrackingInput('');
        setShipment(null);
        setNotFound(false);
    };

    const progressPercentage = shipment ? ((shipment.currentStage + 1) / shipment.stages.length) * 100 : 0;

    return (
        <div className="shipment-tracker-container">
            <div className="tracker-header">
                <h1 className="tracker-title">Shipment Tracking</h1>
                <p className="tracker-description">Track your shipment in real-time with our advanced tracking system</p>
            </div>

            {/* Search Form */}
            <div className="tracking-search-section">
                <form onSubmit={handleSearch} className="tracking-form">
                    <div className="search-input-group">
                        <input
                            type="text"
                            className="tracking-input"
                            placeholder="Enter tracking number (e.g., SH-2026-RTD-4782)"
                            value={trackingInput}
                            onChange={(e) => setTrackingInput(e.target.value)}
                        />
                        <button type="submit" className="search-btn" disabled={isSearching}>
                            {isSearching ? (
                                <>
                                    <span className="spinner"></span>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    🔍 Track Shipment
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Sample Tracking Numbers */}
                <div className="sample-numbers">
                    <p className="sample-label">Try these tracking numbers:</p>
                    <div className="sample-chips">
                        {Object.keys(shipmentsDatabase).map((trackingNum) => (
                            <button
                                key={trackingNum}
                                className="sample-chip"
                                onClick={() => {
                                    setTrackingInput(trackingNum);
                                    const event = { preventDefault: () => { } };
                                    setTimeout(() => handleSearch(event), 100);
                                }}
                            >
                                {trackingNum}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Not Found Message */}
            {notFound && (
                <div className="not-found-message">
                    <div className="not-found-icon">❌</div>
                    <h3>Tracking Number Not Found</h3>
                    <p>We couldn't find a shipment with tracking number: <strong>{trackingInput}</strong></p>
                    <button onClick={handleReset} className="reset-btn">Try Again</button>
                </div>
            )}

            {/* Shipment Details */}
            {shipment && (
                <div className="tracker-content">
                    <div className="tracking-header-info">
                        <div className="tracking-id-badge">
                            <span className="badge-label">Tracking ID:</span>
                            <span className="badge-value">{shipment.trackingNumber}</span>
                        </div>
                        <button onClick={handleReset} className="new-search-btn">🔄 New Search</button>
                    </div>

                    {/* Main Timeline Section */}
                    <div className="timeline-section">
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progressPercentage}%` }}
                            >
                                <div className="progress-glow"></div>
                            </div>
                        </div>

                        <div className="timeline">
                            {shipment.stages.map((stage, index) => (
                                <div
                                    key={stage.id}
                                    className={`timeline-item ${index <= shipment.currentStage ? 'completed' : 'pending'} ${index === shipment.currentStage ? 'active' : ''}`}
                                >
                                    <div className="timeline-marker">
                                        <div className="marker-icon">{stage.icon}</div>
                                        <div className="marker-dot"></div>
                                        {index < shipment.stages.length - 1 && <div className="marker-line"></div>}
                                    </div>

                                    <div className="timeline-content">
                                        <h3 className="stage-title">{stage.title}</h3>
                                        <p className="stage-description">{stage.description}</p>
                                        <div className="stage-meta">
                                            <span className="stage-date">📅 {stage.date}</span>
                                            <span className="stage-location">📍 {stage.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar with Details */}
                    <div className="details-sidebar">
                        <div className="sidebar-header">
                            <h2>Shipment Details</h2>
                        </div>

                        <div className="detail-card">
                            <div className="detail-item">
                                <span className="detail-label">Container Number</span>
                                <span className="detail-value">{shipment.containerNumber}</span>
                            </div>

                            <div className="detail-divider"></div>

                            <div className="detail-item">
                                <span className="detail-label">Container Weight</span>
                                <span className="detail-value weight">{shipment.containerWeight}</span>
                            </div>

                            <div className="detail-divider"></div>

                            <div className="detail-item">
                                <span className="detail-label">Origin Port</span>
                                <div className="location-info">
                                    <span className="location-icon">🏭</span>
                                    <span className="detail-value">{shipment.origin}</span>
                                </div>
                            </div>

                            <div className="detail-divider"></div>

                            <div className="detail-item">
                                <span className="detail-label">Destination Port</span>
                                <div className="location-info">
                                    <span className="location-icon">📍</span>
                                    <span className="detail-value">{shipment.destination}</span>
                                </div>
                            </div>

                            <div className="detail-divider"></div>

                            <div className="detail-item">
                                <span className="detail-label">Estimated Delivery</span>
                                <span className="detail-value delivery-date">{shipment.estimatedDelivery}</span>
                            </div>

                            <div className="detail-divider"></div>

                            <div className="detail-item">
                                <span className="detail-label">Carrier</span>
                                <span className="detail-value">{shipment.carrier}</span>
                            </div>

                            <div className="detail-divider"></div>

                            <div className="detail-item">
                                <span className="detail-label">Vessel Name</span>
                                <span className="detail-value">{shipment.vesselName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShipmentTracker;
