import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import slide from '../assets/imgs/slider.png';

import '../styles/mainEvents.css';

const MainEvents = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="mainEvents">
      <h2>Eventos y Noticias</h2>
      <Carousel className="carousel" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src={slide}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src={slide}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src={slide}
            alt="Third slide"
          />
        </Carousel.Item>
    </Carousel>
    </div>
    
  );
};

export default MainEvents;
