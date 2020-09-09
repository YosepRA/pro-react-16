// Action objects will represent the changes in your application.
// Once one of these functions are triggered somewhere in your app, it will kickstart Redux data ~
// ~ change algorithm. Just think of it like React's "setState" method.
// The only requirement for action creators is "type" property for reducers to identify between ~
// ~ different types of changes.
// The data changes itself will often be represented as "payload" property. Of course, you can adjust ~
// ~ how you structure your action objects based on your needs, as long as reducers and your application ~
// ~ can work with it. Remember, just a JavaScript code thing.

import { PRODUCTS, SUPPLIERS } from './dataTypes';
import { STORE, UPDATE, DELETE } from './modelActionTypes';

let idCounter = 100;

export const saveProduct = product => createSaveEvent(PRODUCTS, product);
export const saveSupplier = supplier => createSaveEvent(SUPPLIERS, supplier);

const createSaveEvent = (dataType, payload) => {
  if (!payload.id) {
    return { type: STORE, dataType, payload: { ...payload, id: idCounter++ } };
  } else {
    return { type: UPDATE, dataType, payload };
  }
};

export const deleteProduct = product => ({
  type: DELETE,
  dataType: PRODUCTS,
  payload: product.id,
});

export const deleteSupplier = supplier => ({
  type: DELETE,
  dataType: SUPPLIERS,
  payload: supplier.id,
});
