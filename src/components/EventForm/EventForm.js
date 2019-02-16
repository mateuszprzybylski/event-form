import React, { Component } from 'react';
import FormSection from '../FormSection/FormSection';
import './EventForm.scss';

export default class EventForm extends Component {
  
  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="event-form">
        <form onSubmit={this.handleSubmit}>
          <FormSection header="About">
            About content
          </FormSection>
          <FormSection header="Coordinator">
            Coordinator content
          </FormSection>
          <FormSection header="When">
            When content
          </FormSection>
          <button 
            type="submit"
            className="btn-secondary event-form__submit-btn">Publish Event</button>
        </form>
      </div>
    );
  }
}
