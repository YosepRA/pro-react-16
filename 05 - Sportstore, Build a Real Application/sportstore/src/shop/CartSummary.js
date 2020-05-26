import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CartSummary extends Component {
  getSummary = () => {
    if (this.props.cartItems > 0)
      return (
        <span>
          {this.props.cartItems} item{this.props.cartItems > 1 && 's'}, $
          {this.props.cartPrice.toFixed(2)}
        </span>
      );
    else return <span>Your cart: (empty)</span>;
  };

  getLinkClasses = () =>
    `btn btn-sm btn-dark text-white ${!this.props.cartItems ? 'disabled' : ''}`;

  render() {
    return (
      <div className="float-right">
        <small>
          {this.getSummary()}
          <Link className={this.getLinkClasses()} to="/shop/cart">
            <i className="fa fa-shopping-cart"></i>
          </Link>
        </small>
      </div>
    );
  }
}
