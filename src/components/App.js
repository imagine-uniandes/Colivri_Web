import Home from '../pages/home';
import Projects from '../pages/projects';
import Groups from '../pages/groups';
import Navbar from './navbar';
import ProjectDetail from '../pages/project-detail';
import { Routes, Route} from 'react-router-dom';
//import Events from '../pages/events';



function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/proyectos" element={<Projects />} />
                <Route path="/proyectos/:id" element={<ProjectDetail />} />
                <Route path="/grupos" element={<Groups />} />
            </Routes>
        </>
    );
}
//<Route exact path="/eventos" element={<Events />} />

export default App;

