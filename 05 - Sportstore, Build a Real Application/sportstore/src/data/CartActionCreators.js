// Data changes in Redux is centered around something called "Action". It's an object which represents ~
// ~ the new data caused by user's interaction. In order for such interaction to cause a change to the ~
// ~ data store, a valid action object is required to be given to reducers so that it can produce new ~
// ~ data store object and thus triggers the re-render.

// There's only one requirement to build a valid action objects, that is a "type" property. It contains ~
// ~ an identifier for reducers to recognize a certain type of data change, therefore processing the ~
// ~ changes appropriately according to its type.

import { ActionTypes } from './Types';

function addToCart(product, quantity) {
  return {
    type: ActionTypes.CART_ADD,
    payload: {
      product,
      quantity: quantity || 1,
    },
  };
}

function updateCartQuantity(product, quantity) {
  return {
    type: ActionTypes.CART_UPDATE,
    payload: { product, quantity },
  };
}

function removeFromCart(product) {
  return {
    type: ActionTypes.CART_REMOVE,
    payload: product,
  };
}

function clearCart() {
  return {
    type: ActionTypes.CART_CLEAR,
  };
}

export { addToCart, updateCartQuantity, removeFromCart, clearCart };
