import {
  TIME_PERIOD_TYPES_GET_REQUEST,
  TIME_PERIOD_TYPES_GET_SUCCESS,
  TIME_PERIOD_TYPES_GET_FAIL,
} from '../constants/timePeriodTypeConstants.js';

export const timePeriodTypeListReducer = (state = { timePeriodTypes: [] }, action) => {
  switch (action.type) {
    case TIME_PERIOD_TYPES_GET_REQUEST:
      return { timePeriodTypes: [] };
    case TIME_PERIOD_TYPES_GET_SUCCESS:
      return { timePeriodTypes: action.payload.timePeriodTypes };
    case TIME_PERIOD_TYPES_GET_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
