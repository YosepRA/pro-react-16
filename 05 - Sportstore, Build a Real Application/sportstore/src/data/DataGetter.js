import React, { Component } from 'react';
import { DataTypes } from './Types';

export class DataGetter extends Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }

  componentDidMount = () => this.getData();
  componentDidUpdate = () => this.getData();

  getData = () => {
    const category = this.props.match.params.category || 'all';
    const dsData = this.props.products_params || {};
    const rtData = {
      _limit: this.props.pageSize || 5,
      _sort: this.props.sortKey || 'name',
      _page: this.props.match.params.page || 1,
      // If there's no defined category, return all data.
      category_like: category === 'all' ? '' : this.props.match.params.category,
    };
    // If there are differences between old data and new request, then reload.
    if (Object.keys(rtData).some(key => dsData[key] !== rtData[key]))
      this.props.loadData(DataTypes.PRODUCTS, rtData);
  };
}
