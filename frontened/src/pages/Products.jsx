import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShipmentTracker from './ShipmentTracker';
import './Products.css';

function Products() {
    const [activeView, setActiveView] = useState('catalog'); // 'catalog', 'shipment'
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(Array.isArray(data.products) ? data.products : []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };
    fetchProducts();
}, []);


    if (loading) {
        return <div className="products-page"><h2>Loading products...</h2></div>;
    }

    return (
        <div className="products-page">
            {/* Navigation */}
            <div className="products-nav-container">
                <h1 className="products-main-title">
                    B2B Trade <span className="gradient-text">Operations</span>
                </h1>

                <div className="products-nav">
                    <button
                        className={`toggle-btn ${activeView === 'catalog' ? 'active' : ''}`}
                        onClick={() => setActiveView('catalog')}
                    >
                        📦 Product Catalog
                    </button>

                    <button
                        className={`toggle-btn ${activeView === 'shipment' ? 'active' : ''}`}
                        onClick={() => setActiveView('shipment')}
                    >
                        🚢 Shipment Tracker
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="products-content">
                {activeView === 'catalog' && (
                    <div className="catalog-view">
                        <div className="catalog-header">
                            <h2>Verified Supply Chain Catalog</h2>
                            <p>
                                Direct sourcing from ISO-certified manufacturers with guaranteed quality standards.
                            </p>
                        </div>

                        <div className="catalog-grid">
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map(product => (
                                    <div key={product._id} className="b2b-product-card">
                                        <div className="product-image-container">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                            <div className="product-category-badge">Verified</div>
                                        </div>

                                        <div className="product-info">
                                            <h3 className="product-name">{product.name}</h3>

                                            {/* Specifications */}
                                            {product.specs && (
                                                <div className="specs-section">
                                                    <h4>Technical Specifications</h4>
                                                    <ul>
                                                        {Object.entries(product.specs).map(([key, value]) => (
                                                            <li key={key}>
                                                                <strong>
                                                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                                                </strong>{' '}
                                                                {value}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* B2B Terms */}
                                            {product.btob && (
                                                <div className="b2b-terms-section">
                                                    <h4>Trade & Logistics Terms</h4>

                                                    <div className="terms-grid">
                                                        <div className="term-item">
                                                            <span className="term-icon">📦</span>
                                                            <div>
                                                                <span className="term-label">MOQ</span>
                                                                <span className="term-value">{product.btob?.moq}</span>
                                                            </div>
                                                        </div>

                                                        <div className="term-item">
                                                            <span className="term-icon">🛡️</span>
                                                            <div>
                                                                <span className="term-label">Standards</span>
                                                                <span className="term-value">{product.btob?.standards}</span>
                                                            </div>
                                                        </div>

                                                        <div className="term-item">
                                                            <span className="term-icon">🚢</span>
                                                            <div>
                                                                <span className="term-label">Incoterms</span>
                                                                <span className="term-value">{product.btob?.incoterms}</span>
                                                            </div>
                                                        </div>

                                                        <div className="term-item">
                                                            <span className="term-icon">💳</span>
                                                            <div>
                                                                <span className="term-label">Payment</span>
                                                                <span className="term-value">{product.btob?.payment}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="product-actions">
                                                <button className="inquiry-btn">Request Price List</button>
                                                <button className="sample-btn">Order Sample</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeView === 'shipment' && <ShipmentTracker />}
            </div>
        </div>
    );
}

export default Products;
