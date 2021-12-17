import React, { useRef } from 'react';
import MonthSetup from './MonthSetup.js';

const DateInput = (props) => {
  const dateInput = useRef();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        height: '6vh',
        width: '20vw',
        alignItems:
          dateInput.current && dateInput.current.parentElement.children[0] === dateInput.current
            ? 'end'
            : 'start',
      }}
      ref={dateInput}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: props.inputWidth,
          alignContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: props.inputFontSize,
            fontWeight: '600',
            marginBottom: '0.3vh',
          }}
        >
          {props.text}
        </span>
        <input
          style={{
            border: props.inputBorder,
            textAlign: 'center',
            fontSize: props.inputFontSize,
            backgroundColor: props.inputBackgroundColor,
          }}
          className={'dateInput ' + props.text.split(' ')[0]}
          type='text'
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </div>

      <div className={props.showHide} style={{ width: '20vw' }}>
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
