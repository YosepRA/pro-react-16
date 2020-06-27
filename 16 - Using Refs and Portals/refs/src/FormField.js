import React, { Component } from 'react';

export const ForwardFormField = React.forwardRef((props, ref) => (
  <FormField {...props} fieldRef={ref} />
));

export class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: '',
    };
  }

  handleChange = event => this.setState({ fieldValue: event.target.value });

  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleChange}
          value={this.state.fieldValue}
          ref={this.props.fieldRef}
        />
      </div>
    );
  }
}
