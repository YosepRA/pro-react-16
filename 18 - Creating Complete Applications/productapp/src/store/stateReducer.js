import {
  STATE_START_CREATING,
  STATE_START_EDITING,
  STATE_END_EDITING,
} from './stateActions';
import { initialData } from './initialData';

export default function (dataStore, action) {
  switch (action.type) {
    case STATE_START_CREATING:
    case STATE_START_EDITING:
      return {
        ...dataStore,
        editing: true,
        selectedId:
          action.type === STATE_START_EDITING ? action.payload.id : -1,
        selectedType: action.dataType,
      };

    case STATE_END_EDITING:
      return {
        ...dataStore,
        editing: false,
      };

    default:
      return dataStore || initialData.stateData;
  }
}
