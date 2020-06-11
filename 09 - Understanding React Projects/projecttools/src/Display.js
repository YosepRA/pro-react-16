import React, { Component } from 'react';

export class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  increment = () => this.setState({ counter: this.state.counter + 1 });

  render() {
    return (
      <div>
        <h2 className="bg-primary text-center text-white p-2">
          <div>Props value: {this.props.value}</div>
          <div>Local value: {this.state.counter}</div>
        </h2>

        <div className="text-center">
          <button className="btn btn-primary m-2" onClick={this.props.callback}>
            Parent
          </button>
          <button className="btn btn-primary m-2" onClick={this.increment}>
            Local
          </button>
        </div>
      </div>
    );
  }
}
