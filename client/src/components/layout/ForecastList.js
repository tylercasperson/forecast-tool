import React, { useEffect, useRef } from 'react';
import CheckItem from './CheckItem';
import ForecastBox from './ForecastBox';

const ForecastList = (props) => {
  const forecastList = useRef();

  useEffect(() => {
    if (forecastList.current !== undefined) {
      if (forecastList.current.children[1].children[0].children[0].checked) {
      }
    }
  }, []);
  return (
    <div
      ref={forecastList}
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
        <CheckItem item='Last Year' name='lastYear' onChange={props.lastYear} />
      </div>
      <div>
        <CheckItem item='Moving Average' name='movingAverage' onChange={props.movingAverage} />
        {forecastList.current === undefined
          ? ''
          : forecastList.current.children[1].children[0].children[0].children[0].checked && (
              <ForecastBox type={'averaged'} />
            )}
      </div>

      <div>
        <CheckItem
          item='Weighted Average'
          name='weightedAverage'
          onChange={props.weightedAverage}
        />
        {forecastList.current === undefined
          ? ''
          : forecastList.current.children[2].children[0].children[0].children[0].checked && (
              <ForecastBox type={'weighted and averaged'} />
            )}
      </div>
      <div>
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
