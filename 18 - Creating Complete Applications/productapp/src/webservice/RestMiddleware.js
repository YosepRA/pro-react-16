import { RestDataSource } from './RestDataSource';
import { PRODUCTS, SUPPLIERS } from '../store/dataTypes';
import { STORE, UPDATE, DELETE } from '../store/modelActionTypes';

export const GET_DATA = 'rest_get_data';

export const getData = dataType => ({
  type: GET_DATA,
  dataType,
});

export const createRestMiddleware = (productsURL, suppliersURL) => {
  const dataSource = {
    [PRODUCTS]: new RestDataSource(productsURL, () => {}),
    [SUPPLIERS]: new RestDataSource(suppliersURL, () => {}),
  };

  return ({ dispatch, getState }) => next => action => {
    switch (action.type) {
      case GET_DATA:
        if (getState().modelData[action.dataType].length === 0) {
          dataSource[action.dataType].GetData(data => {
            data.forEach(item =>
              next({
                type: STORE,
                dataType: action.dataType,
                payload: item,
              })
            );
          });
        }
        break;

      case STORE:
        // Since json-server will probably ignore a request body with its own ID inside it, then let's make it null.
        action.payload.id = null;
        dataSource[action.dataType].Store(action.payload, data =>
          next({ ...action, payload: data })
        );
        break;

      case UPDATE:
        dataSource[action.dataType].Update(action.payload, data =>
          next({ ...action, payload: data })
        );
        break;

      case DELETE:
        dataSource[action.dataType].Delete({ id: action.payload }, () =>
          next(action)
        );
        break;

      default:
        next(action);
        break;
    }
  };
};
