import {
  DATA_LIST_REQUEST,
  DATA_LIST_SUCCESS,
  DATA_LIST_FAIL,
} from '../constants/dataConstants.js';

export const dataListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case DATA_LIST_REQUEST:
      return { data: [] };
    case DATA_LIST_SUCCESS:
      return { data: action.payload.data };
    case DATA_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
