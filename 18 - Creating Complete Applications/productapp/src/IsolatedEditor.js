import React, { Component } from 'react';
import { RestDataSource } from './webservice/RestDataSource';
import { ProductEditor } from './ProductEditor';

export class IsolatedEditor extends Component {
  constructor(props) {
    super();
    this.state = {
      dataItem: {},
    };
    this.dataSource =
      props.dataSource ||
      new RestDataSource('http://localhost:3500/api/products');
  }

  saveCallback = data => {
    const callback = () => this.props.history.push('/isolated');
    if (data.id === '') {
      this.dataSource.Store(data, callback);
    } else {
      this.dataSource.Update(data, callback);
    }
  };

  cancelCallback = () => this.props.history.push('/isolated');

  render() {
    return (
      <ProductEditor
        key={this.state.dataItem.id}
        product={this.state.dataItem}
        saveCallback={this.saveCallback}
        cancelCallback={this.cancelCallback}
      />
    );
  }

  componentDidMount() {
    const { mode, id } = this.props.match.params;
    if (mode === 'edit') {
      this.dataSource.GetOne(id, data => this.setState({ dataItem: data }));
    }
  }
}
