import React, { Component } from 'react';
import { ValidationDisplay } from './ValidationDisplay';
import { GetValidationMessages } from './ValidationMessages';

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: '',
      // category: '',
      // price: '',

      // ======================================================================================================== //

      errors: {},
      wrapContent: false,
    };
    this.formElements = {
      name: {
        label: 'Name',
        name: 'name',
        validation: { required: true, minLength: 3 },
      },
      category: {
        label: 'Category',
        name: 'category',
        validation: { required: true, minLength: 5 },
      },
      price: {
        label: 'Price',
        name: 'price',
        validation: { type: 'number', required: true, min: 5 },
      },
    };
  }

  // handleChange = ({ target: { name, value } }) =>
  //   this.setState({ [name]: value });

  handleAdd = () => {
    // Controlled form.
    // this.setState({ name: '', category: '', price: '' }, () =>
    //   this.nameRef.current.focus()
    // );

    // ======================================================================================================== //

    // Uncontrolled form.
    // Building data based on element ref's current value.
    // this.props.callback({
    //   name: this.nameRef.current.value,
    //   category: this.categoryRef.current.value,
    //   price: this.priceRef.current.value,
    // });
    // // Field reset.
    // this.nameRef.current.value = '';
    // this.categoryRef.current.value = '';
    // this.priceRef.current.value = '';
    // // 'name' field refocus.
    // this.nameRef.current.focus();

    // ======================================================================================================== //

    if (this.validateFormElements()) {
      let data = {};
      Object.values(this.formElements).forEach(({ element }) => {
        const { name, value } = element;
        data[name] = value;
        element.value = '';
      });
      this.props.callback(data);
      this.formElements.name.element.focus();
    }
  };

  // Creating refs using a callback. Give this function to element's ref property and it will automatically ~
  // ~ give the element to the function as an argument.
  setElement = element => {
    if (element !== null) {
      this.formElements[element.name].element = element;
    }
  };

  validateFormElement = name => {
    let errors = GetValidationMessages(this.formElements[name].element);
    // It's important to use setState callback here because 'validateFormElements' uses a loop and remember ~
    // ~ that setState is an asynchronous process. If you use setState object here, the value of 'this.state.errors' ~
    // ~ will be an empty object (starting value). Just think of an execution context and how event loop ~
    // ~ handles callback on task queue.
    this.setState(state => ({
      errors: {
        ...state.errors,
        [name]: errors,
      },
    }));
    return errors.length === 0;
  };

  validateFormElements = () => {
    let valid = true;
    Object.keys(this.formElements).forEach(name => {
      if (!this.validateFormElement(name)) {
        valid = false;
      }
    });
    return valid;
  };

  toggleWrap = () => this.setState({ wrapContent: !this.state.wrapContent });

  wrapContent(content) {
    return this.state.wrapContent ? (
      <div className="bg-secondary p-2">
        <div className="bg-light">{content}</div>
      </div>
    ) : (
      content
    );
  }

  render() {
    return this.wrapContent(
      <React.Fragment>
        {/* <div className="form-group p-2">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            autoFocus={true}
            ref={this.setElement}
          />
        </div>
        <div className="form-group p-2">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            name="category"
            id="category"
            className="form-control"
            ref={this.setElement}
          />
        </div>
        <div className="form-group p-2">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            id="price"
            className="form-control"
            ref={this.setElement}
          />
        </div> */}

        <div className="form-group text-center p-2">
          <div className="form-check">
            <input
              type="checkbox"
              name="toggleWrap"
              id="toggleWrap"
              className="form-check-input"
              checked={this.state.wrapContent}
              onChange={this.toggleWrap}
            />
            <label htmlFor="toggleWrap" className="form-check-label">
              Wrap Content
            </label>
          </div>
        </div>

        {Object.values(this.formElements).map(({ label, name, validation }) => (
          <div className="form-group p-2" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type="text"
              name={name}
              className="form-control"
              ref={this.setElement}
              autoFocus={name === 'name'}
              onChange={() => this.validateFormElement(name)}
              {...validation}
            />
            <ValidationDisplay errors={this.state.errors[name]} />
          </div>
        ))}

        <div className="text-center">
          <button className="btn btn-primary" onClick={this.handleAdd}>
            Add
          </button>
        </div>
      </React.Fragment>
    );
  }

  // 'getSnapshotBeforeUpdate' will run before React commit the changes. This will be an opportunity to ~
  // ~ read the previously rendered content if you were to retain its data.
  // Note that it can access the previous props and state data. Not to be confused with the CURRENT props and ~
  // ~ state that are used to render the latest content. If you compare between the two, the result will be 'false'.
  getSnapshotBeforeUpdate(oldProps, oldState) {
    // Whatever returned from this method will be the argument of 'componentDidUpdate' method. Therefore, ~
    // ~ you cna give it any kind of data you see necessary for your computation.
    return Object.values(this.formElements).map(
      ({ name, element: { value } }) => ({
        name,
        value,
      })
    );
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    // Looping through the 'extracted' data from previous content, then add it to the latest content.
    snapshot.forEach(item => {
      let element = this.formElements[item.name].element;
      if (element.value !== item.value) {
        element.value = item.value;
      }
    });
  }
}
