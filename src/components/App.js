import Home from '../pages/home';
import Projects from '../pages/projects';
import Papers from '../pages/papers';
import Groups from '../pages/groups';
import Navbar from './navbar';
//import Events from '../pages/events';
import ProjectDetail from '../pages/project-detail';
import GroupDetail from '../pages/group-detail';
import { Routes, Route} from 'react-router-dom';
import DataProvider from '../contexts/DataProvider';
import SkeletonTheme from 'react-loading-skeleton';

function App() {
    return (
        
        <DataProvider>
            <SkeletonTheme color="#202020" highlightColor="#444"></SkeletonTheme>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/proyectos" element={<Projects />} />
                <Route path="/proyectos/:id" element={<ProjectDetail />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/grupos" element={<Groups />} />
                <Route path="/grupos/:id" element={<GroupDetail />} />
                {/*<Route exact path="/eventos" element={<Events />} />*/}
            </Routes>
            <SkeletonTheme/>
        </DataProvider>
    );
}

export default App;
