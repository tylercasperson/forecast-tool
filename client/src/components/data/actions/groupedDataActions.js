import axios from 'axios';
import {
  GROUPED_DATA_LIST_REQUEST,
  GROUPED_DATA_LIST_SUCCESS,
  GROUPED_DATA_LIST_FAIL,
  GROUPED_DATA_UPDATE_REQUEST,
  GROUPED_DATA_UPDATE_SUCCESS,
  GROUPED_DATA_UPDATE_FAIL,
  GROUPED_DATA_DELETE_REQUEST,
  GROUPED_DATA_DELETE_SUCCESS,
  GROUPED_DATA_DELETE_FAIL,
  GROUPED_DATA_DELETE_ALL_REQUEST,
  GROUPED_DATA_DELETE_ALL_SUCCESS,
  GROUPED_DATA_DELETE_ALL_FAIL,
  GROUPED_DATA_CREATE_REQUEST,
  GROUPED_DATA_CREATE_SUCCESS,
  GROUPED_DATA_CREATE_FAIL,
  GROUPED_DATA_BULK_CREATE_REQUEST,
  GROUPED_DATA_BULK_CREATE_SUCCESS,
  GROUPED_DATA_BULK_CREATE_FAIL,
} from '../constants/groupedDataConstants.js';

export const listGroupedData =
  (startDate = '', endDate = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: GROUPED_DATA_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/groupedData?startDate=${startDate}&endDate=${endDate}`
      );

      dispatch({
        type: GROUPED_DATA_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GROUPED_DATA_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateGroupedData = (groupedDataId, dataRecord) => async (dispatch) => {
  try {
    dispatch({ type: GROUPED_DATA_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/groupedData/${groupedDataId}`, {
      data: dataRecord,
    });

    dispatch({
      type: GROUPED_DATA_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GROUPED_DATA_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteGroupedData = (groupedDataId) => async (dispatch) => {
  try {
    dispatch({ type: GROUPED_DATA_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/groupedData/${groupedDataId}`);

    dispatch({
      type: GROUPED_DATA_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GROUPED_DATA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteAllGroupedData = () => async (dispatch) => {
  try {
    dispatch({ type: GROUPED_DATA_DELETE_ALL_REQUEST });

    const { data } = await axios.delete(`/api/groupedData/delete/all`);

    dispatch({
      type: GROUPED_DATA_DELETE_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GROUPED_DATA_DELETE_ALL_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createGroupedData = (groupedData) => async (dispatch) => {
  try {
    dispatch({ type: GROUPED_DATA_CREATE_REQUEST });

    const { data } = await axios.post(`/api/groupedData`, groupedData);

    dispatch({
      type: GROUPED_DATA_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GROUPED_DATA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createBulkGroupedData = (groupedData) => async (dispatch) => {
  try {
    dispatch({ type: GROUPED_DATA_BULK_CREATE_REQUEST });

    const { data } = await axios.post(`/api/groupedData/bulk/add`, groupedData);

    dispatch({
      type: GROUPED_DATA_BULK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GROUPED_DATA_BULK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
