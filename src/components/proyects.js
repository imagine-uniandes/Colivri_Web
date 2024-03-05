import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import data from '../data/proyects.json';
import '../styles/proyects.css';
import { DEFAULT_IMAGE } from '../constants';


const Proyectos = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(data);
  }, []);

  const renderMemberImages = (integrantes) => {
    const breakpoints = {
      mobileSmall: 320,
      mobileMedium: 576,
      tablet: 768,
      desktopMedium: 1023,
      desktopLarge: 1401,
    };

    const maxImagesToShow = {
      mobileSmall: 3,
      mobileMedium: 3,
      tablet: 3,
      desktopMedium: 3,
      desktopLarge: 4,
    };

    const windowWidth = window.innerWidth;
    let category = 'desktopLarge';

    if (windowWidth < breakpoints.mobileMedium) {
      category = 'mobileSmall';
    } else if (windowWidth < breakpoints.tablet) {
      category = 'mobileMedium';
    } else if (windowWidth < breakpoints.desktopMedium) {
      category = 'tablet';
    } else if (windowWidth < breakpoints.desktopLarge) {
      category = 'desktopMedium';
    }

    const maxToShow = maxImagesToShow[category];

    return integrantes.slice(0, maxToShow).map((integrante, i) => (
      <img 
        key={i}
        src={integrante.fotoIntegrante ? require(`../assets/integrantes/${integrante.fotoIntegrante}`) : require('../assets/default.png')}
        className="rounded-circle mr-2 member"
        alt={`Integrante ${integrante.nombre}`}
        style={{ width: '50px', height: '50px' }}
      />
    ));
  };

  const renderCards = () => {
    return projects.map((project, index) => (
      <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={index}>
        <div className="card h-100 mw-100">
          {project.foto && (
            <img
              src={require(`../assets/proyectos/${project.foto}`)}
              className="card-img-top"
              alt={`Imagen ${project.nombreProyecto}`}
            />
          )}
          {!project.foto && (
            <img
              src={DEFAULT_IMAGE}
              className="card-img-top"
              alt={`Imagen ${project.nombreProyecto}`}
            />
          )}
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
