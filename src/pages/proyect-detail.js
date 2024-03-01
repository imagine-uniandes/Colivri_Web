import React from 'react';
import ProyectDetail from '../components/proyect-detail';
import Footer from '../components/footer';
import Contact from '../components/contact';

const ProyectDetailPage = () => {
  return (
    <div className='proyect-detail'>
      <div style={{ marginTop: '70px' }}>
        <ProyectDetail />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default ProyectDetailPage;
