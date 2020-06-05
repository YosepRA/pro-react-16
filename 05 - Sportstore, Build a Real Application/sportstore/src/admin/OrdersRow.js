import React, { Component } from 'react';

export class OrdersRow extends Component {
  calcTotal = products =>
    products
      .reduce((total, p) => (total += p.quantity * p.product.price), 0)
      .toFixed(2);

  getShipping = order =>
    order.shipped ? (
      <i className="fa fa-shipping-fast text-success"></i>
    ) : (
      <i className="fa fa-exclamation-circle text-danger"></i>
    );

  render() {
    const { id, name, email, shipped, products } = this.props.order;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td className="text-right">${this.calcTotal(products)}</td>
        <td className="text-center">
          <button
            className="btn btn-sm bg-muted btn-block"
            onClick={this.props.toggleShipped}
          >
            {this.getShipping(this.props.order)}
            <span> {shipped ? 'Shipped' : 'Pending'}</span>
          </button>
        </td>
      </tr>
    );
  }
}
