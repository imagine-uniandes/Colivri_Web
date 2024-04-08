import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROJECTS_IMAGES , DEFAULT_PERSON_IMAGE } from '../constants';
import { useState, useEffect } from 'react';
import '../styles/ProjectCard.css';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWindowSize(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return windowSize;
  };

const ProjectCard = ({ project, peopleInfo, area, verMas, isLoading }) => {

    const windowWidth = useWindowSize();

    const breakpoints = {
      mobileSmall: 400,
      mobileMedium: 576,
      tablet: 768,
      desktopMedium: 1199,
      desktopLarge: 1200,
    };

    const maxImagesToShow = {
      xs: 2,
      mobileSmall: 4,
      mobileMedium: 2,
      tablet: 3,
      desktopMedium: 3,
      desktopLarge: 4,
    };

    let category = '';
    if (windowWidth < breakpoints.mobileSmall) {
      category = 'xs';
    } else if (windowWidth < breakpoints.mobileMedium) {
      category = 'mobileSmall';
    } else if (windowWidth < breakpoints.tablet) {
      category = 'mobileMedium';
    } else if (windowWidth < breakpoints.desktopMedium) {
      category = 'tablet';
    } else if (windowWidth < breakpoints.desktopLarge) {
      category = 'desktopMedium';
    } else {
      category = 'desktopLarge'
    }

    const updateMaxToShow = () => {
      return maxImagesToShow[category];
    };

    let maxToShow = updateMaxToShow();

    const renderMemberImages = (integrantes) => {
        return integrantes.slice(0, maxToShow).map((integrante, i) => {
            const person = peopleInfo[integrante];
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
                    title={`${person.display_name}`}
                    style={{ width: '50px', height: '50px', marginRight: '5px' }}
                />
            );
    
          return person.webpage ? (
            <a href={person.webpage} key={i} target='_blank' rel="noopener noreferrer">
              {imageElement}
            </a>
          ) : (
            <div key={i}>
              {imageElement}
            </div>
          );
        });
      };

    return (
    <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
        <div className="card h-100 mw-100 loading-card">
        {!isLoading? (
        <Link to={`/proyectos/${project.id}`}>
            {project.foto && (
                <img
                    src={`https://raw.githubusercontent.com/imagine-uniandes/web_data/main/img/projects/${project.foto}`}
                    className="card-img-top"
                    alt={`Imagen ${project.nombreProyecto}`}
                />
                )}
            {!project.foto && (
                <img
                    src={DEFAULT_PROJECTS_IMAGES[project.researchArea] || DEFAULT_PROJECTS_IMAGES['default']}
                    className="card-img-top"
                    alt={`Imagen ${project.nombreProyecto}`}
                />
            )}
        </Link>)
        :<Skeleton height={200} className='img-loading'/>}
        <div className="card-body">
            <h5 className="card-title">{project? project.nombreProyecto : <Skeleton  width={200}/>}</h5>
            {isLoading ? (<Skeleton width={100}/>):
            area && <p className="card-research">{project.researchArea}</p>}
            {isLoading ? (<Skeleton count={5}/>):
            <p className="card-text">{project.descripcion}</p>}
            {(peopleInfo || verMas) &&(
            <div className="bottom-cta d-flex justify-content-between">
                {peopleInfo?
                <>
                <div className="d-flex">
                  {renderMemberImages(project.integrantes)}
                </div>
                {verMas && !isLoading && <Link to={`/proyectos/${project.id}`} className="btn btn-primary">Ver más</Link>}
                </>
                :(
                <div className="d-flex w-100">
                  <Skeleton count={maxToShow} circle={true} width={50} height={50} style={{marginRight: '5px'}}/>
                  <Skeleton width={60} height={38} className='button-loading'/>
                </div>
                )}
            </div>
            )}
        </div>
        </div>
    </div>
    );
};

export default ProjectCard;