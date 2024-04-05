import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../styles/group-detail.css';
import { DEFAULT_PERSON_IMAGE} from '../constants';


const GroupDetail = () => {
  const { id } = useParams();
  const [groups, setGroups] = useState([]);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/groups.json')
        .then(response => response.json()),
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/people.json')
        .then(response => response.json())
    ]).then(([groupData, peopleData]) => {
      setGroups(groupData);
      setPeople(peopleData);
      setIsLoading(false);
      window.scrollTo(0, 0);
    });
  }, []);

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

  const group = groups.find((group) => group.id === parseInt(id));

  if (!group) {
    return <div>No se encontró el proyecto</div>;
  }

  return (
    <div className="group-detail-container">
      <h1>{group.nombre}</h1>
      {group.logo && (
        <img
          src={`https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/groups/${group.logo}`}
          alt={`Imagen ${group.logo}`}
        />
      )}
      <p>{group.descripcion}</p>
      {group.fotoGrupo && (
        <img
          src={`https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/groups/${group.fotoGrupo}`}
          alt={`Imagen ${group.fotoGrupo}`}
        />
      )}
      <div className="group-detail-researchArea">
        <p>Área de investigación: {group.researchArea}</p>
      </div>
      <h2 className="integrantes-heading">Integrantes:</h2>
      {renderIntegrantes(group.integrantes)}
      {group.website && (
        <h2 className="website-heading">Website:</h2>
      )}
      <div className="group-detail-website">
        {group.website && (
          <p>
            <a href={group.website} target="_blank" rel="noopener noreferrer">
              {group.website}
            </a>
          </p>
        )}
      </div>
      {group.github && (
        <h2 className="repository-heading">Repositorio:</h2>
      )}
      <div className="group-detail-repository">
        {group.github && (
          <p>
            <a href={group.github} target="_blank" rel="noopener noreferrer">
              {group.github}
            </a>
          </p>
        )}
      </div>
      {group.redes && (
        <h2 className="redes-heading">Redes:</h2>
      )}
      <div className="group-detail-redes">
        {group.redes && (
          <p>
            <a href={group.redes.correo} className="email-link" rel="noopener noreferrer">
              {group.redes.correo}
            </a>
          </p>
        )}
        {group.redes && (
          <p>
            <a href={group.redes.instagram} target="_blank" rel="noopener noreferrer">
              {group.redes.instagram}
            </a>
          </p>
        )}
        {group.redes && (
          <p>
            <a href={group.redes.tiktok} target="_blank" rel="noopener noreferrer">
              {group.redes.tiktok}
            </a>
          </p>
        )}
        {group.redes && (
          <p>
            <a href={group.redes.youtube} target="_blank" rel="noopener noreferrer">
              {group.redes.youtube}
            </a>
          </p>
        )}
        {group.redes && (
          <p>
            <a href={group.redes.facebook} target="_blank" rel="noopener noreferrer">
              {group.redes.facebook}
            </a>
          </p>
        )}
        {group.redes && (
          <p>
            <a href={group.redes.whatsapp} target="_blank" rel="noopener noreferrer">
              {group.redes.whatsapp}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;