import axios from 'axios';
import {
  GDP_LIST_REQUEST,
  GDP_LIST_SUCCESS,
  GDP_LIST_FAIL,
  GDP_STORED_LIST_REQUEST,
  GDP_STORED_LIST_SUCCESS,
  GDP_STORED_LIST_FAIL,
  GDP_STORED_CREATE_REQUEST,
  GDP_STORED_CREATE_SUCCESS,
  GDP_STORED_CREATE_FAIL,
} from '../constants/gdpConstants.js';

export const listGdp = () => async (dispatch) => {
  try {
    dispatch({ type: GDP_LIST_REQUEST });

    const { data } = await axios.get('/api/gdp');

    dispatch({
      type: GDP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GDP_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listStoredGdp = () => async (dispatch) => {
  try {
    dispatch({ type: GDP_STORED_LIST_REQUEST });

    const { data } = await axios.get('/api/gdp/stored');

    dispatch({
      type: GDP_STORED_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GDP_STORED_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createStoredGdp = (gdpData) => async (dispatch) => {
  try {
    dispatch({ type: GDP_STORED_CREATE_REQUEST });

    const { data } = await axios.post(`/api/gdp/stored`, gdpData);

    dispatch({
      type: GDP_STORED_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GDP_STORED_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
