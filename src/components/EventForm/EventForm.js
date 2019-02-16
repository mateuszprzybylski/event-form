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
           <div className="form-group required">
              <label htmlFor="title">TITLE</label>
              <div className="form-control">
                <input
                  id="title" 
                  type="text" 
                  placeholder="Make it short and clear"
                  required/>
                <div className="form-control__error">
                  Title cannot be empty
                </div>
              </div>
           </div>

           <div className="form-group required">
              <label htmlFor="description">DESCRIPTION</label>
              <div className="form-control">
                <textarea
                  rows="4"
                  maxLength="140"
                  id="description" 
                  type="text" 
                  placeholder="Write about your event, be creative"
                  required/>
                <div className="form-control__hint">
                  Max length 140 characters
                  <span className="f-rigth">100/140</span>
                </div>
                <div className="form-control__error">
                  Description cannot be empty
                </div>
              </div>
           </div>

           <div className="form-group">
              <label htmlFor="category">CATEGORY</label>
              <div className="form-control">
                <select
                  defaultValue=""
                  id="category">
                  <option value="">Select category</option>
                  <option value="skils">Skils</option>
                  <option value="interests">Interests</option>
                  <option value="locations">Locations</option>
                </select>
                <div className="form-control__hint">
                  Describes topis and people who should be intrested in this event
                </div>
              </div>
           </div>

           <div className="form-group form-group-inline">
            <label htmlFor="payment">PAYMENT</label>
            <div className="form-control form-control-inline">
              <input type="radio" name="gender" value="male"/>
              <span>Free event</span>
            </div>
            <div className="form-control form-control-inline">
              <input type="radio" name="gender" value="female"/>
              <span>Paid event</span>
            </div>
            <div className="form-control form-control-inline m-0-mobile fee-control">
              <input type="number" className="short" name="fee" placeholder="Fee"/>
              <span className="form-control__description">$</span>
            </div>
          </div>

          <div className="form-group form-group-inline reward-group">
            <label htmlFor="reward">REWARD</label>
            <div className="form-control form-control-inline">
              <input
                id="reward" 
                type="number" 
                className="short" 
                placeholder="Number"/>
            </div>
            <span className="form-control__description">reward points for attendance</span>
          </div>

          </FormSection>
          <FormSection header="Coordinator">
            
           <div className="form-group required">
              <label htmlFor="responsible">RESPONSIBLE</label>
              <div className="form-control">
                <select
                  defaultValue="skils"
                  id="responsible">
                  <option value="beans">Mr Beans</option>
                  <option value="bond">James Bond</option>
                </select>
                <div className="form-control__error">
                  Select responsible person
                </div>
              </div>
           </div>

           <div className="form-group">
              <label htmlFor="title">EMAIL</label>
              <div className="form-control">
                <input
                  id="email" 
                  type="email" 
                  placeholder="Email"/>
              </div>
           </div>

          </FormSection>
          <FormSection header="When">

            <div className="form-group required form-group-inline">
              <label htmlFor="startson">STARTS ON</label>
              <div className="form-control form-control-inline">
                <input
                  id="startson" 
                  type="date" 
                  className="medium" 
                  placeholder="dd/mm/yyyy"/>
                <div className="form-control__error">
                  Starts on cannot be empty
                </div>
              </div>
              <span className="form-control__description">at</span>
              <div className="form-control form-control-inline time-control">
                <input
                  id="startson" 
                  type="time" 
                  className="short" 
                  placeholder="--:--"/>
              </div>
              <div className="form-control form-control-inline">
                <input type="radio" name="time" value="am"/><span>AM</span>
              </div>
              <div className="form-control form-control-inline">
                <input type="radio" name="time" value="pm"/><span>PM</span>
              </div>
            </div>
            
            <div className="form-group form-group-inline">
              <label htmlFor="duration">DURATION</label>
              <div className="form-control form-control-inline">
                <input
                  id="duration" 
                  type="number" 
                  className="short"
                  placeholder="Number"/>
              </div>
              <span className="form-control__description">hours</span>
            </div>
            
          </FormSection>
          <button 
            type="submit"
            className="btn-secondary event-form__submit-btn">Publish Event</button>
        </form>
      </div>
    );
  }
}
