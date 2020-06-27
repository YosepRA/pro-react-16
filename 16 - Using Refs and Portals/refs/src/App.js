import React, { Component } from 'react';
// import { Editor } from './Editor';
// import { ProductTable } from './ProductTable';
// import { ColorInvalidElements } from './jQueryColorizer';

import { ForwardFormField } from './FormField';
import { PortalWrapper } from './PortalWrapper';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//     };
//     this.editorRef = React.createRef();
//   }

//   addProduct = product => {
//     if (!this.state.products.some(p => p.name === product.name)) {
//       this.setState({ products: [...this.state.products, product] });
//     }
//   };

//   colorFields = () => ColorInvalidElements(this.editorRef.current);

//   render() {
//     return (
//       <div>
//         <div className="text-center m-2">
//           <button className="btn btn-primary" onClick={this.colorFields}>
//             jQuery
//           </button>
//         </div>
//         <div ref={this.editorRef}>
//           <Editor callback={this.addProduct} />
//         </div>
//         <h6 className="bg-secondary text-white m-2 p-2">Products</h6>
//         <div className="m-2">
//           {this.state.products.length === 0 ? (
//             <div className="text-center">No Products</div>
//           ) : (
//             <ProductTable products={this.state.products} />
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// ======================================================================================================== //

export default class App extends Component {
  constructor(props) {
    super(props);
    this.fieldRef = React.createRef();
    this.portalFieldRef = React.createRef();
  }

  focusLocal = () => this.fieldRef.current.focus();

  focusPortal = () => this.portalFieldRef.current.focus();

  render() {
    return (
      <div className="m-2">
        {/* We can pass ref just like props if the parent component need a direct access to the element 
        rendered by its children. */}
        {/* <FormField fieldRef={this.fieldRef} label="Name" /> */}

        <PortalWrapper>
          <ForwardFormField label="Name" ref={this.portalFieldRef} />
        </PortalWrapper>

        <ForwardFormField ref={this.fieldRef} label="Name" />

        <div className="text-center m-2">
          <button className="btn btn-primary m-1" onClick={this.focusLocal}>
            Focus Local
          </button>
          <button className="btn btn-primary m-1" onClick={this.focusPortal}>
            Focus Portal
          </button>
        </div>
      </div>
    );
  }
}
