// In order for the data store system to recognize a certain type of data change, a collection ~
// ~ of identifiers is needed. It's basically a dictionary for data store to differentiate ~
// ~ between different type of data change. Different parts of data store (action object ~
// ~ and reducer) will need these identifiers to do its job. Therefore having a dedicated ~
// ~ dictionary will assure the consistencies between identifiers.
// It's a common convention to use uppercased key to signify a constant data.

export const DataTypes = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
};

export const ActionTypes = {
  DATA_LOAD: 'data_load',
  DATA_STORE: 'data_store',
  DATA_SET_SORT_PROPERTY: 'data_set_sort',
  DATA_SET_PAGESIZE: 'data_set_pagesize',
  CART_ADD: 'cart_add',
  CART_UPDATE: 'cart_update',
  CART_REMOVE: 'cart_delete',
  CART_CLEAR: 'cart_clear',
};
