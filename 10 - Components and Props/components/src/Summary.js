/* Chapter 10 */

// import React from 'react';
// import { CallbackButton } from './CallbackButton';

// export function Summary(props) {
//   return (
//     <React.Fragment>
//       <td>{props.index + 1}</td>
//       <td>{props.name}</td>
//       <td>{props.name.length}</td>
//       <td>
//         <CallbackButton
//           theme="primary"
//           text="Reverse"
//           callback={props.reverseCallback}
//         />
//         <CallbackButton
//           theme="info"
//           text="Promote"
//           callback={() => props.promoteCallback(props.name)}
//           disabled={true}
//         />
//       </td>
//     </React.Fragment>
//   );
// }

// ======================================================================================================== //

/* Chapter 11 */

import React, { Component } from 'react';
import { SimpleButton } from './SimpleButton';
import { HooksButton } from './HooksButton';

export class Summary extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     counter: 0,
  //   };
  // }

  // incrementCounter = increment => {
  //   this.setState(state => ({ counter: state.counter + increment }));
  // };

  render = () => (
    <React.Fragment>
      <td>{this.props.index + 1}</td>
      <td>{this.props.name}</td>
      <td>{this.props.name.length}</td>
      <td>
        <SimpleButton
          className="btn btn-sm btn-warning m-1"
          text={`Reverse (${this.props.name})`}
          callback={this.props.reverseCallback}
          {...this.props}
        />
        <HooksButton
          className="btn btn-sm btn-info m-1"
          text={`Promote (${this.props.name})`}
          callback={() => this.props.promoteCallback(this.props.name)}
          {...this.props}
        />
      </td>
    </React.Fragment>
  );
}
