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
      {group.redes && (
        <h2 className="redes-heading">Redes:</h2>
      )}
      <div className="social-media-group">
        {group.website && (
          <a href={group.website} className="social-links web"><i className="bi bi-globe"></i><span>{group.website}</span></a>
        )}
        {group.redes.correo && (
          <a href={`mailto:${group.redes.correo}`} className="social-links email"><i className="bi bi-envelope"></i><span>{group.redes.correo}</span></a>
        )}
        {group.github && (
          <a href={group.github} className="social-links"><i className="bi bi-github"></i><span>{group.github}</span></a>
        )}
        {group.redes.instagram && (
          <a href={group.redes.instagram} className="social-links"><i className="bi bi-instagram"></i><span>{group.redes.instagram}</span></a>
        )}
        {group.redes.tiktok && (
          <a href={group.redes.tiktok} className="social-links"><i className="bi bi-tiktok"></i><span>{group.redes.tiktok}</span></a>
        )}
        {group.redes.youtube && (
          <a href={group.redes.youtube} className="social-links"><i className="bi bi-youtube"></i><span>{group.redes.youtube}</span></a>
        )}
        {group.redes.facebook && (
          <a href={group.redes.facebook} className="social-links"><i className="bi bi-facebook"></i><span>{group.redes.facebook}</span></a>
        )}
        {group.redes.whatsapp && (
          <a href={group.redes.whatsapp} className="social-links"><i className="bi bi-whatsapp"></i><span>{group.redes.whatsapp}</span></a>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;