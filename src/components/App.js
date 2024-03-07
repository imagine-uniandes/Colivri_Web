import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Proyects from '../pages/proyects';
import Navbar from './navbar';
import ProyectDetail from '../pages/proyect-detail';
//import Events from '../pages/events';

function App() {
    useEffect(() => {
        document.title = "Colivri";
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/proyectos" element={<Proyects />} />
                <Route path="/proyectos/:id" element={<ProyectDetail />} />
            </Routes>
        </Router>
    );
}
//<Route exact path="/eventos" element={<Events />} />

export default App;

