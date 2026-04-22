import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <nav className="main-navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src="/import.jpeg" alt="Trade Portal Logo" />
                    <span className="logo-text">
                        TRADE<span className="accent">PORTAL</span>
                    </span>
                </Link>
            </div>

            <div className="nav-links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
                <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Operations</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Inquiry</Link>
            </div>

            <div className="nav-actions">
                {user ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="admin-toggle">
                            {user.role === 'admin' ? '⚙️ Admin' : '👤 Dashboard'}
                        </Link>
                        <button onClick={logout} className="logout-btn">Logout</button>
                    </div>
                ) : (
                    location.pathname !== '/login' && (
                        <Link to="/login" className="admin-toggle">Login</Link>
                    )
                )}
            </div>
        </nav>
    );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />

          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />

              {/* Protected Client Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute role="user">
                  <Dashboard />
                </ProtectedRoute>
              } />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <Admin />
                </ProtectedRoute>
              } />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <footer className="main-footer">
            <div className="footer-content">
              <div className="footer-brand">
                <h3>Trade Portal Ltd.</h3>
                <p>Your technical gateway to global markets.</p>
              </div>
              <div className="footer-legal">
                <span>© 2026 International Trade Consultancy. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
