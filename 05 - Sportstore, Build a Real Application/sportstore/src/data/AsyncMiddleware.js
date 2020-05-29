// Redux data store is not fit for asynchronous programming. Because it only applies changes once ~
// ~ the reducer sends a data change. But that doesn't mean we can't do asynchronous programming. ~
// ~ Redux can recieve a middleware to intercept the action objects from entering the reducer. ~
// ~ Therefore we can create a middleware to intercept with said action object and wait until ~
// ~ the promise to resolve itself and finally send that data to reducer for it to start building ~
// ~ data change object.

const isPromise = payload =>
  (typeof payload === 'object' || typeof payload === 'function') &&
  typeof payload.then === 'function';

// This is a bit complicated function we're returning.
export const asyncActions = () => next => action => {
  if (isPromise(action.payload))
    action.payload.then(result => next({ ...action, payload: result }));
  else next(action);
};
