import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { settingsReducer } from './components/data/reducers/settingsReducers.js';
import { dataTypesListReducer } from './components/data/reducers/dataTypeReducers.js';
import {
  salesDataListReducer,
  salesDataRangeReducer,
  salesDateMinMaxReducer,
} from './components/data/reducers/salesDataReducers.js';
import {
  groupedDataListReducer,
  groupedDataUpdateReducer,
  groupedDataDeleteReducer,
  groupedDataDeleteAllReducer,
  groupedDataCreateReducer,
  groupedDataBulkCreateReducer,
} from './components/data/reducers/groupedDataReducers.js';
import { timePeriodTypeListReducer } from './components/data/reducers/timePeriodTypeReducers.js';
import {
  timePeriodListReducer,
  timePeriodCreateReducer,
  timePeriodBulkCreateReducer,
  timePeriodDeleteReducer,
  timePeriodDeleteAllReducer,
  timePeriodUpdateReducer,
} from './components/data/reducers/timePeriodReducers.js';
import { gdpListReducer } from './components/data/reducers/gdpReducers.js';

const reducer = combineReducers({
  dates: settingsReducer,
  showForecast: settingsReducer,
  periods: settingsReducer,
  dataTypes: dataTypesListReducer,
  salesData: salesDataListReducer,
  salesDataRange: salesDataRangeReducer,
  salesDateMinMax: salesDateMinMaxReducer,
  groupedData: groupedDataListReducer,
  groupedDataUpdate: groupedDataUpdateReducer,
  groupedDataDelete: groupedDataDeleteReducer,
  groupedDataDeleteAll: groupedDataDeleteAllReducer,
  groupedDataCreate: groupedDataCreateReducer,
  groupedDataBulkCreate: groupedDataBulkCreateReducer,
  timePeriodTypes: timePeriodTypeListReducer,
  timePeriods: timePeriodListReducer,
  timePeriodCreate: timePeriodCreateReducer,
  timePeriodBulkCreate: timePeriodBulkCreateReducer,
  timePeriodsDelete: timePeriodDeleteReducer,
  timePeriodsDeleteAll: timePeriodDeleteAllReducer,
  timePeriodsUpdate: timePeriodUpdateReducer,
  gdp: gdpListReducer,
});

const startDateFromStorage = localStorage.getItem('startDate')
  ? JSON.parse(localStorage.getItem('startDate'))
  : '1/1/2020';

const endDateFromStorage = localStorage.getItem('endDate')
  ? JSON.parse(localStorage.getItem('endDate'))
  : '12/31/2020';

const showForecastFromStorage = localStorage.getItem('showForecast')
  ? JSON.parse(localStorage.getItem('showForecast'))
  : {
      showSalesHistory: true,
      showLastYear: true,
      showMovingAverage: true,
      showWeightedAverage: true,
      showLinearRegression: true,
    };

const periodsFromStorage = localStorage.getItem('periods')
  ? JSON.parse(localStorage.getItem('periods'))
  : {
      movingPeriods: 3,
      weightedPeriods: 3,
    };

const initialState = {
  dates: { startDate: startDateFromStorage, endDate: endDateFromStorage },
  showForecast: showForecastFromStorage,
  periods: periodsFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
