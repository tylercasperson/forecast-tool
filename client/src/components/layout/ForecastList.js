import React from 'react';
import CheckItem from './CheckItem';

const ForecastList = () => {
  return (
    <div>
      <div
        className='container'
        style={{ maxWidth: '90vw', margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}
      >
        <CheckItem item='Last Year' name='lastYear' />
        <CheckItem item='Moving Average' name='movingAverage' />
        <CheckItem item='Weighted Average' name='weightedAverage' />
        <CheckItem item='Linear Regression' name='linearRegression' />
      </div>
    </div>
  );
};

export default ForecastList;
