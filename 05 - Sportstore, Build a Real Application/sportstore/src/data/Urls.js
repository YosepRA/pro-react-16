import { DataTypes } from './Types';

// const protocol = 'http';
// const hostname = 'localhost';
// const port = 3500;

export const RestUrls = {
  [DataTypes.PRODUCTS]: '/api/products',
  [DataTypes.CATEGORIES]: '/api/categories',
  [DataTypes.ORDERS]: '/api/orders',
};

export const GraphQLUrl = '/graphql';

export const authUrl = '/login';
