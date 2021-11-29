import {
  TIME_PERIOD_LIST_REQUEST,
  TIME_PERIOD_LIST_SUCCESS,
  TIME_PERIOD_LIST_FAIL,
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
