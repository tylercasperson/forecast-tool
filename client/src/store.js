import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { forecastDataListReducer } from './components/data/reducers/forecastDataReducers.js';
import { salesDataListReducer } from './components/data/reducers/salesDataReducers.js';

const reducer = combineReducers({
  forecastData: forecastDataListReducer,
  salesData: salesDataListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
