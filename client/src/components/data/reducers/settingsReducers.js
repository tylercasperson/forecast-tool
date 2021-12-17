import {
  START_DATE_SAVE_REQUEST,
  END_DATE_SAVE_REQUEST,
  SHOW_SALES_HISTORY_REQUEST,
  SHOW_LAST_YEAR_REQUEST,
  SHOW_MOVING_AVERAGE_REQUEST,
  SHOW_WEIGHTED_AVERAGE_REQUEST,
  SHOW_LINEAR_REGRESSION_REQUEST,
  MOVING_PERIOD_SAVE_REQUEST,
  WEIGHTED_PERIOD_SAVE_REQUEST,
  COLOR_SAVE_REQUEST,
  FIRST_LETTER_SAVE_REQUEST,
  PERIOD_ID_SAVE_REQUEST,
  OCCURRENCES_SAVE_REQUEST,
} from '../constants/settingsConstants.js';

export const settingsReducer = (state = { dates: [], showForecast: [] }, action) => {
  switch (action.type) {
    case START_DATE_SAVE_REQUEST:
      return {
        ...state,
        startDate: action.payload,
      };
    case END_DATE_SAVE_REQUEST:
      return {
        ...state,
        endDate: action.payload,
      };
    case SHOW_SALES_HISTORY_REQUEST:
      return {
        ...state,
        showSalesHistory: action.payload,
      };
    case SHOW_LAST_YEAR_REQUEST:
      return {
        ...state,
        showLastYear: action.payload,
      };
    case SHOW_MOVING_AVERAGE_REQUEST:
      return {
        ...state,
        showMovingAverage: action.payload,
      };
    case SHOW_WEIGHTED_AVERAGE_REQUEST:
      return {
        ...state,
        showWeightedAverage: action.payload,
      };
    case SHOW_LINEAR_REGRESSION_REQUEST:
      return {
        ...state,
        showLinearRegression: action.payload,
      };
    case MOVING_PERIOD_SAVE_REQUEST:
      return {
        ...state,
        movingPeriods: action.payload,
      };
    case WEIGHTED_PERIOD_SAVE_REQUEST:
      return {
        ...state,
        weightedPeriods: action.payload,
      };
    case COLOR_SAVE_REQUEST:
      return {
        ...state,
        colors: action.payload,
      };
    case FIRST_LETTER_SAVE_REQUEST:
      return {
        ...state,
        groupVariables: action.payload,
      };
    case PERIOD_ID_SAVE_REQUEST:
      return {
        ...state,
        groupVariables: action.payload,
      };
    case OCCURRENCES_SAVE_REQUEST:
      return {
        ...state,
        groupVariables: action.payload,
      };

    default:
      return state;
  }
};
