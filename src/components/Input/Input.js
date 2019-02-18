import React, { Component } from "react";

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      showErrors: false
    };
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
      this.props.customValidation(event).then(hasError => {
        this.input.validity.custom = hasError;
        this.setErrorMessage(this.input.validity);

        this.setState({
          showErrors: hasError
        });
      });
    }

    this.props.onChange(event);
  };

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
    return this.state.showErrors ? "form-control has-errors" : "form-control";
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
