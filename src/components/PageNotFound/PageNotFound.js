import React from "react";
import Section, { SECTION_TYPE } from "../Section/Section";

const PageNotFound = () => {
  return (
    <div>
      <Section header="404" type={SECTION_TYPE.WARNING}>
        Page not found
      </Section>
    </div>
  );
};

export default PageNotFound;
