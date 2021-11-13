import axios from 'axios';
import {
  SALES_DATA_LIST_REQUEST,
  SALES_DATA_LIST_SUCCESS,
  SALES_DATA_LIST_FAIL,
} from '../constants/salesDataConstants.js';

export const listSalesData =
  (startDate = '', endDate = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: SALES_DATA_LIST_REQUEST });

      console.log('ssss', startDate);
      console.log('ssss', endDate);

      const { data } = await axios.get(
        `/api/salesData?startDate=${startDate}&endDate=${endDate}`
      );

      dispatch({
        type: SALES_DATA_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_DATA_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
