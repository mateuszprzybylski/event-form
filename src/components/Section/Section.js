import React from 'react';
import './Section.scss';

export const SECTION_TYPE = {
  SUCCESS: 'section-success',
  WARNING: 'section-warning',
  INFO: 'section-info'
}

const Section = ({header, children, type }) => {
  return (
    <div className={ "section " + type } >
      <h2 className="section__header">{header}</h2>
      <hr/>
      <div className="section__body">
        {children}
      </div>
    </div>
  );
}

export default Section;
