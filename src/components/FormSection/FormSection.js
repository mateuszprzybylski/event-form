import React from 'react';
import './FormSection.scss';

const FormSection = ({header, children}) => {
  return (
    <div className="form-section">
      <h2 className="form-section__header">{header}</h2>
      <hr/>
      <div className="form-section__body">
        {children}
      </div>
    </div>
  );
}

export default FormSection;
