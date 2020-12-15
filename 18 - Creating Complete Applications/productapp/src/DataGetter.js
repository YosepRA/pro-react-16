import React, { Component } from 'react';

export const DataGetter = (dataType, WrappedComponent) => {
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      this.props.getData(dataType);
    }
  };
};
