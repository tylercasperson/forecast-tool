import React from 'react';
import ToggleSwitch from './ToggleSwitch';
import ExportToExcel from './ExportToExcel';

const ChartOptions = (props) => {
  return (
    <div
      style={{
        display: props.display,
        flexDirection: 'column',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <div style={{ display: 'flex', width: '70%', flexBasis: '100%', padding: '1vh' }}>
        <b style={{ marginTop: '-10px' }}>Chart Options</b>
        <ToggleSwitch
          label={'Change Colors'}
          onChange={props.changeColors}
          name={'changeColors'}
          checked={props.showChangeColors}
        />
        <ToggleSwitch
          label={props.showHideHoverText}
          onChange={props.onChange}
          name={'showHideHoverLabels'}
          checked={props.showHoverLabels}
        />
        <ExportToExcel />
      </div>
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
    </div>
  );
};

export default ChartOptions;
