import React from 'react';

import '../styles/calendar.css';

function Calendar() {
  return (
    <div className='calendar'>
      <h2>Próximos Eventos</h2>
      <div style={iframeContainerStyle}>
      <iframe 
        src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23039BE5&ctz=America%2FBogota&mode=WEEK&showTitle=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showNav=0&showTz=0&src=ZjA4OGMzMzZmYTI2NDkwNzZlYTM5OTAzMWQ2NDY0OWQ1NmE4MmU2MWJkNjY5NzkwZDVmZTRhNmZlOGQ0YWQwZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F09300" 
        style={iframeStyle}
        title='calendar'
        frameBorder="0" 
        scrolling="no">
      </iframe>
      </div>
      
    </div>
  );
}

const iframeContainerStyle = {
  marginTop: '20px',
  position: 'relative',
  paddingBottom: '56.25%',
  paddingTop: '25px',
  height: 0,
  overflow: 'hidden',
};

const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
};

export default Calendar;