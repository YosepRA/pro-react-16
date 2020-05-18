import React, { Component } from 'react';

export default class TodoCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { newItemText: '' };
  }

  updateNewTextValue = ({ target }) => {
    this.setState({ newItemText: target.value });
  };

  createNewTodo = () => {
    this.props.callback(this.state.newItemText);
    this.setState({ newItemText: '' });
  };

  render() {
    return (
      <div className="my-1">
        <input
          type="text"
          className="form-control"
          value={this.state.newItemText}
          onChange={this.updateNewTextValue}
        />
        <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>
          Add
        </button>
      </div>
    );
  }
}
