import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import { calculateForecasts } from '../data/formulas/forecastFormulas.js';
import { groupFrequency } from '../data/formulas/dateFormulas.js';
import {
  rangeSalesData,
  minMaxSalesDates,
  listSalesData,
} from '../data/actions/salesDataActions.js';
import {
  createBulkTimePeriod,
  deleteAllTimePeriod,
  listTimePeriod,
} from '../data/actions/timePeriodActions.js';
import { listDataTypes } from '../data/actions/dataTypeActions.js';
import { createBulkGroupedData, deleteAllGroupedData } from '../data/actions/groupedDataActions.js';
import { listGdp, listStoredGdp, createStoredGdp } from '../data/actions/gdpActions.js';

import TimePeriodTypesList from '../layout/TimePeriodTypesList';
import DateSlider from '../layout/calendar/DateSlider';
import ForecastList from '../layout/ForecastList';
import ButtonHover from '../layout/ButtonHover';
import ChangeColors from '../layout/ChangeColors';
import HeaderLabel from '../layout/HeaderLabel';
import ErrorMessage from '../layout/ErrorMessage.js';

const ForecastSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFromState = useSelector((state) => state);
  const { startDate, endDate } = getFromState.dates;
  const { firstLetter, periodId } = getFromState.groupVariables;
  const { movingPeriods, weightedPeriods } = getFromState.periods;
  const { dataTypes } = getFromState.dataTypes;
  const { timePeriod } = getFromState.timePeriods;
  const { minDate, maxDate } = getFromState.salesDateMinMax.salesData;
  const { current, previousYear } = getFromState.salesDataRange.salesData;
  const { gdpData } = getFromState.gdp;
  const { gdpStoredData } = getFromState.gdpStoredData;

  const [load, setLoad] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState('none');

  const onClick = (e) => {
    e.preventDefault();
    if (new Date(startDate) <= new Date() && new Date(endDate) <= new Date()) {
      let lastTimePeriodId = timePeriod.length === 0 ? 1 : timePeriod[timePeriod.length - 1].id;

      dispatch(deleteAllGroupedData());
      dispatch(deleteAllTimePeriod());

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
        current.salesData,
        dataTypes,
        lastTimePeriodId,
        previousYear,
        movingPeriods,
        weightedPeriods,
        gdpToUse
      );

      dispatch(createBulkTimePeriod(forecastData.timePeriods));
      dispatch(createBulkGroupedData(forecastData.data));

      localStorage.removeItem('scrollPosition');
      navigate('/');
    }
  };

  useEffect(() => {
    if (new Date(startDate) <= new Date() && new Date(endDate) >= new Date()) {
      setErrorDisplay('block');
    } else {
      setErrorDisplay('none');
    }
    if (load) {
      listSalesData(format(new Date(startDate), 'yyyy-M-d'), format(new Date(endDate), 'yyyy-M-d'));
      dispatch(rangeSalesData(startDate, endDate));
      dispatch(listTimePeriod());
      dispatch(minMaxSalesDates());
      dispatch(listDataTypes());
      dispatch(listGdp());
      dispatch(listStoredGdp());
      setLoad(false);
    }
  }, [dispatch, load, startDate, endDate, errorDisplay]);

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
      <ErrorMessage errorDisplay={errorDisplay} />
      <ButtonHover onClick={(e) => onClick(e)} name={'Calculate'} className={'calculateButton'} />
    </form>
  );
};

export default ForecastSetup;
