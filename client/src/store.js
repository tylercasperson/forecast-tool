import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

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
  timePeriodDeleteReducer,
  timePeriodDeleteAllReducer,
  timePeriodUpdateReducer,
} from './components/data/reducers/timePeriodReducers.js';
import { gdpListReducer } from './components/data/reducers/gdpReducers.js';

const reducer = combineReducers({
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
  timePeriodsDelete: timePeriodDeleteReducer,
  timePeriodsDeleteAll: timePeriodDeleteAllReducer,
  timePeriodsUpdate: timePeriodUpdateReducer,
  gdp: gdpListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
