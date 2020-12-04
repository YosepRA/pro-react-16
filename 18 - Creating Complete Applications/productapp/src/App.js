import React, { Component } from 'react';
import { Provider } from 'react-redux';
import dataStore from './store';
import { Selector } from './Selector';
// import { ProductDisplay } from './ProductDisplay';
// import { SupplierDisplay } from './SupplierDisplay';
import { PRODUCTS, SUPPLIERS } from './store/dataTypes';

export default class App extends Component {
  render() {
    return (
      <Provider store={dataStore}>
        <Selector>
          <data datatype={PRODUCTS} name="Products" />
          <data datatype={SUPPLIERS} name="Suppliers" />
        </Selector>
      </Provider>
    );
  }
}
