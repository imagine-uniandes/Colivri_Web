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
    const faculty = [];
    const ugrad = [];
    const master = [];

    integrantes.forEach(integrante => {
      const person = people[integrante];
      if (person) {
        if (person.role === 'faculty' || person.role === 'Lab Coordinator') {
          faculty.push(person);
        } else if (person.role === 'ugrad') {
          ugrad.push(person);
        } else if (person.role === 'master') {
          master.push(person);
        }
      }
    });

    const renderGroup = (group) => {
      return (
        <div className="integrantes-roww row d-flex justify-content-center">
          {group.map((person, index) => {
            const isUrl = person.image && (person.image.startsWith('http://') || person.image.startsWith('https://'));
            const imageSrc = person.image
              ? (isUrl ? person.image : `https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/people/${person.image}`)
              : DEFAULT_PERSON_IMAGE;

            return (
              <div key={index} className="integrante-itemm col-md-2 col-sm-6 col-12 text-center">
                <img
                  src={imageSrc}
                  className="rounded-circle member"
                  alt={`Integrante ${person.display_name}`}
                  style={{ width: '100px', height: '100px' }}
                />
                <div className="integrante-name">{person.display_name}</div>
                <div className="integrante-bio">{person.bio}</div>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div>
        <h3>Profesores y Coordinadores</h3>
        {renderGroup(faculty)}
        <h3>Estudiantes de Maestria</h3>
        {renderGroup(master)}
        <h3>Estudiantes de Pregrado</h3>
        {renderGroup(ugrad)}
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
    <div className="team-container d-flex justify-content-center align-items-center">
      <div className="col-md-8 col-12 text-center">
        <h1>{team.nombre}</h1>
        {team.fotoGrupo && (
          <img
            src={`https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/teams/${team.fotoGrupo}`}
            alt={`Imagen ${team.fotoGrupo}`}
            className="team-photo"
          />
        )}
        <p>{team.descripcion}</p>
        {renderIntegrantes(team.integrantes)}
      </div>
    </div>
  );
};

export default Team;
