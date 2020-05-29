import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setPageSize, setSortProperty } from '../data/ActionCreators';

const mapStateToProps = dataStore => dataStore;
const mapDispatchToProps = { setPageSize, setSortProperty };

const mergeProps = (dataStore, actionCreators, router) => ({
  ...dataStore,
  ...router,
  ...actionCreators,
  currentPage: Number(router.match.params.page),
  pageCount: Math.ceil(
    (dataStore.products_total || dataStore.pageSize || 5) /
      (dataStore.pageSize || 5)
  ),
  navigateToPage: pageNum =>
    router.history.push(
      `/shop/products/${router.match.params.category}/${pageNum}`
    ),
});

export const ProductPageConnector = PageComponent =>
  withRouter(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageComponent)
  );
