import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

export class ToggleLink extends Component {
  constructor() {
    super();
    this.state = {
      doRedirect: false,
    };
  }

  // handleClick = history => history.push(this.props.to);

  handleClick = () =>
    this.setState({ doRedirect: true }, () =>
      this.setState({ doRedirect: false })
    );

  render() {
    return (
      <Route path={this.props.to} exact={this.props.exact}>
        {routeProps => {
          const baseClass = this.props.className || 'm-2 btn btn-block';
          const activeClass = this.props.activeClass || 'btn-primary';
          const inActiveClass = this.props.inActiveClass || 'btn-secondary';

          const combinedClass = `${baseClass} ${
            routeProps.match ? activeClass : inActiveClass
          }`;

          return (
            <Link to={this.props.to} className={combinedClass}>
              {this.props.children}
            </Link>
          );

          // return (
          //   <React.Fragment>
          //     {this.state.doRedirect && <Redirect to={this.props.to} />}
          //     <button
          //       className={combinedClass}
          //       onClick={() => this.handleClick(routeProps.history)}
          //     >
          //       {this.props.children}
          //     </button>
          //   </React.Fragment>
          // );
        }}
      </Route>
    );
  }
}
