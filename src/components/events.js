import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import data from '../data/events.json';
import '../styles/events.css';

const CarouselWithCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(data);
  }, []);

  // Filtrar las primeras tres tarjetas para mostrar solo una fila de tres tarjetas
  const firstThreeCards = cards.slice(0, 3);

  return (
    <div className='events container'>
      <h2>Noticias y Eventos</h2>
      <Carousel interval={5000}>
        <Carousel.Item>
          <div className="row">
            {firstThreeCards.map((card, index) => (
              <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={index}>
                <div className="card h-100 mw-100">
                  <img
                    src={require(`../assets/imgs/${card.image}`)}
                    className="card-img-top"
                    alt={`Imagen ${card.id}`}
                  />        
                  <div className="card-bodyyy">
                    <h5 className="card-titleee">{card.title}</h5>
                    <p className="card-texttt" style={{ textAlign: 'left' }}>{card.text}</p>
                    <div>
                      <a href='/' className="btn btn-primary">
                        Ver más
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselWithCards;