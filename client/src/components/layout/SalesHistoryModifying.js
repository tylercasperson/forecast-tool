import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  add,
  differenceInDays,
  format,
  min,
  max,
  eachYearOfInterval,
  eachQuarterOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
} from 'date-fns';

import { getRandomNumber } from '../data/formulas/numberFormulas';
import { deleteAllSalesData, createBulkSalesData } from '../data/actions/salesDataActions.js';

import { calculateForecasts } from '../data/formulas/forecastFormulas.js';
import { rangeSalesData } from '../data/actions/salesDataActions.js';
import {
  createBulkTimePeriod,
  deleteAllTimePeriod,
  listTimePeriod,
} from '../data/actions/timePeriodActions.js';
import { listDataTypes } from '../data/actions/dataTypeActions.js';
import {
  createBulkGroupedData,
  deleteAllGroupedData,
  listGroupedData,
} from '../data/actions/groupedDataActions.js';
import { listGdp } from '../data/actions/gdpActions.js';

import ButtonHover from './ButtonHover';
import DropDownCalendar from './calendar/DropDownCalendar';

const SalesHistoryModifying = (props) => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { startDate, endDate } = getFromState.dates;
  const { movingPeriods, weightedPeriods } = getFromState.periods;
  const { firstLetter, periodId, occurences } = getFromState.groupVariables;
  const { dataTypes } = getFromState.dataTypes;
  const { timePeriod } = getFromState.timePeriods;
  const { current, previousYear } = getFromState.salesDataRange.salesData;
  const { gdp } = getFromState.gdp;

  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [showHide, setShowHide] = useState('hide');
  const [load, setLoad] = useState(true);

  const onFocus = () => {
    setShowHide('show');
  };

  const onBlur = () => {
    setShowHide('hide');
  };

  const selectedTimePeriod = () => {
    let firstLetter = 'w';
    let periodId = 3;

    const firstDate = min([new Date(startDate), new Date(endDate)]);
    const secondDate = max([new Date(startDate), new Date(endDate)]);

    const interval = (firstLetter) => {
      let dateRange = { start: firstDate, end: secondDate };

      switch (firstLetter) {
        case 'y':
          return eachYearOfInterval(dateRange);
        case 'q':
          return eachQuarterOfInterval(dateRange);
        case 'm':
          return eachMonthOfInterval(dateRange);
        case 'w':
          return eachWeekOfInterval(dateRange);
        default:
          return differenceInDays(secondDate, firstDate);
      }
    };

    let occurrences = interval(firstLetter).length;
    let dayEquivalent = Math.ceil(differenceInDays(secondDate, firstDate) / occurrences);
    return {
      dayEquivalent,
      occurrences,
      firstLetter,
      periodId,
      startOn: interval(firstLetter),
    };
  };

  const forecastCalculations = () => {
    dispatch(deleteAllGroupedData());
    dispatch(deleteAllTimePeriod());
    let timeVariables = selectedTimePeriod();

    let forecastData = calculateForecasts(
      timeVariables,
      startDate,
      endDate,
      current.salesData,
      dataTypes,
      timePeriod,
      previousYear,
      movingPeriods,
      weightedPeriods,
      gdp
    );

    dispatch(createBulkTimePeriod(forecastData.timePeriods));
    dispatch(createBulkGroupedData(forecastData.data));
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

    forecastCalculations();
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
      let randomDateLastYear = format(
        add(add(new Date(startDate), { days: randomDay }), { years: -1 }),
        'yyyy-M-d'
      );

      arr.push({ date: randomDate, data: getRandomNumber(0, 1000) });
      arr.push({ date: randomDateLastYear, data: getRandomNumber(0, 1000) });
    }

    let sortedArr = arr.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    return sortedArr;
  };

  useEffect(() => {
    dispatch(
      listGroupedData(
        format(new Date(startDate), 'yyyy-M-d'),
        format(new Date(endDate), 'yyyy-M-d')
      )
    );
    if (load) {
      dispatch(rangeSalesData(startDate, endDate));
      dispatch(listTimePeriod());
      dispatch(listDataTypes());
      dispatch(listGdp());
      setLoad(false);
    }
  }, [dispatch, load, startDate, endDate]);

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
