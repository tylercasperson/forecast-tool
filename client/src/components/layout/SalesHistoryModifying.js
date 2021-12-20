import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, differenceInDays, format } from 'date-fns';

import { getRandomNumber } from '../data/formulas/numberFormulas';
import { deleteAllSalesData, createBulkSalesData } from '../data/actions/salesDataActions.js';

import { calculateForecasts } from '../data/formulas/forecastFormulas.js';
import { groupFrequency } from '../data/formulas/dateFormulas';
import { rangeSalesData, listSalesData } from '../data/actions/salesDataActions.js';
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
import ErrorMessage from './ErrorMessage';

const SalesHistoryModifying = (props) => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { startDate, endDate } = getFromState.dates;
  const { movingPeriods, weightedPeriods } = getFromState.periods;
  const { firstLetter, periodId } = getFromState.groupVariables;
  const { dataTypes } = getFromState.dataTypes;
  const { timePeriod } = getFromState.timePeriods;
  const { current, previousYear } = getFromState.salesDataRange.salesData;
  const { gdp } = getFromState.gdp;

  const [load, setLoad] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState('none');

  const forecastCalculations = () => {
    let lastTimePeriodId = timePeriod.length === 0 ? 1 : timePeriod[timePeriod.length - 1].id;

    setLoad(true);

    dispatch(deleteAllTimePeriod());
    dispatch(deleteAllGroupedData());

    let { occurrences, dayEquivalent } = groupFrequency(firstLetter, startDate, endDate);
    let timeVariables = { occurrences, dayEquivalent, periodId, firstLetter };

    let forecastData = calculateForecasts(
      timeVariables,
      startDate,
      endDate,
      current.salesData,
      dataTypes,
      lastTimePeriodId,
      previousYear,
      movingPeriods,
      weightedPeriods,
      gdp
    );

    dispatch(createBulkTimePeriod(forecastData.timePeriods));
    dispatch(createBulkGroupedData(forecastData.data));
  };

  const addSeasonalTrends = () => {
    if (new Date(startDate) <= new Date() && new Date(endDate) <= new Date()) {
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
        let randomDate = format(
          add(new Date(i.date), { days: getRandomNumber(-2, 3) }),
          'yyyy-M-d'
        );
        let randomNumber = getRandomNumber(0, 800);

        return arr.push({ date: randomDate, data: randomNumber });
      });

      let summer = arr.filter((i) => {
        let month = i.date.split('-')[1];
        return month === '6' || month === '7' || month === '8';
      });

      summer.map((i) => {
        let randomDate = format(
          add(new Date(i.date), { days: getRandomNumber(-2, 3) }),
          'yyyy-M-d'
        );
        let randomNumber = getRandomNumber(0, 400);

        return arr.push({ date: randomDate, data: randomNumber });
      });

      let sortedArr = arr.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      dispatch(deleteAllSalesData());
      dispatch(createBulkSalesData(sortedArr));
      forecastCalculations();
      setLoad(true);
    }
  };

  const justRandomData = () => {
    if (new Date(startDate) <= new Date() && new Date(endDate) <= new Date()) {
      let arr = randomSalesData();

      dispatch(deleteAllSalesData());
      dispatch(createBulkSalesData(arr));
      forecastCalculations();
    }
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
    if (new Date(startDate) <= new Date() && new Date(endDate) >= new Date()) {
      setErrorDisplay('block');
    } else {
      setErrorDisplay('none');
    }

    dispatch(
      listGroupedData(
        format(new Date(startDate), 'yyyy-M-d'),
        format(new Date(endDate), 'yyyy-M-d')
      )
    );
    dispatch(
      listSalesData(format(new Date(startDate), 'yyyy-M-d'), format(new Date(endDate), 'yyyy-M-d'))
    );
    if (load) {
      dispatch(rangeSalesData(startDate, endDate));
      dispatch(listTimePeriod());
      dispatch(listDataTypes());
      dispatch(listGdp());
      setLoad(false);
    }
  }, [dispatch, load, startDate, endDate, errorDisplay]);

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
      <ErrorMessage errorDisplay={errorDisplay} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <ButtonHover
          onClickCapture={() => justRandomData()}
          onClick={props.onClick}
          name={'Randomize Data'}
          className={'modifyingButton'}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '2vh',
            marginBottom: '2vh',
          }}
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
              inputWidth={'12vw'}
              inputFontSize={'2vmin'}
              inputBackgroundColor={'#efefef'}
            />
          </div>
        </div>
        <ButtonHover
          name='Randomize with seasonal trends'
          onClickCapture={() => addSeasonalTrends()}
          onClick={props.onClick}
          className={'modifyingButton'}
        />
      </div>
    </div>
  );
};

export default SalesHistoryModifying;
