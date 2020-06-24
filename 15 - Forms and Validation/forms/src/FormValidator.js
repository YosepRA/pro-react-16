import React, { Component } from 'react';
import { ValidationContext } from './ValidationContext';
import { ValidateData } from './validation';

export class FormValidator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      dirty: {},
      formSubmitted: false,
      getMessagesForField: this.getMessagesForField,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {
      errors: ValidateData(props.data, props.rules),
    };
    // If the form has been submitted at least once AND there's no individual field error.
    if (state.formSubmitted && Object.keys(newState.errors).length === 0) {
      // Then, check the whole form.
      let formErrors = props.validateForm(props.data);
      if (formErrors.length > 0) newState.errors.form = formErrors;
    }
    return newState;
  }

  get formValid() {
    return Object.keys(this.state.errors).length === 0;
  }

  handleChange = ({ target: { name } }) =>
    this.setState({ dirty: { ...this.state.dirty, [name]: true } });

  handleClick = () =>
    this.setState({ formSubmitted: true }, () => {
      if (this.formValid) {
        let formErrors = this.props.validateForm(this.props.data);
        if (formErrors.length === 0) this.props.submit(this.props.data);
      }
    });

  getButtonClasses() {
    return this.state.formSubmitted && !this.formValid
      ? 'bg-danger'
      : 'bg-primary';
  }

  getMessagesForField = field =>
    this.state.formSubmitted || this.state.dirty[field]
      ? this.state.errors[field] || []
      : [];

  render() {
    return (
      <React.Fragment>
        <ValidationContext.Provider value={this.state}>
          <div onChange={this.handleChange}>{this.props.children}</div>
        </ValidationContext.Provider>

        <div className="text-center">
          <button
            className={`btn ${this.getButtonClasses()} text-white`}
            onClick={this.handleClick}
            disabled={this.state.formSubmitted && !this.formValid}
          >
            Submit
          </button>
        </div>
      </React.Fragment>
    );
  }
}
