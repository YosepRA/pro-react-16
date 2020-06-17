import React, { Component } from 'react';
// import { Message } from './Message';
// import { List } from './List';
// import { ExternalCounter } from './ExternalCounter';
// import { HooksMessage } from './HooksMessage';
import { DirectionDisplay } from './DirectionDisplay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 100,
      // showMessage: true,
      // counterLeft: 0,
      // counterRight: 0,
    };
  }

  // handleChange = () => this.setState({ showMessage: !this.state.showMessage });

  // incrementCounter = () => this.setState({ counter: this.state.counter + 1 });

  // ======================================================================================================== //

  // incrementCounter = counter => {
  //   if (counter === 'left')
  //     this.setState({ counterLeft: this.state.counterLeft + 1 });
  //   else this.setState({ counterRight: this.state.counterRight + 1 });
  // };

  // ======================================================================================================== //

  changeCounter = value =>
    this.setState({ counter: this.state.counter + value });

  render() {
    console.log('Render App component.');
    // return (
    //   <div className="container text-center">
    //     <div className="row p-2">
    //       <div className="col-4">
    //         <div className="form-check">
    //           <input
    //             type="checkbox"
    //             className="form-check-input"
    //             onChange={this.handleChange}
    //             checked={this.state.showMessage}
    //           />
    //           <label className="form-check-label">Show</label>
    //         </div>
    //         {this.state.showMessage && (
    //           <div>
    //             <Message
    //               message={`Counter: ${this.state.counter}`}
    //               callback={this.incrementCounter}
    //               text="Increment Counter"
    //             />
    //             <HooksMessage
    //               message={`Counter: ${this.state.counter}`}
    //               callback={this.incrementCounter}
    //               text="Increment Counter"
    //             />
    //           </div>
    //         )}
    //       </div>
    //       <div className="col-4">
    //         <List />
    //       </div>
    //       <div className="col-4">
    //         <ExternalCounter />
    //       </div>
    //     </div>
    //   </div>
    // );

    // ======================================================================================================== //

    // return (
    //   <div className="container text-center">
    //     <div className="row p-2">
    //       <div className="col-6">
    //         <Message
    //           message={`Left: ${this.state.counterLeft}`}
    //           callback={() => this.incrementCounter('left')}
    //           text="Increment Left Counter"
    //         />
    //       </div>
    //       <div className="col-6">
    //         <Message
    //           message={`Right: ${this.state.counterRight}`}
    //           callback={() => this.incrementCounter('right')}
    //           text="Increment Right Counter"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // );

    // ======================================================================================================== //

    return (
      <div className="container text-center">
        <DirectionDisplay value={this.state.counter} />
        <div className="text-center">
          <button
            className="btn btn-primary m-1"
            onClick={() => this.changeCounter(-1)}
          >
            Decrease
          </button>
          <button
            className="btn btn-primary m-1"
            onClick={() => this.changeCounter(1)}
          >
            Increase
          </button>
        </div>
      </div>
    );
  }
}
