import React from 'react';
import { shallow } from 'enzyme';
import FormSection from './FormSection';

describe('FormSection ', () => {
    it('should renders without crashing', () => {
        shallow(<FormSection />);
    });

    it('should contains header text', () => {
        const headerText = 'Example section header';
        const formSection = shallow(<FormSection header={headerText} />);

        expect(formSection.text()).toContain(headerText);
    });

    it('should contains children element', () => {
        const childrenElement = <div>children</div>;
        const formSection = shallow(<FormSection>{childrenElement}</FormSection>);

        expect(formSection.containsMatchingElement(childrenElement)).toEqual(true);
    });
});