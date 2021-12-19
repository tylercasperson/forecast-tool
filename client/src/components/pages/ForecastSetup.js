import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { calculateForecasts } from '../data/formulas/forecastFormulas.js';
import { groupFrequency } from '../data/formulas/dateFormulas.js';
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
  const { firstLetter, periodId } = getFromState.groupVariables;
  const { movingPeriods, weightedPeriods } = getFromState.periods;
  const { dataTypes } = getFromState.dataTypes;
  const { timePeriod } = getFromState.timePeriods;
  const { minDate, maxDate } = getFromState.salesDateMinMax.salesData;
  const { current, previousYear } = getFromState.salesDataRange.salesData;
  const { gdp } = getFromState.gdp;

  const [load, setLoad] = useState(true);

  const onClick = () => {
    let lastTimePeriodId = timePeriod.length === 0 ? 1 : timePeriod[timePeriod.length - 1].id;

    dispatch(deleteAllGroupedData());
    dispatch(deleteAllTimePeriod());

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
    <form action={'./'}>
      <HeaderLabel header={'Change Forecast Colors'} />
      <ChangeColors colorsDisplay={'flex'} />
      <HeaderLabel header={'Show / Hide Forecast'} />
      <ForecastList />
      <HeaderLabel header={'Date Range of Forecast'} />
      {minDate && maxDate && <DateSlider />}
      <HeaderLabel header={'Group Forecast Data By'} />
      <TimePeriodTypesList />
      <ButtonHover onClick={(e) => onClick(e)} name={'Calculate'} className={'calculateButton'} />
    </form>
  );
};

export default ForecastSetup;
