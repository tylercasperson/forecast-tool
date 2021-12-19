import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, differenceInDays, format } from 'date-fns';

import { dateFormat, monthList, daysPerMonth } from '../../data/formulas/dateFormulas.js';
import { saveStartDate, saveEndDate } from '../../data/actions/settingsActions.js';

import DateInput from './DateInput';

const DateSlider = () => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { startDate, endDate } = getFromState.dates;
  const { minDate, maxDate } = getFromState.salesDateMinMax.salesData;

  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [displayStartDate, setDisplayStartDate] = useState(startDate);
  const [displayEndDate, setDisplayEndDate] = useState(endDate);
  const [showHide, setShowHide] = useState('hide');
  const [sliderOne, setSliderOne] = useState(0);
  const [sliderTwo, setSliderTwo] = useState(100);
  const [sliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(100);
  const [load, setLoad] = useState(true);
  const [sliderLock, setSliderLock] = useState(false);
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

  const onFocus = () => {
    setSliderLock(false);
    setShowHide('show');
  };

  const onBlur = () => {
    setSliderLock(true);
    setShowHide('hide');
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

  const sliderChange = (e) => {
    setSliderLock(true);

    const sliderToDates = (value) => {
      let addValueOne;
      let addValueTwo;

      if ((sliderOne === sliderMin || sliderTwo === sliderMin) && value === sliderMin) {
        addValueOne = sliderMin;
        addValueTwo = sliderMin;
      } else if ((sliderOne === sliderMax || sliderTwo === sliderMax) && value === sliderMax) {
        addValueOne = sliderMax;
        addValueTwo = sliderMax;
      } else {
        addValueOne = Math.min(value, sliderOne, sliderTwo);
        addValueTwo = Math.max(value, sliderOne, sliderTwo);
      }

      let dateStart = format(
        add(new Date(dateFormat(minDate)), {
          days: addValueOne,
        }),
        'M/d/yyyy'
      );

      let dateEnd = format(
        add(new Date(dateFormat(minDate)), {
          days: addValueTwo,
        }),
        'M/d/yyyy'
      );

      dispatch(saveStartDate(dateStart));
      setTempStartDate(dateStart);
      dispatch(saveEndDate(dateEnd));
      setTempEndDate(dateEnd);
    };

    if (e.target.name === 'sliderOne') {
      setSliderOne(parseInt(e.target.value));
      sliderToDates(parseInt(e.target.value));
    }
    if (e.target.name === 'sliderTwo') {
      setSliderTwo(parseInt(e.target.value));
      sliderToDates(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    if (!sliderLock) {
      setSliderOne(differenceInDays(new Date(startDate), new Date(dateFormat(minDate))));
      setSliderTwo(differenceInDays(new Date(endDate), new Date(dateFormat(minDate))));
    }
    if (load) {
      setSliderMax(differenceInDays(new Date(dateFormat(maxDate)), new Date(dateFormat(minDate))));
      setLoad(false);
    }
    setMonthTracker([0, 0]);
    setDisplayStartDate(startDate);
  }, [dispatch, startDate, endDate, minDate, maxDate, load, sliderLock]);

  return (
    <div className='dateSection'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3vh',
          marginBottom: '3vh',
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
          inputBorder={'1pt solid black'}
          inputWidth={'20vw'}
          inputFontSize={'2vh'}
          inputBackgroundColor={'white'}
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
          inputBorder={'1pt solid black'}
          inputWidth={'20vw'}
          inputFontSize={'2vh'}
          inputBackgroundColor={'white'}
        />
      </div>

      <input
        type='range'
        className='dateSlider'
        name='sliderOne'
        value={sliderOne}
        onChange={(e) => sliderChange(e)}
        min={sliderMin}
        max={sliderMax}
      />
      <input
        type='range'
        className='dateSlider'
        name='sliderTwo'
        value={sliderTwo}
        onChange={(e) => sliderChange(e)}
        min={sliderMin}
        max={sliderMax}
      />
    </div>
  );
};

export default DateSlider;
