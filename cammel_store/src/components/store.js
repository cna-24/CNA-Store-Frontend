import React from 'react';
import FetchCamels from './fetchCamels';
import { useCart } from './CartContext'; 
import '../styles/store.css';

const Store = () => {
  const camels = FetchCamels();
  const { addToCart } = useCart(); 

  const CamelComponent = ({ camel }) => {
    var productName = camel.name;
    //if (productName.length > 16) productName = productName.substring(0, 16);

    
    const handleAddToCart = () => {
      const itemToAdd = {
        id: camel.id, // Ensure camel has a unique ID
        name: productName,
        price: camel.price, 
        quantity: 1 
      };
      addToCart(itemToAdd);
    };

    return (
      <div className="camel-card">
        <img src={camel.url} alt="no picture available"></img>
        <h2>{camel.name}</h2>
        <p>{camel.description}</p>
        <p>ID: {camel.id}</p>
        <h3>Price: {camel.price}</h3>

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
