import React from "react";
import '../styles/about.css';
//import logo from "../assets/imgs/logo.png";
import iso from "../assets/imgs/colivri-iso.png";

function Navbar() {
    return (
        <div className="about">
            <h2>¿Qué es Colivri?</h2>

            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 d-flex justify-content-center">
                        <img src={iso} alt="iso"></img>
                    </div>
                    <div className="col-sm-12 col-lg-6 info">
                        <p>Colivri es nuestro Colaboratorio en Interacción, Visualización, Robótica y Sistemas Autónomos, es un espacio de colaboración entre diversos departamentos de la Universidad, para el desarrollo de experiencias computacionales con interfaces novedosas. </p>
                        <p>En Colivri trabajamos con tecnologías como Realidad Virtual, Aumentada y Mixta (Realidades Extendidas), interfaces humano-robot, videojuegos, simuladores, procesamiento de imágenes y muchas más tecnologías enfocadas en el desarrollo de soluciones a problemas a problemas locales e internacionales. </p>
                        <p>En Colivri queremos impactar la vida de nuestros estudiantes, profesores, investigadores, usuarios y todas las personas involucradas en nuestros proyectos. Para esto, buscamos estar siempre actualizados en tecnología y formar una comunidad que nos permita desarrollar soluciones de alto impacto. </p>
                    </div>
                </div>

            </div>

            
        </div>
    );
}

export default Navbar;





