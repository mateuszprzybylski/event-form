import React from "react";
import Input from "../Input/Input";

export default class TextArea extends Input {
  render() {
    return (
      <div className={this.getInputClasses()}>
        <textarea
          ref={input => (this.input = input)}
          rows={this.props.rows}
          maxLength={this.props.maxLength}
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
          type={this.props.type}
          placeholder={this.props.placeholder}
          required={this.props.required}
        />

        <div className="form-control__hint">
          Max length {this.props.maxLength} characters
          <span className="f-rigth">
            {this.props.value.length}/{this.props.maxLength}
          </span>
        </div>
        {this.renderError()}
      </div>
    );
  }
}
