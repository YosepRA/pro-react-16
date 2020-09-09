import React, { Component } from 'react';
import { SupplierEditor } from './SupplierEditor';
import { SupplierTable } from './SupplierTable';
import { connect } from 'react-redux';
// import { saveSupplier, deleteSupplier } from './store';
import { SUPPLIERS } from './store/dataTypes';
import { EditorConnector } from './store/EditorConnector';
import { TableConnector } from './store/TableConnector';
import { startCreatingSupplier } from './store/stateActions';

const ConnectedEditor = EditorConnector(SUPPLIERS, SupplierEditor);
const ConnectedTable = TableConnector(SUPPLIERS, SupplierTable);

const mapStateToProps = dataStore => ({
  editing: dataStore.stateData.editing,
  selected:
    dataStore.modelData[SUPPLIERS].find(
      item => item.id === dataStore.stateData.selectedId
    ) || {},
});

const mapDispatchToProps = {
  createSupplier: startCreatingSupplier,
};

const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export const SupplierDisplay = connectFunction(
  class SupplierDisplay extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     showEditor: false,
    //     selected: null,
    //   };
    // }

    // startEditing = supplier =>
    //   this.setState({ showEditor: true, selected: supplier });

    // createSupplier = () => this.setState({ showEditor: true, selected: {} });

    // cancelEditing = () => this.setState({ showEditor: false, selected: null });

    // saveSupplier = supplier => {
    //   this.props.saveCallback(supplier);
    //   this.setState({ showEditor: false, selected: null });
    // };

    render() {
      if (this.props.editing) {
        return (
          // <SupplierEditor
          //   key={this.state.selected.id || -1}
          //   supplier={this.state.selected}
          //   saveCallback={this.saveSupplier}
          //   cancelCallback={this.cancelEditing}
          // />
          <ConnectedEditor key={this.props.selected.id || -1} />
        );
      } else {
        return (
          <div className="m-2">
            {/* <SupplierTable
              suppliers={this.props.suppliers}
              editCallback={this.startEditing}
              deleteCallback={this.props.deleteCallback}
            /> */}
            <ConnectedTable />
            <div className="text-center">
              <button
                className="btn btn-primary m-1"
                onClick={this.props.createSupplier}
              >
                Create supplier
              </button>
            </div>
          </div>
        );
      }
    }
  }
);
