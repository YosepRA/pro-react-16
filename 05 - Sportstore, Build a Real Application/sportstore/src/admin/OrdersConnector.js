import { graphql, compose } from 'react-apollo';
import { ordersSummaryQuery } from './clientQueries';
import { shipOrder } from './clientMutations';
import { OrdersTable } from './OrdersTable';

const vars = {
  onlyShipped: false,
  page: 1,
  pageSize: 10,
  sort: 'id',
};

export const OrdersConnector = compose(
  graphql(ordersSummaryQuery, {
    options: props => ({ variables: vars }),
    props: ({ data: { loading, orders, refetch } }) => ({
      totalSize: loading ? 0 : orders.totalSize,
      orders: loading ? [] : orders.orders,
      currentPage: vars.page,
      pageCount: loading ? 0 : Math.ceil(orders.totalSize / vars.pageSize),
      navigateToPage: pageNum => {
        vars.page = Number(pageNum);
        refetch(vars);
      },
      pageSize: vars.pageSize,
      setPageSize: pageSize => {
        vars.pageSize = Number(pageSize);
        refetch(vars);
      },
      sortKey: vars.sort,
      setSortProperty: sortKey => {
        vars.sort = sortKey;
        refetch(vars);
      },
    }),
  }),
  graphql(shipOrder, {
    props: ({ mutate }) => ({
      toggleShipped: (id, shipped) => mutate({ variables: { id, shipped } }),
    }),
  })
)(OrdersTable);
