import React, { useState, useEffect } from 'react';
import '../styles/companies.css';

const images = [
  { src: 'unity.png', alt: 'Unity Logo' },
  { src: 'meta.png', alt: 'Meta Logo' },
  { src: '3GoVideo.png', alt: 'Coat of Arms' },
  { src: 'ejercito.png', alt: '360 Video Logo' },
  { src: 'meta.png', alt: 'Coat of Arms' },
  { src: 'unity.png', alt: 'Coat of Arms' },
  { src: 'ejercito.png', alt: 'Coat of Arms' },
  { src: '3GoVideo.png', alt: 'Coat of Arms' }

];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 4) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const imageGroup = images.slice(index, index + 4);

  return (
    <div className="carouselCompanies">
      <h2>Aliados</h2>
      <div className="carousel__images">
        {imageGroup.map((image, i) => (
          <img key={i} src={require(`../assets/imgs/${image.src}`)} alt={image.alt} className="carousel__image" />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
