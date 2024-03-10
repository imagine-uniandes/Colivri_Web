import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Projects from '../pages/projects';
import Navbar from './navbar';
import ProjectDetail from '../pages/project-detail';
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
                <Route exact path="/proyectos" element={<Projects />} />
                <Route path="/proyectos/:id" element={<ProjectDetail />} />
            </Routes>
        </Router>
    );
}
//<Route exact path="/eventos" element={<Events />} />

export default App;

