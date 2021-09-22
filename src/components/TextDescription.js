import React, { Fragment } from 'react';
import parse from 'html-react-parser'

export default function TextDescription({ text }) {
  return (
    <Fragment>
      {
        text.split('\n').map((paragraph, index) => <p key={`paragraph-id: ${index}`} className="margin-bottom--1rem align--justify">{parse(paragraph)}</p>)
      }
    </Fragment>
  );
}