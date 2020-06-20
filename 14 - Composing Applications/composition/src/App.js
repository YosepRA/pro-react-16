import React, { Component } from 'react';
import { GeneralList } from './GeneralList';
import { SortedList } from './SortedList';
// import { ProFeature } from './ProFeature';
// import { ProController } from './ProController';
// import { LogToConsole } from './LogToConsole';
import { ProModeContext } from './ProModeContext';
import { ProModeToggler } from './ProModeToggler';

// let ProList = ProController(LogToConsole(SortedList, 'sort', true, true, true));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // counter: 0,
      names: ['Zoe', 'Bob', 'Alice', 'Dora', 'Joe'],
      cities: ['London', 'New York', 'Paris', 'Milan', 'Boston'],
      // proMode: false,
      proContextData: {
        proMode: false,
        toggleProMode: this.toggleProMode,
      },
    };
  }

  // incrementCounter = () => this.setState({ counter: this.state.counter + 1 });

  // ======================================================================================================== //

  // toggleProMode = () => {
  //   this.setState(
  //     state => (state.proContextData.proMode = !state.proContextData.proMode)
  //   );
  // };

  toggleProMode = () => {
    this.setState({
      proContextData: {
        ...this.state.proContextData,
        proMode: !this.state.proContextData.proMode,
      },
    });
  };

  // toggleProMode = () => {
  //   this.setState(state => {
  //     return {
  //       proContextData: {
  //         ...state.proContextData,
  //         proMode: !state.proContextData.proMode,
  //       },
  //     };
  //   });
  // };

  render() {
    // return (
    //   <div className="m-2 text-center">
    //     <ThemeSelector>
    //       <Message theme="primary" message={this.state.counter} />
    //       <ActionButton
    //         theme="secondary"
    //         text="Increment"
    //         callback={this.incrementCounter}
    //       />
    //     </ThemeSelector>
    //   </div>
    // );

    // ======================================================================================================== //

    // return (
    //   <div className="container-fluid">
    //     <div className="row">
    //       <div className="col-12 text-center p-2">
    //         <div className="form-check">
    //           <input
    //             type="checkbox"
    //             className="form-check-input"
    //             value={this.state.proMode}
    //             onChange={this.toggleProMode}
    //           />
    //           <label className="form-check-label">Pro Mode</label>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col-6">
    //         <GeneralList theme="primary" list={this.state.names} />
    //       </div>
    //       <div className="col-6">
    //         <ProFeature
    //           pro={this.state.proMode}
    //           render={text => (
    //             <React.Fragment>
    //               <h4 className="text-center">{text}</h4>
    //               <SortedList list={this.state.names} />
    //             </React.Fragment>
    //           )}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // );

    // ======================================================================================================== //

    return (
      <div className="container-fluid">
        <ProModeContext.Provider value={this.state.proContextData}>
          <div className="row">
            <div className="col-12 text-center p-2">
              <ProModeToggler label="Pro Mode" />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <GeneralList theme="primary" list={this.state.names} />
            </div>
            <div className="col-6">
              <SortedList list={this.state.names} />
            </div>
          </div>
        </ProModeContext.Provider>
      </div>
    );
  }
}
