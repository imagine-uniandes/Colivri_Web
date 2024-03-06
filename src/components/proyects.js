import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import data from '../data/proyects.json';
import '../styles/proyects.css';
import { DEFAULT_PROJECT_IMAGE, DEFAULT_PERSON_IMAGE } from '../constants';

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

const Proyectos = () => {
  const [projects, setProjects] = useState([]);
  
  const windowWidth = useWindowSize(); // Usamos el hook personalizado aquí

  useEffect(() => {
    setProjects(data);
  }, []);

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

    return integrantes.slice(0, maxToShow).map((integrante, i) => (
      <img
        key={i}
        src={integrante.fotoIntegrante ? require(`../assets/integrantes/${integrante.fotoIntegrante}`) : DEFAULT_PERSON_IMAGE}
        className="rounded-circle mr-2 member"
        alt={`Integrante ${integrante.nombre}`}
        title={`${integrante.nombre}`}
        style={{ width: '50px', height: '50px', marginRight: '5px' }}
      />
    ));
  };

  const renderCards = () => {
    return projects.map((project, index) => (
      <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={index}>
        <div className="card h-100 mw-100">
          <Link to={`/proyectos/${project.id}`}>
            {project.foto && (
              <img
                src={require(`../assets/proyectos/${project.foto}`)}
                className="card-img-top"
                alt={`Imagen ${project.nombreProyecto}`}
              />
            )}
            {!project.foto && (
              <img
                src={DEFAULT_PROJECT_IMAGE}
                className="card-img-top"
                alt={`Imagen ${project.nombreProyecto}`}
              />
            )}
          </Link>
          <div className="card-body">
            <h5 className="card-title">{project.nombreProyecto}</h5>
            <p className="card-research">{project.researchArea}</p>
            <p className="card-text">{project.descripcion}</p>
            <div className="bottom-cta d-flex justify-content-between">
              <div className="d-flex">
                {renderMemberImages(project.integrantes)}
              </div>
              <Link to={`/proyectos/${project.id}`} className="btn btn-primary">
                Ver más
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="proyectos container">
      <h1>Proyectos</h1>
      <div className="row">
        {renderCards()}
      </div>
    </div>
  );
};

export default Proyectos;
