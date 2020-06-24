import React, { Component } from 'react';
import { FormValidator } from './FormValidator';
import { ValidationMessage } from './ValidationMessage';
import { ValidateForm } from './wholeFormValidation';

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: '',
      // flavor: 'Vanilla',
      // toppings: ['Strawberries'],
      // twoScoops: false,
      // order: '',

      // ======================================================================================================== //

      name: '',
      email: '',
      emailConfirm: '',
      // order: '',
      terms: false,
    };
    // this.flavors = [
    //   'Chocolate',
    //   'Double Chocolate',
    //   'Triple Chocolate',
    //   'Vanilla',
    // ];
    // this.toppings = ['Sprinkles', 'Fudge Sauce', 'Strawberries', 'Maple Syrup'];

    // ======================================================================================================== //

    this.rules = {
      name: { required: true, minlength: 3, alpha: true },
      email: { required: true, email: true, equals: 'emailConfirm' },
      emailConfirm: { required: true, email: true, equals: 'email' },
      // order: { required: true },
      terms: { true: true },
    };
  }

  // updateFormValue = ({ target: { name, value } }) => {
  //   this.setState({ [name]: value }, () => this.props.submit(this.state));
  // };

  // updateFormValueOptions = ({ target }) => {
  //   let options = [...target.options].filter(o => o.selected).map(o => o.value);
  //   this.setState({ [target.name]: options }, () =>
  //     this.props.submit(this.state)
  //   );
  // };

  // updateFormValueCheckbox = ({ target: { name, checked } }) => {
  //   this.setState({ [name]: checked }, () => this.props.submit(this.state));
  // };

  // updateFormValueCheckboxes = event => {
  //   event.persist();

  //   this.setState(
  //     state => {
  //       let toppings = [...state.toppings];

  //       if (event.target.checked) {
  //         toppings.push(event.target.value);
  //       } else {
  //         let index = toppings.indexOf(event.target.value);
  //         toppings.splice(index, 1);
  //       }
  //       return { ...state, toppings };
  //     },
  //     () => this.props.submit(this.state)
  //   );
  // };

  // ======================================================================================================== //

  updateFormValue = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  updateFormCheckbox = ({ target: { name, checked } }) =>
    this.setState({ [name]: checked });

  render() {
    // return (
    //   <div className="h5 bg-info text-white p-2">
    //     <div className="form-group">
    //       <label>Name:</label>
    //       <input
    //         type="text"
    //         name="name"
    //         className="form-control"
    //         value={this.state.name}
    //         onChange={this.updateFormValue}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label>Ice Cream Flavors</label>
    //       <select
    //         name="flavor"
    //         value={this.state.flavor}
    //         onChange={this.updateFormValue}
    //       >
    //         {this.flavors.map(flavor => (
    //           <option key={flavor} value={flavor}>
    //             {flavor}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <div className="form-group">
    //       <label>Ice Cream Toppings</label>
    //       <select
    //         name="toppings"
    //         value={this.state.toppings}
    //         onChange={this.updateFormValueOptions}
    //         multiple={true}
    //       >
    //         {this.toppings.map(top => (
    //           <option key={top} value={top}>
    //             {top}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <div className="form-group">
    //       <label>Ice Cream Flavors</label>
    //       {this.flavors.map(flavor => (
    //         <div key={flavor} className="form-check">
    //           <input
    //             type="radio"
    //             name="flavor"
    //             id={flavor}
    //             className="form-check-input"
    //             value={flavor}
    //             checked={this.state.flavor === flavor}
    //             onChange={this.updateFormValue}
    //           />
    //           <label htmlFor={flavor} className="form-check-label">
    //             {flavor}
    //           </label>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="form-group">
    //       <div className="form-check">
    //         <input
    //           type="checkbox"
    //           name="twoScoops"
    //           id="twoScoops"
    //           className="form-check-input"
    //           checked={this.state.twoScoops}
    //           onChange={this.updateFormValueCheckbox}
    //         />{' '}
    //         <label htmlFor="twoScoops" className="form-check-label">
    //           Two Scoops
    //         </label>
    //       </div>
    //     </div>
    //     <div className="form-group">
    //       <label>Toppings</label>
    //       {this.toppings.map(top => (
    //         <div key={top} className="form-check">
    //           <input
    //             type="checkbox"
    //             name="toppings"
    //             className="form-check-input"
    //             id={top}
    //             value={top}
    //             checked={this.state.toppings.indexOf(top) > -1}
    //             onChange={this.updateFormValueCheckboxes}
    //           />{' '}
    //           <label htmlFor={top} className="form-check-label">
    //             {top}
    //           </label>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="order">Order:</label>
    //       <textarea
    //         name="order"
    //         id="order"
    //         className="form-control"
    //         cols="30"
    //         rows="10"
    //         value={this.state.order}
    //         onChange={this.updateFormValue}
    //       />
    //     </div>
    //   </div>
    // );

    // ======================================================================================================== //

    return (
      <h5 className="bg-info text-white p-2">
        <FormValidator
          data={this.state}
          submit={this.props.submit}
          rules={this.rules}
          validateForm={ValidateForm}
        >
          <ValidationMessage field="form" />

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={this.state.name}
              onChange={this.updateFormValue}
            />
            <ValidationMessage field="name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={this.state.email}
              onChange={this.updateFormValue}
            />
            <ValidationMessage field="email" />
          </div>

          <div className="form-group">
            <label htmlFor="emailConfirm">Confirm email:</label>
            <input
              type="email"
              name="emailConfirm"
              id="emailConfirm"
              className="form-control"
              value={this.state.emailConfirm}
              onChange={this.updateFormValue}
            />
            <ValidationMessage field="emailConfirm" />
          </div>

          {/* <div className="form-group">
            <label htmlFor="order">Order:</label>
            <textarea
              name="order"
              id="order"
              className="form-control"
              value={this.state.order}
              onChange={this.updateFormValue}
            />
            <ValidationMessage field="order" />
          </div> */}

          <div className="form-group">
            <div className="form-check">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="form-check-input"
                checked={this.state.terms}
                onChange={this.updateFormCheckbox}
              />
              <label htmlFor="terms" className="form-check-label">
                Agree to terms
              </label>
            </div>
            <ValidationMessage field="terms" />
          </div>
        </FormValidator>
      </h5>
    );
  }
}
