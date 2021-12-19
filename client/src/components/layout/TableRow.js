import React, { useState } from 'react';

const TableRow = (props) => {
  const [timePeriod, setTimePeriod] = useState(props.timePeriod);
  const [startDate, setSetartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [salesHistory, setSalesHistory] = useState(props.salesHistory);
  const [userInput, setUserInput] = useState(props.userInput);
  const [lastYear, setLastYear] = useState(props.lastYear);
  const [movingAverage, setMovingAverage] = useState(props.movingAverage);
  const [weightedAverage, setWeightedAverage] = useState(props.weightedAverage);
  const [linearRegression, setLinearRegression] = useState(props.linearRegression);

  const onChange = (e) => {
    switch (e.target.name) {
      case 'timePeriod':
        return setTimePeriod(e.target.value);
      case 'startDate':
        return setSetartDate(e.target.value);
      case 'endDate':
        return setEndDate(e.target.value);
      case 'userInput':
        return setUserInput(e.target.value);
      case 'salesHistory':
        return setSalesHistory(e.target.value);
      case 'lastYear':
        return setLastYear(e.target.value);
      case 'wightedAverage':
        return setWeightedAverage(e.target.value);
      case 'movingAverage':
        return setMovingAverage(e.target.value);
      case 'linearRegression':
        return setLinearRegression(e.target.value);
      default:
        return;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <input
        style={{ width: '5vw', backgroundColor: props.background, fontSize: '1.7vmin' }}
        type='text'
        name={'timePeriod'}
        onChange={(e) => onChange(e)}
        value={timePeriod}
        className='timePeriod'
      />
      <input
        style={{
          width: '12vw',
          backgroundColor: props.background,
          fontSize: '1.7vmin',
        }}
        type='text'
        name={'startDate'}
        onChange={(e) => onChange(e)}
        value={startDate}
      />
      <input
        style={{ width: '12vw', backgroundColor: props.background, fontSize: '1.7vmin' }}
        type='text'
        name={'endDate'}
        onChange={(e) => onChange(e)}
        value={endDate}
      />
      <input
        style={{ width: '8vw', backgroundColor: props.background, fontSize: '1.7vmin' }}
        type='text'
        name={'userInput'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={userInput}
        onFocus={() => setUserInput(props.userInputFocus)}
        onBlur={() => setUserInput(props.userInput)}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showSalesHistory,
          fontSize: '1.7vmin',
        }}
        type='text'
        name={'salesHistory'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={salesHistory}
        onFocus={() => setSalesHistory(props.salesHistoryFocus)}
        onBlur={() => setSalesHistory(props.salesHistory)}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showLastYear,
          fontSize: '1.7vmin',
        }}
        type='text'
        name={'lastYear'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={lastYear}
        onFocus={() => setLastYear(props.lastYearFocus)}
        onBlur={() => setLastYear(props.lastYear)}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showMovingAverage,
          fontSize: '1.7vmin',
        }}
        type='text'
        name={'movingAverage'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={movingAverage}
        onFocus={() => setMovingAverage(props.movingAverageFocus)}
        onBlur={() => setMovingAverage(props.movingAverage)}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showWeightedAverage,
          fontSize: '1.7vmin',
        }}
        type='text'
        name={'weightedAverage'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={weightedAverage}
        onFocus={() => setWeightedAverage(props.weightedAverageFocus)}
        onBlur={() => setWeightedAverage(props.weightedAverage)}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showLinearRegression,
          fontSize: '1.7vmin',
        }}
        type='text'
        name={'linearRegression'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={linearRegression}
        onFocus={() => setLinearRegression(props.linearRegressionFocus)}
        onBlur={() => setLinearRegression(props.linearRegression)}
      />
      <div
        style={{
          width: '3vw',
          backgroundColor: props.background,
        }}
        onClick={props.delete}
      >
        <i
          style={{
            fontSize: '0.7rem',
            margin: '2px',
          }}
          className='far fa-trash-alt'
        ></i>
      </div>
    </div>
  );
};

export default TableRow;
