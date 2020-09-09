import React, { Component } from 'react';
import { ProductTable } from './ProductTable';
import { ProductEditor } from './ProductEditor';
import { connect } from 'react-redux';
// import { saveProduct, deleteProduct } from './store/modelActionCreators';
import { PRODUCTS } from './store/dataTypes';
import { EditorConnector } from './store/EditorConnector';
import { TableConnector } from './store/TableConnector';
import { startCreatingProduct } from './store/stateActions';

const ConnectedEditor = EditorConnector(PRODUCTS, ProductEditor);
const ConnectedTable = TableConnector(PRODUCTS, ProductTable);

const mapStateToProps = dataStore => ({
  editing: dataStore.stateData.editing,
  selected:
    dataStore.modelData[PRODUCTS].find(
      item => item.id === dataStore.stateData.selectedId
    ) || {},
});

const mapDispatchToProps = {
  createProduct: startCreatingProduct,
};

const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export const ProductDisplay = connectFunction(
  class extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     showEditor: false,
    //     selectedProduct: null,
    //   };
    // }

    // startEditing = product =>
    //   this.setState({ showEditor: true, selectedProduct: product });

    // createProduct = () =>
    //   this.setState({ showEditor: true, selectedProduct: {} });

    // cancelEditing = () =>
    //   this.setState({ showEditor: false, selectedProduct: null });

    // saveProduct = product => {
    //   this.props.saveCallback(product);
    //   this.setState({ showEditor: false, selectedProduct: null });
    // };

    render() {
      if (this.props.editing) {
        return (
          // <ProductEditor
          //   key={this.state.selectedProduct.id || -1}
          //   product={this.state.selectedProduct}
          //   saveCallback={this.saveProduct}
          //   cancelCallback={this.cancelEditing}
          // />
          <ConnectedEditor key={this.props.selected.id || -1} />
        );
      } else {
        return (
          <div className="m-2">
            {/* <ProductTable
              products={this.props.products}
              editCallback={this.startEditing}
              deleteCallback={this.props.deleteCallback}
            /> */}
            <ConnectedTable />
            <div className="text-center">
              <button
                className="btn btn-primary m-1"
                onClick={this.props.createProduct}
              >
                Create product
              </button>
            </div>
          </div>
        );
      }
    }
  }
);
