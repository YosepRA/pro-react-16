import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ProductsRow extends Component {
  render() {
    const { id, name, category, price } = this.props.product;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{category}</td>
        <td className="text-right">{price.toFixed(2)}</td>
        <td className="text-center">
          <button
            className="btn btn-danger btn-sm mx-1"
            onClick={() => this.props.deleteProduct(id)}
          >
            Delete
          </button>

          <Link to={`/admin/products/${id}`} className="btn btn-sm btn-warning">
            Edit
          </Link>
        </td>
      </tr>
    );
  }
}
