import React, { useState } from 'react';
import '../styles/faq.css';

const FaqComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: '¿Qué es a long established fact that a reader will be distracted by the readable content of a page?',
      answer: 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
        question: '¿Qué es a long established fact that a reader will be distracted by the readable content of a page?',
        answer: 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
        question: '¿Qué es a long established fact that a reader will be distracted by the readable content of a page?',
        answer: 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },

  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
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
