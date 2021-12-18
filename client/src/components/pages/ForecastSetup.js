import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  min,
  max,
  differenceInDays,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachYearOfInterval,
} from 'date-fns';

import { calculateForecasts } from '../data/formulas/forecastFormulas.js';
import { rangeSalesData, minMaxSalesDates } from '../data/actions/salesDataActions.js';
import {
  createBulkTimePeriod,
  deleteAllTimePeriod,
  listTimePeriod,
} from '../data/actions/timePeriodActions.js';
import { listDataTypes } from '../data/actions/dataTypeActions.js';
import { createBulkGroupedData, deleteAllGroupedData } from '../data/actions/groupedDataActions.js';
import { listGdp } from '../data/actions/gdpActions.js';

import TimePeriodTypesList from '../layout/TimePeriodTypesList';
import DateSlider from '../layout/calendar/DateSlider';
import ForecastList from '../layout/ForecastList';
import ButtonHover from '../layout/ButtonHover';
import ChangeColors from '../layout/ChangeColors';
import HeaderLabel from '../layout/HeaderLabel';

const ForecastSetup = () => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { startDate, endDate } = getFromState.dates;
  const { movingPeriods, weightedPeriods } = getFromState.periods;
  const { dataTypes } = getFromState.dataTypes;
  const { timePeriod } = getFromState.timePeriods;
  const { minDate, maxDate } = getFromState.salesDateMinMax.salesData;
  const { current, previousYear } = getFromState.salesDataRange.salesData;
  const { gdp } = getFromState.gdp;

  const forecastForm = useRef();

  const firstDate = min([new Date(startDate), new Date(endDate)]);
  const secondDate = max([new Date(startDate), new Date(endDate)]);
  const [load, setLoad] = useState(true);

  const selectedTimePeriod = () => {
    let timePeriodList = forecastForm.current.children[7].children[0].children;
    let firstLetter;
    let periodId;

    for (let i = 0; i < timePeriodList.length; i++) {
      if (timePeriodList[i].classList.contains('selected')) {
        firstLetter = timePeriodList[i].children[0].innerText.toLowerCase().charAt(0);
        periodId = parseInt(timePeriodList[i].attributes.id.value);
      }
    }
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

  const onClick = () => {
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
    localStorage.removeItem('scrollPosition');
  };

  useEffect(() => {
    if (load) {
      dispatch(rangeSalesData(startDate, endDate));
      dispatch(listTimePeriod());
      dispatch(minMaxSalesDates());
      dispatch(listDataTypes());
      dispatch(listGdp());
      setLoad(false);
    }
  }, [dispatch, load, startDate, endDate]);

  return (
    <div ref={forecastForm} action={'./'}>
      <HeaderLabel header={'Change Forecast Colors'} />
      <ChangeColors colorsDisplay={'flex'} />
      <HeaderLabel header={'Show/Hide Forecast'} />
      <ForecastList />
      <HeaderLabel header={'Date Range of Forecast'} />
      {minDate && maxDate && <DateSlider />}
      <HeaderLabel header={'Group Forecast Data By'} />
      <TimePeriodTypesList />
      <ButtonHover onClick={(e) => onClick(e)} name={'Calculate'} className={'calculateButton'} />
    </div>
  );
};

export default ForecastSetup;
