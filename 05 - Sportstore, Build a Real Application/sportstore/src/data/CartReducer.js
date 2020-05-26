import { ActionTypes } from './Types';

// REDUCERS are functions for COMBINING old data with the data  given by action object.
// Each reducer can handle its own type of data change. Reducers are basically a place where ~
// ~ you declare THE WAY to handle "this kind of change".

export const CartReducer = (storeData, action) => {
  // This syntax is just like "Object.assign()" where it will overwrite the value of the preceding ~
  // ~ properties and return a new object.
  let newStore = {
    cart: [],
    cartItems: 0,
    cartPrice: 0,
    ...storeData,
  };

  switch (action.type) {
    case ActionTypes.CART_ADD:
      const p = action.payload.product;
      const q = action.payload.quantity;
      // Find if there's an existing product in the cart.
      let existing = newStore.cart.find(({ product }) => product.id === p.id);
      // If there is, increase its quantity.
      if (existing) existing.quantity += q;
      // Else, add the product to cart.
      else newStore.cart = [...newStore.cart, action.payload];
      // Change additional data.
      newStore.cartItems += q;
      newStore.cartPrice += p.price * q;
      return newStore;

    case ActionTypes.CART_UPDATE:
      newStore.cart = newStore.cart.map(item => {
        if (item.product.id === action.payload.product.id) {
          const diff = action.payload.quantity - item.quantity;
          newStore.cartItems += diff;
          newStore.cartPrice += item.product.price * diff;
          return action.payload;
        } else return item;
      });
      return newStore;

    case ActionTypes.CART_REMOVE:
      let selection = newStore.cart.find(
        item => item.product.id === action.payload.id
      );
      newStore.cartItems -= selection.quantity;
      newStore.cartPrice -= selection.quantity * selection.product.price;
      newStore.cart = newStore.cart.filter(item => item !== selection);
      return newStore;

    case ActionTypes.CART_CLEAR:
      return {
        ...storeData,
        cart: [],
        cartItems: 0,
        cartPrice: 0,
      };

    default:
      return storeData || {};
  }
};
