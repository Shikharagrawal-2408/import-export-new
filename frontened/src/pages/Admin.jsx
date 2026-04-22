import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentsGallery from './DocumentsGallery';
import './Admin.css';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    // Product Modal State
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        category: '',
        price: 0,
        image: '',
        btob: { moq: '', standards: '', incoterms: '', payment: '' },
        specs: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const productRes = await axios.get('http://localhost:5000/api/products');
                setProducts(Array.isArray(productRes.data.products) ? productRes.data.products : []);

                const inquiryRes = await axios.get('http://localhost:5000/api/inquiries', config);
                setInquiries(Array.isArray(inquiryRes.data) ? inquiryRes.data : []);

                const orderRes = await axios.get('http://localhost:5000/api/orders', config);
                setOrders(orderRes.data);

                const userRes = await axios.get('http://localhost:5000/api/auth/users', config);
                setUsers(userRes.data);
            } catch (err) {
                console.error('Error fetching admin data:', err);
            }
        };
        fetchData();
    }, []);

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (editMode) {
                const { data } = await axios.put(`http://localhost:5000/api/products/${currentProduct._id}`, currentProduct, config);
                setProducts(products.map(p => p._id === data._id ? data : p));
                alert('Product updated successfully');
            } else {
                const { data } = await axios.post('http://localhost:5000/api/products/add', currentProduct, config);
                setProducts([...products, data]);
                alert('Product added successfully');
            }
            setShowModal(false);
        } catch (err) {
            alert(err.response?.data?.error || 'Error saving product');
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`http://localhost:5000/api/products/${id}`, config);
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            alert('Error deleting product');
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditMode(true);
            setCurrentProduct(product);
        } else {
            setEditMode(false);
            setCurrentProduct({
                name: '',
                category: '',
                price: 0,
                image: '',
                btob: { moq: '', standards: '', incoterms: '', payment: '' },
                specs: {}
            });
        }
        setShowModal(true);
    };


    const updateInquiryStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            console.log("STATUS SENT 👉", status);

            const { data } = await axios.put(
                `http://localhost:5000/api/inquiries/${id}/status`,
                { status }, // send lowercase
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setInquiries(prev =>
                prev.map(i => (i._id === id ? data : i))
            );

        } catch (err) {
            console.error("SERVER ERROR:", err.response?.data);
            alert(err.response?.data?.message || "Error updating inquiry");
        }
    };


    const updateOrderStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, config);
            setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
        } catch (err) {
            alert('Error updating order');
        }
    };

    const toggleUserStatus = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.put(`http://localhost:5000/api/auth/users/${id}/toggle`, {}, config);
            setUsers(users.map(u => u._id === id ? data : u));
        } catch (err) {
            alert(err.response?.data?.message || 'Error toggling user status');
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this user?')) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`http://localhost:5000/api/auth/users/${id}`, config);
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting user');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="admin-overview">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Products</h3>
                                <p className="stat-value">{products.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Pending Inquiries</h3>
                                <p className="stat-value">{inquiries.filter(i => i.status === 'pending').length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Active Orders</h3>
                                <p className="stat-value">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'products':
                return (
                    <div className="admin-section">
                        <h2>Manage Products</h2>
                        <div className="admin-actions">
                            <button className="primary-btn" onClick={() => openModal()}>Add New Product</button>
                        </div>
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id}>
                                            <td>{p.name}</td>
                                            <td>{p.category}</td>
                                            <td>${p.price}</td>
                                            <td>
                                                <button className="edit-btn" onClick={() => openModal(p)}>Edit</button>
                                                <button className="del-btn" onClick={() => deleteProduct(p._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>{editMode ? 'Edit Product' : 'Add New Product'}</h3>
                                    <form onSubmit={handleProductSubmit}>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Product Name</label>
                                                <input value={currentProduct.name} onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <input value={currentProduct.category} onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Price ($)</label>
                                                <input type="number" value={currentProduct.price} onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Image URL</label>
                                                <input value={currentProduct.image} onChange={e => setCurrentProduct({ ...currentProduct, image: e.target.value })} required />
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="view-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                            <button type="submit" className="primary-btn">{editMode ? 'Save Changes' : 'Add Product'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'inquiries':
                return (
                    <div className="admin-section">
                        <h2>Client Inquiries</h2>
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Client</th>
                                        <th>Service</th>
                                        <th>Message</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(inquiries) && inquiries.length > 0 ? (
                                        inquiries.map(i => (
                                            <tr key={i._id}>
                                                <td>{i.name}<br/><small style={{color: 'gray'}}>{i.email}</small></td>
                                                <td>{i.serviceType}</td>
                                                <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={i.message}>{i.message}</td>
                                                <td>{new Date(i.createdAt).toLocaleDateString()}</td>

                                                {/* STATUS DISPLAY */}
                                                <td>
                                                    <span className={`status-pill ${i.status.replace(' ', '-')}`}>
                                                        {i.status
                                                            .split(" ")
                                                            .map(w => w[0].toUpperCase() + w.slice(1))
                                                            .join(" ")
                                                        }
                                                    </span>
                                                </td>

                                                {/* STATUS UPDATE */}
                                                <td>
                                                    <select
                                                        className="status-select"
                                                        value={i.status}
                                                        onChange={(e) => updateInquiryStatus(i._id, e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="in progress">In Progress</option>
                                                        <option value="resolved">Resolved</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                                No inquiries found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'orders':
                return (
                    <div className="admin-section">
                        <h2>Order & Shipments</h2>
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Client</th>
                                        <th>Status</th>
                                        <th>Tracking ID</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(Array.isArray(orders) ? orders : orders.orders || []).map(o => (
                                        <tr key={o._id}>
                                            <td>{o._id.substring(0, 8)}...</td>
                                            <td>{o.clientName}</td>
                                            <td>
                                                <span className={`status-pill ${o.status.toLowerCase()}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td>{o.trackingId}</td>
                                            <td>
                                                <select
                                                    className="status-select"
                                                    value={o.status}
                                                    onChange={(e) =>
                                                        updateOrderStatus(o._id, e.target.value)
                                                    }
                                                >
                                                    <option>Processing</option>
                                                    <option>Shipped</option>
                                                    <option>Delivered</option>
                                                    <option>Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'users':
                return (
                    <div className="admin-section">
                        <h2>User Management</h2>
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u._id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>{u.role}</td>
                                            <td>
                                                <span className={`status-pill ${u.isActive ? 'active' : 'blocked'}`}>
                                                    {u.isActive ? 'Active' : 'Blocked'}
                                                </span>
                                            </td>
                                            <td style={{ display: 'flex', gap: '8px' }}>
                                                {u.role !== 'admin' && (
                                                    <button
                                                        className={u.isActive ? 'del-btn' : 'view-btn'}
                                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                                                        onClick={() => toggleUserStatus(u._id)}
                                                    >
                                                        {u.isActive ? 'Block' : 'Unblock'}
                                                    </button>
                                                )}
                                                <button
                                                    className="del-btn"
                                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: '#dc2626' }}
                                                    onClick={() => deleteUser(u._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'documents':
                return (
                    <div className="admin-section">
                        <h2>Trade Documents Repository</h2>
                        <DocumentsGallery />
                    </div>
                );
            default:
                return <div>Dashboard Overview</div>;
        }
    };

    return (
        <div className="admin-portal">
            <aside className="admin-sidebar">
                <div className="sidebar-logo">TRADE <span className="gradient-text">PORTAL</span></div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
                    <button className={activeTab === 'inquiries' ? 'active' : ''} onClick={() => setActiveTab('inquiries')}>Inquiries</button>
                    <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
                    <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</button>
                    <button className={activeTab === 'documents' ? 'active' : ''} onClick={() => setActiveTab('documents')}>Documents</button>
                </nav>
            </aside>
            <main className="admin-main">
                {renderContent()}
            </main>
        </div>
    );
};

export default Admin; 