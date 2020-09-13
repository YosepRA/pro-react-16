// export function multiActions({ dispatch, getState }) {
//   return function receiveNext(next) {
//     return function processAction(action) {
//       if (Array.isArray(action)) action.forEach(a => next(a));
//       else next(action);
//     };
//   };
// }

// The better (shorter) version...

// This middleware will check whether the action object is an array of actions. If it is, then execute ~
// ~ them consecutively.
export const multiAction = ({ dispatch, getState }) => next => action => {
  if (Array.isArray(action)) action.forEach(a => next(a));
  else next(action);
};
