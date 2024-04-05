import React, { useState, useContext } from 'react';
import '../styles/projects.css';
import ProjectCard from '../components/ProjectCard';
import DataContext from '../contexts/DataContext';

const Projects = () => {
  const { projects, people, isLoading } = useContext(DataContext);
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
        {isLoading ? <p>Cargando proyectos...</p> : renderCards()}
      </div>
    </div>
  );
};

export default Projects;