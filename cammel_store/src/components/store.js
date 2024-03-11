import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useSearch } from './SearchContext'; // Make sure this path matches where you've placed your SearchContext
import '../styles/store.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Store = () => {
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();
  const [camels, setCamels] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PRODUCT_API}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        setCamels(data);
      })
      .catch(() => {
        console.log('Error fetching data');
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
    let productName = camel.name;
    if (productName.length > 16) productName = productName.substring(0, 16);

    const [modalOpen, setModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
      loadImage(camel.product_id).then(setImageSrc);
    }, [camel.product_id]);

    const handleAddToCart = () => {
      const itemToAdd = {
        id: camel.id,
        name: productName,
        price: camel.price,
        quantity: 1
      };
      addToCart(itemToAdd);
    };

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    return (
      <>
        <div className="camel-card" onClick={openModal}>
          <img src={imageSrc} alt={camel.name} />
          <h2>{productName}</h2>
          <p>{camel.description}</p>
          {camel.quantity > 0 ? (
            <div className='price'>
              <h3>Price: {camel.price}€</h3>
              <button onClick={handleAddToCart} id='cartButton'><FontAwesomeIcon icon={faShoppingCart}/></button>
            </div>
          ) : (
            <h3 className='stock'>Out of stock!</h3>
          )}
        </div>

        {/* Open product bigger in a modal when clicked*/}
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <div className='modal-product-content'>
                <img src={imageSrc} alt={camel.name} />
                <div className='modal-text'>
                  <h2>{camel.name}</h2>
                  <p>{camel.description}</p>
                  {camel.quantity > 0 ? (
                    <div className='modal-price'>
                      <h3>Price: {camel.price}€</h3>
                      <button onClick={() => handleAddToCart(camel)} id='modalCartButton'><FontAwesomeIcon icon={faShoppingCart}/></button>
                    </div>
                  ) : (
                    <h3 className='modalStock'>Out of stock!</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

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
      } else {
        return 0;
      }
    });
    setCamels(sortedCamels);
  };

  const filteredCamels = camels.filter(camel => camel.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
          {filteredCamels.map((camel, index) => (
            <CamelComponent key={index} camel={camel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
