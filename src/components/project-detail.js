import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../styles/project-detail.css';
import { DEFAULT_PERSON_IMAGE } from '../constants';
import ProjectCard from './ProjectCard';


const ProyectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [randomProjects, setRandomProjects] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/projects.json')
        .then(response => response.json()),
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/people.json')
        .then(response => response.json()),
    ]).then(([projectData, peopleData]) => {
      setProjects(projectData);
      setPeople(peopleData);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const currentProject = projects.find(project => project.id === parseInt(id));
      if (currentProject) {
        const filteredProjects = projects.filter(project => project.researchArea === currentProject.researchArea && project.id !== parseInt(id));
        const randomProjects = filteredProjects.sort(() => Math.random() - 0.5).slice(0, 3);
        setRandomProjects(randomProjects);
        window.scrollTo(0, 0);
      }
    }
  }, [projects, isLoading, id]);


  const renderProjectCards = () => {
    return randomProjects.map(project => (
      <ProjectCard key={project.id} project={project} peopleInfo={false} verMas={false} />
    ));
  };

  const renderIntegrantes = (integrantes) => {

    const renderColumn = (columnIntegrantes) => (
      <ul className="integrantes-column">
        {columnIntegrantes.map((integrante, index) => {
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
              style={{ width: '50px', height: '50px' }}
            />
          )

          return person.webpage ? (
            <li key={index} className="integrante-item">
              <div className="integrante-info">
                <a href={person.webpage} target='_blank' rel="noopener noreferrer">
                  {imageElement}
                  <span>{person.display_name}</span>
                </a>
              </div>
            </li>
          ) : (
            <li key={index} className="integrante-item">
              <div className="integrante-info">
                {imageElement}
                <span>{person.display_name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );


    const columns = [];
    const numColumns = 2;
    const numIntegrantes = integrantes.length;
    const integrantesPerColumn = Math.ceil(numIntegrantes / numColumns);

    for (let i = 0; i < numColumns; i++) {
      const startIndex = i * integrantesPerColumn;
      const endIndex = Math.min(startIndex + integrantesPerColumn, numIntegrantes);
      const columnIntegrantes = integrantes.slice(startIndex, endIndex);
      columns.push(renderColumn(columnIntegrantes));
    }

    return (
      <div className="integrantes-container">
        {columns.map((column, index) => (
          <div key={index} className="integrantes-column-wrapper">
            {column}
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  const project = projects.find((project) => project.id === parseInt(id));

  if (!project) {
    return <div>No se encontró el proyecto</div>;
  }

  return (
    <div className="project-detail-container">
      <h1>{project.nombreProyecto}</h1>
      {project.foto && (
        <img
          src={`https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/projects/${project.foto}`}
          alt={`Imagen ${project.nombreProyecto}`}
          style={{ height: '430px' }}
          className={"main-img"}
        />
      )}
      <p>{project.descripcion}</p>
      {project.video && (
        <iframe className="project-detail-video" src={project.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      )}
      <p>Área de investigación: {project.researchArea}</p>
      <h2 className="integrantes-heading">Integrantes:</h2>
      {renderIntegrantes(project.integrantes)}
      {project.link && (
        <h2 className="link-heading">Link:</h2>
      )}
      <div className="project-detail-link">
        {project.link && (
          <p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.link}
            </a>
          </p>
        )}
      </div>
      {project.repository && (
        <h2 className="repository-heading">Repositorio:</h2>
      )}
      <div className="project-detail-repository">
        {project.repository && (
          <p>
            <a href={project.repository} target="_blank" rel="noopener noreferrer">
              {project.repository}
            </a>
          </p>
        )}
      </div>

      <h2>Proyectos relacionados:</h2>
      <div className="related-projects">
        {renderProjectCards()}
      </div>

      <h2 className="eventos">Eventos:</h2>
      <div key={project.eventos.id} className="card event-card">
        {project.eventos.foto && (
          <img
            src={project.eventos.foto}
            className="card-img-top"
            alt={`Imagen ${project.eventos.nombre}`}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{project.eventos.nombre}</h5>
        </div>
      </div>
    </div>
  );
};


export default ProyectDetail;