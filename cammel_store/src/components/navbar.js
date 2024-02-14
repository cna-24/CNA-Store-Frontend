import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css';

const Navbar = () => {
  return (
      <nav className="navbar">
          <div className="navbar-container">
              <Link to="/" className="navbar-logo">
                  Camel Store
              </Link>
              <div className="search-bar">
                  <input type="text" placeholder="Search..." />
                  <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
              </div>
              <ul className="navbar-menu">
                  <li className="navbar-item">
                      <Link to="/login" className="navbar-links">
                          <FontAwesomeIcon icon={faUser} /> Login
                      </Link>
                  </li>
                  <li className="navbar-item">
                      <Link to="/store" className="navbar-links">Store</Link>
                  </li>
                  <li className="navbar-item">
                      <Link to="/cart" className="navbar-links">
                          <FontAwesomeIcon icon={faShoppingCart} /> Cart
                      </Link>
                  </li>
              </ul>
          </div>
      </nav>
  );
};

export default Navbar;
