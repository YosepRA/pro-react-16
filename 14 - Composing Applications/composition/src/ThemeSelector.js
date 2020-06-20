import React, { Component } from 'react';

export class ThemeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'primary',
      reverseChildren: false,
    };
    this.themes = ['primary', 'secondary', 'success', 'warning', 'dark'];
  }

  setTheme = event => this.setState({ theme: event.target.value });

  toggleReverse = () =>
    this.setState({ reverseChildren: !this.state.reverseChildren });

  render() {
    // The usage of children prop is most often for wrapper where you need to wrap the ~
    // ~ children component given by wrapper's parent.
    // return (
    //   <div className="bg-dark p-2">
    //     <div className="bg-info p-2">{this.props.children}</div>
    //   </div>
    // );

    // ======================================================================================================== //

    // Modifying children settings by giving (or replacing) additional props through this wrapper component.
    let modifiedChildren = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { theme: this.state.theme })
    );

    // Despite not having an advanced knowledge of given children, we can still convert children list as ~
    // ~ an array and do array-related thing with it just fine.
    if (this.state.reverseChildren) modifiedChildren.reverse();

    return (
      <div className="bg-dark p-2">
        <button className="btn btn-primary" onClick={this.toggleReverse}>
          Reverse
        </button>

        <div className="form-group text-left">
          <label className="text-white">Theme:</label>
          <select
            className="form-control"
            value={this.state.theme}
            onChange={this.setTheme}
          >
            {this.themes.map(theme => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-info p-2">{modifiedChildren}</div>
      </div>
    );
  }
}
