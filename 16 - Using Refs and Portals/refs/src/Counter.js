import React, { Component } from 'react';

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  handleClick = () => this.setState({ counter: this.state.counter + 1 });

  render() {
    return (
      <div className="text-center">
        <div>{this.state.counter}</div>
        <button className="btn btn-primary p-2" onClick={this.handleClick}>
          Increment
        </button>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState == this.state);
  }
}
