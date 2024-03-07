import { useParams } from 'react-router-dom';
import data from '../data/proyects.json';
import '../styles/proyect-detail.css';
import { DEFAULT_PERSON_IMAGE } from '../constants';


const renderIntegrantes = (integrantes) => {
  return (
    <ul className="integrantes-list">
      {integrantes.map((integrante, index) => (
        <li key={index} className="integrante-item">
          <div className="integrante-info">
            <img 
              src={integrante.fotoIntegrante ? require(`../assets/integrantes/${integrante.fotoIntegrante}`) : DEFAULT_PERSON_IMAGE}
              className="rounded-circle mr-2 member"
              alt={`Integrante ${integrante.nombre}`}
              style={{ width: '50px', height: '50px' }}
            />
            <span>{integrante.nombre}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};


const ProyectDetail = () => {
  const { id } = useParams();
  const proyecto = data.find((proyecto) => proyecto.id === parseInt(id));

  if (!proyecto) {
    return <div>No se encontró el proyecto</div>;
  }

  console.log(proyecto);
  return (
    <div className="proyect-detail-container">
      <h1>{proyecto.nombreProyecto}</h1>
      {proyecto.foto && (
        <img
          src={require(`../assets/proyectos/${proyecto.foto}`)}
          alt={`Imagen ${proyecto.nombreProyecto}`}
        />
        )}
      <p>{proyecto.descripcion}</p>
        {proyecto.video && (
            <iframe className="proyect-detail-video" src={proyecto.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        )}
      <p>Área de investigación: {proyecto.researchArea}</p>
      <h2 className="integrantes-heading">Integrantes:</h2>
      {renderIntegrantes(proyecto.integrantes)}
      {proyecto.link && (
          <h2 className="link-heading">Link:</h2>
        )}
      <div className="proyect-detail-link">
        {proyecto.link && (
          <p>
            <a href={proyecto.link} target="_blank" rel="noopener noreferrer">
              {proyecto.link}
            </a>
          </p>
        )}
      </div>
      {proyecto.repository && (
          <h2 className="repository-heading">Repositorio:</h2>
        )}
      <div className="proyect-detail-repository">
        {proyecto.repository && (
            <p>
            <a href={proyecto.repository} target="_blank" rel="noopener noreferrer">
            {proyecto.repository}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProyectDetail;