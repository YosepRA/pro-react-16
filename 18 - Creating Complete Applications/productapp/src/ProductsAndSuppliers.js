import React, { Component } from 'react';
import { Selector } from './Selector';
import { ProductDisplay } from './ProductDisplay';
import { SupplierDisplay } from './SupplierDisplay';

export class ProductsAndSuppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, name: 'Kayak', category: 'Watersports', price: 275 },
        { id: 2, name: 'Lifejacket', category: 'Watersports', price: 48.95 },
        { id: 3, name: 'Soccer Ball', category: 'Soccer', price: 19.5 },
      ],
      suppliers: [
        { id: 1, name: 'Surf Dudes', city: 'San Jose', products: [1, 2] },
        { id: 2, name: 'Field Supplies', city: 'New York', products: [3] },
      ],
    };
    this.idCounter = 100;
  }

  saveData = (collection, item) => {
    if (item.id === '') {
      // Assign the current counter value as new item's ID, then increment the counter for the next new item.
      item.id = this.idCounter++;
      this.setState({ [collection]: this.state[collection].concat(item) });
    } else {
      // If one of the item has the same ID, return the updated item. Else, return the original as it is.
      this.setState({
        [collection]: this.state[collection].map(stored =>
          stored.id === item.id ? item : stored
        ),
      });
    }
  };

  deleteData = (collection, item) =>
    this.setState({
      [collection]: this.state[collection].filter(
        stored => stored.id !== item.id
      ),
    });

  render() {
    return (
      <div>
        <Selector>
          <ProductDisplay
            name="Products"
            products={this.state.products}
            saveCallback={p => this.saveData('products', p)}
            deleteCallback={p => this.deleteData('products', p)}
          />
          <SupplierDisplay
            name="Suppliers"
            suppliers={this.state.suppliers}
            saveCallback={s => this.saveData('suppliers', s)}
            deleteCallback={s => this.deleteData('suppliers', s)}
          />
        </Selector>
      </div>
    );
  }
}
