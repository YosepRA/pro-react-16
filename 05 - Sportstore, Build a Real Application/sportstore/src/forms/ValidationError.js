import React, { Component } from 'react';

export class ValidationError extends Component {
  render() {
    if (this.props.errors) {
      return this.props.errors.map(err => (
        <div className="text-danger" key={err}>
          {err}
        </div>
      ));
    }
    return null;
  }
}
