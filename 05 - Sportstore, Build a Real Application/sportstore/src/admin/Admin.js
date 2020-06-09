import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { GraphQLUrl } from '../data/Urls';
import { OrdersConnector } from './OrdersConnector';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToggleLink } from '../ToggleLink';
import { ProductCreator } from './ProductCreator';
import { ProductEditor } from './ProductEditor';
import { ConnectedProducts } from './ProductsConnector';
import { AuthPrompt } from '../auth/AuthPrompt';
import { authWrapper } from '../auth/AuthWrapper';

export default authWrapper(
  // eslint-disable-next-line react/display-name
  class extends Component {
    constructor(props) {
      super(props);
      this.client = new ApolloClient({
        uri: GraphQLUrl,
        request: gqloperation =>
          gqloperation.setContext({
            headers: {
              Authorization: `Bearer<${this.props.webToken}>`,
            },
          }),
      });
    }

    render() {
      return (
        <ApolloProvider client={this.client}>
          <div className="container-fluid">
            <div className="row">
              <div className="col bg-info text-white">
                <div className="navbar-brand">SPORT STORE</div>
              </div>
            </div>

            <div className="row">
              <div className="col-3 p-2">
                <ToggleLink to="/admin/orders">Orders</ToggleLink>
                <ToggleLink to="/admin/products">Products</ToggleLink>
                {this.props.isAuthenticated && (
                  <button
                    className="btn btn-block btn-secondary m-2 fixed-bottom col-3"
                    onClick={this.props.signout}
                  >
                    Log out
                  </button>
                )}
              </div>
              <div className="col-9 p-2">
                <Switch>
                  {!this.props.isAuthenticated && (
                    <Route component={AuthPrompt} />
                  )}
                  <Route path="/admin/orders" component={OrdersConnector} />
                  <Route
                    path="/admin/products/create"
                    component={ProductCreator}
                  />
                  <Route path="/admin/products/:id" component={ProductEditor} />
                  <Route path="/admin/products" component={ConnectedProducts} />

                  <Redirect to="/admin/orders" />
                </Switch>
              </div>
            </div>
          </div>
        </ApolloProvider>
      );
    }
  }
);
