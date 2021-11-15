import React, { useState } from 'react';
import { format, add } from 'date-fns';

const TableRow = (props) => {
  const [timePeriod, setTimePeriod] = useState(props.timePeriod);
  const [startDate, setSetartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [currentData, setCurrentData] = useState(props.currentData);
  const [lastYear, setLastYear] = useState(props.lastYear);
  const [m3wa, setM3wa] = useState(props.m3wa);
  const [m3ma, setm3ma] = useState(props.m3ma);
  const [linearRegression, setLinearRegression] = useState(
    props.linearRegression
  );

  const onChange = (e, option) => {
    switch (option) {
      case 'timePeriod':
        return setTimePeriod(e.target.value);
      case 'startDate':
        return setSetartDate(e.target.value);
      case 'endDate':
        return setEndDate(e.target.value);
      case 'currentData':
        return setCurrentData(e.target.value);
      case 'lastYear':
        return setLastYear(e.target.value);
      case 'm3wa':
        return setM3wa(e.target.value);
      case 'm3ma':
        return setm3ma(e.target.value);
      case 'linearRegresion':
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
        onChange={(e) => onChange(e, 'timePeriod')}
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
        onChange={(e) => onChange(e, 'startDate')}
        value={startDate}
      />
      <input
        style={{ width: '12vw', backgroundColor: props.background }}
        type='text'
        name={'endDate'}
        onChange={(e) => onChange(e, 'endDate')}
        value={endDate}
      />
      <input
        style={{ width: '8vw', backgroundColor: props.background }}
        type='number'
        name={'currentData'}
        onChange={(e) => onChange(e, 'currentData')}
        value={currentData}
      />
      <input
        style={{ width: '8vw', backgroundColor: props.background }}
        type='number'
        name={'lastYear'}
        onChange={(e) => onChange(e, 'lastYear')}
        value={lastYear}
      />
      <input
        style={{
          width: '8vw',
          backgroundColor: props.background,
        }}
        type='number'
        name={'m3wa'}
        onChange={(e) => onChange(e, 'm3wa')}
        value={m3wa}
      />
      <input
        style={{ width: '8vw', backgroundColor: props.background }}
        type='number'
        name={'m3ma'}
        onChange={(e) => onChange(e, 'm3ma')}
        value={m3ma}
      />
      <input
        style={{ width: '8vw', backgroundColor: props.background }}
        type='number'
        name={'linearRegression'}
        onChange={(e) => onChange(e, 'linearRegression')}
        value={linearRegression}
      />
    </div>
  );
};

export default TableRow;
