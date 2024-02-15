import { useState, useEffect } from 'react';
import '../styles/store.css';
import Card from 'react-bootstrap/Card';

//fetch data from product API
const FetchCamels = () => {
  const [camels, setPhotos] = useState([]);
  useEffect(() => {

    // BEHÖVER LOGIN DETAILS TILL VERCEL!!
    //fetch('https://cna-product-service-h5dyeke7z-antondoeps-projects.vercel.app/api/products/getAllProducts')
    
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPhotos(data.slice(0, 8)); // use "setPhotos(data);" with the camels
      });
  }, []);
  return (
    /* Visa kamelerna snyggt på sidan i "cards" */
    <div className='products-container'>
      {
        camels.map((photo) => (
          <img className='product-card' key={photo.id} src={photo.url} alt={photo.title} />
        ))
      }
    </div>
  );
};

export default FetchCamels;