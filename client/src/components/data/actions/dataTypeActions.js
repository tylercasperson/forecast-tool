import axios from 'axios';
import {
  DATA_TYPE_LIST_REQUEST,
  DATA_TYPE_LIST_SUCCESS,
  DATA_TYPE_LIST_FAIL,
} from '../constants/dataTypeConstants.js';

export const listDataTypes = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_TYPE_LIST_REQUEST });

    const { data } = await axios.get(`/api/dataTypes`);

    dispatch({
      type: DATA_TYPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_TYPE_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
