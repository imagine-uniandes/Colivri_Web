import React, { useState } from 'react';
import '../styles/faq.css';

const FaqComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: '¿Cómo puedo hacer parte de Colivri?',
      answer: 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
        question: '¿Cómo puedo pedir equipos en prestamos?',
        answer: 'Si ya estas en la lista, puedes usar el botón de reserva aquí. O del contrario, puedes solicitar acceso mandando un correo a vn.gomez@uniandes.edu.co describiendo cual es el motivo de tu solicitud.'
    },
    {
        question: '¿En qué cursos de ISIS puedo hacer proyectos en Colivri?',
        answer: 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
      question: '¿Si no soy de sistemas puedo hacer parte?',
      answer: 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container col-md-9 col-sm-12">
        <h2>Preguntas Frecuentes</h2>
      {faqs.map((faq, index) => (
        <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
          </button>
          <div className="faq-answer" style={{ display: activeIndex === index ? 'block' : 'none' }}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqComponent;
