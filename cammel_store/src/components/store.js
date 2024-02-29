import React from 'react';
import FetchCamels from './fetchCamels';
import '../styles/store.css';

const Store = () => {
  const camels = FetchCamels();

  const CamelComponent = ({ camel }) => {
    var productName = camel.title;
    if(productName.length > 16) productName = productName.substring(0, 16);

    return (
      <div className="camel-card">
        <h2>{productName}</h2>
        <img src = {camel.url} alt = "Color"></img>
        <h3>Price: {camel.price}</h3>
        <p>Age: {camel.age}</p>
        <p>id: {camel.id}</p>

        <button>Buy Now</button>
        <button>Add to cart</button>
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