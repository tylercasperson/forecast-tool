import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const ShowHide = (props) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', marginBottom: '10px' }}
    >
      <div
        style={{
          display: 'flex',
          flexBasis: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <b style={{ marginTop: '-10px' }}>Show/Hide Data?</b>
        <ToggleSwitch
          label={'Sales History'}
          onChange={props.onChange}
          checked={props.showSalesHistory}
          name={'salesHistory'}
        />
        <ToggleSwitch
          label={'Last Year'}
          onChange={props.onChange}
          checked={props.showLastYear}
          name={'lastYear'}
        />
        <ToggleSwitch
          label={'Moving Average'}
          onChange={props.onChange}
          checked={props.showMovingAverage}
          name={'movingAverage'}
        />
        <ToggleSwitch
          label={'Weighted Average'}
          onChange={props.onChange}
          checked={props.showWeightedAverage}
          name={'weightedAverage'}
        />
        <ToggleSwitch
          label={'Linear Regression'}
          onChange={props.onChange}
          checked={props.showLinearRegression}
          name={'linearRegression'}
        />
      </div>
      <div style={{ display: 'flex', flexBasis: '100%', padding: '1vh' }}>
        <ToggleSwitch
          label={'Change Colors'}
          onChange={props.changeColors}
          name={'changeColors'}
          checked={props.showChangeColors}
        />
      </div>
    </div>
  );
};

export default ShowHide;
