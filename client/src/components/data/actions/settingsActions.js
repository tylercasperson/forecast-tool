import {
  START_DATE_SAVE_REQUEST,
  END_DATE_SAVE_REQUEST,
  SHOW_SALES_HISTORY_REQUEST,
  SHOW_LAST_YEAR_REQUEST,
  SHOW_MOVING_AVERAGE_REQUEST,
  SHOW_WEIGHTED_AVERAGE_REQUEST,
  SHOW_LINEAR_REGRESSION_REQUEST,
  MOVING_PERIOD_SAVE_REQUEST,
  WEIGHTED_PERIOD_SAVE_REQUEST,
  COLOR_SAVE_REQUEST,
} from '../constants/settingsConstants.js';

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

export const saveShowSalesHistory = (show) => (dispatch, getState) => {
  const showForecast = {
    showSalesHistory: show,
    showLastYear: getState().showForecast.showLastYear,
    showMovingAverage: getState().showForecast.showMovingAverage,
    showWeightedAverage: getState().showForecast.showWeightedAverage,
    showLinerRegression: getState().showForecast.showLinerRegression,
  };

  dispatch({
    type: SHOW_SALES_HISTORY_REQUEST,
    payload: show,
  });

  localStorage.setItem('showForecast', JSON.stringify(showForecast));
};

export const saveShowLastYear = (show) => (dispatch, getState) => {
  const showForecast = {
    showSalesHistory: getState().showForecast.showSalesHistory,
    showLastYear: show,
    showMovingAverage: getState().showForecast.showMovingAverage,
    showWeightedAverage: getState().showForecast.showWeightedAverage,
    showLinerRegression: getState().showForecast.showLinerRegression,
  };

  dispatch({
    type: SHOW_LAST_YEAR_REQUEST,
    payload: show,
  });

  localStorage.setItem('showForecast', JSON.stringify(showForecast));
};

export const saveShowMovingAverage = (show) => (dispatch, getState) => {
  const showForecast = {
    showSalesHistory: getState().showForecast.showSalesHistory,
    showLastYear: getState().showForecast.showLastYear,
    showMovingAverage: show,
    showWeightedAverage: getState().showForecast.showWeightedAverage,
    showLinerRegression: getState().showForecast.showLinerRegression,
  };

  dispatch({
    type: SHOW_MOVING_AVERAGE_REQUEST,
    payload: show,
  });

  localStorage.setItem('showForecast', JSON.stringify(showForecast));
};

export const saveShowWeightedAverage = (show) => (dispatch, getState) => {
  const showForecast = {
    showSalesHistory: getState().showForecast.showSalesHistory,
    showLastYear: getState().showForecast.showLastYear,
    showMovingAverage: getState().showForecast.showMovingAverage,
    showWeightedAverage: show,
    showLinerRegression: getState().showForecast.showLinerRegression,
  };

  dispatch({
    type: SHOW_WEIGHTED_AVERAGE_REQUEST,
    payload: show,
  });

  localStorage.setItem('showForecast', JSON.stringify(showForecast));
};

export const saveShowLinearRegression = (show) => (dispatch, getState) => {
  const showForecast = {
    showSalesHistory: getState().showForecast.showSalesHistory,
    showLastYear: getState().showForecast.showLastYear,
    showMovingAverage: getState().showForecast.showMovingAverage,
    showWeightedAverage: getState().showForecast.showWeightedAverage,
    showLinearRegression: show,
  };

  dispatch({
    type: SHOW_LINEAR_REGRESSION_REQUEST,
    payload: show,
  });

  localStorage.setItem('showForecast', JSON.stringify(showForecast));
};

export const saveMovingPeriods = (periods) => (dispatch, getState) => {
  const values = {
    movingPeriods: periods,
    weightedPeriods: getState().periods.weightedPeriods,
  };

  dispatch({
    type: MOVING_PERIOD_SAVE_REQUEST,
    payload: periods,
  });

  localStorage.setItem('periods', JSON.stringify(values));
};

export const saveWeightedPeriods = (periods) => (dispatch, getState) => {
  const values = {
    movingPeriods: getState().periods.movingPeriods,
    weightedPeriods: periods,
  };

  dispatch({
    type: WEIGHTED_PERIOD_SAVE_REQUEST,
    payload: periods,
  });

  localStorage.setItem('periods', JSON.stringify(values));
};

export const saveColor = (color) => (dispatch) => {
  dispatch({
    type: COLOR_SAVE_REQUEST,
    payload: color,
  });

  localStorage.setItem('colors', JSON.stringify(color));
};
