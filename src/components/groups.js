import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/groups.css';
import { DEFAULT_GROUP_IMAGE, DEFAULT_PERSON_IMAGE } from '../constants';

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

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  const windowWidth = useWindowSize();

  useEffect(() => {
    Promise.all([
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/groups.json')
        .then(response => response.json()),
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/people.json')
        .then(response => response.json())
    ]).then(([groupData, peopleData]) => {
      setGroups(groupData);
      setPeople(peopleData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }


  const renderMemberImages = (integrantes) => {
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
    return groups.map((group, index) => (
      <div className="col-lg-12 col-md-12 mb-4" key={index}>
        <div className="card h-100 mw-100 d-flex flex-row align-items-center">
          <Link to={`/proyectos/${group.id}`}>
            <div>
              <div>
                {group.foto && (
                  <img
                    src={`https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/groups/${group.foto}`}
                    className="card-img"
                    alt={`Imagen ${group.nombre}`}
                  />
                )}
                {!group.foto && (
                  <img
                    src={DEFAULT_GROUP_IMAGE}
                    className="card-img"
                    alt={`Imagen ${group.nombre}`}
                  />
                )}
              </div>
            </div>
          </Link>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{group.nombre}</h5>
              <p className="card-research">{group.researchArea}</p>
              <p className="card-text">{group.descripcion}</p>
              <div className="bottom-cta d-flex justify-content-between">
                <div className="d-flex">
                  {renderMemberImages(group.integrantes)}
                </div>
                <Link to={`/proyectos/${group.id}`} className="btn btn-primary">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="grupos container">
      <h1>Grupos</h1>
      <div className="row">
        {renderCards()}
      </div>
    </div>
  );
};

export default Groups;
