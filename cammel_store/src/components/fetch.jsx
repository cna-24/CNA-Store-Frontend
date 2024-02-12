import { useState, useEffect } from 'react';

//fetch data from pruduct API
const Fetch = () => {
  const [camels, setPhotos] = useState([]);
  useEffect(() => {
    fetch('https://cna-product-service.vercel.app/products')    //https://cna-product-service.vercel.app/products/getAllProducts
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPhotos(data);
      });
  }, []);
  return (
    <div>
      {camels.map((camel) => (
        <img key={camel.id} src={camel.url} alt={camel.title} width={100} /> // ToDo: fix key, src and alt!
      ))}
    </div>
  );
};

export default Fetch;