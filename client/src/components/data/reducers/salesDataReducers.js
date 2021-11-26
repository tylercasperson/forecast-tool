import {
  SALES_DATA_LIST_REQUEST,
  SALES_DATA_LIST_SUCCESS,
  SALES_DATA_LIST_FAIL,
  SALES_DATE_MIN_MAX_REQUEST,
  SALES_DATE_MIN_MAX_SUCCESS,
  SALES_DATE_MIN_MAX_FAIL,
} from '../constants/salesDataConstants.js';

export const salesDataListReducer = (state = { salesData: [] }, action) => {
  switch (action.type) {
    case SALES_DATA_LIST_REQUEST:
      return { salesData: [] };
    case SALES_DATA_LIST_SUCCESS:
      return { salesData: action.payload.salesData };
    case SALES_DATA_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const salesDateMinMaxReducer = (state = { salesData: [] }, action) => {
  switch (action.type) {
    case SALES_DATE_MIN_MAX_REQUEST:
      return { salesData: [] };
    case SALES_DATE_MIN_MAX_SUCCESS:
      return { salesData: action.payload, success: true };
    case SALES_DATE_MIN_MAX_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
