import React from "react";
import Section from "../Section/Section";

const InfoPage = ({header, type, message}) => {
  return (
    <div>
      <Section header={header} type={type}>
        {message}
      </Section>
    </div>
  );
};

export default InfoPage;
