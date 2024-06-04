import React, { useState } from 'react';
import '../styles/faq.css';

const FaqComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: '¿Cómo puedo hacer parte de Colivri?',
      answer: 'Para hacerte miembro del Laboratorio Colivri tienes varias alternativas:\n' +
        '- Hacer parte de uno de los grupos de estudiantes que trabajan aquí, como OASIS o SinfonIA,\n' +
        '- Hacer parte de los grupos de investigación que trabajan aquí, como el grupo IMAGINE,\n' +
        '- Hacer proyectos en áreas afines a las trabajadas en el laboratorio (XR, VR, AR, MR, robótica, procesamiento de imágenes, multimedia, videojuegos, etc).\n' +
        'Nota: Los proyectos que puedes hacer en Colivri, contemplan desde el proyecto para ExpoAndes, proyecto de mitad de carrera (PMC), proyecto de grado o proyectos independientes asesorados por algún profesor.'
    },
    {
      question: '¿Cómo puedo pedir equipos en préstamos?',
      answer: 'Para pedir equipos debes ser miembro activo de Colivri, esto significa que debes haber solicitado acceso al laboratorio con tu carnet y estar en un proyecto en curso o ser parte de un grupo de investigación o de estudiantes (IMAGINE, OASIS, SinfonIA, etc) '
    },
    {
      question: '¿Cómo solicito acceso al laboratorio y a los préstamos?',
      answer: 'Para solicitar acceso debes enviar un correo a la Coordinadora del Laboratorio, la profesora Vivian Gómez (vn.gomez@uniandes.edu.co), indicando tu nombre completo, coreo, código, proyecto en curso y profesor responsable/asesor.\n' +
      'Si participas como miembro de un grupo de estudiantes (OASIS o SinfonIA), los líderes del grupo solicitarán tu acceso.'
    },
    {
      question: '¿En qué cursos de ISIS puedo hacer proyectos en Colivri?',
      answer: 'Si eres estudiante de Ingeniería de Sistemas y Computación, puedes hacer proyectos desde tu curso de Introducción a la Ingeniería de Sistemas y en tu curso de Diseño de Productos e Innovación en TI (ISIS2007)\n' +
      'Adicionalmente, como parte de la Maestría en Ingeniería de Sistemas y Computación (MISIS), en los cursos Desarrollo de aplicaciones de Realidad Mixta (ISIS4814) y Computación Visual Interactiva (ISIS4823) \n' +
      'Nota: Estos cursos también pueden tomarse desde el pregrado, como electivas profesionales.'
    },
    {
      question: '¿Si no soy de sistemas puedo hacer parte?',
      answer: '¡Claro que sí! Puedes hacer parte de los grupos OASIS o SinfonIA, para ello debes estar atento(a) a sus convocatorias internas. Adicionalmente, puedes hacer proyectos si estos son de áreas afines al laboratorio.'
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
            {faq.answer.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqComponent;
