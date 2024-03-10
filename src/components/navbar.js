import React, { useState } from 'react';
import '../styles/navbar.css';
import logo from '../assets/imgs/navbar.png';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="pos-f-t">
      <div className={isNavCollapsed ? 'collapse' : 'collapse show'} id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <nav className="nav flex-column">
            <Link to="/proyectos" className="nav-link active text-white">Proyectos</Link>
            <Link to="/papers" className="nav-link text-white">Papers</Link>
            <Link to="/grupos" className="nav-link text-white">Grupos</Link>
            <Link to="/equipo" className="nav-link text-white">Equipo</Link>
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
        <Link to="/" className="navbar-brand"><img src={logo} alt="Logo" className="navbar-logo" /></Link>
        <div className="navbar-links d-none d-lg-flex ml-auto">
          <Link to="/proyectos" className="nav-link">Proyectos</Link>
          <Link to="/papers" className="nav-link">Papers</Link>
          <Link to="/grupos" className="nav-link">Grupos</Link>
          <Link to="/equipo" className="nav-link">Equipo</Link>
        </div>
      </nav>
    </div>
  );
}


//<a className="nav-link text-white" href="/eventos">Eventos</a>

//<a href="/eventos" className="nav-link">Eventos</a>

export default Navbar;
