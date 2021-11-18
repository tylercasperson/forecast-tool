import React, { useState } from 'react';
import { format, add } from 'date-fns';

const TableRow = (props) => {
  const [timePeriod, setTimePeriod] = useState(props.timePeriod);
  const [startDate, setSetartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [salesHistory, setSalesHistory] = useState(props.salesHistory);
  const [userInput, setUserInput] = useState(props.userInput);
  const [lastYear, setLastYear] = useState(props.lastYear);
  const [m3wa, setM3wa] = useState(props.m3wa);
  const [m3ma, setm3ma] = useState(props.m3ma);
  const [linearRegression, setLinearRegression] = useState(
    props.linearRegression
  );

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
      case 'm3wa':
        return setM3wa(e.target.value);
      case 'm3ma':
        return setm3ma(e.target.value);
      case 'linearRegression':
        return setLinearRegression(e.target.value);
      default:
        return;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <input
        style={{ width: '5vw', backgroundColor: props.background }}
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
        }}
        type='text'
        name={'startDate'}
        onChange={(e) => onChange(e)}
        value={startDate}
      />
      <input
        style={{ width: '12vw', backgroundColor: props.background }}
        type='text'
        name={'endDate'}
        onChange={(e) => onChange(e)}
        value={endDate}
      />
      <input
        style={{ width: '8vw', backgroundColor: props.background }}
        type='number'
        name={'userInput'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={userInput}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showSalesHistory,
        }}
        type='number'
        name={'salesHistory'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={salesHistory}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showLastYear,
        }}
        type='number'
        name={'lastYear'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={lastYear}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showMovingAverage,
        }}
        type='number'
        name={'m3ma'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={m3ma}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showWeightedAverage,
        }}
        type='number'
        name={'m3wa'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={m3wa}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
          display: props.showLinearRegression,
        }}
        type='number'
        name={'linearRegression'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={linearRegression}
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
