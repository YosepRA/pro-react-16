import React, { Component } from 'react';

export class SupplierEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id: props.supplier.id || '',
        name: props.supplier.name || '',
        city: props.supplier.city || '',
        products:
          props.supplier.products != null
            ? props.supplier.products.map(({ id }) => id)
            : [],
      },
    };
  }

  handleChange = ({ target: { name, value } }) => {
    let newFormData = { ...this.state.formData };
    newFormData[name] = name === 'products' ? value.split(',') : value;
    this.setState({ formData: newFormData });
  };

  handleClick = () =>
    this.props.saveCallback({
      ...this.state.formData,
      products: this.state.formData.products.map(val => Number(val)),
    });

  render() {
    const { id, name, city, products } = this.state.formData;

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
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            className="form-control"
            value={city}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="products">Products</label>
          <input
            type="text"
            name="products"
            id="products"
            className="form-control"
            value={products}
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
