import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/CheckAuth';
import { CartProvider } from './components/CartContext'; // Import CartProvider
import Store from './components/store';
import Checkout from './components/Checkout';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Cart from './components/cart';
import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
      <CartProvider> {}
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/store" element={<Store />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
