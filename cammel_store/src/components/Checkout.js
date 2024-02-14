import React from 'react';
// Import CSS Module
import styles from '../styles/Checkout.module.css';

const Checkout = () => {
  // Example function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Processing form data here
    alert('Checkout form submitted');
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.checkoutTitle}>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <label htmlFor="name" className={styles.label}>Name:</label>
          <input type="text" id="name" name="name" required className={styles.input} />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="address" className={styles.label}>Address:</label>
          <input type="text" id="address" name="address" required className={styles.input} />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input type="email" id="email" name="email" required className={styles.input} />
        </div>
        {/* Add additional fields as needed */}
        <button type="submit" className={styles.orderButton}>Place Order</button>
      </form>
      <div className={styles.orderSummary}>
        <h3 className={styles.summaryTitle}>Order Summary</h3>
        {/* Dynamically list cart items here */}
        <p>Total: {/* Calculate total */}</p>
      </div>
    </div>
  );
};

export default Checkout;
