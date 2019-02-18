import React, { Component } from "react";

export default class Select extends Component {
  renderHint = () => {
    return this.props.hint ? (
      <div className="form-control__hint">{this.props.hint}</div>
    ) : null;
  };

  render() {
    return (
      <div className="form-control">
        <select
          value={this.props.value}
          onChange={this.props.onChange}
          name={this.props.name}
          id={this.props.id}
        >
          {this.props.placeholder ? (
            <option value="">{this.props.placeholder}</option>
          ) : null}

          {this.props.options.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>

        {this.renderHint()}
      </div>
    );
  }
}
