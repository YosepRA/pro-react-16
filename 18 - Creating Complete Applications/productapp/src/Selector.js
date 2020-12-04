import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToggleLink } from './routing/ToggleLink';
import { RoutedDisplay } from './routing/RoutedDisplay';

export class Selector extends Component {
  render() {
    let routes = React.Children.map(this.props.children, child => ({
      component: child,
      name: child.props.name,
      url: `/${child.props.name.toLowerCase()}`,
      datatype: child.props.datatype,
    }));

    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              {routes.map(({ name, url }) => (
                <ToggleLink key={url} to={url}>
                  {name}
                </ToggleLink>
              ))}
            </div>

            <div className="col">
              <Switch>
                {routes.map(({ url, datatype }) => (
                  <Route
                    key={url}
                    path={`/:datatype(${datatype})/:mode?/:id?`}
                    component={RoutedDisplay(datatype)}
                  />
                ))}

                {/* <Redirect to={routes[0].url} /> */}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
