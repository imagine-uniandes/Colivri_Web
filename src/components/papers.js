import React, { useState, useEffect } from 'react';
import '../styles/papers.css';
import { Link } from 'react-router-dom';

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  

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

  const renderMemberNames = (integrantes) => {
    if (!integrantes) return null;
  
    const authorNames = integrantes.map((integrante) => {
      const person = people[integrante];
      if (!person) {
        console.warn(`No se encontró a la persona con el identificador "${integrante}" en los datos de las personas.`);
        return null;
      }
      return person.display_name;
    });
  
    return authorNames.join(', ');
  };

  const renderCards = () => {
    return papers.map((paper, index) => (
      <div className="col-lg-12 col-md-12 mb-12" key={index}>
        <div className="card mw-100">
          <div className="card-contentt d-flex flex-sm-column flex-column flex-md-row">
            <div className="col-md-11 col-12">
              <div className="card-bodyy">
                <div className="bottom-cta d-flex justify-content-between">
                  <p className="card-date">{paper.fecha}</p>
                  <p className="card-authors">{renderMemberNames(paper.autores)}</p>
                </div>
                <h5 className="card-titlee">{paper.nombre}</h5>
                <p className="card-textt">{paper.descripcion}</p>
                <div className="bottom-cta d-flex justify-content-between">
                  <div className="d-flex">
                    <p className="card-research">{paper.researchArea}</p>
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
