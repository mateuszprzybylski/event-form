import React, { Component } from 'react';
import FormSection from '../FormSection/FormSection';
import './EventForm.scss';
import moment from 'moment';
import { parseOutput, AM_PM_VALUES, PAID_EVENT_VALUES, getCategories, getCoordinators, getLogedInUserId, validateTitle } from './FormHelper';

export default class EventForm extends Component {
  constructor() {
    super();

    this.state = {
      form: {
        title: '',
        description: '',
        category: '',
        paid_event: PAID_EVENT_VALUES.FREE,
        fee: '',
        reward: '',
        responsible: '',
        email: '',
        date: '',
        time: '',
        ampm: AM_PM_VALUES.AM,
        duration: ''
      },
      categories: [],
      coordinators: [],
      logedInUserId: null,
      titleAlreadyInUse: false
    }

    this.formSetup = {
      description: {
        maxLength: 140
      },
      fee: {
        min: 0
      },
      reward: {
        min: 0
      },
      date: {
        min: moment().format('YYYY-MM-DD')
      },
      duration: {
        min: 0
      }
    }
  }

  componentDidMount = () => {
    getCategories()
      .then(categories => {
        this.setState({categories});
      });

    getCoordinators()
      .then(coordinators => {
        this.setState({coordinators});
      });

    const logedInUserId = getLogedInUserId();

    this.setState(prevState => ({
      logedInUserId,
      form: {
        ...prevState.form,
        responsible: logedInUserId.toString()
      }
    })); 
  }

  handleSubmit = (event) => {
    console.log('Output: ', parseOutput(this.state.form));
    event.preventDefault();
  }

  validateTitle = (event) => {
    const title = event.target.value;

    validateTitle(title)
      .then(isValid => {
        this.setState({
          titleAlreadyInUse: !isValid
        });
      });

    this.handleInputChange(event);
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [inputName]: value
      }
    }));
  }

  render() {
    return (
      <div className="event-form">
        <form onSubmit={this.handleSubmit} noValidate>
          <FormSection header="About">
           <div className="form-group required">
              <label htmlFor="title">TITLE</label>
              <div className="form-control">
                <input
                  id="title"
                  name="title"
                  type="text" 
                  value={this.state.form.title}
                  placeholder="Make it short and clear"
                  onChange={this.validateTitle}
                  required/>
                <div className="form-control__error">
                  Title cannot be empty
                </div>
                { this.state.titleAlreadyInUse ? <div>
                  Title already in use
                </div> : null }
              </div>
           </div>

           <div className="form-group required">
              <label htmlFor="description">DESCRIPTION</label>
              <div className="form-control">
                <textarea
                  rows="4"
                  maxLength={this.formSetup.description.maxLength}
                  id="description" 
                  name="description"
                  type="text" 
                  value={this.state.form.description}
                  placeholder="Write about your event, be creative"
                  onChange={this.handleInputChange}
                  required/>
                <div className="form-control__hint">
                  Max length {this.formSetup.description.maxLength} characters
                  <span className="f-rigth">{this.state.form.description.length}/{this.formSetup.description.maxLength}</span>
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
                  value={this.state.form.category}
                  onChange={this.handleInputChange}
                  name="category"
                  id="category">
                  <option value="">Select category</option>
                  { this.state.categories.map(
                    category => {
                      return <option key={category.id} value={category.id}>{category.name}</option>
                    }
                  )}                 
                </select>
                <div className="form-control__hint">
                  Describes topis and people who should be intrested in this event
                </div>
              </div>
           </div>

           <div className="form-group form-group-inline">
            <label>PAYMENT</label>
            <div className="form-control form-control-inline">
              <input 
                type="radio" 
                name="paid_event" 
                value={PAID_EVENT_VALUES.FREE}
                onChange={this.handleInputChange}
                checked={this.state.form.paid_event === PAID_EVENT_VALUES.FREE}/>
              <span>Free event</span>
            </div>
            <div className="form-control form-control-inline">
              <input 
                type="radio" 
                name="paid_event" 
                onChange={this.handleInputChange}
                checked={this.state.form.paid_event === PAID_EVENT_VALUES.PAID}
                value={PAID_EVENT_VALUES.PAID}/>
              <span>Paid event</span>
            </div>
            { this.state.form.paid_event === PAID_EVENT_VALUES.PAID ? 
              <div className="form-control form-control-inline fee-control">
                <input 
                  type="number" 
                  className="short" 
                  name="fee" 
                  value={this.state.form.fee}
                  onChange={this.handleInputChange}
                  min={this.formSetup.fee.min}
                  placeholder="Fee"/>
                <span className="form-control__description">$</span>
              </div>
            : null}
          </div>

          <div className="form-group form-group-inline reward-group">
            <label htmlFor="reward">REWARD</label>
            <div className="form-control form-control-inline">
              <input
                id="reward" 
                name="reward"
                type="number" 
                value={this.state.form.reward}
                className="short" 
                onChange={this.handleInputChange}
                min={this.formSetup.reward.min}
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
                  value={this.state.form.responsible}
                  onChange={this.handleInputChange}
                  name="responsible"
                  id="responsible">
                  { this.state.coordinators.map(
                    coordinator => {
                      return (
                        <option 
                          key={coordinator.id} 
                          value={coordinator.id}>
                          { this.state.logedInUserId === coordinator.id ? 'Me - ' : null}
                          {coordinator.name} {coordinator.lastname}
                        </option>
                      );
                    }
                  )}
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
                  name="email"
                  value={this.state.form.email}
                  onChange={this.handleInputChange}
                  type="email" 
                  placeholder="Email"/>
              </div>
           </div>

          </FormSection>
          <FormSection header="When">

            <div className="form-group required form-group-inline">
              <label>STARTS ON</label>
              <div className="form-control form-control-inline">
                <input
                  name="date"
                  onChange={this.handleInputChange}
                  type="date"
                  min={this.formSetup.date.min}
                  className="medium" 
                  placeholder="dd/mm/yyyy"
                  required/>
                <div className="form-control__error">
                  Starts on cannot be empty
                </div>
              </div>
              <span className="form-control__description">at</span>
              <div className="form-control form-control-inline time-control">
                <input
                  name="time"
                  onChange={this.handleInputChange}
                  type="time" 
                  className="short" 
                  placeholder="--:--"
                  required/>
              </div>
              <div className="form-control form-control-inline">
                <input 
                  type="radio" 
                  onChange={this.handleInputChange}
                  checked={this.state.form.ampm === AM_PM_VALUES.AM}
                  name="ampm" 
                  value={AM_PM_VALUES.AM}/><span>AM</span>
              </div>
              <div className="form-control form-control-inline">
                <input 
                  type="radio" 
                  onChange={this.handleInputChange}
                  checked={this.state.form.ampm === AM_PM_VALUES.PM}
                  name="ampm" 
                  value={AM_PM_VALUES.PM}/><span>PM</span>
              </div>
            </div>
            
            <div className="form-group form-group-inline">
              <label htmlFor="duration">DURATION</label>
              <div className="form-control form-control-inline">
                <input
                  id="duration" 
                  name="duration"
                  onChange={this.handleInputChange}
                  type="number" 
                  value={this.state.form.duration}
                  className="short"
                  min={this.formSetup.reward.min}
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
