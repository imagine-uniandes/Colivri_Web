import React from 'react';
import ProjectDetail from '../components/project-detail';
import Footer from '../components/footer';
import Contact from '../components/contact';

const ProjectDetailPage = () => {
  return (
    <div className='project-detail'>
      <div style={{ marginTop: '110px' }}>
        <ProjectDetail />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
