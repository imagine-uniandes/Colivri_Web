import React from 'react';
import '../styles/contact.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h2 className="contact-us-title">Contáctanos</h2>
      <div className="container">
        <div className='row'>
          <div className="social-media col-12 col-md-6">
            <h3>¡ESCRÍBENOS!</h3>
            <div className='icons-social-media'>
              <a href="mailto:imagine@uniandes.edu.co" className="email-link"><i className="bi bi-envelope"></i></a>
            </div>
          </div>
          <div className="social-media col-12 col-md-6 disc">
            <h3>@DISCUNIANDES</h3>
            <div className='icons-social-media'>
              <a href="https://www.facebook.com/DISCUniandes" className="social-link"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/discuniandes/" className="social-link"><i className="bi bi-instagram"></i></a>
              <a href="https://twitter.com/discuniandes" className="social-link"><i className="bi bi-twitter"></i></a>
              <a href="https://www.tiktok.com/@discuniandes?_t=8aQEZBS2bxN&_r=1" className="social-link"><i className="bi bi-tiktok"></i></a>
              <a href="https://www.linkedin.com/showcase/departamento-de-ingenier%C3%ADa-de-sistemas-y-computaci%C3%B3n/?originalSubdomain=co" className="social-link"><i className="bi bi-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;