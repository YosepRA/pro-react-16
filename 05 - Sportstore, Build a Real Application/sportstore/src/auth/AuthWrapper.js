import React, { Component } from 'react';
import { AuthContext } from './AuthContext';

export const authWrapper = WrappedComponent =>
  // eslint-disable-next-line react/display-name
  class extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {context => <WrappedComponent {...this.props} {...context} />}
        </AuthContext.Consumer>
      );
    }
  };
