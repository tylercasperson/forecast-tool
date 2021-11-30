import { GDP_LIST_REQUEST, GDP_LIST_SUCCESS, GDP_LIST_FAIL } from '../constants/gdpConstants.js';

export const gdpListReducer = (state = { gdp: [] }, action) => {
  switch (action.type) {
    case GDP_LIST_REQUEST:
      return { gdp: [] };
    case GDP_LIST_SUCCESS:
      return { gdp: action.payload };
    case GDP_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
