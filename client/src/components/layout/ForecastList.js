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
  const { colors } = getFromState.colors;

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

  const letterColor = (color) => {
    const hexToRgb = (hex) => {
      let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (r, g, b) => {
        return r + r + g + g + b + b;
      });

      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16),
          }
        : null;
    };

    let colorRatio =
      hexToRgb(color).red * 0.299 + hexToRgb(color).green * 0.587 + hexToRgb(color).blue * 0.114;

    return colorRatio > 160 ? '#000' : '#fff';
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
        justifyContent: 'space-evenly',
      }}
    >
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CheckItem
          item='Sales History'
          name='salesHistory'
          onChange={(e) => onChange(e)}
          textColor={showSalesHistory && letterColor(colors[1])}
          checked={showSalesHistory}
        />
      </div>
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CheckItem
          item='Last Year'
          name='lastYear'
          onChange={(e) => onChange(e)}
          textColor={showLastYear && letterColor(colors[2])}
          checked={showLastYear}
        />
      </div>
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: '1vw',
          marginRight: '1vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CheckItem
          item='Moving Average'
          name='movingAverage'
          onChange={(e) => onChange(e)}
          textColor={showMovingAverage && letterColor(colors[3])}
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
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: '1vw',
          marginRight: '1vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CheckItem
          item='Weighted Average'
          name='weightedAverage'
          onChange={(e) => onChange(e)}
          textColor={showWeightedAverage && letterColor(colors[4])}
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
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CheckItem
          item='Linear Regression'
          name='linearRegression'
          onChange={(e) => onChange(e)}
          textColor={showLinearRegression && letterColor(colors[5])}
          checked={showLinearRegression}
        />
      </div>
    </div>
  );
};

export default ForecastList;
