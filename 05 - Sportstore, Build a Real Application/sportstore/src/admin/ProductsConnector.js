import { graphql, compose } from 'react-apollo';
import { ProductsTable } from './ProductsTable';
import { productsList } from './clientQueries';
import { deleteProduct } from './clientMutations';

const vars = { page: 1, pageSize: 10, sort: 'id' };

export const ConnectedProducts = compose(
  graphql(productsList, {
    options: props => ({ variables: vars }),
    props: ({ data: { loading, products, refetch } }) => ({
      totalSize: loading ? 0 : products.totalSize,
      products: loading ? [] : products.products,
      currentPage: vars.page,
      pageCount: loading ? 0 : Math.ceil(products.totalSize / vars.pageSize),
      navigateToPage: pageNum => {
        vars.page = pageNum;
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
  graphql(deleteProduct, {
    options: {
      update: (
        cache,
        {
          data: {
            deleteProduct: { id },
          },
        }
      ) => {
        let queryDetails = { query: productsList, variables: vars };
        let data = cache.readQuery(queryDetails);
        data.products.products = data.products.products.filter(
          p => p.id !== id
        );
        data.products.totalSize = data.products.totalSize - 1;
        cache.writeQuery({ ...queryDetails, data });
      },
    },
    props: ({ mutate }) => ({
      deleteProduct: id => mutate({ variables: { id } }),
    }),
  })
)(ProductsTable);
