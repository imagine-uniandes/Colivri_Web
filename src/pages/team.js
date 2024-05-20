import React from 'react';
import Contact from '../components/contact';
import Groups from '../components/team';
import Footer from '../components/footer';
import '../styles/home.css';

function team() {
    window.scrollTo(0, 0);
    return (
        <div className='Team'>
            <div style={{ marginTop: '100px'}}>
                <Groups />
            </div>
            <Contact />
            <Footer />
        </div>
    )
}

export default team