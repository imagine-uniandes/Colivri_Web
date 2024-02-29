import React from 'react';

import Calendar from '../components/calendar';
import MainEvents from '../components/main-events';
import Contact from '../components/contact';
import Footer from '../components/footer';

function events() {
    return (
        <div>
            <MainEvents />
            <Calendar />
            <Contact />
            <Footer />
        </div>
    )
}

export default events