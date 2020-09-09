import { connect } from 'react-redux';
import { PRODUCTS, SUPPLIERS } from './dataTypes';
import { saveProduct, saveSupplier } from './modelActionCreators';
import { endEditing } from './stateActions';

export const EditorConnector = (dataType, presenterComponent) => {
  const mapStateToProps = dataStore => ({
    editing:
      dataStore.stateData.editing &&
      dataStore.stateData.selectedType === dataType,
    product:
      dataStore.modelData[PRODUCTS].find(
        p => p.id === dataStore.stateData.selectedId
      ) || {},
    supplier:
      dataStore.modelData[SUPPLIERS].find(
        p => p.id === dataStore.stateData.selectedId
      ) || {},
  });

  const mapDispatchToProps = {
    saveCallback: dataType === PRODUCTS ? saveProduct : saveSupplier,
    cancelCallback: endEditing,
  };

  return connect(mapStateToProps, mapDispatchToProps)(presenterComponent);
};
