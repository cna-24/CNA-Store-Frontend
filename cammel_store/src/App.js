import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/CheckAuth';
import Store from './components/store';
import Checkout from './components/Checkout';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Cart from './components/cart';
import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
