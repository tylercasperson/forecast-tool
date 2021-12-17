import { format, add } from 'date-fns';
import axios from 'axios';
import {
  SALES_DATA_LIST_REQUEST,
  SALES_DATA_LIST_SUCCESS,
  SALES_DATA_LIST_FAIL,
  SALES_DATE_MIN_MAX_REQUEST,
  SALES_DATE_MIN_MAX_SUCCESS,
  SALES_DATE_MIN_MAX_FAIL,
  SALES_DATA_RANGE_REQUEST,
  SALES_DATA_RANGE_SUCCESS,
  SALES_DATA_RANGE_FAIL,
  SALES_DATA_DELETE_REQUEST,
  SALES_DATA_DELETE_SUCCESS,
  SALES_DATA_DELETE_FAIL,
  SALES_DATA_DELETE_ALL_REQUEST,
  SALES_DATA_DELETE_ALL_SUCCESS,
  SALES_DATA_DELETE_ALL_FAIL,
  SALES_DATA_UPDATE_REQUEST,
  SALES_DATA_UPDATE_SUCCESS,
  SALES_DATA_UPDATE_FAIL,
} from '../constants/salesDataConstants.js';

export const listSalesData = () => async (dispatch) => {
  try {
    dispatch({ type: SALES_DATA_LIST_REQUEST });

    const { data } = await axios.get(`/api/salesData`);

    dispatch({
      type: SALES_DATA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_DATA_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const minMaxSalesDates = () => async (dispatch) => {
  try {
    dispatch({ type: SALES_DATE_MIN_MAX_REQUEST });

    const { data } = await axios.get(`/api/salesData/dates/minMax`);

    dispatch({
      type: SALES_DATE_MIN_MAX_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_DATE_MIN_MAX_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const rangeSalesData =
  (startDate = '', endDate = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: SALES_DATA_RANGE_REQUEST });

      const { data: current } = await axios.get(
        `/api/salesData/date/range?startDate=${startDate}&endDate=${endDate}`
      );

      const lastYear = await axios.get(
        `/api/salesData/date/range?startDate=${format(
          add(new Date(startDate), { years: -1 }),
          'M/d/yyyy'
        )}&endDate=${format(add(new Date(endDate), { years: -1 }), 'M/d/yyyy')}`
      );

      const { data: previousYear } = lastYear;

      dispatch({
        type: SALES_DATA_RANGE_SUCCESS,
        payload: { current, previousYear },
      });
    } catch (error) {
      dispatch({
        type: SALES_DATA_RANGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteSalesData = (salesDataId) => async (dispatch) => {
  try {
    dispatch({ type: SALES_DATA_DELETE_REQUEST });

    console.log(salesDataId);

    const { data } = await axios.delete(`/api/salesData/${salesDataId}`);

    dispatch({
      type: SALES_DATA_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_DATA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteAllSalesData = () => async (dispatch) => {
  try {
    dispatch({ type: SALES_DATA_DELETE_ALL_REQUEST });

    const { data } = await axios.delete(`/api/salesData/delete/all`);

    dispatch({
      type: SALES_DATA_DELETE_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_DATA_DELETE_ALL_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateSalesData = (salesDataId, dataRecord) => async (dispatch) => {
  try {
    dispatch({ type: SALES_DATA_UPDATE_REQUEST });

    let incommingData =
      dataRecord === '' ? 0 : dataRecord === null ? 0 : parseInt(dataRecord.replace(',', ''));

    if (!isNaN(incommingData / 1)) {
      const { data } = await axios.put(`/api/salesData/${salesDataId}`, {
        data: incommingData,
      });

      dispatch({
        type: SALES_DATA_UPDATE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: SALES_DATA_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
