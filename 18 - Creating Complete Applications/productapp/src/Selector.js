import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ProductDisplay } from './ProductDisplay';
import { SupplierDisplay } from './SupplierDisplay';

export class Selector extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selection: React.Children.toArray(props.children)[0].props.name,
  //   };
  // }

  // setSelection = ({ target: { name } }) => this.setState({ selection: name });

  renderMessage(msg) {
    return <h5 className="bg-info text-white m-2 p-2">{msg}</h5>;
  }

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              {/* {React.Children.map(this.props.children, ({ props: { name } }) => (
              <button
                name={name}
                onClick={this.setSelection}
                className={`btn btn-block m-2 ${
                  this.state.selection === name
                    ? 'btn-primary active'
                    : 'btn-secondary'
                }`}
              >
                {name}
              </button>
            ))} */}

              {/* React Router */}
              {/* <div>
                <Link to="/products">Products</Link>
              </div>
              <div>
                <Link to="/suppliers">Suppliers</Link>
              </div> */}

              <NavLink
                to="/"
                className="btn btn-primary btn-block m-2"
                activeClassName="active"
                exact={true}
              >
                Default
              </NavLink>

              <NavLink
                to="/products"
                className="btn btn-primary btn-block m-2"
                activeClassName="active"
              >
                Products
              </NavLink>

              <NavLink
                to="/suppliers"
                className="btn btn-primary btn-block m-2"
                activeClassName="active"
              >
                Suppliers
              </NavLink>

              <NavLink
                to="/old/data"
                className="btn btn-primary btn-block m-2"
                activeClassName="active"
              >
                Old Data
              </NavLink>
            </div>

            <div className="col">
              {/* {React.Children.toArray(this.props.children).filter(
              child => child.props.name === this.state.selection
            )} */}

              {/* React Router */}
              {/* "component" prop provides simplicity when you have a self-contained (independent) component that don't
              require any more props for it to work properly. */}
              {/* <Route path="/products" component={ProductDisplay} />
              <Route path="/suppliers" component={SupplierDisplay} /> */}

              {/* "render" prop offers more customization by giving us a chance to provide more props or create new component
              on the line. We are also given "routeProps" if we ever need to use React-Router state. */}
              {/* <Route
                path="/products"
                render={routeProps => <ProductDisplay myProp="myValue" />}
              />
              <Route
                path="/suppliers"
                component={routeProps => (
                  <React.Fragment>
                    <h4 className="bg-info text-white text-center p-2">
                      Suppliers
                    </h4>
                    <SupplierDisplay />
                  </React.Fragment>
                )}
              /> */}

              <Switch>
                <Route path="/products" component={ProductDisplay} />
                <Route path="/suppliers" component={SupplierDisplay} />
                <Redirect from="/old/data" to="/suppliers" />
                <Redirect to="/products" />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
