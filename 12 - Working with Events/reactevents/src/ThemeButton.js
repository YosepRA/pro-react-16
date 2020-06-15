import React, { Component } from 'react';

export class ThemeButton extends Component {
  handleClick = (event, capture = false) => {
    console.log(
      `ThemeButton: Type: ${event.type} Target: ${event.target.tagName} Current target: ${event.currentTarget.tagName}`
    );
    // An alternative way to differentiate event phases because React always give an indication of "bubbling" ~
    // ~ phase whenever an event is triggered.
    if (capture) {
      if (this.props.theme === 'danger') {
        event.stopPropagation();
        console.log('Event stopped');
      } else {
        console.log('Skipped function prop: Capture phase');
      }
    } else if (event.bubbles && event.target !== event.currentTarget) {
      console.log('Skipped function prop: Bubble phase');
    } else {
      console.log('Invoked function prop');
      this.props.callback(this.props.theme);
    }
  };

  render() {
    return (
      <span
        className="m-1"
        onClick={this.handleClick}
        onClickCapture={event => this.handleClick(event, true)}
      >
        <button
          className={`btn btn-${this.props.theme}`}
          onClick={this.handleClick}
        >
          Select {this.props.theme} theme
        </button>
      </span>
    );
  }
}
