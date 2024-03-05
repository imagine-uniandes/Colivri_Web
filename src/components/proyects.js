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
                {/* #TODO Renderizar solo i imagenes de los integrantes:
                - mobile <320px: 3
                - mobile >576px: 2
                - tablet >768px: 4
                - desktop >1024px: 3
                - desktop >1200px: 4
                Al superar el limite de imagenes, quitar una imagen y mostrar un icono de +n-i+1
                */}
                {project.integrantes.map((integrante, i) => (
                  <img 
                    key={i}
                    src={integrante.fotoIntegrante ? require(`../assets/integrantes/${integrante.fotoIntegrante}`) : require('../assets/default.png')}
                    className="rounded-circle mr-2 member"
                    alt={`Integrante ${integrante.nombre}`}
                    style={{ width: '50px', height: '50px' }}
                  />
                ))}
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
