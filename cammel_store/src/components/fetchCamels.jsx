import { useState, useEffect } from 'react';

//fetch data from product API
const FetchCamels = () => {
  const [camels, setPhotos] = useState([]);
  useEffect(() => {
    fetch('https://cna-product-service-h5dyeke7z-antondoeps-projects.vercel.app/api/products/getAllProducts')
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

export default FetchCamels;