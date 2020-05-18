import React, { Component } from 'react';

export default class VisibilityControl extends Component {
  render() {
    const { isChecked, description, callback } = this.props;

    return (
      <div className="form-check">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={({ target }) => callback(target.checked)}
        />
        <label className="form-check-label">Show {description}</label>
      </div>
    );
  }
}
