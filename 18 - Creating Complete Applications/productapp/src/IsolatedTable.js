import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { RestDataSource } from './webservice/RestDataSource';

export class IsolatedTable extends Component {
  constructor(props) {
    super();
    this.state = {
      products: [],
    };
    this.dataSource = new RestDataSource(
      'http://localhost:3500/api/products',
      err => props.history.push(`/error/${err}`)
    );
  }

  deleteProduct(product) {
    this.dataSource.Delete(product, () =>
      this.setState({
        products: this.state.products.filter(p => p.id !== product.id),
      })
    );
  }

  render() {
    return (
      <table className="table table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th colSpan="5" className="bg-info text-white text-center h4 p-2">
              (Isolated) Products
            </th>
          </tr>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th className="text-right">Price</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {this.state.products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td className="text-right">${Number(p.price).toFixed(2)}</td>
              <td>
                <Link
                  to={`/isolated/edit/${p.id}`}
                  className="btn btn-sm btn-warning mx-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-sm btn-danger mx-2"
                  onClick={() => this.deleteProduct(p)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="text-center">
            <td colSpan="5">
              <Link to="/isolated/create" className="btn btn-info">
                Create
              </Link>

              <button
                className="btn btn-danger mx-2"
                onClick={() => this.dataSource.GetOne('err')}
              >
                Error
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }

  componentDidMount() {
    this.dataSource.GetData(data => this.setState({ products: data }));
  }
}
