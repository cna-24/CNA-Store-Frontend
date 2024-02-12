import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Adjusted import path

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Camel Store
          </Link>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/Login" className="navbar-links">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/store" className="navbar-links">Store</Link>
            </li>
            <li className="navbar-item">
              <Link to="/cart" className="navbar-links">Cart</Link>
            </li>
            {/* Omit direct link to Checkout for better user flow */}
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;