/* CHAPTER 10 */

// import React from 'react';
// import PropTypes from 'prop-types';

// export function SimpleButton(props) {
//   return (
//     <button
//       onClick={props.callback}
//       className={props.className}
//       disabled={props.disabled === 'true' || props.disabled === true}
//     >
//       {props.text}
//     </button>
//   );
// }

// SimpleButton.defaultProps = {
//   disabled: false,
// };

// SimpleButton.propTypes = {
//   text: PropTypes.string,
//   theme: PropTypes.string,
//   callback: PropTypes.func,
//   className: PropTypes.string,
//   // "oneOfType" will validate to one of the expected PropTypes data.
//   disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
// };

// ======================================================================================================== //

/* CHAPTER 11 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SimpleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasButtonBeenClicked: false,
    };
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={this.props.className}
        disabled={
          this.props.disabled === 'true' || this.props.disabled === true
        }
      >
        {this.props.text} {this.props.counter}{' '}
        {this.state.hasButtonBeenClicked && <div>Button clicked!</div>}
      </button>
    );
  }

  handleClick = () => {
    this.props.incrementCallback(5);
    this.setState({ hasButtonBeenClicked: true });
    this.props.callback();
  };

  static defaultProps = {
    disabled: false,
  };

  static propTypes = {
    text: PropTypes.string,
    theme: PropTypes.string,
    callback: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  };
}
