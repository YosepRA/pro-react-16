import React, { Component } from 'react';
import TodoBanner from './TodoBanner';
import TodoRow from './TodoRow';
import TodoCreator from './TodoCreator';
import VisibilityControl from './VisibilityControl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Adam',
      todoItems: [
        { action: 'Buy flower', done: false },
        { action: 'Feed the dog', done: false },
        { action: 'Paint the wall', done: true },
        { action: 'Clean the garage', done: false },
      ],
      showCompleted: true,
    };
  }

  // Inspecting the difference between normal method and arrow method.
  // This type of method will be assigned DIRECTLY to the instances of a class rather than as a ~
  // ~ prototype method. Therefore when called, the context will refer to each instance object.
  // changeStateData = () => {
  //   this.setState(state => {
  //     return {
  //       userName: state.userName === 'Adam' ? 'Bob' : 'Adam',
  //     };
  //   });
  // };

  // This "normal" method will be assigned as a prototype method, in other words, a normal function ~
  // ~ rather than an arrow function. Therefore its context will refer depending on the way it's called.
  // changeStateData() {
  //   console.log(this.__proto__);
  //   this.setState(state => {
  //     return {
  //       userName: state.userName === 'Adam' ? 'Bob' : 'Adam',
  //     };
  //   });
  // }

  createNewTodo = todo => {
    this.setState(state => {
      if (!state.todoItems.some(({ action }) => action === todo)) {
        return {
          todoItems: [...state.todoItems, { action: todo, done: false }],
        };
      }
    }, this.saveData);
  };

  todoTableRows = doneValue =>
    this.state.todoItems
      .filter(item => item.done === doneValue)
      .map(item => (
        <TodoRow key={item.action} item={item} toggleTodo={this.toggleTodo} />
      ));

  toggleTodo = todo => {
    this.setState(state => {
      return {
        todoItems: state.todoItems.map(item =>
          item.action === todo.action ? { ...item, done: !item.done } : item
        ),
      };
    }, this.saveData);
  };

  saveData = () => localStorage.setItem('todos', JSON.stringify(this.state));

  // Lifecycie method.
  componentDidMount = () => {
    let data = localStorage.getItem('todos');

    this.setState(
      data
        ? JSON.parse(data)
        : {
            userName: 'Adam',
            todoItems: [
              { action: 'Buy flower', done: false },
              { action: 'Feed the dog', done: false },
              { action: 'Paint the wall', done: true },
              { action: 'Clean the garage', done: false },
            ],
            showCompleted: true,
          }
    );
  };

  render() {
    return (
      <div>
        <TodoBanner
          userName={this.state.userName}
          todoItems={this.state.todoItems}
        />

        <div className="container-fluid">
          <TodoCreator callback={this.createNewTodo} />

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>

            <tbody>{this.todoTableRows(false)}</tbody>
          </table>

          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl
              isChecked={this.state.showCompleted}
              description={'Completed Tasks'}
              callback={checked => this.setState({ showCompleted: checked })}
            />
          </div>

          {this.state.showCompleted && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>{this.todoTableRows(true)}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
