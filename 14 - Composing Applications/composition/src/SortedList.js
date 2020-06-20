import React, { Component } from 'react';
import { ActionButton } from './ActionButton';
import { GeneralList } from './GeneralList';
import { ErrorBoundary } from './ErrorBoundary';

export class SortedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: false,
    };
  }

  getList() {
    // Remember, props are read-only, therefore we need to create a new array.
    return this.state.sort ? [...this.props.list].sort() : this.props.list;
  }

  toggleSort = () => this.setState({ sort: !this.state.sort });

  render() {
    return (
      <div>
        <ErrorBoundary>
          {/* Specialized components are not created through inherintance, but through props like this. */}
          <GeneralList list={this.getList()} theme="info" />
          <div className="text-center m-2">
            <ActionButton
              theme="primary"
              text="Sort"
              callback={this.toggleSort}
              proMode={this.props.proMode}
            />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}
