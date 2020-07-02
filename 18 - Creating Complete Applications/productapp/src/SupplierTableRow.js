import React, { Component } from 'react';

export class SupplierTableRow extends Component {
  render() {
    let s = this.props.supplier;
    const { id, name, city, products } = s;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{city}</td>
        <td>{products.join(', ')}</td>
        <td>
          <button
            className="btn btn-sm btn-warning m-1"
            onClick={() => this.props.editCallback(s)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger m-1"
            onClick={() => this.props.deleteCallback(s)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
