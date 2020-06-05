import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PaginationControls } from '../PaginationControls';
import { ProductsRow } from './ProductsRow';

export class ProductsTable extends Component {
  render() {
    return (
      <div>
        <h4 className="bg-info text center text-white p-2">
          {this.props.totalSize} Products
        </h4>

        <PaginationControls keys={['ID', 'Name', 'Category']} {...this.props} />

        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Category</td>
              <td className="text-right">Price</td>
              <td className="text-center"></td>
            </tr>
          </thead>

          <tbody>
            {this.props.products.map(p => (
              <ProductsRow
                key={p.id}
                product={p}
                deleteProduct={this.props.deleteProduct}
              />
            ))}
          </tbody>
        </table>

        <div className="text-center">
          <Link to="/admin/products/create" className="btn btn-primary">
            Create Product
          </Link>
        </div>
      </div>
    );
  }
}
