import React, { Component } from 'react';
import { ProModeContext } from './ProModeContext';

export class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
    };
  }

  getClasses(proMode) {
    let theme = proMode ? this.props.theme : 'danger';
    return `btn btn-${theme} m-2`;
  }

  handleClick = () => {
    this.setState({ clickCount: this.state.clickCount + 1 });
    this.props.callback();
  };

  render() {
    // return (
    //   <button
    //     className={`btn btn-${this.props.theme} m-2`}
    //     onClick={this.props.callback}
    //   >
    //     {this.props.text}
    //   </button>
    // );

    // ======================================================================================================== //

    return (
      <ProModeContext.Consumer>
        {contextData => {
          if (this.state.clickCount > 1) throw new Error('Click counter error');

          return (
            <button
              className={this.getClasses(contextData.proMode)}
              disabled={!contextData.proMode}
              onClick={this.handleClick}
            >
              {this.props.text}
            </button>
          );
        }}
      </ProModeContext.Consumer>
    );
  }
}
