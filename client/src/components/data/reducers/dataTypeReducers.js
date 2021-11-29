import {
  DATA_TYPE_LIST_REQUEST,
  DATA_TYPE_LIST_SUCCESS,
  DATA_TYPE_LIST_FAIL,
} from '../constants/dataTypeConstants.js';

export const dataTypesListReducer = (state = { datTypes: [] }, action) => {
  switch (action.type) {
    case DATA_TYPE_LIST_REQUEST:
      return { dataTypes: [] };
    case DATA_TYPE_LIST_SUCCESS:
      return { dataTypes: action.payload.dataTypes };
    case DATA_TYPE_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
