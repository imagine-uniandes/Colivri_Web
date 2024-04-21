import React, { useState, useEffect } from 'react';
import '../styles/papers.css';
import { Link } from 'react-router-dom';
import {DEFAULT_PERSON_IMAGE } from '../constants';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  const windowWidth = useWindowSize();

  useEffect(() => {
    Promise.all([
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/papers.json')
        .then(response => response.json()),
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/people.json')
        .then(response => response.json())
    ]).then(([paperData, peopleData]) => {
      setPapers(paperData);
      setPeople(peopleData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }


  const renderMemberImages = (integrantes) => {
    if (!integrantes) return null; // Agregar esta línea para verificar si integrantes es undefined
  
    const breakpoints = {
      mobileSmall: 400,
      mobileMedium: 576,
      tablet: 768,
      desktopMedium: 1199,
      desktopLarge: 1200,
    };
  
    const maxImagesToShow = {
      xs: 2,
      mobileSmall: 4,
      mobileMedium: 2,
      tablet: 3,
      desktopMedium: 3,
      desktopLarge: 4,
    };
  
    let category = '';
    if (windowWidth < breakpoints.mobileSmall) {
      category = 'xs';
    } else if (windowWidth < breakpoints.mobileMedium) {
      category = 'mobileSmall';
    } else if (windowWidth < breakpoints.tablet) {
      category = 'mobileMedium';
    } else if (windowWidth < breakpoints.desktopMedium) {
      category = 'tablet';
    } else if (windowWidth < breakpoints.desktopLarge) {
      category = 'desktopMedium';
    } else {
      category = 'desktopLarge'
    }
  
    const maxToShow = maxImagesToShow[category];
  
    return integrantes.slice(0, maxToShow).map((integrante, i) => {
      const person = people[integrante];
      if (!person) {
        console.warn(`No se encontró a la persona con el identificador "${integrante}" en los datos de las personas.`);
        return null;
      }
      const isUrl = person.image && (person.image.startsWith('http://') || person.image.startsWith('https://'));
      const imageSrc = person.image
        ? (isUrl ? person.image : `https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/people/${person.image}`)
        : DEFAULT_PERSON_IMAGE;
      const imageElement = (
        <img
          src={imageSrc}
          className="rounded-circle mr-2 member"
          alt={`Integrante ${person.display_name}`}
          title={`${person.display_name}`}
          style={{ width: '50px', height: '50px', marginRight: '5px' }}
        />
      );
  
      return person.webpage ? (
        <a href={person.webpage} key={i} target='_blank' rel="noopener noreferrer">
          {imageElement}
        </a>
      ) : (
        <div key={i}>
          {imageElement}
        </div>
      );
    });
  };

  const renderCards = () => {
    return papers.map((paper, index) => (
      <div className="col-lg-12 col-md-12 mb-12" key={index}>
        <div className="card mw-100">
          <div className="card-content d-flex flex-sm-column flex-column flex-md-row">
            <div className="col-md-8 col-12">
              <div className="card-body">
                <div className="bottom-cta d-flex justify-content-between">
                  <p className="card-date">{paper.fecha}</p>
                </div>
                <h5 className="card-title">{paper.nombre}</h5>
                <p className="card-text">{paper.descripcion}</p>
                <p className="card-research">{paper.researchArea}</p>
                <div className="bottom-cta d-flex justify-content-between">
                  <div className="d-flex">
                    {renderMemberImages(paper.autores)}
                  </div>
                  <Link to={`/papers/${paper.id}`} className="btn btn-primary">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="papers container">
      <h1>Papers</h1>
      <div className="row d-flex align-items-stretch">
        {renderCards()}
      </div>
    </div>
  );
};

export default Papers;
