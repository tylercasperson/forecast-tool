import {
  GROUPED_DATA_LIST_REQUEST,
  GROUPED_DATA_LIST_SUCCESS,
  GROUPED_DATA_LIST_FAIL,
  GROUPED_DATA_UPDATE_REQUEST,
  GROUPED_DATA_UPDATE_SUCCESS,
  GROUPED_DATA_UPDATE_FAIL,
  GROUPED_DATA_UPDATE_RESET,
  GROUPED_DATA_DELETE_REQUEST,
  GROUPED_DATA_DELETE_SUCCESS,
  GROUPED_DATA_DELETE_FAIL,
  GROUPED_DATA_DELETE_ALL_REQUEST,
  GROUPED_DATA_DELETE_ALL_SUCCESS,
  GROUPED_DATA_DELETE_ALL_FAIL,
  GROUPED_DATA_CREATE_REQUEST,
  GROUPED_DATA_CREATE_SUCCESS,
  GROUPED_DATA_CREATE_FAIL,
  GROUPED_DATA_CREATE_RESET,
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

export const groupedDataUpdateReducer = (state = { groupedData: [] }, action) => {
  switch (action.type) {
    case GROUPED_DATA_UPDATE_REQUEST:
      return { loading: true };
    case GROUPED_DATA_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        groupedData: action.payload.groupedData,
      };
    case GROUPED_DATA_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case GROUPED_DATA_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const groupedDataDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUPED_DATA_DELETE_REQUEST:
      return { loading: true };
    case GROUPED_DATA_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case GROUPED_DATA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupedDataDeleteAllReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUPED_DATA_DELETE_ALL_REQUEST:
      return { loading: true };
    case GROUPED_DATA_DELETE_ALL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case GROUPED_DATA_DELETE_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupedDataCreateReducer = (state = { groupedData: [] }, action) => {
  switch (action.type) {
    case GROUPED_DATA_CREATE_REQUEST:
      return { loading: true };
    case GROUPED_DATA_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        groupedData: action.payload.groupedData,
      };
    case GROUPED_DATA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GROUPED_DATA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
