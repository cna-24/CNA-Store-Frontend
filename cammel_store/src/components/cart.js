import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Adjust the path as necessary
import styles from '../styles/Cart.module.css'; // Ensure this path matches your CSS module for the Cart

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { cartItems, removeFromCart } = useCart(); // Access cart items and removeFromCart function from CartContext

  // Function to calculate the total price of cart items
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Function to handle "Proceed to Checkout" button click
  const handleProceedToCheckout = () => {
    navigate('/checkout'); // Navigate to the Checkout page
  };

  // Function to handle removing items from the cart
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul className={styles.cartList}>
          {cartItems.map(item => (
            <li key={item.id} className={styles.cartItem}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => handleRemoveFromCart(item.id)} className={styles.removeButton}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <p className={styles.total}>Total: ${calculateTotal()}</p>
      <button onClick={handleProceedToCheckout} className={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;

