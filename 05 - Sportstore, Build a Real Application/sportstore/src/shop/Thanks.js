import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Thanks extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div className="col bg-dark text-white">
          <div className="navbar-brand">SPORT STORE</div>
        </div>
        <div className="m-2 text-center">
          <h2>Thanks!</h2>
          <p>Thanks for placing your order.</p>
          <p>Your order is #{this.props.orders ? this.props.orders.id : 0}</p>
          <p>We&apos;ll ship your product as soon as possible.</p>
          <Link to="/shop" className="btn btn-primary">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }
}
