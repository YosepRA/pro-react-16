import React, { Component } from 'react';

export class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: React.Children.toArray(props.children)[0].props.name,
    };
  }

  setSelection = ({ target: { name } }) => this.setState({ selection: name });

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            {React.Children.map(this.props.children, ({ props: { name } }) => (
              <button
                name={name}
                onClick={this.setSelection}
                className={`btn btn-block m-2 ${
                  this.state.selection === name
                    ? 'btn-primary active'
                    : 'btn-secondary'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="col">
            {React.Children.toArray(this.props.children).filter(
              child => child.props.name === this.state.selection
            )}
          </div>
        </div>
      </div>
    );
  }
}
