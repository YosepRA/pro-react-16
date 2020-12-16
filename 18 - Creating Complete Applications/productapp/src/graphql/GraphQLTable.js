import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import * as queries from './queries';
import * as mutations from './mutations';
import gql from 'graphql-tag';
import { ProductTable } from '../ProductTable';
import { SupplierTable } from '../SupplierTable';
import { PRODUCTS, SUPPLIERS } from '../store/dataTypes';

export const GraphQLTable = dataType => {
  const getAll = gql(queries[dataType].getAll.graphql);
  const deleteItem = gql(mutations[dataType].delete.graphql);

  return class extends Component {
    editCallback = item =>
      this.props.history.push(`/${dataType}/edit/${item.id}`);

    removeItemFromCache(cache, mutationResult) {
      const deletedId = mutationResult.data[mutations[dataType].delete.name];
      const data = cache.readQuery({ query: getAll })[
        queries[dataType].getAll.name
      ];
      cache.writeQuery({
        query: getAll,
        data: { [dataType]: data.filter(item => item.id !== deletedId) },
      });
    }

    getRefetchQueries() {
      // Whenever there's an update on products, update the suppliers as well.
      return dataType === PRODUCTS
        ? [{ query: gql(queries[SUPPLIERS].getAll.graphql) }]
        : [];
    }

    render() {
      return (
        <Query query={getAll}>
          {({ loading, data, refetch }) => {
            if (loading) {
              return (
                <h5 className="bg-info text-center text-white p-2 m-2">
                  Loading...
                </h5>
              );
            } else {
              return (
                <Mutation
                  mutation={deleteItem}
                  update={this.removeItemFromCache}
                  refetchQueries={this.getRefetchQueries}
                >
                  {doDelete => (
                    <React.Fragment>
                      {dataType === PRODUCTS && (
                        <ProductTable
                          products={data.products}
                          editCallback={this.editCallback}
                          deleteCallback={p =>
                            doDelete({ variables: { id: p.id } })
                          }
                        />
                      )}

                      {dataType === SUPPLIERS && (
                        <SupplierTable
                          suppliers={data.suppliers}
                          editCallback={this.editCallback}
                          deleteCallback={s =>
                            doDelete({ variables: { id: s.id } })
                          }
                        />
                      )}
                      <div className="text-center">
                        <button
                          className="btn btn-primary"
                          onClick={() => refetch()}
                        >
                          Reload data
                        </button>
                      </div>
                    </React.Fragment>
                  )}
                </Mutation>
              );
            }
          }}
        </Query>
      );
    }
  };
};
