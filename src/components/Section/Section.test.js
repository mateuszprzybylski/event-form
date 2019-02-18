import React from "react";
import { shallow } from "enzyme";
import Section, { SECTION_TYPE } from "./Section";

describe("FormSection ", () => {
  it("should renders without crashing", () => {
    shallow(<Section />);
  });

  it("should contains header text", () => {
    const headerText = "Example section header";
    const formSection = shallow(<Section header={headerText} />);

    expect(formSection.text()).toContain(headerText);
  });

  it("should contains children element", () => {
    const childrenElement = <div>children</div>;
    const formSection = shallow(<Section>{childrenElement}</Section>);

    expect(formSection.containsMatchingElement(childrenElement)).toEqual(true);
  });

  it("should contains children element", () => {
    const formSection = shallow(
      <Section type={SECTION_TYPE.SUCCESS}></Section>
    );

    expect(formSection.hasClass(SECTION_TYPE.SUCCESS)).toEqual(true);
  });
});
