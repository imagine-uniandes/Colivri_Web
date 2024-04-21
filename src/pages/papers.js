import React from 'react';
import Contact from '../components/contact';
import Papers from '../components/papers';
import Footer from '../components/footer';
import '../styles/home.css';

function papers() {
    window.scrollTo(0, 0);
    return (
        <div className='Papers'>
            <div style={{ marginTop: '100px'}}>
                <Papers />
            </div>
            <Contact />
            <Footer />
        </div>
    )
}

export default papers