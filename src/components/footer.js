import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-text">
          <p>Universidad de los Andes | Vigilada Mineducación</p>
          <p>Reconocimiento como Universidad: Decreto 1297 del 30 de mayo de 1964.</p>
          <p>Reconocimiento personería jurídica: Resolución 28 del 23 de febrero de 1949 Minjusticia.</p>
          <address>
            Edificio Mario Laserna Cra 1 Este No 19A - 40 Bogotá - Colombia | Tel: [57](1) 3394949 Ext: 2860, 2861, 2862 | Fax: [57](1) 3324325
          </address>
          <p>© 2024 - <a href='https://sistemas.uniandes.edu.co/es/isis' target='blank'>Departamento de Ingeniería de Sistemas y Computación</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
