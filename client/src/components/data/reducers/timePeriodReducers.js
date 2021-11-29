import {
  TIME_PERIOD_LIST_REQUEST,
  TIME_PERIOD_LIST_SUCCESS,
  TIME_PERIOD_LIST_FAIL,
  TIME_PERIOD_CREATE_REQUEST,
  TIME_PERIOD_CREATE_SUCCESS,
  TIME_PERIOD_CREATE_FAIL,
  TIME_PERIOD_CREATE_RESET,
  TIME_PERIOD_DELETE_REQUEST,
  TIME_PERIOD_DELETE_SUCCESS,
  TIME_PERIOD_DELETE_FAIL,
} from '../constants/timePeriodConstants.js';

export const timePeriodListReducer = (state = { timePeriod: [] }, action) => {
  switch (action.type) {
    case TIME_PERIOD_LIST_REQUEST:
      return { timePeriod: [] };
    case TIME_PERIOD_LIST_SUCCESS:
      return { timePeriod: action.payload };
    case TIME_PERIOD_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const timePeriodCreateReducer = (state = { timePeriod: [] }, action) => {
  switch (action.type) {
    case TIME_PERIOD_CREATE_REQUEST:
      return { loading: true };
    case TIME_PERIOD_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        timePeriod: action.payload,
      };
    case TIME_PERIOD_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TIME_PERIOD_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const timePeriodDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TIME_PERIOD_DELETE_REQUEST:
      return { loading: true };
    case TIME_PERIOD_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TIME_PERIOD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
