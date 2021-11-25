import axios from 'axios';
import {
  TIME_PERIOD_TYPES_GET_REQUEST,
  TIME_PERIOD_TYPES_GET_SUCCESS,
  TIME_PERIOD_TYPES_GET_FAIL,
} from '../constants/timePeriodTypeConstants.js';

export const getTimePeriodTypes = () => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_TYPES_GET_REQUEST });

    const { data } = await axios.get(`/api/timePeriodTypes`);

    dispatch({
      type: TIME_PERIOD_TYPES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIME_PERIOD_TYPES_GET_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
