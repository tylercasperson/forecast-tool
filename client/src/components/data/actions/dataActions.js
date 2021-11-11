import axios from 'axios';
import {
  DATA_LIST_REQUEST,
  DATA_LIST_SUCCESS,
  DATA_LIST_FAIL,
} from '../constants/dataConstants.js';

export const listData = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_LIST_REQUEST });

    const { data } = await axios.get('/api/data');

    dispatch({
      type: DATA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
