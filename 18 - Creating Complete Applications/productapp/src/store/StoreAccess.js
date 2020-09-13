import React, { Component, Fragment } from 'react';
// import { startCreatingProduct } from './stateActions';
import { resetStore } from './customReducerEnhancer';

// The store created from Redux's "createStore" also have some APIs that you can use.
// It's basically a principle about mediator package where it will ease the interaction with a core package. ~
// ~ It's not an absolute necessity to use mediator package in order to use core package. The core package ~
// ~ will often have its own API to interact with.
// Example (Core - Mediator):
// Redux - React-Redux
// MongoDB - Mongoose
// NodeJS - Express

export class StoreAccess extends Component {
  constructor(props) {
    super(props);
    this.selectors = {
      products: dataStore => dataStore.modelData.products[0],
      state: dataStore => dataStore.stateData,
    };
    this.state = this.selectData();
    this.buttonRef = React.createRef();
  }

  selectData() {
    // "getState" will get all of the data inside the store.
    // This component is also a way to select only a few of them.
    let storeData = this.props.store.getState();
    return Object.entries(this.selectors)
      .map(([key, value]) => [key, value(storeData)])
      .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
  }

  handleDataStoreChange() {
    let newData = this.selectData();
    // Basically finding changes from new data and apply it to this component's state to trigger an update phase.
    Object.keys(this.selectors)
      .filter(key => this.state[key] !== newData[key])
      .forEach(key => this.setState({ [key]: newData[key] }));
  }

  dispatchAction = () => {
    this.buttonRef.current.disabled = true;
    this.props.store
      .dispatchAsync(resetStore())
      .then(() => (this.buttonRef.current.disabled = false));
  };

  render() {
    return (
      <Fragment>
        <div className="text-center">
          <button
            className="btn btn-primary m-1"
            onClick={this.dispatchAction}
            ref={this.buttonRef}
          >
            Reset store
          </button>
        </div>

        <div className="bg-info">
          <pre className="text-white">
            {JSON.stringify(this.state, null, 2)}
          </pre>
        </div>
      </Fragment>
    );
  }

  componentDidMount() {
    // "subscribe" will dispatch an event when there is changes in the data store. It's also returning a function ~
    // ~ that can be used to unsubscribe from the update events.
    this.unsubscriber = this.props.store.subscribe(() =>
      this.handleDataStoreChange()
    );
  }

  componentWillUnmount() {
    this.unsubscriber();
  }
}
