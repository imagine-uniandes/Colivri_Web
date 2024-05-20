import React, { useState, useEffect } from 'react';
import '../styles/team.css';
import { DEFAULT_PERSON_IMAGE } from '../constants';

const Team = () => {
  const [team, setTeam] = useState(null);
  const [people, setPeople] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/groups.json')
        .then(response => response.json()),
      fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/people.json')
        .then(response => response.json())
    ]).then(([teamData, peopleData]) => {
      const targetTeam = teamData.find(team => team.id === 5);
      setTeam(targetTeam);
      setPeople(peopleData);
      setIsLoading(false);
      window.scrollTo(0, 0);
    });
  }, []);

  const renderIntegrantes = (integrantes) => {
    return (
      <div className="integrantes-container">
        {integrantes.map((integrante, index) => {
          const person = people[integrante];
          if (!person) {
            console.warn(`No se encontró a la persona con el identificador "${integrante}" en los datos de las personas.`);
            return null;
          }

          const isUrl = person.image && (person.image.startsWith('http://') || person.image.startsWith('https://'));
          const imageSrc = person.image
            ? (isUrl ? person.image : `https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/people/${person.image}`)
            : DEFAULT_PERSON_IMAGE;

          return (
            <div key={index} className="integrante-item">
              <img
                src={imageSrc}
                className="rounded-circle member"
                alt={`Integrante ${person.display_name}`}
                style={{ width: '100px', height: '100px' }}
              />
              <div className="integrante-name">{person.display_name}</div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!team) {
    return <div>No se encontró el grupo</div>;
  }

  return (
    <div className="col-lg-12 col-md-12 mb-12">
      <h1>{team.nombre}</h1>
      {team.fotoGrupo && (
        <img
          src={`https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/teams/${team.fotoGrupo}`}
          alt={`Imagen ${team.fotoGrupo}`}
          className="team-photo"
        />
      )}
      <p>{team.descripcion}</p>
      <h2 className="integrantes-heading">Integrantes:</h2>
      {renderIntegrantes(team.integrantes)}
    </div>
  );
};

export default Team;
