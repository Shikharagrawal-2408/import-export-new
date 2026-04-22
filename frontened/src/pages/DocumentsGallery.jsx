import React, { useState } from 'react';
import './DocumentsGallery.css';

const DocumentsGallery = () => {
    const documents = [
        {
            id: 1,
            title: 'Proforma Invoice',
            description: 'Commercial invoice template for international shipments',
            icon: '💰',
            fileSize: '245 KB',
            lastUpdated: 'Jan 20, 2026',
            downloadCount: 1243,
            category: 'Financial',
            color: 'blue'
        },
        {
            id: 2,
            title: 'Bill of Lading',
            description: 'Transport document issued by carrier to shipper',
            icon: '📄',
            fileSize: '182 KB',
            lastUpdated: 'Jan 18, 2026',
            downloadCount: 2156,
            category: 'Shipping',
            color: 'purple'
        },
        {
            id: 3,
            title: 'Packing List',
            description: 'Detailed list of package contents and specifications',
            icon: '📋',
            fileSize: '198 KB',
            lastUpdated: 'Jan 22, 2026',
            downloadCount: 1876,
            category: 'Documentation',
            color: 'pink'
        },
        {
            id: 4,
            title: 'Certificate of Origin',
            description: 'Document certifying the country of manufacture',
            icon: '🌍',
            fileSize: '156 KB',
            lastUpdated: 'Jan 15, 2026',
            downloadCount: 987,
            category: 'Customs',
            color: 'green'
        },
        {
            id: 5,
            title: 'Commercial Invoice',
            description: 'Official invoice for customs clearance purposes',
            icon: '🧾',
            fileSize: '223 KB',
            lastUpdated: 'Jan 25, 2026',
            downloadCount: 1532,
            category: 'Financial',
            color: 'orange'
        },
        {
            id: 6,
            title: 'Insurance Certificate',
            description: 'Proof of cargo insurance coverage',
            icon: '🛡️',
            fileSize: '167 KB',
            lastUpdated: 'Jan 19, 2026',
            downloadCount: 765,
            category: 'Insurance',
            color: 'cyan'
        }
    ];

    const [downloadingId, setDownloadingId] = useState(null);

    const handleDownload = (doc) => {
        setDownloadingId(doc.id);

        // Simulate download
        setTimeout(() => {
            console.log(`Downloading ${doc.title}`);
            setDownloadingId(null);
        }, 1500);
    };

    return (
        <div className="documents-gallery-container">
            <div className="gallery-header">
                <h1 className="gallery-title">Trade Documents</h1>
                <p className="gallery-subtitle">
                    Download professional PDF templates for international shipping and customs
                </p>
            </div>

            <div className="documents-grid">
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className={`document-card ${doc.color}`}
                    >
                        <div className="card-background">
                            <div className="card-gradient"></div>
                            <div className="card-glow"></div>
                        </div>

                        <div className="card-content">
                            <div className="card-header">
                                <div className="document-icon">{doc.icon}</div>
                                <span className="document-category">{doc.category}</span>
                            </div>

                            <h3 className="document-title">{doc.title}</h3>
                            <p className="document-description">{doc.description}</p>

                            <div className="document-meta">
                                <div className="meta-item">
                                    <span className="meta-icon">📦</span>
                                    <span className="meta-text">{doc.fileSize}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-icon">📅</span>
                                    <span className="meta-text">{doc.lastUpdated}</span>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="download-stats">
                                    <span className="download-icon">⬇️</span>
                                    <span className="download-count">{doc.downloadCount.toLocaleString()} downloads</span>
                                </div>

                                <button
                                    className={`download-btn ${downloadingId === doc.id ? 'downloading' : ''}`}
                                    onClick={() => handleDownload(doc)}
                                    disabled={downloadingId === doc.id}
                                >
                                    {downloadingId === doc.id ? (
                                        <>
                                            <span className="spinner"></span>
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <span className="btn-icon">⬇️</span>
                                            Download PDF
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="card-shine"></div>
                    </div>
                ))}
            </div>

            <div className="gallery-footer">
                <p>Need a custom template? <a href="#contact" className="footer-link">Contact our team</a></p>
            </div>
        </div>
    );
};

export default DocumentsGallery;
