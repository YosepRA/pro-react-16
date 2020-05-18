import React, { Component } from 'react';

export default class TodoBanner extends Component {
  render() {
    const { userName, todoItems } = this.props;

    return (
      <h4 className="bg-primary text-white text-center p-2">
        {userName}&lsquo;s To Do List (
        {todoItems.filter(({ done }) => !done).length} items to do)
      </h4>
    );
  }
}
