import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PRODUCTS, SUPPLIERS } from './dataTypes';
import { deleteProduct, deleteSupplier } from './modelActionCreators';
// import { getData } from '../webservice/RestMiddleware';
import { getData } from '../graphql/GraphQLMiddleware';
import { DataGetter } from '../DataGetter';

export const TableConnector = (dataType, presenterComponent) => {
  // const mapStateToProps = dataStore => ({
  //   products: dataStore.modelData[PRODUCTS],
  //   suppliers: dataStore.modelData[SUPPLIERS],
  // });

  // The importance of reference.
  // If you notice, we have been using and storing product's IDs instead of the whole product object. ~
  // ~ In many cases, using the whole object might be more helpful because of its straightforward nature ~
  // ~ and you don't have to think much about passing such bloat of data around your application.
  // And as I said, storing the whole object might bloat your data store with unnecessary data where ~
  // ~ each of your app's componenet might only need a few of them. That's why storing a reference, ~
  // ~ in this case an ID, will slim  your data store. Yes, there will be more work when it comes to ~
  // ~ populating your data, but that will be worth it because then you can select only the needed ~
  // ~ data for a particular component.
  // This is just a pattern, however. Don't feel obliged to use this all the time, but it's good to ~
  // ~ keep this trick in mind.
  // const mapStateToProps = dataStore => ({
  //   products: dataStore.modelData[PRODUCTS],
  //   suppliers: dataStore.modelData[SUPPLIERS].map(sup => ({
  //     ...sup,
  //     products: sup.products
  //       .map(
  //         id =>
  //           dataStore.modelData[PRODUCTS].find(p => p.id === Number(id)) || id
  //       )
  //       .map(item => item.name || item),
  //   })),
  // });

  // Additional argument to the selector function.
  // const mapStateToProps = (dataStore, ownProps) => {
  //   if (dataType === PRODUCTS) {
  //     return {
  //       products: dataStore.modelData[PRODUCTS],
  //     };
  //   } else {
  //     return {
  //       suppliers: dataStore.modelData[SUPPLIERS].map(sup => ({
  //         ...sup,
  //         products: sup.products
  //           .map(
  //             id =>
  //               dataStore.modelData[PRODUCTS].find(p => p.id === Number(id)) ||
  //               id
  //           )
  //           .map(item => item.name || item),
  //       })),
  //     };
  //   }
  // };

  // With the addition of GraphQL, suppliers no longer need a separate product mapping because GraphQL ~
  // ~ query has done the products mapping.
  const mapStateToProps = dataStore => {
    if (dataType === PRODUCTS) {
      return {
        products: dataStore.modelData[PRODUCTS],
      };
    } else {
      return {
        suppliers: dataStore.modelData[SUPPLIERS],
      };
    }
  };

  // Additional argument to the function props map (when defined as a function).
  const mapDispatchToProps = (dispatch, ownProps) => ({
    getData: type => dispatch(getData(type)),
    deleteCallback:
      dataType === PRODUCTS
        ? (...args) => dispatch(deleteProduct(...args))
        : (...args) => dispatch(deleteSupplier(...args)),
  });

  const mergeProps = (stateProps, dispatchProps, ownProps) => {
    let routedDispatchers = {
      editCallback: target => {
        ownProps.history.push(`/${dataType}/edit/${target.id}`);
      },
      deleteCallback: dispatchProps.deleteCallback,
      getData: dispatchProps.getData,
    };

    return Object.assign({}, stateProps, routedDispatchers, ownProps);
  };

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps
    )(DataGetter(dataType, presenterComponent))
  );
};
