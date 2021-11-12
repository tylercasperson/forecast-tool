import {
  FORECAST_DATA_LIST_REQUEST,
  FORECAST_DATA_LIST_SUCCESS,
  FORECAST_DATA_LIST_FAIL,
} from '../constants/forecastDataConstants.js';

export const forecastDataListReducer = (
  state = { forecastData: [] },
  action
) => {
  switch (action.type) {
    case FORECAST_DATA_LIST_REQUEST:
      return { forecastData: [] };
    case FORECAST_DATA_LIST_SUCCESS:
      return { forecastData: action.payload.forecastData };
    case FORECAST_DATA_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
