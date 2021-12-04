import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  saveShowSalesHistory,
  saveShowLastYear,
  saveShowMovingAverage,
  saveShowWeightedAverage,
  saveShowLinearRegression,
  saveMovingPeriods,
  saveWeightedPeriods,
} from '../data/actions/settingsActions.js';

import CheckItem from './CheckItem';
import ForecastBox from './ForecastBox';

const ForecastList = () => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const {
    showSalesHistory,
    showLastYear,
    showMovingAverage,
    showWeightedAverage,
    showLinearRegression,
  } = getFromState.showForecast;
  const { movingPeriods, weightedPeriods } = getFromState.periods;

  const onChange = (e) => {
    switch (e.target.name) {
      case 'salesHistory':
        dispatch(saveShowSalesHistory(showSalesHistory ? false : true));
        break;
      case 'lastYear':
        dispatch(saveShowLastYear(showLastYear ? false : true));
        break;
      case 'movingAverage':
        dispatch(saveShowMovingAverage(showMovingAverage ? false : true));
        break;
      case 'weightedAverage':
        dispatch(saveShowWeightedAverage(showWeightedAverage ? false : true));
        break;
      case 'linearRegression':
        dispatch(saveShowLinearRegression(showLinearRegression ? false : true));
        break;
      case 'movingPeriods':
        dispatch(saveMovingPeriods(parseInt(e.target.value)));
        break;
      case 'weightedPeriods':
        dispatch(saveWeightedPeriods(parseInt(e.target.value)));
        break;
      default:
        return;
    }
  };

  return (
    <div
      className='container'
      style={{
        maxWidth: '90vw',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
      }}
    >
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <CheckItem
          item='Sales History'
          name='salesHistory'
          onChange={(e) => onChange(e)}
          checked={showSalesHistory}
        />
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <CheckItem
          item='Last Year'
          name='lastYear'
          onChange={(e) => onChange(e)}
          checked={showLastYear}
        />
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <CheckItem
          item='Moving Average'
          name='movingAverage'
          onChange={(e) => onChange(e)}
          checked={showMovingAverage}
        />
        {showMovingAverage && (
          <ForecastBox
            type={'averaged'}
            name={'movingPeriods'}
            value={movingPeriods}
            onChange={(e) => onChange(e)}
          />
        )}
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <CheckItem
          item='Weighted Average'
          name='weightedAverage'
          onChange={(e) => onChange(e)}
          checked={showWeightedAverage}
        />
        {showWeightedAverage && (
          <ForecastBox
            type={'weighted and averaged'}
            name={'weightedPeriods'}
            value={weightedPeriods}
            onChange={(e) => onChange(e)}
          />
        )}
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <CheckItem
          item='Linear Regression'
          name='linearRegression'
          onChange={(e) => onChange(e)}
          checked={showLinearRegression}
        />
      </div>
    </div>
  );
};

export default ForecastList;
