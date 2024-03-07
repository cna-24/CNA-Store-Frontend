import React from 'react';
//import FetchCamels from './fetchCamels';
import { useCart } from './CartContext'; 
import '../styles/store.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const Store = () => {
  const { addToCart } = useCart();
  const [camels, setCamels] = useState([]);

  // Fetch products from API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_PRODUCT_API}/products`)    //fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        setCamels(data);  //REMOVE SLICE WHEN USING REAL API!!!
      })
      .catch(() => {  //error
        console.log('Error')  // ,error
      });
  }, []);

  const loadImage = async (productId) => {
    try {
      const { default: camelImageSrc } = await import(`../camelImages/${productId}.jpg`);
      return camelImageSrc;
    } catch (error) {
      console.error('Error loading image:', error);
      return '';
    }
  };


  const CamelComponent = ({ camel }) => {
    var productName = camel.name  //To use with correct API: camel.name;
    if (productName.length > 16) productName = productName.substring(0, 16);


    const [imageSrc, setImageSrc] = React.useState('');

    React.useEffect(() => {
        loadImage(camel.product_id).then(setImageSrc);
    }, [camel.product_id]);

    const handleAddToCart = () => {
      const itemToAdd = {
        id: camel.id, // Ensure camel has a unique ID
        name: productName,
        price: camel.price, 
        quantity: 1 
      };
      addToCart(itemToAdd);
    }

    return (
      <div className="camel-card">
        <img src={imageSrc} alt="Camel"></img>
        <h2>{productName}</h2>
        <p>{camel.description}</p>

        {camel.quantity > 0 ? (
          //If 'camel.quantity' is higher than 0, show the price of the camel
          <div className='price'>
            <h3>Price: {camel.price}€</h3>
            <button onClick={handleAddToCart} id='cartButton'><FontAwesomeIcon icon={faShoppingCart}/></button>
          </div>
        ): (
          <h3 className='stock'>Out of stock!</h3>  //Else if camel is out of stock
        )}

      </div>
    );
  };

  // Funktion for sorting the products on the site
  const handleSort = (criteria) => {
    const sortedCamels = [...camels].sort((a, b) => {
      if (criteria === 'price-up') {
        return a.price - b.price;
      } 
      if (criteria === 'price-down') {
        return b.price - a.price;
      }
      if (criteria === 'name') {
        return a.name.localeCompare(b.name);
      }
    });
    setCamels(sortedCamels);
  };

  //<label id='sort-label'> Sort by
  return (
    <div className='full-page'>
      <div className='banner'>
        <h1 id='banner-text'>Modern Camels</h1>
        <h2 id='selling-text'>Selling the wolds finest camels!</h2>
      </div>
      
      <div className='products-container'>
        <div className='sort-options'>
          <select onChange={(e) => handleSort(e.target.value)} id='sort-select'>
            <option value="price-up">Price ascending</option>
            <option value="price-down">Price descending</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        <div className='card-box'>
          {camels.map((camel, index) => (
            <CamelComponent key={index} camel={camel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
