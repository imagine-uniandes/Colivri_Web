import React, { useState, useEffect } from 'react';
import '../styles/papers.css';

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true);  
  const [filters, setFilters] = useState({
    researchArea: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  let filteredPapers = papers;
  filteredPapers = filteredPapers.filter(paper => {
    return (
      (filters.researchArea === '' || paper.researchArea === filters.researchArea) &&
      ((paper.nombre && paper.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (paper.descripcion && paper.descripcion.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

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
    return filteredPapers.map((paper, index) => (
      <div className="col-lg-12 col-md-12 mb-12" key={index}>
        <div className="card mw-100">
          <div className="card-contentt d-flex flex-sm-column flex-column flex-md-row">
            <div className="col-md-11 col-12">
              <div className="card-bodyy">
                <div className="d-flex justify-content-between">
                  <p className="card-date">{paper.fecha}</p>
                  <p className="card-authors">{renderMemberNames(paper.autores)}</p>
                </div>
                <h5 className="card-titlee">{paper.nombre}</h5>
                <p className="card-textt">{paper.descripcion}</p>
                <div className="card-end d-flex justify-content-between">
                  <div className="d-flex">
                    <p className="card-research text-grey">Category: {paper.researchArea}</p>
                  </div>
                  <a href={paper.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Leer más
                  </a>
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
      <div className="filters">
        <select value={filters.researchArea} onChange={e => handleFilterChange('researchArea', e.target.value)}>
          <option value="">Todas las áreas de investigación</option>
          <option value="Human Computer Interaction">Human Computer Interaction</option>
          <option value="Image Processing">Image Processing</option>
          <option value="Mixed Realities">Mixed Realities</option>
          <option value="Robotics">Robotics</option>
          <option value="Visual Analytics">Visual Analytics</option>
          <option value="Video Games">Video Games</option>
        </select>
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="row d-flex align-items-stretch">
        {renderCards()}
      </div>
    </div>
  );
};

export default Papers;
