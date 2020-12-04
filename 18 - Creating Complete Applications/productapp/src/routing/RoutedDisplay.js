import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../store/dataTypes';
import { ProductTable } from '../ProductTable';
import { ProductEditor } from '../ProductEditor';
import { SupplierTable } from '../SupplierTable';
import { SupplierEditor } from '../SupplierEditor';
import { TableConnector } from '../store/TableConnector';
import { EditorConnector } from '../store/EditorConnector';

export const RoutedDisplay = dataType => {
  const ConnectedTable = TableConnector(
    dataType,
    dataType === PRODUCTS ? ProductTable : SupplierTable
  );
  const ConnectedEditor = EditorConnector(
    dataType,
    dataType === PRODUCTS ? ProductEditor : SupplierEditor
  );

  return class extends Component {
    render() {
      const modeParam = this.props.match.params.mode;

      if (modeParam === 'edit' || modeParam === 'create') {
        return <ConnectedEditor key={this.props.match.params.id || -1} />;
      } else {
        return (
          <div className="m-2">
            <ConnectedTable />

            <div className="text-center">
              <Link to={`/${dataType}/create`} className="btn btn-primary m-1">
                Create
              </Link>
            </div>
          </div>
        );
      }
    }
  };
};
