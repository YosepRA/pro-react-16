// Reducer is a function that will receive current store data and an action object.
// Reducer's job is to "apply" the changes based on given action object.

// Please keep in mind that this is just another JavaScript, therefore you can do anything possible ~
// ~ with your data with the only requirement is that the function MUST return a NEW object data, and ~
// ~ not the old store data that is given as function's argument. If you're returning the old data store, ~
// ~ then React will ignore the object and consider it as that of there's no changes from the operation. ~
// ~ Yeah, there might be a line of code that will compare old object reference with the returned one.

// It's also important to note that we need to also "spread" out the old store data because remember, ~
// ~ we're replacing the whole data in the store. It's not React "setState" where React will merge new ~
// ~ and old data automatically.

import { STORE, UPDATE, DELETE } from './modelActionTypes';
import { initialData } from './initialData';

export default function (storeData, action) {
  switch (action.type) {
    case STORE:
      return {
        ...storeData,
        [action.dataType]: storeData[action.dataType].concat(action.payload),
      };

    case UPDATE:
      return {
        ...storeData,
        [action.dataType]: storeData[action.dataType].map(data =>
          data.id === action.payload.id ? action.payload : data
        ),
      };

    case DELETE:
      return {
        ...storeData,
        [action.dataType]: storeData[action.dataType].filter(
          data => data.id !== action.payload
        ),
      };
    // Set the default action to return the latest store data or an initial data (if any) to signify ~
    // ~ "no change" and close the loop. Redux will throw an error if the reducer function returns ~
    // ~ "undefined" value. Therefore, make sure that you return a meaningful result in reducers.
    default:
      return storeData || initialData.modelData;
  }
}
