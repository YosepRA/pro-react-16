import React, { Component } from 'react';

export const CustomConnectorContext = React.createContext();

export class CustomConnectorProvider extends Component {
  render() {
    return (
      <CustomConnectorContext.Provider value={this.props.dataStore}>
        {this.props.children}
      </CustomConnectorContext.Provider>
    );
  }
}

export class CustomConnector extends Component {
  // Defining static contextType will give component a "context" property that refers to the assigned ~
  // ~ context. Basically another way to consume data from context.
  static contextType = CustomConnectorContext;

  constructor(props, context) {
    super(props, context);
    this.state = this.selectData();
    // "dispatchers" will be given as props and it will contain action creators as methods.
    // What we want is to wrap these action methods with Redux dispatch method so that it gets sent ~
    // ~ to reducers.
    this.functionProps = Object.entries(props.dispatchers)
      .map(([key, value]) => [
        key,
        (...args) => this.context.dispatch(value(...args)),
      ])
      .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
  }

  selectData() {
    let dataStore = this.context.getState();
    return Object.entries(this.props.selectors)
      .map(([key, value]) => [key, value(dataStore)])
      .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
  }

  handleDataStoreChanges() {
    let newData = this.selectData();

    Object.keys(this.props.selectors)
      .filter(key => this.state[key] !== newData[key])
      .forEach(key => this.setState({ [key]: newData[key] }));
  }

  render() {
    // Mapping connector component's children all the selected data store values and its action creators.
    return React.Children.map(this.props.children, c =>
      React.cloneElement(c, { ...this.state, ...this.functionProps })
    );
  }

  componentDidMount() {
    this.unsubscriber = this.context.subscribe(() =>
      this.handleDataStoreChanges()
    );
  }

  componentWillUnmount() {
    this.unsubscriber();
  }
}
