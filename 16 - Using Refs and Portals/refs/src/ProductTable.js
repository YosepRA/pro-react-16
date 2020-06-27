import React, { Component } from 'react';

export class ProductTable extends Component {
  render() {
    return (
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map(({ name, category, price }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{category}</td>
              <td>{Number(price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
