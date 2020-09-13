import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import modelReducer from './modelReducer';
import stateReducer from './stateReducer';
import { customReducerEnhancer } from './customReducerEnhancer';
import { multiAction } from './multiActionMiddleware';
import { asyncEnhancer } from './asyncEnhancer';

const enhancedReducer = customReducerEnhancer(
  combineReducers({
    modelData: modelReducer,
    stateData: stateReducer,
  })
);

// Since "createStore" can only accept one enhancer function, Redux provides "compose" to combine multiple ~
// ~ enhancers.
export default createStore(
  enhancedReducer,
  compose(applyMiddleware(multiAction), asyncEnhancer(2000))
);

export {
  saveProduct,
  saveSupplier,
  deleteProduct,
  deleteSupplier,
} from './modelActionCreators';
