import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, differenceInDays, format } from 'date-fns';

import { getRandomNumber } from '../data/formulas/numberFormulas';
import { deleteAllSalesData, createBulkSalesData } from '../data/actions/salesDataActions.js';

import ButtonHover from './ButtonHover';
import DropDownCalendar from './calendar/DropDownCalendar';

const SalesHistoryModifying = (props) => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { startDate, endDate } = getFromState.dates;

  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [showHide, setShowHide] = useState('hide');

  const onFocus = () => {
    setShowHide('show');
  };

  const onBlur = () => {
    setShowHide('hide');
  };

  const addSeasonalTrends = () => {
    let arr = randomSalesData();

    let winter = arr.filter((i) => {
      let month = i.date.split('-')[1];
      let day = i.date.split('-')[2];
      return (
        (month === '10' && parseInt(day) > 15) ||
        month === '11' ||
        month === '12' ||
        (month === '1' && parseInt(day) < 10)
      );
    });

    winter.map((i) => {
      let randomDate = format(add(new Date(i.date), { days: getRandomNumber(-2, 3) }), 'yyyy-M-d');
      let randomNumber = getRandomNumber(0, 800);

      return arr.push({ date: randomDate, data: randomNumber });
    });

    let summer = arr.filter((i) => {
      let month = i.date.split('-')[1];
      return month === '6' || month === '7' || month === '8';
    });

    summer.map((i) => {
      let randomDate = format(add(new Date(i.date), { days: getRandomNumber(-2, 3) }), 'yyyy-M-d');
      let randomNumber = getRandomNumber(0, 400);

      return arr.push({ date: randomDate, data: randomNumber });
    });

    let sortedArr = arr.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    dispatch(deleteAllSalesData());
    dispatch(createBulkSalesData(sortedArr));
  };

  const justRandomData = () => {
    let arr = randomSalesData();

    dispatch(deleteAllSalesData());
    dispatch(createBulkSalesData(arr));
  };

  const randomSalesData = () => {
    let dayDifferenceStartEnd = differenceInDays(new Date(endDate), new Date(startDate));
    let arr = [];

    for (let i = 0; i < dayDifferenceStartEnd * 0.9; i++) {
      let randomDay = getRandomNumber(0, dayDifferenceStartEnd);
      let randomDate = format(add(new Date(startDate), { days: randomDay }), 'yyyy-M-d');
      let randomNumber = getRandomNumber(0, 1000);

      arr.push({ date: randomDate, data: randomNumber });
    }

    let sortedArr = arr.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    return sortedArr;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '16vh',
        width: '85vw',
        backgroundColor: 'lightgrey',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <ButtonHover
          onClick={() => justRandomData()}
          onClickCapture={props.onClick}
          name={'Randomize Data'}
          className={'modifyingButton'}
        />
        <ButtonHover
          name='Randomize with seasonal trends'
          onClick={() => addSeasonalTrends()}
          onClickCapture={props.onClick}
          className={'modifyingButton'}
        />
        <ButtonHover
          name='Recalculate Forecasts'
          onClickCapture={props.onClick}
          className={'modifyingButton'}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: '2vh',
          marginBottom: '2vh',
        }}
        tabIndex={0}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
      >
        <div
          style={{
            width: '24vw',
            height: '5vh',
            fontSize: '1.8vmin',
            backgroundColor: '#efefef',
            border: '1pt solid black',
            padding: '0.5vh',
          }}
        >
          <DropDownCalendar
            startDate={startDate}
            endDate={endDate}
            startValue={tempStartDate}
            endValue={tempEndDate}
            inputWidth={'12vw'}
            inputFontSize={'1.8vh'}
            inputBackgroundColor={'#efefef'}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesHistoryModifying;
