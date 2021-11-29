import React from 'react';
import CheckItem from './CheckItem';

const ForecastList = (props) => {
  return (
    <div>
      <div
        className='container'
        style={{ maxWidth: '90vw', margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}
      >
        <CheckItem item='Last Year' name='lastYear' onChange={props.lastYear} />
        <CheckItem item='Moving Average' name='movingAverage' onChange={props.movingAverage} />
        <CheckItem
          item='Weighted Average'
          name='weightedAverage'
          onChange={props.weightedAverage}
        />
        <CheckItem
          item='Linear Regression'
          name='linearRegression'
          onChange={props.linearRegression}
        />
      </div>
    </div>
  );
};

export default ForecastList;
