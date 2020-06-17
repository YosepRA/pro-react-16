import React, { Component } from 'react';
import { ActionButton } from './ActionButton';

let counter = 0;

export class ExternalCounter extends Component {
  incrementCounter = () => {
    counter++;
    // There are situations where you need to explicitly update a compoennt. Use 'forceUpdate' to do ~
    // ~ just that.
    this.forceUpdate();
  };

  render() {
    console.log('Render ExternalCounter');
    return (
      <div>
        <ActionButton
          callback={this.incrementCounter}
          text="External Counter"
        />
        <div className="h5 text-center p-2">External: {counter}</div>
      </div>
    );
  }
}
