import React from 'react'
import Section, {SECTION_TYPE} from '../Section/Section';

const SuccessPage = () => {
  return (
    <div>
      <Section
        header="Success"
        type={SECTION_TYPE.SUCCESS}
        >Event has been created</Section>
    </div>
  )
}

export default SuccessPage
