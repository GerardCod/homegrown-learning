import React from 'react';

const AssessmentLink = function Component({ link }) {
  return (
    <article>
      <h4>Enlace de la evaluación</h4>
      <a href={link} target="_blank" rel="noreferrer">
        <span>{link}</span>
      </a>
    </article>
  );
}

export default AssessmentLink;