import React from 'react';

import Contact from '../components/contact';
import Projects from '../components/projects';
import Footer from '../components/footer';
import '../styles/home.css';

function projects() {
    window.scrollTo(0, 0);
    return (
        <div className='Proyects'>
            <div style={{ marginTop: '100px'}}>
                <Projects />
            </div>
            <Contact />
            <Footer />
        </div>
    )
}

export default projects