import React from 'react';
import MonthSetup from './MonthSetup.js';

const DateInput = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        height: '6vh',
        width: '20vw',
      }}
    >
      <span style={{ fontSize: '2vh', fontWeight: '600' }}>{props.text}</span>
      <input
        style={{
          border: '1pt solid black',
          width: '20vw',
          textAlign: 'center',
          fontSize: '2vh',
        }}
        className={'dateInput ' + props.text.split(' ')[0]}
        type='text'
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />

      <div className={props.showHide}>
        <MonthSetup
          dayClick={props.dayClick}
          dateSelected={props.dateSelected}
          type={props.text.toLowerCase().split(' ')[0]}
          onClick={props.onClick}
          startDate={props.startDate}
          endDate={props.endDate}
          previousMonth={props.previousMonth}
          nextMonth={props.nextMonth}
        />
      </div>
    </div>
  );
};

export default DateInput;
