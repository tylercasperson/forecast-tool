import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const ShowHide = (props) => {
  return (
    <div style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
      <b style={{ marginTop: '-10px' }}>Show/Hide Data?</b>
      <ToggleSwitch
        label={'Sales History'}
        onChange={props.onChange}
        name={'salesHistory'}
      />
      <ToggleSwitch
        label={'Last Year'}
        onChange={props.onChange}
        name={'lastYear'}
      />
      <ToggleSwitch
        label={'Moving Average'}
        onChange={props.onChange}
        name={'movingAverage'}
      />
      <ToggleSwitch
        label={'Weighted Average'}
        onChange={props.onChange}
        name={'weightedAverage'}
      />
      <ToggleSwitch
        label={'Linear Regression'}
        onChange={props.onChange}
        name={'linearRegression'}
      />
    </div>
  );
};

export default ShowHide;
