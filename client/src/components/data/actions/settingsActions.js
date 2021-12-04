import { START_DATE_SAVE_REQUEST, END_DATE_SAVE_REQUEST } from '../constants/settingsConstants.js';

export const saveStartDate = (date) => (dispatch) => {
  dispatch({
    type: START_DATE_SAVE_REQUEST,
    payload: date,
  });

  localStorage.setItem('startDate', JSON.stringify(date));
};

export const saveEndDate = (date) => (dispatch) => {
  dispatch({
    type: END_DATE_SAVE_REQUEST,
    payload: date,
  });

  localStorage.setItem('endDate', JSON.stringify(date));
};
