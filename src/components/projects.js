import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/projects.css';
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

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    researchArea: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const windowWidth = useWindowSize();

  useEffect(() => {
    Promise.all([
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/projects.json')
        .then(response => response.json()),
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/people.json')
        .then(response => response.json())
    ]).then(([projectData, peopleData]) => {
      setProjects(projectData);
      setPeople(peopleData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };


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
    let filteredProjects = projects;
    filteredProjects = filteredProjects.filter(project => {
      return (
        (filters.researchArea === '' || project.researchArea === filters.researchArea) &&
        ((project.nombreProyecto && project.nombreProyecto.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.descripcion && project.descripcion.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    });

    return filteredProjects.map((project, index) => (
      <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={index}>
        <div className="card h-100 mw-100">
          <Link to={`/proyectos/${project.id}`}>
            {project.foto && (
              <img
                src={`https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/projects/${project.foto}`}
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
              <Link to={`/proyectos/${project.id}`} className="btn btn-primary">Ver más</Link>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="proyectos container">
      <h1>Proyectos</h1>
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
          placeholder=" Buscar proyectos..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="row">
        {renderCards()}
      </div>
    </div>
  );
};

export default Projects;