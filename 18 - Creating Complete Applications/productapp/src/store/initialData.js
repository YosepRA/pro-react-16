import { PRODUCTS, SUPPLIERS } from './dataTypes';

export const initialData = {
  modelData: {
    [PRODUCTS]: [],
    [SUPPLIERS]: [],
  },
  stateData: {
    editing: false,
    selectedType: PRODUCTS,
    selectedId: -1,
  },
};
