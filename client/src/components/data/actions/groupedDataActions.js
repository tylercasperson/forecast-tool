import axios from 'axios';
import {
  GROUPED_DATA_LIST_REQUEST,
  GROUPED_DATA_LIST_SUCCESS,
  GROUPED_DATA_LIST_FAIL,
} from '../constants/groupedDataConstants.js';

export const listGroupedData = () => async (dispatch) => {
  try {
    dispatch({ type: GROUPED_DATA_LIST_REQUEST });

    const { data } = await axios.get('/api/groupedData');
    console.log('1111111: ');

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
