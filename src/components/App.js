import React, { useEffect } from 'react';
import Home from '../pages/home';
import Projects from '../pages/projects';
import Groups from '../pages/groups';
import Navbar from './navbar';
import ProjectDetail from '../pages/project-detail';
import { Routes, Route} from 'react-router-dom';
//import Events from '../pages/events';

function App() {
    useEffect(() => {
        document.title = "Colivri";
    }, []);

    return (
        <div>{}
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/proyectos" element={<Projects />} />
                <Route path="/proyectos/:id" element={<ProjectDetail />} />
                <Route path="/grupos" element={<Groups />} />
            </Routes>
        </div>
    );
}
//<Route exact path="/eventos" element={<Events />} />

export default App;

