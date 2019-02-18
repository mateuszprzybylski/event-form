import React, { Component } from "react";
import Section from "../Section/Section";
import "./EventForm.scss";
import moment from "moment";
import * as FormHelper from "./FormHelper";
import * as EventAPI from "./EventAPI";
import Input from "../Input/Input";
import { ERROR_MESSAGES } from "./ErrorMessages";
import TextArea from "../TextArea/TextArea";
import DescribedInput from "../DescribedInput/DescribedInput";
import Select from "../Select/Select";
import RadioButton from "../RadioButton/RadioButton";

export default class EventForm extends Component {
  constructor() {
    super();

    this.state = {
      form: {
        title: "",
        description: "",
        category: "",
        paid_event: FormHelper.PAID_EVENT_VALUES.FREE,
        fee: "",
        reward: "",
        responsible: "",
        email: "",
        date: "",
        time: "",
        meridiem: FormHelper.MERIDIEM_VALUES.AM,
        duration: ""
      },
      categories: [],
      coordinators: [],
      logedInUserId: null,
      wasValidated: false
    };

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
        min: moment().format("YYYY-MM-DD")
      },
      duration: {
        min: 0
      }
    };

    this.form = React.createRef();
  }

  componentDidMount = () => {
    EventAPI.getCategories().then(categories => {
      this.setState({ categories });
    });

    EventAPI.getCoordinators()
      .then(json => FormHelper.parseCoordinators(json))
      .then(coordinators => this.selectLogedInCoordinator(coordinators))
      .then(coordinators => {
        this.setState({ coordinators });
      });

    const logedInUserId = EventAPI.getLogedInUserId();

    this.setState(prevState => ({
      logedInUserId,
      form: {
        ...prevState.form,
        responsible: logedInUserId.toString()
      }
    }));
  };

  selectLogedInCoordinator(coordinators) {
    let modifiedCoordinatorList = [];
    let logedInCoordinator;

    coordinators.forEach(coordinator => {
      if (coordinator.id === this.state.logedInUserId) {
        coordinator.name = "Me - " + coordinator.name;
        logedInCoordinator = coordinator;
      } else {
        modifiedCoordinatorList.push(coordinator);
      }
    });

    modifiedCoordinatorList.unshift(logedInCoordinator);

    return modifiedCoordinatorList;
  }

  handleSubmit = event => {
    if (this.form.current.reportValidity()) {
      this.props.history.push("/success");
      console.log("Output: ", FormHelper.parseFormData(this.state.form));
    }

    this.setState({
      wasValidated: true
    });

    event.preventDefault();
  };

  validateTitle = title => {
    return EventAPI.isTitleInUse(title);
  };

  handleInputChange = event => {
    const value = event.target.value;
    const inputName = event.target.name;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [inputName]: value
      }
    }));
  };

  render() {
    return (
      <div className="event-form">
        <form
          ref={this.form}
          onSubmit={this.handleSubmit}
          noValidate
          className={this.state.wasValidated ? "was-validated" : ""}
        >
          <Section header="About">
            <div className="form-group required">
              <label htmlFor="title">TITLE</label>
              <Input
                id="title"
                name="title"
                value={this.state.form.title}
                onChange={this.handleInputChange}
                type="text"
                placeholder="Make it short and clear"
                customValidation={this.validateTitle}
                errorMessages={ERROR_MESSAGES.title}
                required={true}
              />
            </div>
            <div className="form-group required">
              <label htmlFor="description">DESCRIPTION</label>
              <TextArea
                rows="4"
                maxLength={this.formSetup.description.maxLength}
                id="description"
                name="description"
                hint="Max length {this.formSetup.description.maxLength} characters"
                type="text"
                value={this.state.form.description}
                placeholder="Write about your event, be creative"
                errorMessages={ERROR_MESSAGES.description}
                onChange={this.handleInputChange}
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">CATEGORY</label>
              <Select
                value={this.state.form.category}
                onChange={this.handleInputChange}
                name="category"
                id="category"
                options={this.state.categories}
                placeholder="Select category"
                hint="Describes topis and people who should be intrested in this event"
              />
            </div>
            <div className="form-group form-group-inline">
              <label>PAYMENT</label>
              <RadioButton
                type="radio"
                name="paid_event"
                onChange={this.handleInputChange}
                checked={
                  this.state.form.paid_event ===
                  FormHelper.PAID_EVENT_VALUES.FREE
                }
                value={FormHelper.PAID_EVENT_VALUES.FREE}
                label="Free event"
              />
              <RadioButton
                type="radio"
                name="paid_event"
                onChange={this.handleInputChange}
                checked={
                  this.state.form.paid_event ===
                  FormHelper.PAID_EVENT_VALUES.PAID
                }
                value={FormHelper.PAID_EVENT_VALUES.PAID}
                label="Paid event"
              />
              {this.state.form.paid_event ===
              FormHelper.PAID_EVENT_VALUES.PAID ? (
                <DescribedInput
                  type="number"
                  className="fee-control short"
                  name="fee"
                  value={this.state.form.fee}
                  onChange={this.handleInputChange}
                  min={this.formSetup.fee.min}
                  placeholder="Fee"
                  errorMessages={ERROR_MESSAGES.fee}
                  description="$"
                  required={this.state.form.paid_event}
                  novalidate={!this.state.form.paid_event}
                />
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="reward">REWARD</label>
              <DescribedInput
                type="number"
                className="short"
                id="reward"
                name="reward"
                value={this.state.form.reward}
                onChange={this.handleInputChange}
                min={this.formSetup.reward.min}
                placeholder="Number"
                description="reward points for attendance"
                novalidate={true}
              />
            </div>
          </Section>
          <Section header="Coordinator">
            <div className="form-group required">
              <label htmlFor="responsible">RESPONSIBLE</label>
              <Select
                value={this.state.form.responsible}
                onChange={this.handleInputChange}
                name="responsible"
                id="responsible"
                options={this.state.coordinators}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <Input
                id="email"
                name="email"
                value={this.state.form.email}
                onChange={this.handleInputChange}
                type="email"
                placeholder="Email"
                errorMessages={ERROR_MESSAGES.email}
              />
            </div>
          </Section>
          <Section header="When">
            <div className="form-group required form-group-inline">
              <label>STARTS ON</label>
              <DescribedInput
                id="date"
                name="date"
                onChange={this.handleInputChange}
                type="date"
                className="medium"
                min={this.formSetup.date.min}
                placeholder="dd/mm/yyyy"
                description="at"
                errorMessages={ERROR_MESSAGES.date}
                required={true}
              />
              <DescribedInput
                id="time"
                name="time"
                onChange={this.handleInputChange}
                type="text"
                max="5"
                pattern="^(1[0-2]|0?[1-9]):[0-5][0-9]$"
                className="time-control short"
                placeholder="--:--"
                errorMessages={ERROR_MESSAGES.time}
                required={true}
              />
              <RadioButton
                type="radio"
                onChange={this.handleInputChange}
                checked={
                  this.state.form.meridiem === FormHelper.MERIDIEM_VALUES.AM
                }
                name="meridiem"
                value={FormHelper.MERIDIEM_VALUES.AM}
                label="AM"
              />
              <RadioButton
                type="radio"
                onChange={this.handleInputChange}
                checked={
                  this.state.form.meridiem === FormHelper.MERIDIEM_VALUES.PM
                }
                name="meridiem"
                value={FormHelper.MERIDIEM_VALUES.PM}
                label="PM"
              />
            </div>
            <div className="form-group form-group-inline">
              <label htmlFor="duration">DURATION</label>
              <DescribedInput
                id="duration"
                name="duration"
                onChange={this.handleInputChange}
                type="number"
                value={this.state.form.duration}
                className="short"
                min={this.formSetup.reward.min}
                placeholder="Number"
                description="hours"
                novalidate={true}
              />
            </div>
          </Section>
          <button
            type="submit"
            className="btn-secondary event-form__submit-btn"
          >
            Publish Event
          </button>
        </form>
      </div>
    );
  }
}
