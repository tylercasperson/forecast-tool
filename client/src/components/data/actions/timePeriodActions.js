import axios from 'axios';
import {
  TIME_PERIOD_LIST_REQUEST,
  TIME_PERIOD_LIST_SUCCESS,
  TIME_PERIOD_LIST_FAIL,
  TIME_PERIOD_CREATE_REQUEST,
  TIME_PERIOD_CREATE_SUCCESS,
  TIME_PERIOD_CREATE_FAIL,
  TIME_PERIOD_DELETE_REQUEST,
  TIME_PERIOD_DELETE_SUCCESS,
  TIME_PERIOD_DELETE_FAIL,
} from '../constants/timePeriodConstants.js';

export const listTimePeriod =
  (startDate = '', endDate = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: TIME_PERIOD_LIST_REQUEST });

      const { data } = await axios.get(`/api/timePeriod?startDate=${startDate}&endDate=${endDate}`);

      dispatch({
        type: TIME_PERIOD_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TIME_PERIOD_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createTimePeriod = () => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_CREATE_REQUEST });

    const { data } = await axios.post(`/api/timePeriod`);

    dispatch({
      type: TIME_PERIOD_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIME_PERIOD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteTimePeriod = (timePeriodId) => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/timePeriod/${timePeriodId}`);

    dispatch({
      type: TIME_PERIOD_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIME_PERIOD_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
