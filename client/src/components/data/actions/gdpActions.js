import axios from 'axios';
import { GDP_LIST_REQUEST, GDP_LIST_SUCCESS, GDP_LIST_FAIL } from '../constants/gdpConstants.js';

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
