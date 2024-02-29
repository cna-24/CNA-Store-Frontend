import { useState, useEffect } from 'react';
import '../styles/store.css';

//fetch data from API
const FetchCamels = () => {
  const [camels, setCamels] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PRODUCT_API}/photos`)
      .then((res) => res.json())
      .then((data) => {
        setCamels(data.slice(0, 8));
      })
      .catch((error) => {
        console.error('Error fetching camels:', error);
      });
  }, []);

  // Return the fetched data directly
  return camels;
};

export default FetchCamels;