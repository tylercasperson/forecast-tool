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
        height: '22vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '10vh',
        }}
      >
        <b style={{ height: '2vh', fontSize: '2vmin' }}>Chart Options</b>
        <div
          className='toggleChartOptions'
          style={{
            height: '8vh',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <ToggleSwitch
            label={'Color Options'}
            showHide={props.showChangeColors ? 'Hide' : 'Show'}
            onChange={props.changeColors}
            name={'changeColors'}
            checked={props.showChangeColors}
          />
          <ToggleSwitch
            label={'Hover Laebls'}
            showHide={props.showHoverLabels ? 'Hide' : 'Show'}
            onChange={props.onChange}
            name={'showHideHoverLabels'}
            checked={props.showHoverLabels}
          />
          <ExportToExcel />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '10vh',
        }}
      >
        <b style={{ height: '2vh', fontSize: '2vmin' }}>Show/Hide Data?</b>
        <div
          style={{
            height: '8vh',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
          className='toggleLineContainer'
        >
          <ToggleSwitch
            label={'Sales History'}
            onChange={props.onChange}
            checked={props.showSalesHistory}
            showHide={props.showSalesHistory ? 'Hide' : 'Show'}
            name={'salesHistory'}
          />
          <ToggleSwitch
            label={'Last Year'}
            onChange={props.onChange}
            checked={props.showLastYear}
            showHide={props.showLastYear ? 'Hide' : 'Show'}
            name={'lastYear'}
          />
          <ToggleSwitch
            label={'Moving Average'}
            onChange={props.onChange}
            checked={props.showMovingAverage}
            showHide={props.showMovingAverage ? 'Hide' : 'Show'}
            name={'movingAverage'}
          />
          <ToggleSwitch
            label={'Weighted Average'}
            onChange={props.onChange}
            checked={props.showWeightedAverage}
            showHide={props.showWeightedAverage ? 'Hide' : 'Show'}
            name={'weightedAverage'}
          />
          <ToggleSwitch
            label={'Linear Regression'}
            onChange={props.onChange}
            checked={props.showLinearRegression}
            showHide={props.showLinearRegression ? 'Hide' : 'Show'}
            name={'linearRegression'}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOptions;
