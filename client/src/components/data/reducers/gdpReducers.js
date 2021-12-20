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
  GDP_STORED_CREATE_RESET,
} from '../constants/gdpConstants.js';

export const gdpListReducer = (state = { gdpData: [] }, action) => {
  switch (action.type) {
    case GDP_LIST_REQUEST:
      return { gdpData: [] };
    case GDP_LIST_SUCCESS:
      return { gdpData: action.payload };
    case GDP_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const gdpStoredListReducer = (state = { gdpStoredData: [] }, action) => {
  switch (action.type) {
    case GDP_STORED_LIST_REQUEST:
      return { gdpStoredData: [] };
    case GDP_STORED_LIST_SUCCESS:
      return { gdpStoredData: action.payload.gdp };
    case GDP_STORED_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const gdpStoredCreateReducer = (state = { gdpData: [] }, action) => {
  switch (action.type) {
    case GDP_STORED_CREATE_REQUEST:
      return { loading: true };
    case GDP_STORED_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        gdpData: action.payload.gdpData,
      };
    case GDP_STORED_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GDP_STORED_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
