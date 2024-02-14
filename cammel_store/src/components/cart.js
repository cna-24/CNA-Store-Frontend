// Import React and other necessary dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import CSS Module
import styles from '../styles/Cart.module.css';

// Example cart items
const cartItems = [
  { id: 1, name: 'Product 1', price: 10, quantity: 2 },
  { id: 2, name: 'Product 2', price: 20, quantity: 1 },
  // Add more items as needed
];

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to calculate the total price
  const calculateTotal = (items) => items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle "Checkout" button click
  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the Checkout page
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Your Cart</h2>
      <ul className={styles.cartList}>
        {cartItems.map(item => (
          <li key={item.id} className={styles.cartItem}>
            {item.name} - ${item.price} x {item.quantity}
            {/* Implement functionality to change quantity or remove items */}
          </li>
        ))}
      </ul>
      <p className={styles.total}>Total: ${calculateTotal(cartItems)}</p>
      <button onClick={handleCheckout} className={styles.checkoutButton}>Checkout</button>
    </div>
  );
};

export default Cart;
