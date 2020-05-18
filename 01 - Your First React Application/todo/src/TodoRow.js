import React, { Component } from 'react';

export default class TodoRow extends Component {
  render() {
    const { item, toggleTodo } = this.props;

    return (
      <tr>
        <td>{item.action}</td>
        <td>
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => toggleTodo(item)}
          />
        </td>
      </tr>
    );
  }
}
