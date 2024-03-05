import { useParams } from 'react-router-dom';
import data from '../data/proyects.json';
import '../styles/proyect-detail.css';

const renderIntegrantes = (integrantes) => {
  return (
    <ul className="integrantes-list">
      {integrantes.map((integrante, index) => (
        <li key={index} className="integrante-item">
          <div className="integrante-info">
            <img 
              src={integrante.fotoIntegrante ? require(`../assets/integrantes/${integrante.fotoIntegrante}`) : require('../assets/default.png')}
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
      <h3>{proyecto.nombreProyecto}</h3>
      {proyecto.foto && (
        <img
          src={require(`../assets/proyectos/${proyecto.foto}`)}
          alt={`Imagen ${proyecto.nombreProyecto}`}
        />
        )}
      {!proyecto.foto && (
        <img
        src={require('../assets/logoImagine.png')}
        alt={`Imagen ${proyecto.nombreProyecto}`}
        />
        )}
      <p>{proyecto.descripcion}</p>
        {proyecto.video && (
            <iframe className="proyect-detail-video" src={proyecto.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        )}
      <h2 className="integrantes-heading">Integrantes:</h2>
      {renderIntegrantes(proyecto.integrantes)}
      <p>Área de investigación: {proyecto.researchArea}</p>
    </div>
  );
};


export default ProyectDetail;