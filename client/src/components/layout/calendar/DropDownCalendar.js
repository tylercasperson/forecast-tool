import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, format } from 'date-fns';

import { monthList, daysPerMonth } from '../../data/formulas/dateFormulas.js';
import { saveStartDate, saveEndDate } from '../../data/actions/settingsActions.js';

import DateInput from './DateInput';

const DropDownCalendar = (props) => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { startDate, endDate } = getFromState.dates;

  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [displayStartDate, setDisplayStartDate] = useState(startDate);
  const [displayEndDate, setDisplayEndDate] = useState(endDate);
  const [showHide, setShowHide] = useState('hide');
  const [monthTracker, setMonthTracker] = useState([0, 0]);

  const dateCapture = (e) => {
    if (e.target.name === 'startDate') {
      setTempStartDate(e.target.value);
    } else if (e.target.name === 'endDate') {
      setTempEndDate(e.target.value);
    }

    const saveDate = () => {
      if (e.target.name === 'startDate') {
        dispatch(saveStartDate(e.target.value));
      } else if (e.target.name === 'endDate') {
        dispatch(saveEndDate(e.target.value));
      }
    };

    const dateValidation = (date) => {
      let dateParts = date.split('/');

      if (dateParts.length === 3) {
        if (parseInt(dateParts[2]) > 0 && parseInt(dateParts[2]) < 9999) {
          if (parseInt(dateParts[0]) > 0 && parseInt(dateParts[0]) < 13) {
            let yearParts = dateParts[2];
            let century = yearParts[0] + yearParts[1] + 0 + 0;
            let yearDigit = yearParts[2] + yearParts[3];
            let leapYearCheck = yearDigit % 4 === 0;
            let centenialCheck = yearDigit === '00' && century % 400 === 0;
            let leapYear = leapYearCheck || centenialCheck ? true : false;
            if (leapYear && dateParts[0] === '2') {
              if (
                parseInt(dateParts[1]) > 0 &&
                dateParts[1] < daysPerMonth[monthList[parseInt(dateParts[0]) - 1]].length + 2
              ) {
                saveDate();
              }
            } else {
              if (
                parseInt(dateParts[1]) > 0 &&
                dateParts[1] < daysPerMonth[monthList[parseInt(dateParts[0]) - 1]].length + 1
              ) {
                saveDate();
              }
            }
          }
        }
      }
    };

    dateValidation(e.target.value);
  };

  const onClick = (e, type) => {
    if (type === 'start') {
      dispatch(saveStartDate(e.target.attributes.date.value));
      setTempStartDate(e.target.attributes.date.value);
    } else {
      dispatch(saveEndDate(e.target.attributes.date.value));
      setTempEndDate(e.target.attributes.date.value);
    }
  };

  const nextMonth = (type) => {
    if (type === 'start') {
      let numberOfMonths = showHide === 'show' ? (monthTracker[0] = monthTracker[0] + 1) : 0;
      let nextMonth = format(add(new Date(startDate), { months: numberOfMonths }), 'M/d/yyyy');
      setDisplayStartDate(nextMonth);
    } else {
      let numberOfMonths = showHide === 'show' ? (monthTracker[1] = monthTracker[1] + 1) : 0;
      let nextMonth = format(add(new Date(endDate), { months: numberOfMonths }), 'M/d/yyyy');
      setDisplayEndDate(nextMonth);
    }
  };
  const previousMonth = (type) => {
    if (type === 'start') {
      let numberOfMonths = showHide === 'show' ? (monthTracker[0] = monthTracker[0] - 1) : 0;
      let previousMonth = format(add(new Date(startDate), { months: numberOfMonths }), 'M/d/yyyy');
      setDisplayStartDate(previousMonth);
    } else {
      let numberOfMonths = showHide === 'show' ? (monthTracker[1] = monthTracker[1] - 1) : 0;
      let previousMonth = format(add(new Date(endDate), { months: numberOfMonths }), 'M/d/yyyy');
      setDisplayEndDate(previousMonth);
    }
  };

  const onFocus = () => {
    setShowHide('show');
  };

  const onBlur = () => {
    setShowHide('hide');
    setMonthTracker([0, 0]);
    setDisplayStartDate(startDate);
  };

  useEffect(() => {
    setMonthTracker([0, 0]);
    setDisplayStartDate(startDate);
    setDisplayEndDate(endDate);
  }, [startDate, endDate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      tabIndex={0}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}
    >
      <DateInput
        text={new Date(startDate) < new Date(endDate) ? 'Start Date' : 'End Date'}
        name='startDate'
        value={tempStartDate}
        showHide={showHide}
        onClick={(e) => onClick(e, 'start')}
        onChange={(e) => dateCapture(e)}
        dateSelected={displayStartDate}
        startDate={startDate}
        endDate={endDate}
        previousMonth={() => previousMonth('start')}
        nextMonth={() => nextMonth('start')}
        inputBorder={props.inputBorder}
        inputWidth={props.inputWidth}
        inputFontSize={props.inputFontSize}
        inputBackgroundColor={props.inputBackgroundColor}
      />
      <DateInput
        text={new Date(startDate) < new Date(endDate) ? 'End Date' : 'Start Date'}
        name='endDate'
        value={tempEndDate}
        showHide={showHide}
        onClick={(e) => onClick(e, 'end')}
        onChange={(e) => dateCapture(e)}
        dateSelected={displayEndDate}
        startDate={startDate}
        endDate={endDate}
        previousMonth={() => previousMonth('end')}
        nextMonth={() => nextMonth('end')}
        inputBorder={props.inputBorder}
        inputWidth={props.inputWidth}
        inputFontSize={props.inputFontSize}
        inputBackgroundColor={props.inputBackgroundColor}
      />
    </div>
  );
};

export default DropDownCalendar;
