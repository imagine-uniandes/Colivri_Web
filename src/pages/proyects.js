import React from 'react';

import Contact from '../components/contact';
import Proyects from '../components/proyects';
import Footer from '../components/footer';
import '../styles/home.css';

function proyects() {
    return (
        <div className='Proyects'>
            <div style={{ marginTop: '70px' }}>
                <Proyects />
            </div>
            <Contact />
            <Footer />
        </div>
    )
}

export default proyects