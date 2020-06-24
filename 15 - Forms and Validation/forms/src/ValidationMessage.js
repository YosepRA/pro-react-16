import React, { Component } from 'react';
import { ValidationContext } from './ValidationContext';

export class ValidationMessage extends Component {
  render() {
    return this.context.getMessagesForField(this.props.field).map(err => (
      <div key={err} className="small bg-danger text-white mt-1 p-1">
        {err}
      </div>
    ));
  }

  static contextType = ValidationContext;
}
