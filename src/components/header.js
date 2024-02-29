import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import slide from '../assets/imgs/slider.png';

const Header = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="header"> 
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide}
            alt="Third slide"
          />
        </Carousel.Item>
    </Carousel>
    </div>
    
  );
};

export default Header;