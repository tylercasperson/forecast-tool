import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, differenceInDays, format } from 'date-fns';

import { getRandomNumber } from '../data/formulas/numberFormulas';
import { groupFrequency } from '../data/formulas/dateFormulas';
import { calculateForecasts } from '../data/formulas/forecastFormulas.js';
import { deleteAllSalesData, createBulkSalesData } from '../data/actions/salesDataActions.js';
import { SALES_DATA_BULK_CREATE_RESET } from '../data/constants/salesDataConstants.js';
import { rangeSalesData, listSalesData } from '../data/actions/salesDataActions.js';
import {
  createBulkTimePeriod,
  deleteAllTimePeriod,
  listTimePeriod,
} from '../data/actions/timePeriodActions.js';
import { TIME_PERIOD_BULK_CREATE_RESET } from '../data/constants/timePeriodConstants.js';
import { listDataTypes } from '../data/actions/dataTypeActions.js';
import {
  createBulkGroupedData,
  deleteAllGroupedData,
  listGroupedData,
} from '../data/actions/groupedDataActions.js';
import { GROUPED_DATA_BULK_CREATE_RESET } from '../data/constants/groupedDataConstants.js';
import { listGdp, listStoredGdp, createStoredGdp } from '../data/actions/gdpActions.js';

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
  const { previousYear } = getFromState.salesDataRange.salesData;
  const { gdpData } = getFromState.gdp;
  const { gdpStoredData } = getFromState.gdpStoredData;

  const { success: timePeriodBulkSuccess } = getFromState.timePeriodBulkCreate;
  const { success: salesDataBulkSuccess } = getFromState.salesDataBulkCreate;
  const { success: groupedDataBulkSuccess } = getFromState.groupedDataBulkCreate;

  const [load, setLoad] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState('none');

  const forecastCalculations = (arr) => {
    let lastTimePeriodId = timePeriod.length === 0 ? 1 : timePeriod[timePeriod.length - 1].id;

    setLoad(true);

    dispatch(deleteAllTimePeriod());
    dispatch(deleteAllGroupedData());

    let { occurrences, dayEquivalent } = groupFrequency(
      firstLetter.toUpperCase(),
      startDate,
      endDate
    );
    let timeVariables = { occurrences, dayEquivalent, periodId, firstLetter };
    let gdpToUse = gdpData.length === 0 ? gdpStoredData : gdpData;

    if (gdpData.length !== 0) {
      if (gdpStoredData.filter((i) => i.date === gdpData[0].date).length === 0) {
        dispatch(createStoredGdp({ date: gdpData[0].date, value: gdpData[0].value }));
      }
    }

    let forecastData = calculateForecasts(
      timeVariables,
      startDate,
      endDate,
      arr,
      dataTypes,
      lastTimePeriodId,
      previousYear,
      movingPeriods,
      weightedPeriods,
      gdpToUse
    );

    dispatch(createBulkTimePeriod(forecastData.timePeriods));
    dispatch(createBulkGroupedData(forecastData.data));
  };

  const addSeasonalTrends = () => {
    if (props.groupedData.length && props.salesData.length !== 0) {
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
        forecastCalculations(sortedArr);
        setLoad(true);
      }
    }
  };

  const justRandomData = () => {
    if (props.groupedData.length && props.salesData.length !== 0) {
      if (new Date(startDate) <= new Date() && new Date(endDate) <= new Date()) {
        let arr = randomSalesData();

        dispatch(deleteAllSalesData());
        dispatch(createBulkSalesData(arr));
        forecastCalculations(arr);
      }
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
        format(add(new Date(startDate), { days: -1 }), 'yyyy-M-d'),
        format(add(new Date(endDate), { days: 1 }), 'yyyy-M-d')
      )
    );
    dispatch(
      listSalesData(
        format(add(new Date(startDate), { days: -1 }), 'yyyy-M-d'),
        format(add(new Date(endDate), { days: 1 }), 'yyyy-M-d')
      )
    );
    if (load) {
      dispatch(rangeSalesData(startDate, endDate));
      dispatch(listTimePeriod());
      dispatch(listDataTypes());
      dispatch(listGdp());
      dispatch(listStoredGdp());
      setLoad(false);
    }

    if (timePeriodBulkSuccess) {
      dispatch({ type: SALES_DATA_BULK_CREATE_RESET });
    }
    if (salesDataBulkSuccess) {
      dispatch({ type: TIME_PERIOD_BULK_CREATE_RESET });
    }
    if (groupedDataBulkSuccess) {
      dispatch({ type: GROUPED_DATA_BULK_CREATE_RESET });
    }
  }, [
    dispatch,
    load,
    startDate,
    endDate,
    errorDisplay,
    timePeriodBulkSuccess,
    salesDataBulkSuccess,
    groupedDataBulkSuccess,
  ]);

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
