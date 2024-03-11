import React from 'react';

import Contact from '../components/contact';
import Groups from '../components/groups';
import Footer from '../components/footer';
import '../styles/home.css';

function groups() {
    return (
        <div className='Groups'>
            <div style={{ marginTop: '100px'}}>
                <Groups />
            </div>
            <Contact />
            <Footer />
        </div>
    )
}

export default groups