import React, { Component } from 'react';

export class DirectionDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastValue: 0,
      direction: 'up',
    };
  }

  getClasses() {
    return `${
      this.state.direction === 'up' ? 'bg-success' : 'bg-danger'
    } text-white text-center p-2 m-2`;
  }

  render() {
    return <h5 className={this.getClasses()}>{this.props.value}</h5>;
  }

  // 'getDerivedStateFromProps' is a static method, therefore it can't access the class' methods and properties.
  // Given new props object and current state data, return a new state data that is going to be ~
  // ~ used by the component render method.
  // This method will be fired before initial render in mounting phase and before 'shouldComponentUpdate' ~
  // ~ in update phase.
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.lastValue) {
      return {
        lastValue: props.value,
        direction: state.lastValue > props.value ? 'down' : 'up',
      };
    }
    return state;
  }
}
