import axios from 'axios';
import {
  FORECAST_DATA_LIST_REQUEST,
  FORECAST_DATA_LIST_SUCCESS,
  FORECAST_DATA_LIST_FAIL,
} from '../constants/forecastDataConstants.js';

export const listForecastData = () => async (dispatch) => {
  try {
    dispatch({ type: FORECAST_DATA_LIST_REQUEST });

    const { data } = await axios.get('/api/forecastData');

    dispatch({
      type: FORECAST_DATA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORECAST_DATA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
