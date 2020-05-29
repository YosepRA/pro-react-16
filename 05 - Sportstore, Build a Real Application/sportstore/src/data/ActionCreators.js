import { ActionTypes, DataTypes } from './Types';
import { RestDataSource } from './RestDataSource';

const dataSource = new RestDataSource();

export const loadData = (dataType, params) => ({
  type: ActionTypes.DATA_LOAD,
  payload: dataSource.GetData(dataType, params).then(res => ({
    dataType,
    data: res.data,
    total: Number(res.headers['x-total-count']),
    params,
  })),
});

export const setPageSize = newSize => ({
  type: ActionTypes.DATA_SET_PAGESIZE,
  payload: newSize,
});

export const setSortProperty = newProp => ({
  type: ActionTypes.DATA_SET_SORT_PROPERTY,
  payload: newProp,
});

export const placeOrder = order => ({
  type: ActionTypes.DATA_STORE,
  payload: dataSource.StoreData(DataTypes.ORDERS, order).then(res => ({
    dataType: DataTypes.ORDERS,
    data: res.data,
  })),
});
