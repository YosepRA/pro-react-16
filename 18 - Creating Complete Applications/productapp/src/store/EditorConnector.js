import { connect } from 'react-redux';
import { PRODUCTS, SUPPLIERS } from './dataTypes';
// import { saveProduct, saveSupplier } from './modelActionCreators';
import { endEditing } from './stateActions';
import { saveAndEndEditing } from './multiActionCreators';

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

  // const mapDispatchToProps = {
  //   saveCallback: dataType === PRODUCTS ? saveProduct : saveSupplier,
  //   cancelCallback: endEditing,
  // };
  // When connect function is passed an object for its action creators, it will wrap each of these creator functions ~
  // ~ in this kind of format:

  // const mapDispatchToProps = {
  //   cancelCallback: endEditing
  // }

  // Becomes...

  // const mapDispatchToProps = {
  //   cancelCallback: payload => dispatch(endEditing(payload))
  // }

  // Note at the "dispatch" function because it's the one which glues action creators to reducers, and thus triggers ~
  // ~ the update phase.
  // There might be occassions where you'd need to execute two different action creators sequintially. Looking at the ~
  // ~ pattern above, we can explicitly call the dispatch function to send action objects to reducers. A way to do ~
  // ~ this is to give "connect" a function instead of object. If we give "connect" a function, it will give the function ~
  // ~ a dispatch function as an argument to it, enabling us to make an explicit call to trigger update phase.
  // const mapDispatchToProps = dispatch => ({
  //   cancelCallback: () => dispatch(endEditing()),
  //   saveCallback: data => {
  //     dispatch((dataType === PRODUCTS ? saveProduct : saveSupplier)(data));
  //     dispatch(endEditing());
  //   },
  // });

  // At this point, the app has an action creator and middleware which can accept multiple actions.
  const mapDispatchToProps = {
    saveCallback: data => saveAndEndEditing(data, dataType),
    cancelCallback: endEditing,
  };

  return connect(mapStateToProps, mapDispatchToProps)(presenterComponent);
};
