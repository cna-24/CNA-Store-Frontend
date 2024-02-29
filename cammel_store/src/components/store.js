import React from 'react';
import FetchCamels from './fetchCamels';
import { useCart } from './CartContext'; 
import '../styles/store.css';

const Store = () => {
  const camels = FetchCamels();
  const { addToCart } = useCart(); 

  const CamelComponent = ({ camel }) => {
    var productName = camel.title;
    if (productName.length > 16) productName = productName.substring(0, 16);

    
    const handleAddToCart = () => {
      const itemToAdd = {
        id: camel.id, // Ensure camel has a unique ID
        name: productName,
        price: 20, 
        quantity: 1 
      };
      addToCart(itemToAdd);
    };

    return (
      <div className="camel-card">
        <h2>{productName}</h2>
        <img src={camel.url} alt="Camel"></img>
        <h3>Price: $20</h3> {/* Adjust the price display as needed */}
        <p>Age: {camel.age}</p>
        <p>ID: {camel.id}</p>

        {}
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
    );
  };

  return (
    <div className='products-container'>
      {camels.map((camel, index) => (
        <CamelComponent key={index} camel={camel} />
      ))}
    </div>
  );
};

export default Store;
