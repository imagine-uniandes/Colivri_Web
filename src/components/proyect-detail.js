import { useParams } from 'react-router-dom';
import data from '../data/proyects.json';
import '../styles/proyect-detail.css';



const ProyectDetail = () => {
  const { proyecto_id } = useParams();
  const proyecto = data.find((proyecto) => proyecto.id === proyecto_id);

  if (!proyecto) {
    return <div>No se encontró el proyecto</div>;
  }

  console.log(proyecto);
  return (
    <div>
      <h2>{proyecto.nombreProyecto}</h2>
      <img src={require(`../assets/proyectos/${proyecto.foto}`)} alt={proyecto.nombreProyecto} />
      <p>{proyecto.descripcion}</p>
      <h3>Integrantes</h3>
      <ul>
        {proyecto.integrantes.map((integrante, index) => (
          <li key={index}>{integrante.nombre}</li>
        ))}
      </ul>
      <p>Área de investigación: {proyecto.researchArea}</p>
    </div>
  );
};

export default ProyectDetail;