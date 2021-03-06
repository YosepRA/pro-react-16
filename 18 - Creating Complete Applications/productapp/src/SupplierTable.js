import React, { Component } from 'react';
import { SupplierTableRow } from './SupplierTableRow';

export class SupplierTable extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="bg-primary text-white text-center p-2">Suppliers</h2>

        <table className="table table-bordered table-striped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Products</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.suppliers.map(s => (
              <SupplierTableRow
                key={s.id}
                supplier={s}
                editCallback={this.props.editCallback}
                deleteCallback={this.props.deleteCallback}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
