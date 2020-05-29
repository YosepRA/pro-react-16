import React, { Component } from 'react';

export class PaginationButtons extends Component {
  getPageNumbers = () => {
    // If there are less than 4 pages.
    if (this.props.pageCount < 4) {
      return [...Array(this.props.pageCount + 1).keys()].slice(1);
    } else if (this.props.currentPage <= 4) {
      // If current page is less than equal to 4.
      return [1, 2, 3, 4, 5];
    } else if (this.props.currentPage > this.props.pageCount - 4) {
      // If current page reaches the last 4 pages.
      // Then return the last five page numbers.
      return [...Array(5).keys()]
        .reverse()
        .map(num => this.props.pageCount - num);
    } else {
      // Else return three consecutive numbers.
      return [
        this.props.currentPage - 1,
        this.props.currentPage,
        this.props.currentPage + 1,
      ];
    }
  };

  render() {
    const current = this.props.currentPage;
    const pageCount = this.props.pageCount;
    const navigate = this.props.navigate;

    return (
      <React.Fragment>
        {/* Previous */}
        <button
          className="btn btn-secondary mx-1"
          onClick={() => navigate(current - 1)}
          disabled={current === 1}
        >
          Previous
        </button>
        {/* Link to first page after current page exceeds page 4. */}
        {current > 4 && (
          <React.Fragment>
            <button
              className="btn btn-secondary mx-1"
              onClick={() => navigate(1)}
            >
              1
            </button>
            <span className="h4">...</span>
          </React.Fragment>
        )}
        {/* Page numbers shown based on current page number. */}
        {this.getPageNumbers().map(num => (
          <button
            key={num}
            className={`btn mx-1 ${
              current === num ? 'btn-primary' : 'btn-secondary'
            }`}
            onClick={() => navigate(num)}
          >
            {num}
          </button>
        ))}
        {/* Link to last page. It will disappear after current page reaches the last 4. */}
        {current <= pageCount - 4 && (
          <React.Fragment>
            <span className="h4">...</span>
            <button
              className="btn btn-secondary mx-1"
              onClick={() => navigate(pageCount)}
            >
              {pageCount}
            </button>
          </React.Fragment>
        )}
        {/* Next */}
        <button
          className="btn btn-secondary mx-1"
          onClick={() => navigate(current + 1)}
          disabled={current === pageCount}
        >
          Next
        </button>
      </React.Fragment>
    );
  }
}
