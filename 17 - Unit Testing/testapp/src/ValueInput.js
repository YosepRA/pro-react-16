import React, { Component } from 'react';

export class ValueInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: '',
    };
  }

  handleChange = ({ target: { value } }) =>
    this.setState({ fieldValue: value }, () =>
      this.props.changeCallback(this.props.id, this.state.fieldValue)
    );

  render() {
    return (
      <div className="form-group p-2">
        <label>Value #{this.props.id}</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleChange}
          value={this.state.fieldValue}
        />
      </div>
    );
  }
}
