import {
  GROUPED_DATA_LIST_REQUEST,
  GROUPED_DATA_LIST_SUCCESS,
  GROUPED_DATA_LIST_FAIL,
} from '../constants/groupedDataConstants.js';

export const groupedDataListReducer = (state = { groupedData: [] }, action) => {
  switch (action.type) {
    case GROUPED_DATA_LIST_REQUEST:
      return { groupedData: [] };
    case GROUPED_DATA_LIST_SUCCESS:
      return { groupedData: action.payload.groupedData };
    case GROUPED_DATA_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
