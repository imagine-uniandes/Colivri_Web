import React from "react";
import '../styles/about.css';
import logo from "../assets/imgs/logo.png";
import iso from "../assets/imgs/colivri-iso.png";

function Navbar() {
    return (
        <div className="about">
            <h2>¿Qué es Colivri?</h2>

            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 d-flex justify-content-center">
                        <img src={logo} alt="logo"></img>
                    </div>
                    <div className="col-sm-12 col-lg-6 info">
                        <p>Colivri (Colaboratorio en Interacción, Visualización, Robótica y Sistemas Autónomos) de la Universidad de los Andes es un espacio de colaboración entre diversos departamentos de la Universidad como Ingeniería de Sistemas, Ingeniería Mecánica, Ingeniería Industrial, Ingeniería Eléctrica y Electrónica, entre otras.</p>
                        <p>En Colivri nos dedicamos a la investigación y desarrollo de tecnologías en varias disciplinas. Trabajamos en el desarrollo de experiencias computacionales con interfaces novedosas. La Realidad Virtual y Aumentada, los simuladores, y las interfaces robot humano son algunas de las tecnologías que usamos para el desarrollo de nuevas soluciones a problemas locales e internacionales.</p>
                    </div>
                </div>

            </div>

            
        </div>
    );
}

export default Navbar;