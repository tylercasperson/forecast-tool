import axios from 'axios';
import {
  TIME_PERIOD_LIST_REQUEST,
  TIME_PERIOD_LIST_SUCCESS,
  TIME_PERIOD_LIST_FAIL,
  TIME_PERIOD_CREATE_REQUEST,
  TIME_PERIOD_CREATE_SUCCESS,
  TIME_PERIOD_CREATE_FAIL,
  TIME_PERIOD_BULK_CREATE_REQUEST,
  TIME_PERIOD_BULK_CREATE_SUCCESS,
  TIME_PERIOD_BULK_CREATE_FAIL,
  TIME_PERIOD_DELETE_REQUEST,
  TIME_PERIOD_DELETE_SUCCESS,
  TIME_PERIOD_DELETE_FAIL,
  TIME_PERIOD_DELETE_ALL_REQUEST,
  TIME_PERIOD_DELETE_ALL_SUCCESS,
  TIME_PERIOD_DELETE_ALL_FAIL,
  TIME_PERIOD_UPDATE_REQUEST,
  TIME_PERIOD_UPDATE_SUCCESS,
  TIME_PERIOD_UPDATE_FAIL,
} from '../constants/timePeriodConstants.js';

export const listTimePeriod = () => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_LIST_REQUEST });

    const { data } = await axios.get(`/api/timePeriods`);

    dispatch({
      type: TIME_PERIOD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIME_PERIOD_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createTimePeriod = (timePeriod) => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_CREATE_REQUEST });

    const { data } = await axios.post(`/api/timePeriods`, timePeriod);

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

export const createBulkTimePeriod = (timePeriod) => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_BULK_CREATE_REQUEST });

    const { data } = await axios.post(`/api/timePeriods/bulk/add`, timePeriod);

    dispatch({
      type: TIME_PERIOD_BULK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIME_PERIOD_BULK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteTimePeriod = (timePeriodId) => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/timePeriods/${timePeriodId}`);

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

export const deleteAllTimePeriod = () => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_DELETE_ALL_REQUEST });

    const { data } = await axios.delete(`/api/timePeriods/delete/all`);

    dispatch({
      type: TIME_PERIOD_DELETE_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIME_PERIOD_DELETE_ALL_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateTimePeriod = (timePeriodId, dataRecord) => async (dispatch) => {
  try {
    dispatch({ type: TIME_PERIOD_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/timePeriods/${timePeriodId}`, {
      data: dataRecord,
    });

    dispatch({
      type: TIME_PERIOD_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIME_PERIOD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
