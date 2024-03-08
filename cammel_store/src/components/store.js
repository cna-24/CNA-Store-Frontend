import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import '../styles/store.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Store = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VybmFtZTEyMyIsImFkbWluIjpmYWxzZX0.-eHTvpVcB3jft1rB1aPmGD0I1pWengh3-junesfhCZ8'; // Replace with actual token retrieval logic

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PRODUCT_API}/products`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setProducts)
      .catch(error => console.error('Error:', error));
  }, []);

  const handleAddToCart = product => {
    fetch(`${process.env.REACT_APP_CART_SERVICE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Authorization header
      },
      body: JSON.stringify({
        
        product: product.id, // Use the unique identifier for the product
        quantity: 1,
        price: product.price,
      }),
    })
    .then(response => {
      if (response.status === 201) {
        return response.json(); // Parse the JSON response body
      } else {
        throw new Error('Product not added to cart');
      }
    })
    .then(data => {
        addToCart(product); // Update the local cart context
        console.log("Product added to cart:", data); // Log the data from the response
    })
    .catch(error => console.error('Error:', error));
};


  return (
    <div className="products-container">
      {/* ...your sorting and other components here */}
      <div className="card-box">
        {products.map(product => (
          <div key={product.id} className="product-card">
            {/* ...product image and details */}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>Price: {product.price}€</h3>
            <button onClick={() => handleAddToCart(product)} className="cart-button">
              <FontAwesomeIcon icon={faShoppingCart}/> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
