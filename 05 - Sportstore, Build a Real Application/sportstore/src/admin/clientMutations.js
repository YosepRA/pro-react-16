import gql from 'graphql-tag';

const shipOrder = gql`
  mutation($id: ID!, $shipped: Boolean!) {
    shipOrder(id: $id, shipped: $shipped) {
      id
      shipped
    }
  }
`;

const storeProduct = gql`
  mutation($product: productStore) {
    storeProduct(product: $product) {
      id
      name
      category
      description
      price
    }
  }
`;

const updateProduct = gql`
  mutation($product: productUpdate) {
    updateProduct(product: $product) {
      id
      name
      category
      description
      price
    }
  }
`;

const deleteProduct = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export { shipOrder, storeProduct, updateProduct, deleteProduct };
