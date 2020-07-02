import React, { Component } from 'react';

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      counter: 0,
    };
  }

  // increment = () => this.setState({ counter: this.state.counter + 1 });
  increment = () =>
    this.setState(state => {
      let currentCounter = state.counter;
      return { counter: currentCounter + 1 };
    });

  handleChange = ({ target: { name, value } }) =>
    this.setState(state => {
      return {
        [name]: value,
      };
    });

  render() {
    return (
      <React.Fragment>
        <div className="counter m-1">
          <div className="counter__total text-center">{this.state.counter}</div>
          <div className="counter__increment text-center">
            <button className="btn btn-primary p-2" onClick={this.increment}>
              Increment
            </button>
          </div>
        </div>

        <div className="name m-1">
          <div className="name__result">{this.state.name}</div>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
      </React.Fragment>
    );
  }
}
