// It's possible to have multiple reducers for an application, mainly to split the responsibility ~
// ~ between different app's component in handling data changes.

// This kind of "multiple reducer" will be given to store creator, the same as usual reducer.

// This file will return a function that will be executed later when creating a store to create ~
// ~ a reducer function for data store to use.

// The function returned by this module will be given an array of reducers. This function will ~
// ~ loop through all given reducers and break the loop once a new data has been returned by ~
// ~ a certain reducer that can handle such type of data change.
export const CommonReducer = (...reducers) => (storeData, action) => {
  for (let i = 0; i < reducers.length; i++) {
    let newStore = reducers[i](storeData, action);
    if (newStore !== storeData) return newStore;
  }
  return storeData;
};
