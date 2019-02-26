import React from "react";
import PropTypes from 'prop-types';
import "./Section.scss";

export const SECTION_TYPE = {
  DEFAULT: "section-default",
  SUCCESS: "section-success",
  WARNING: "section-warning",
  INFO: "section-info"
};

const Section = ({ header, children, type }) => {
  return (
    <div className={"section " + type}>
      <h2 className="section__header">{header}</h2>
      <hr />
      <div className="section__body">{children}</div>
    </div>
  );
};

Section.defaultProps = {
  type: SECTION_TYPE.DEFAULT
};

Section.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(Object.values(SECTION_TYPE))
};

export default Section;
