import React, { Component } from 'react';

export class ProductEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id: props.product.id || '',
        name: props.product.name || '',
        category: props.product.category || '',
        price: props.product.price || '',
      },
    };
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState(state => {
      let newFormData = { ...state.formData };
      newFormData[name] = value;
      return { formData: newFormData };
    });

  handleClick = () =>
    this.props.saveCallback({
      ...this.state.formData,
      price: Number(this.state.formData.price),
    });

  render() {
    const { id, name, category, price } = this.state.formData;

    return (
      <div className="m-2">
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            name="id"
            id="id"
            className="form-control"
            value={id}
            onChange={this.handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={name}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            className="form-control"
            value={category}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            className="form-control"
            value={price}
            onChange={this.handleChange}
          />
        </div>

        <div className="text-center">
          <button className="btn btn-primary m-1" onClick={this.handleClick}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={this.props.cancelCallback}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
