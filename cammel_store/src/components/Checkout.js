import React from 'react';
import { useCart } from './CartContext'; // Adjust the path as necessary
import styles from '../styles/Checkout.module.css';

const Checkout = () => {
  const { cartItems } = useCart(); // Access cart items

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Checkout form submitted');
    
  };

  // Function to calculate the total price of cart items
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.checkoutTitle}>Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields remain unchanged */}
      </form>
      <div className={styles.orderSummary}>
        <h3 className={styles.summaryTitle}>Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={index}>
            {item.name} - ${item.price} x {item.quantity}
          </div>
        ))}
        <p>Total: ${calculateTotal()}</p>
      </div>
    </div>
  );
};

export default Checkout;
