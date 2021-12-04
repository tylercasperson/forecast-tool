import { START_DATE_SAVE_REQUEST, END_DATE_SAVE_REQUEST } from '../constants/settingsConstants.js';

export const settingsReducer = (state = { dates: [], colors: [], showForecast: [] }, action) => {
  switch (action.type) {
    case START_DATE_SAVE_REQUEST:
      return {
        ...state,
        startDate: action.payload,
      };
    case END_DATE_SAVE_REQUEST:
      return {
        ...state,
        endDate: action.payload,
      };
    default:
      return state;
  }
};
