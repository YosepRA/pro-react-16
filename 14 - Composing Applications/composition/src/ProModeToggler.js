// import React, { Component } from 'react';
// import { ProModeContext } from './ProModeContext';

// export class ProModeToggler extends Component {
//   render() {
//     // return (
//     //   <ProModeContext.Consumer>
//     //     {contextData => (
//     //       <div className="form-check">
//     //         <input
//     //           type="checkbox"
//     //           className="form-check-input"
//     //           value={contextData.proMode}
//     //           onChange={contextData.toggleProMode}
//     //         />
//     //         <label className="form-check-label">{this.props.label}</label>
//     //       </div>
//     //     )}
//     //   </ProModeContext.Consumer>
//     // );

//     // ======================================================================================================== //

//     return (
//       <div className="form-check">
//         <input
//           type="checkbox"
//           className="form-check-input"
//           value={this.context.proMode}
//           onChange={this.context.toggleProMode}
//         />
//         <label className="form-check-label">{this.props.label}</label>
//       </div>
//     );
//   }

//   // Defining a static 'contextType' will bind context value to 'this.context'.
//   static contextType = ProModeContext;
// }

// ======================================================================================================== //

import React, { useContext } from 'react';
import { ProModeContext } from './ProModeContext';

export function ProModeToggler(props) {
  let context = useContext(ProModeContext);

  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        value={context.proMode}
        onChange={context.toggleProMode}
      />
      <label className="form-check-label">{props.label}</label>
    </div>
  );
}
