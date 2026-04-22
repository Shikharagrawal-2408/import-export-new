import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2>GlobalTrade</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/shipment">Shipment Tracker</Link>
        <Link to="/documents">Documents Gallery</Link>
      </div>
    </div>
  );
}

export default Navbar;
