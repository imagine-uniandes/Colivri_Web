import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Events from '../pages/events';
import Proyects from '../pages/proyects';
import Navbar from './navbar';

function App() {
    useEffect(() => {
        document.title = "Colivri";
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/eventos" element={<Events />} />
                <Route exact path="/proyectos" element={<Proyects />} />
            </Routes>
        </Router>
    );
}

export default App;