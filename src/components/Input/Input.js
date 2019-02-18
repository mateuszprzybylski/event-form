import React, { Component } from "react";
import { debounce } from "underscore";

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      showErrors: false
    };

    this.defaultInputClass = "form-control";
  }

  componentDidMount = () => {
    if (!this.props.novalidate) {
      this.setErrorMessage(this.input.validity);
    }
  };

  handleChange = event => {
    if (!this.props.novalidate) {
      this.setErrorMessage(this.input.validity);
    }

    if (this.props.customValidation) {
      this.customValidation(event.target.value);
    }

    this.props.onChange(event);
  };

  customValidation = debounce(value => {
    this.props.customValidation(value).then(hasError => {
      this.input.setCustomValidity(hasError ? ' ' : '');
      this.setErrorMessage(this.input.validity);

      this.setState({
        showErrors: hasError
      });
    });
  }, 1000);

  setErrorMessage = validity => {
    const errorTypes = [];

    for (let prop in validity) {
      if (validity[prop]) {
        errorTypes.push(prop);
      }
    }

    this.setState({
      errorMessage: this.props.errorMessages[errorTypes[0]]
    });
  };

  getInputClasses = () => {
    const classes = [this.defaultInputClass];
    if (this.state.showErrors) classes.push("has-errors");
    if (this.props.className) classes.push(this.props.className);

    return classes.join(" ");
  };

  renderHint = () => {
    return this.props.hint ? (
      <div className="form-control__hint">{this.props.hint}</div>
    ) : null;
  };

  renderError = () => {
    return this.state.errorMessage ? (
      <div className="form-control__error">{this.state.errorMessage}</div>
    ) : null;
  };

  render() {
    return (
      <div className={this.getInputClasses()}>
        <input
          ref={input => (this.input = input)}
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
          type={this.props.type}
          placeholder={this.props.placeholder}
          required={this.props.required}
        />
        {this.renderHint()}
        {this.renderError()}
      </div>
    );
  }
}
