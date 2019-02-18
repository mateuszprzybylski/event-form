import React from "react";
import { shallow } from "enzyme";
import AppHeader from "./AppHeader";

describe("AppHeader ", () => {
  it("should renders without crashing", () => {
    shallow(<AppHeader />);
  });

  it("should contains header text", () => {
    const headerText = "Example header";
    const appHeader = shallow(<AppHeader header={headerText} />);

    expect(appHeader.text()).toContain(headerText);
  });
});
