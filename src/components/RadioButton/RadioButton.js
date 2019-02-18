import React, { Component } from "react";

export default class RadioButton extends Component {
  render() {
    return (
      <div className="form-control form-control-inline">
        <input
          type={this.props.type}
          name={this.props.name}
          onChange={this.props.onChange}
          checked={this.props.checked}
          value={this.props.value}
        />
        <span>{this.props.label}</span>
      </div>
    );
  }
}
