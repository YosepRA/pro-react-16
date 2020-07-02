import React, { Component } from 'react';

export class ProductTableRow extends Component {
  render() {
    let p = this.props.product;
    const { id, name, category, price } = p;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{category}</td>
        <td className="text-right">${Number(price).toFixed(2)}</td>
        <td>
          <button
            className="btn btn-warning sm m-1"
            onClick={() => this.props.editCallback(p)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger sm m-1"
            onClick={() => this.props.deleteCallback(p)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
