import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  console.log(cartItems, setCartItems);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VybmFtZTEyMyIsImFkbWluIjpmYWxzZX0.-eHTvpVcB3jft1rB1aPmGD0I1pWengh3-junesfhCZ8'; // Replace with actual token retrieval logic

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };
  const handleRemoveFromCart = (productId) => {
    // Optimistically remove the item from the UI by updating the local state
    setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
  
    // Then, attempt to delete the item from the server
    fetch(`${process.env.REACT_APP_CART_SERVICE_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use actual token retrieval logic
      },
    })
    .then(response => {
      if (!response.ok) {
        // If server responds with an error, you could choose to handle it here
        // E.g., by showing an error message to the user or logging the error
        console.error('Failed to delete product from cart');
        // Optionally, you might want to revert the optimistic update here
        // by re-fetching the cart items from the server or undoing the deletion in the local state
      } else {
        console.log("Product removed from cart database");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any network errors or other exceptions
    });
  };
  
  const handleUpdateQuantity = async (productId, quantity) => {
    const product = cartItems.find(item => item.id === productId);
    if (!product) {
      return;
    }
  
    try {
      const requestData = {
        product: product.id, 
        quantity: quantity,
        price: product.price 
      };
  
      const response = await fetch(`${process.env.REACT_APP_CART_SERVICE_URL}/cart/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Adjust based on the required format
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }
  
      // Assuming you want to update the local state after successful response
      setCartItems(currentItems => currentItems.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      ));
      console.log("Quantity updated for product ID:", productId);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul className={styles.cartList}>
          {cartItems.map(item => (
            <li key={item.id} className={styles.cartItem}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)} className={styles.removeButton}>
            Remove
            </button>
            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className={styles.quantityButton}>
            Increase Quantity
            </button>
            </li>
            ))}
            </ul>
            ) : (
            <p>Your cart is empty.</p>
            )}
            <p className={styles.total}>Total: ${calculateTotal()}</p>
            <button onClick={handleProceedToCheckout} className={styles.checkoutButton}>
            Proceed to Checkout
            </button>
            </div>
            );
            };
            
            export default Cart;
