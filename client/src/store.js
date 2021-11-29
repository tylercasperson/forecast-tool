import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  salesDataListReducer,
  salesDataRangeReducer,
  salesDateMinMaxReducer,
} from './components/data/reducers/salesDataReducers.js';
import {
  groupedDataListReducer,
  groupedDataUpdateReducer,
  groupedDataDeleteReducer,
} from './components/data/reducers/groupedDataReducers.js';
import { timePeriodTypeListReducer } from './components/data/reducers/timePeriodTypeReducers.js';

const reducer = combineReducers({
  salesData: salesDataListReducer,
  salesDataRange: salesDataRangeReducer,
  salesDateMinMax: salesDateMinMaxReducer,
  groupedData: groupedDataListReducer,
  groupedDataUpdate: groupedDataUpdateReducer,
  groupedDataDelete: groupedDataDeleteReducer,
  timePeriods: timePeriodTypeListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
