import { initialData } from './initialData';

export const STORE_RESET = 'store_reset';

export const resetStore = () => ({ type: STORE_RESET });

export const customReducerEnhancer = originalReducer => {
  let initialState = null;

  return (dataStore, action) => {
    if (action.type === STORE_RESET && initialData != null) {
      return initialState;
    } else {
      const result = originalReducer(dataStore, action);
      if (initialState == null) {
        initialState = result;
      }
      return result;
    }
  };
};
