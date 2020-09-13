// export function asyncEnhancer(delay) {
//   return function (createStoreFunction) {
//     return function (...args) {
//       let store = createStoreFunction(...args);
//       return {
//         ...store,
//         dispatchAsync: action =>
//           new Promise((resolve, reject) => {
//             setTimeout(() => {
//               store.dispatch(action);
//               resolve();
//             }, delay);
//           }),
//       };
//     };
//   };
// }

// Arrow syntax.
export const asyncEnhancer = delay => createStoreFunction => (...args) => {
  let store = createStoreFunction(...args);
  return {
    ...store,
    dispatchAsync: action =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          store.dispatch(action);
          resolve();
        }, delay);
      }),
  };
};
