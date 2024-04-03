import Home from '../pages/home';
import Projects from '../pages/projects';
import Groups from '../pages/groups';
import Navbar from './navbar';
//import Events from '../pages/events';
import ProjectDetail from '../pages/project-detail';
import { Routes, Route} from 'react-router-dom';
import DataProvider from '../contexts/DataProvider';

function App() {
    return (
        <DataProvider>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/proyectos" element={<Projects />} />
                <Route path="/proyectos/:id" element={<ProjectDetail />} />
                <Route path="/grupos" element={<Groups />} />
                {/*<Route exact path="/eventos" element={<Events />} />*/}
            </Routes>
        </DataProvider>
    );
}

export default App;
