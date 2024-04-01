import React, { useState, useEffect } from 'react';
import '../styles/projects.css';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    researchArea: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

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
      <ProjectCard key={index} project={project} peopleInfo={people} area={true} verMas={true} />
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