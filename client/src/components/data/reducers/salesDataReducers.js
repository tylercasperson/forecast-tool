import {
  SALES_DATA_LIST_REQUEST,
  SALES_DATA_LIST_SUCCESS,
  SALES_DATA_LIST_FAIL,
  SALES_DATE_MIN_MAX_REQUEST,
  SALES_DATE_MIN_MAX_SUCCESS,
  SALES_DATE_MIN_MAX_FAIL,
  SALES_DATA_RANGE_REQUEST,
  SALES_DATA_RANGE_SUCCESS,
  SALES_DATA_RANGE_FAIL,
  SALES_DATA_DELETE_REQUEST,
  SALES_DATA_DELETE_SUCCESS,
  SALES_DATA_DELETE_FAIL,
  SALES_DATA_DELETE_ALL_REQUEST,
  SALES_DATA_DELETE_ALL_SUCCESS,
  SALES_DATA_DELETE_ALL_FAIL,
  SALES_DATA_UPDATE_REQUEST,
  SALES_DATA_UPDATE_SUCCESS,
  SALES_DATA_UPDATE_FAIL,
  SALES_DATA_UPDATE_RESET,
  SALES_DATA_CREATE_REQUEST,
  SALES_DATA_CREATE_SUCCESS,
  SALES_DATA_CREATE_FAIL,
  SALES_DATA_CREATE_RESET,
  SALES_DATA_BULK_CREATE_REQUEST,
  SALES_DATA_BULK_CREATE_SUCCESS,
  SALES_DATA_BULK_CREATE_FAIL,
  SALES_DATA_BULK_CREATE_RESET,
  SALES_DATA_RESET_REQUEST,
  SALES_DATA_RESET_SUCCESS,
  SALES_DATA_RESET_FAIL,
  SALES_DATA_RESET_RESET,
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

export const salesDataRangeReducer = (state = { salesData: [] }, action) => {
  switch (action.type) {
    case SALES_DATA_RANGE_REQUEST:
      return { salesData: [] };
    case SALES_DATA_RANGE_SUCCESS:
      return { salesData: action.payload };
    case SALES_DATA_RANGE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const salesDataDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SALES_DATA_DELETE_REQUEST:
      return { loading: true };
    case SALES_DATA_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SALES_DATA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const salesDataDeleteAllReducer = (state = {}, action) => {
  switch (action.type) {
    case SALES_DATA_DELETE_ALL_REQUEST:
      return { loading: true };
    case SALES_DATA_DELETE_ALL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SALES_DATA_DELETE_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const salesDataUpdateReducer = (state = { salesData: [] }, action) => {
  switch (action.type) {
    case SALES_DATA_UPDATE_REQUEST:
      return { loading: true };
    case SALES_DATA_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        groupedData: action.payload.salesData,
      };
    case SALES_DATA_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SALES_DATA_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const salesDataCreateReducer = (state = { salesData: [] }, action) => {
  switch (action.type) {
    case SALES_DATA_CREATE_REQUEST:
      return { loading: true };
    case SALES_DATA_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        salesData: action.payload.salesData,
      };
    case SALES_DATA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SALES_DATA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const salesDataBulkCreateReducer = (state = { salesData: [] }, action) => {
  switch (action.type) {
    case SALES_DATA_BULK_CREATE_REQUEST:
      return { loading: true };
    case SALES_DATA_BULK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        salesData: action.payload.salesData,
      };
    case SALES_DATA_BULK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SALES_DATA_BULK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const salesDataResetReducer = (state = { salesData: [] }, action) => {
  switch (action.type) {
    case SALES_DATA_RESET_REQUEST:
      return { loading: true };
    case SALES_DATA_RESET_SUCCESS:
      return {
        loading: false,
        success: true,
        salesData: action.payload.salesData,
      };
    case SALES_DATA_RESET_FAIL:
      return { loading: false, error: action.payload };
    case SALES_DATA_RESET_RESET:
      return {};
    default:
      return state;
  }
};
