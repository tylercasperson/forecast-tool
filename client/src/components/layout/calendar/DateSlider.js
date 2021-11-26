import React, { useEffect, useState } from 'react';
import { add, differenceInDays, format } from 'date-fns';

import DateInput from './DateInput';

const DateSlider = (props) => {
  const [startDate, setStartDate] = useState('1/1/2020');
  const [endDate, setEndDate] = useState('12/31/2020');
  const [showHide, setShowHide] = useState('hide');
  const [sliderOne, setSliderOne] = useState(0);
  const [sliderTwo, setSliderTwo] = useState(100);
  const [sliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(100);
  const [success, setSuccess] = useState(true);

  const onFocus = () => {
    setShowHide('show');
  };

  const onBlur = () => {
    setShowHide('hide');
  };

  const onClick = (e, type) => {
    if (type === 'start') {
      setStartDate(e.target.attributes.date.value);
    } else {
      setEndDate(e.target.attributes.date.value);
    }
  };

  const nextMonth = (type) => {
    if (type === 'start') {
      setStartDate(format(add(new Date(startDate), { months: 1 }), 'M/d/yyyy'));
    } else {
      setEndDate(format(add(new Date(startDate), { months: 1 }), 'M/d/yyyy'));
    }
  };
  const previousMonth = (type) => {
    if (type === 'start') {
      setStartDate(format(add(new Date(startDate), { months: -1 }), 'M/d/yyyy'));
    } else {
      setEndDate(format(add(new Date(startDate), { months: -1 }), 'M/d/yyyy'));
    }
  };

  const sliderChange = (e) => {
    const sliderToDates = (value) => {
      setStartDate(
        format(
          add(new Date(props.minDate), {
            days: Math.min(value, sliderOne, sliderTwo),
          }),
          'M/d/yyyy'
        )
      );
      setEndDate(
        format(
          add(new Date(props.minDate), {
            days: Math.max(value, sliderOne, sliderTwo),
          }),
          'M/d/yyyy'
        )
      );
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
    if (success) {
      setSliderMax(differenceInDays(new Date(props.maxDate), new Date(props.minDate)));
      setSliderOne(differenceInDays(new Date(startDate), new Date(props.minDate)));
      setSliderTwo(differenceInDays(new Date(endDate), new Date(props.minDate)));
      setSuccess(false);
    }
  }, [startDate, endDate, success, props.minDate, props.maxDate]);

  return (
    <div className='dateSlider'>
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
          text={new Date(startDate) < new Date(endDate) ? 'Start Date' : 'EndDate'}
          name='startDate'
          value={startDate}
          showHide={showHide}
          onClick={(e) => onClick(e, 'start')}
          onChange={(e) => setStartDate(e.target.value)}
          dateSelected={startDate}
          startDate={startDate}
          endDate={endDate}
          previousMonth={() => previousMonth('start')}
          nextMonth={() => nextMonth('start')}
        />
        <DateInput
          text={new Date(startDate) < new Date(endDate) ? 'EndDate' : 'Start Date'}
          name='endDate'
          value={endDate}
          showHide={showHide}
          onClick={(e) => onClick(e, 'end')}
          onChange={(e) => setEndDate(e.target.value)}
          dateSelected={endDate}
          startDate={startDate}
          endDate={endDate}
          previousMonth={() => previousMonth('start')}
          nextMonth={() => nextMonth('start')}
        />
      </div>

      <input
        type='range'
        name='sliderOne'
        value={sliderOne}
        onChange={(e) => sliderChange(e)}
        min={sliderMin}
        max={sliderMax}
      />
      <input
        type='range'
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
