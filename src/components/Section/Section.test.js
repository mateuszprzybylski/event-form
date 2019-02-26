import React from "react";
import { shallow } from "enzyme";
import Section, { SECTION_TYPE } from "./Section";

const exampleHeader = "Example header";
const exampleChild = <div>child</div>;

describe("Section", () => {
  it("should renders without crashing", () => {
    shallow(<Section header={exampleHeader}>{exampleChild}</Section>);
  });

  it("should contains header text", () => {
    const headerText = "Example section header";
    const section = shallow(<Section header={headerText}>{exampleChild}</Section>);

    expect(section.text()).toContain(headerText);
  });

  it("should contains children element", () => {
    const childrenElement = <div>children</div>;
    const section = shallow(<Section header={exampleHeader}>{childrenElement}</Section>);

    expect(section.containsMatchingElement(childrenElement)).toEqual(true);
  });

  it("should contains class depends on Section type", () => {
    const sectionDefault = shallow(<Section header={exampleHeader} type={SECTION_TYPE.DEFAULT}>{exampleChild}</Section>);
    const sectionSuccess = shallow(<Section header={exampleHeader} type={SECTION_TYPE.SUCCESS}>{exampleChild}</Section>);
    const sectionWarning = shallow(<Section header={exampleHeader} type={SECTION_TYPE.WARNING}>{exampleChild}</Section>);
    const sectionInfo = shallow(<Section header={exampleHeader} type={SECTION_TYPE.INFO}>{exampleChild}</Section>);

    expect(sectionDefault.hasClass(SECTION_TYPE.DEFAULT)).toEqual(true);
    expect(sectionSuccess.hasClass(SECTION_TYPE.SUCCESS)).toEqual(true);
    expect(sectionWarning.hasClass(SECTION_TYPE.WARNING)).toEqual(true);
    expect(sectionInfo.hasClass(SECTION_TYPE.INFO)).toEqual(true);
  });

  it("should contains default class if type prop is not set", () => {
    const section = shallow(<Section header={exampleHeader}>{exampleChild}</Section>);

    expect(section.hasClass(SECTION_TYPE.DEFAULT)).toEqual(true);
  });
});
