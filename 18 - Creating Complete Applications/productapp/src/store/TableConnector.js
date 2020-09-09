import { connect } from 'react-redux';
import { PRODUCTS, SUPPLIERS } from './dataTypes';
import { deleteProduct, deleteSupplier } from './modelActionCreators';
import { startEditingProduct, startEditingSupplier } from './stateActions';

export const TableConnector = (dataType, presenterComponent) => {
  const mapStateToProps = dataStore => ({
    products: dataStore.modelData[PRODUCTS],
    suppliers: dataStore.modelData[SUPPLIERS],
  });

  const mapDispatchToProps = {
    editCallback:
      dataType === PRODUCTS ? startEditingProduct : startEditingSupplier,
    deleteCallback: dataType === PRODUCTS ? deleteProduct : deleteSupplier,
  };

  return connect(mapStateToProps, mapDispatchToProps)(presenterComponent);
};
