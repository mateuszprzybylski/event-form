import React from 'react'
import Input from '../Input/Input';

export default class DescribedInput extends Input {

    getInputClasses = () => {
        const classes = ['form-control form-control-inline'];
        if(this.state.showErrors) classes.push('has-errors');
        if(this.props.className) classes.push(this.props.className);

        return classes.join(' ');
    }

    render() {
        return (
          <div className={this.getInputClasses()}>
             <input
                ref={input => this.input = input}
                pattern={this.props.pattern}
                id={this.props.id} 
                maxLength={this.props.max}
                name={this.props.name}
                min={this.props.min}
                value={this.props.value}
                onChange={this.handleChange}
                type={this.props.type}
                placeholder={this.props.placeholder}
                required={this.props.required}/>
            <span className="form-control__description">{this.props.description}</span>

            {this.renderHint()}
            {this.renderError()}
            
          </div>
        );
      }
}