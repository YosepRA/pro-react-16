import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 4,
    };
  }

  isEven(value) {
    return value % 2 === 0 ? 'Even' : 'Odd';
  }

  getClassName(value) {
    return value % 2 === 0
      ? 'bg-primary text-white text-center p-2 m-1'
      : 'bg-warning text-white text-center p-2 m-1';
  }

  handleClick = () => this.setState({ count: this.state.count + 1 });

  render() {
    // Bootstrap grid system and table.
    // return (
    //   <div className="container-fluid p-4">
    //     <div className="row bg-info text-white p-2">
    //       <div className="col font-weight-bold">Value</div>
    //       <div className="col-6 font-weight-bold">Even?</div>
    //     </div>
    //     <div className="row bg-light p-2 border">
    //       <div className="col">{this.state.count}</div>
    //       <div className="col-6">{this.isEven(this.state.count)}</div>
    //     </div>
    //     <div className="row">
    //       <div className="col">
    //         <button className="btn btn-info m-2" onClick={this.handleClick}>
    //           Click Me
    //         </button>
    //       </div>
    //     </div>

    //     <table className="table table-bordered table-striped table-sm">
    //       <thead className="bg-info text-white">
    //         <tr>
    //           <th>Value</th>
    //           <th>Even?</th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         <tr>
    //           <td>{this.state.count}</td>
    //           <td>{this.isEven(this.state.count)}</td>
    //         </tr>
    //       </tbody>

    //       <tfoot className="text-center">
    //         <tr>
    //           <td colSpan="2">
    //             <button className="btn btn-info m-2" onClick={this.handleClick}>
    //               Click Me
    //             </button>
    //           </td>
    //         </tr>
    //       </tfoot>
    //     </table>
    //   </div>
    // );

    // Bootstrap form.
    return (
      <div className="m-2">
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" className="form-control" />
        </div>
      </div>
    );
  }
}
