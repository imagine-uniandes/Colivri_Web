import React, { useState } from 'react';
import '../styles/navbar.css';
import logo from '../assets/imgs/navbar.png';

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="pos-f-t">
      <div className={isNavCollapsed ? 'collapse' : 'collapse show'} id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <nav className="nav flex-column">
            <a className="nav-link active text-white" href="/proyectos">Proyectos</a>
            <a className="nav-link text-white" href="/papers">Papers</a>
            <a className="nav-link text-white" href="/grupos">Grupos</a>

            <a className="nav-link text-white" href="/equipo">Equipo</a>
          </nav>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark">
        <button 
          className="navbar-toggler d-lg-none"
          type="button" 
          onClick={handleNavCollapse} 
          aria-controls="navbarToggleExternalContent" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/"><img src={logo} alt="Logo" className="navbar-logo" /></a>
        <div className="navbar-links d-none d-lg-flex ml-auto">
          <a href="/proyectos" className="nav-link">Proyectos</a>
          <a href="/papers" className="nav-link">Papers</a>
          <a href="/grupos" className="nav-link">Grupos</a>
          <a href="/equipo" className="nav-link">Equipo</a>
        </div>
      </nav>
    </div>
  );
}


//<a className="nav-link text-white" href="/eventos">Eventos</a>

//<a href="/eventos" className="nav-link">Eventos</a>

export default Navbar;
