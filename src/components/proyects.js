import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import data from '../data/proyects.json';
import '../styles/proyects.css';

const Proyectos = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(data);
  }, []);

  const renderCards = () => {
    return projects.map((project, index) => (
      <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={index}>
        <div className="card h-100 mw-100">
          <img
            src={require(`../assets/proyectos/${project.foto}`)}
            className="card-img-top"
            alt={`Imagen ${project.nombreProyecto}`}
          />
          <div className="card-body">
            <h5 className="card-title">{project.nombreProyecto}</h5>
            <p className="card-text">{project.descripcion}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                {project.integrantes.map((integrante, i) => (
                  <img
                    key={i}
                    src={require(`../assets/integrantes/${integrante.fotoIntegrante}`)}
                    className="rounded-circle mr-2"
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
      <h2>Proyectos</h2>
      <div className="row">
        {renderCards()}
      </div>
    </div>
  );
};

export default Proyectos;
