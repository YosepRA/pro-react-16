import React, { Component } from 'react';
import { Result } from './Result';
import { ValueInput } from './ValueInput';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || 'Simple Addition',
      fieldValues: [],
      total: 0,
    };
  }

  updateFieldValue = (id, value) => {
    this.setState(state => {
      let newFieldValues = [...state.fieldValues];
      newFieldValues[id] = Number(value);

      return { fieldValues: newFieldValues };
    });

    // this.setState(state => {
    //   state.fieldValues[id] = Number(value);
    //   return state;
    // });
  };

  updateTotal = () =>
    this.setState({
      total: this.state.fieldValues.reduce(
        (total, value) => (total += value),
        0
      ),
    });

  generateInputs(amount) {
    let result = [];
    for (let i = 0; i < amount; i++) {
      result.push(
        <ValueInput key={i} id={i} changeCallback={this.updateFieldValue} />
      );
    }
    return result;
  }

  render() {
    // throw new Error('something went wrong here');
    return (
      <div className="m-2">
        <h5 className="bg-primary text-white text-center p-2">
          {this.state.title}
        </h5>

        <Result result={this.state.total} />

        {/* <ValueInput id="0" changeCallback={this.updateFieldValue} />
        <ValueInput id="1" changeCallback={this.updateFieldValue} />
        <ValueInput id="2" changeCallback={this.updateFieldValue} /> */}
        {this.generateInputs(3)}

        <div className="text-center">
          <button className="btn btn-primary" onClick={this.updateTotal}>
            Total
          </button>
        </div>
      </div>
    );
  }
}
