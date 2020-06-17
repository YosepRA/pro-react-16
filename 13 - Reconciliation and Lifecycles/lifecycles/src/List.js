import React, { Component } from 'react';
import { ActionButton } from './ActionButton';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: ['Bob', 'Alice', 'Dora'],
    };
  }

  reverseList = () => this.setState({ names: this.state.names.reverse() });

  render() {
    console.log('Render List component');
    return (
      <div>
        <ActionButton text="Reverse Names" callback={this.reverseList} />
        {this.state.names.map(name => (
          <h5 id={name.toLowerCase()} key={name}>
            {name}
          </h5>
        ))}
      </div>
    );
  }
}
